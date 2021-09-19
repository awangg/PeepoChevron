import time
from read_excel import Data

def checkCertifications(technician, orderList):
    return [x for x in orderList if x["Equipment Type"] in technician["Certifications"]]

def checkOccupancy(orderList, facilitiesList):
    notOccupied = []
    for order in orderList:
        for fac in facilitiesList:
            if fac["Facility"] == order["Facility"]:
                if 0 < fac["Maximum Occupacy"]:
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
        return

    highestPriority = finalList[0]["Priority(1-5)"]
    currentLocation = technician["Location"]

    for order in finalList:
        if order["Priority(1-5)"] < highestPriority:
            break
        if currentLocation == order["Facility"]:
            return (technician, order)

    return (technician, finalList[0])

def testExcel():
    x = Data()
    person1 = x.getWorkerData()[3]
    print(assignOrderToTech(person1, x.logData, x.facData))

testExcel()
