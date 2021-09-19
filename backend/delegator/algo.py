import time

def checkCertifications(technician, orderList):
    return [x for x in orderList if x.type in technician.certifications]

def checkShift(technician, orderList, currentTime):
    return [x for x in orderList if x.timeToComplete + currentTime <= technician.shiftEnd]

def checkOccupancy(order, facilitiesList):
    for fac in facilitiesList:
        if fac == order.facility:
            return fac.fullyOccupied
        
def assignOrderToTech(technician, orderList, currentTime, facilitiesList):
    """
    Assigns a work order to a given technician.

    Returns a tuple, the technician and the order that it is working on. 
    """
    # filters only the orders that technician has certification for 
    filter1 = filter(lambda x: x.type in technician.certifications, orderList)
    # and then filters only the jobs that end before the technician's shift ends
    allChecked = filter(lambda x: currentTime + x.timeToComplete < technician.shiftEnd, certified)

    highestPriority = allChecked[0].priority
    currentLocation = technician.location

    for order in allChecked:
        if order.priority < highestPriority:
            break
        if currentLocation == order.facility:
            return tuple(technician, order)

    return tuple(technician, allChecked[0])