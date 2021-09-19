import time
from read_excel import Data

def checkCertifications(technician, orderList):
    return [x for x in orderList if x["Equipment Type"] in technician["Certifications"]]

def checkOccupancy(orderList, facilitiesList):
    notOccupied = []
    for order in orderList:
        for fac in facilitiesList:
            if fac == order["Facility"]:
                if 2 < fac["Maximum Occupancy"]:
                    notOccupied.append(order)
    return notOccupied
        
def assignOrderToTech(technician, orderList, facilitiesList):
    """
    Assigns a work order to a given technician.

    Returns a tuple, the technician and the order that it is working on. 
    """
    print(technician)

    # filters only the orders that technician has certification for 
    filter1 = checkCertifications(technician, orderList); 

    print(filter1)
    print(facilitiesList)
    # and then filters only the non fully occupied facilities
    finalList = checkOccupancy(filter1, facilitiesList)

    print(finalList)

    # if there is no order that fits the technician, return empty
    if not finalList:
        return

    highestPriority = finalList[0]["Priority"]
    currentLocation = technician["Location"]

    for order in finalList:
        if order["Priority"] < highestPriority:
            break
        if currentLocation == order["Facility"]:
            return tuple(technician, order)

    return tuple(technician, finalList[0])

def testExcel():
    x = Data()
    person1 = x.getWorkerData()[0]
    print(assignOrderToTech(person1, x.logData, x.facData))

testExcel()
