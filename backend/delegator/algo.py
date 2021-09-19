import time
from read_excel import Data
import json

class Facility():
    def __init__(self, dict):
        self.facility = dict["Facility"]
        self.latitude = dict["Latitude"]
        self.longitude = dict["Longitude"]
        self.maxOccupacy = dict["Maximum Occupacy"]
        self.currentOccupacy = 0
    def getFacility(self):
        return self.facility
    def getLat(self):
        return self.latitude
    def getLong(self):
        return self.longitude
    def getMaxOccupacy(self):
        return self.maxOccupacy
    def getCurrOccupacy(self):
        return self.currentOccupacy
        
class Worker():
    def __init__(self, dict):
        self.name = dict["Name"]
        self.certifications = dict["Certifications"]
        self.shifts = dict["Shifts"]
        self.location = dict["Location"]
        self.hasJob = dict["hasJob"]
    def getName(self):
        return self.name
    def getCert(self):
        return self.certifications
    def getShifts(self):
        return self.shifts
    def getLocation(self):
        return self.location
    def getHasJob(self):
        return self.hasJob
class Log():
    def __init__(self, data):
        self.workID = data["Work Order #"]
        self.facility = data["Facility"]
        self.equipment = data["Equipment Type"]
        self.equipID = data["Equipment ID"]
        self.priority = data["Priority(1-5)"]
        self.timeNeeded = data["Time to Complete"]
        self.timeSubmission = data["Submission Timestamp"]
        self.data = data
    def toString(self):
        return self.data
        
def checkCertifications(technician, orderList):
    res = []
    for order in orderList:
        if order.equipment in technician.certifications:
            res.append(order)
    return res
    

def checkOccupancy(orderList, facilitiesList):
    notOccupied = []
    for order in orderList:
        for fac in facilitiesList:
            if fac.facility == order.facility:
                if fac.currentOccupacy < fac.maxOccupacy:
                    notOccupied.append(order)
    return notOccupied
        
def assignOrderToTech(technician, orderList, facilitiesList):
    """
    Assigns a work order to a given technician.

    Returns a tuple, the technician and the order that it is working on. 
    """
    # filters only the orders that technician has certification for 
    filter1 = checkCertifications(technician, orderList); 
    # and then filters only the non fully occupied facilities
    finalList = checkOccupancy(filter1, facilitiesList)

    # if there is no order that fits the technician, return empty
    if not finalList:
        return {}

    highestPriority = finalList[0].priority
    currentLocation = technician.location

    for order in finalList:
        if order.priority < highestPriority:
            break
        if currentLocation == order.facility:
            return tuple(technician, order.data)

    return (technician.name, finalList[0].data)

def testExcel():
    x = Data()
    workerData = x.getWorkerData()
    facData = x.getFacilityData()
    lstWorkerObj = []
    lstFacObj = []
    lstLogObj = []
    logData = x.getLogData()
    logData = sorted(logData, key=lambda k: (k['Priority(1-5)']), reverse = True)
    for worker in workerData:
        lstWorkerObj.append(Worker(worker))
    for facility in facData:
        lstFacObj.append(Facility(facility))
    for log in logData:
        lstLogObj.append(Log(log))
    for worker in lstWorkerObj:
        print(assignOrderToTech(worker, lstLogObj, lstFacObj))
    
    #jsonWorker = json.dumps(workerData)
    #logData = x.getLogData()
    #logData = sorted(logData, key=lambda k: (k['Priority(1-5)']), reverse = True)
    #jsonLog = json.dumps(logData)
    #print(type(jsonWorker), jsonLog)

testExcel()