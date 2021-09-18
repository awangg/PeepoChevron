from openpyxl import load_workbook, Workbook

class Data():
    def __init__(self):
        self.NULL = {None, "=""", ""}
        self.WORKFILE = "backend\delegator\data\RiceHackathonFile.xlsx"
        self.SHEET_NAMES = ["Equipment Details", "Worker Details", "Facility Details", "Work Order Examples"]
        self.wb = load_workbook(self.WORKFILE)

        self.EQUIPMENT_FIELDS = ["failure", "fix", "fac1", "fac2", "fac3", "fac4", "fac5"]
        self.WORKER_FIELDS = ["certifications", "shifts"]
        self.FACILITY_FIELDS = ["latitude", "longitude", "occupancy"]
        self.ORDER_FIELDS = ["facility", "type", "id", "priority", "completion_time", "submission_time"]

        self.EQUIPMENT = self.read_sheet(self.SHEET_NAMES[0], 3, 2, self.EQUIPMENT_FIELDS)
        self.WORKER = self.read_sheet(self.SHEET_NAMES[1], 2, 2, self.WORKER_FIELDS)
        self.FACILITY = self.read_sheet(self.SHEET_NAMES[2], 3, 2, self.FACILITY_FIELDS)
        self.ORDER = self.read_sheet(self.SHEET_NAMES[3], 3, 2, self.ORDER_FIELDS)
        self.DISTANCE_MATRIX = self.generate_distance_matrix()
        
