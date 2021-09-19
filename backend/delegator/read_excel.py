from openpyxl import load_workbook, Workbook
import pandas as pd 
import numpy as np
import os

class Data():
    def __init__(self):
        self.FILE = "backend\delegator\RiceHackathonFile.xlsx"
        self.equipData = self.readData("Equipment Details", 1, 1)
        self.facData = self.readData("Facility Details", 1, 1)
        self.logData = self.readData("Work Order Examples", 1, 1)
    def getWorkerData(self):
        df = pd.read_excel(self.FILE, sheet_name= "Worker Details", engine = "openpyxl")
        matrix = df.iloc[0:, 1:].values.tolist()
        self.workerInfo = []
        for person in matrix:
            temp = {}
            temp["Name"] = person[0]
            temp["Certifications"] = person[1].replace(" ", "").split(",")
            temp["Shifts"] = person[2]
            temp["Location"] = (0, 0)
            temp["hasJob"] = False
            self.workerInfo.append(temp)
        return self.workerInfo
    def readData(self, sheetName, row, col):
        df = pd.read_excel(self.FILE, sheetName, engine = "openpyxl")
        MATRIX = df.iloc[row:, col:]
        lstMat = MATRIX.values.tolist()
        header = df.iloc[0, 1:].to_list()
        lst = []
        for mat in lstMat:
            temp = {}
            for i in range(len(header)):
                if pd.isnull(header[i]) or pd.isnull(mat[i]):
                    continue
                temp[header[i]] = mat[i]
            if temp:
                lst.append(temp)
        return lst
    def getEquipData(self):
        return self.equipData
    def getFacilityData(self):
        return self.facData
    def getLogData(self):
        return self.logData
x = Data()