from flask import request, redirect
import json
from db.db import db
import ibm_db



class Budgets:

    def __middleware(self):
        token = request.headers.get("Authorization")
        [_, value] = token.split(" ")
        try:
            result = ibm_db.exec_immediate(db, "SELECT * FROM USERS WHERE TOKEN='{}'".format(value))
            user = ibm_db.fetch_tuple(result)
            if user == False:
                raise ValueError({
                    "status": "Error",
                    "data": None,
                    "message": "User Not Found"
                })
            else:
                self.user = user
        except:
             raise ValueError({
                    "status": "Error",
                    "data": None,
                    "message": "Server Error"
                })


    def __sanitizer(self, args: dict):
        if "name" not in args:
            raise KeyError({
            "status": "Error",
            "message": "name is required field",
            "data":  None
            })
        if "range" not in args:
            raise KeyError({
            "status": "Error",
            "message": "range is required field",
            "data":  None
            })
        if "limit" not in args:
            raise KeyError({
            "status": "Error",
            "message": "limit is required field",
            "data":  None
            })
        if "date" not in args:
            raise KeyError({
            "status": "Error",
            "message": "date is required field",
            "data":  None
            })

    def get(self):
        try:
            self.__middleware()
            result = ibm_db.exec_immediate(db, "SELECT * FROM BUDGETS WHERE BUDGETS.USER={}".format(self.user[0]))
            budgets = ibm_db.fetch_tuple(result)
            payload = []
            while (budgets):
                payload.append({
                    "name": budgets[0],
                    "date": str(budgets[1]),
                    "range": budgets[2],
                    "limit": budgets[3]
                })
                budgets = ibm_db.fetch_tuple(result)
            print(payload)
            if len(payload) == 0:
                return json.dumps({"status": "Error", "data": None, "message": "No Budget Availabele"})
            return json.dumps({"status": "Success", "data": payload, "message": "Budget Retrived Successfully"})
        except ValueError as e:
            return json.dumps(e.args[0])
        except Exception as e:
            print(e)
            return json.dumps({"status": "Error", "data": None, "message": "Server Error"})
        

    def post(self):
        payload = request.json
        try:
            self.__middleware()
            self.__sanitizer(payload)
            ibm_db.exec_immediate(db, "INSERT INTO BUDGETS(NAME, CREATED_AT, RANGE, LIMIT, USER) VALUES('{}', '{}', '{}', '{}', '{}');".format(payload["name"], payload["date"], payload["range"], payload["limit"], self.user[0]))
            return json.dumps({"status": "Success", "data": None, "message": "Budget Created Successfully"})
        except ValueError as e:
            return json.dumps(e.args)
        except Exception as e:
            print(e)
            return json.dumps({"status": "Error", "data": None, "message": "Server Error"})
        

        
        
        

