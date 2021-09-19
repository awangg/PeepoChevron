import time

def checkCertifications(technician, orderList):
    return [x for x in orderList if x.type in technician.certifications]

def checkOccupancy(orderList, facilitiesList):
    notOccupied = []
    for order in orderList:
        for fac in facilitiesList:
            if fac == orderList.facility:
                notOccupied.append(order)
        
def assignOrderToTech(technician, orderList, currentTime, facilitiesList):
    """
    Assigns a work order to a given technician.

    Returns a tuple, the technician and the order that it is working on. 
    """
    # filters only the orders that technician has certification for 
    filter1 = checkCertifications(technician, orderList); 

    # and then filters only the non fully occupied facilities
    finalList = checkOccupancy(filter1, facilitiesList)

    highestPriority = finalList[0].priority
    currentLocation = technician.location

    for order in finalList:
        if order.priority < highestPriority:
            break
        if currentLocation == order.facility:
            return tuple(technician, order)

    return tuple(technician, finalList[0])