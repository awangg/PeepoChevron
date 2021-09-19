import time
# from read_excel import Data

def checkCertifications(technician, orderList):
    return [x for x in orderList if x["equipment"]["equipment_type"] in technician["certifications"]]

def checkOccupancy(orderList, facilitiesList):
    notOccupied = []
    for order in orderList:
        for fac in facilitiesList:
            if fac["facility"] == order["facility"]:
                if fac["current_occupancy"] < fac["max_occupancy"]:
                    notOccupied.append(order)
    return notOccupied
        
def assignOrderToTech(technician, orderList, facilitiesList):
    """
    Assigns a work order to a given technician.

    Returns a tuple, the technician and the order that it is working on. 
    """
    if (len(orderList) <= 0):
        return {}
    
    if (len(facilitiesList) <= 0):
        return {}

    # filters only the orders that technician has certification for 
    filter1 = checkCertifications(technician, orderList); 
    # and then filters only the non fully occupied facilities
    finalList = checkOccupancy(filter1, facilitiesList)

    # if there is no order that fits the technician, return empty
    if not finalList:
        return {}

    highestPriority = finalList[0]["priority"]
    currentLocation = technician["last_location"]

    for order in finalList:
        if order["priority"] < highestPriority:
            break
        if currentLocation == order["facility"]:
            return order

    return finalList[0]

# def testExcel():
#     x = Data()
#     person1 = x.getWorkerData()[3]
#     print(assignOrderToTech(person1, x.logData, x.facData))

# testExcel()
