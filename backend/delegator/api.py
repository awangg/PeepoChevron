from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import algoFromExcel as algo
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["DEBUG"] = True

@app.route("/api/v1/assign", methods=['POST'])
@cross_origin()
def assign_order():
  return algo.assignOrderToTech(request.json['data']['technician'], request.json['data']['orders'], request.json['data']['facilities'])