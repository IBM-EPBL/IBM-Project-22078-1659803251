from flask import request
import bcrypt
import json
from db.db import db
import ibm_db

class Login:

    def __sanitizer(self, args: dict):
        if "email" not in args:
            raise KeyError({
            "status": "Error",
            "message": "email is required field",
            "data":  None
            })
        if "password" not in args:
            raise KeyError({
            "status": "Error",
            "message": "password is required field",
            "data":  None
            })

    def post(self):
        payload = request.json
        try:
            self.__sanitizer(payload)
            result = ibm_db.exec_immediate(db, "SELECT * FROM USERS WHERE EMAIL='{}' AND VERIFIED=TRUE".format(payload["email"]))
            value = ibm_db.fetch_tuple(result)
            if value == False:
                return json.dumps({"status": "Error", "data": None, "message": "Invalid Credentials"})
            if bcrypt.checkpw(bytes("{}".format(payload["password"]), 'utf-8'),bytes(value[3], 'utf-8')):
                payload = {
                    "email" : value[2],
                    "token": value[5],
                    "name": value[1],
                    "currency": value[4]
                }
                return json.dumps({"status": "Success", "data": payload, "message": "success"})
            else:
                return json.dumps({"status": "Error", "data": None, "message": "Invalid Credentials"})
        except KeyError as e:
            return json.dumps(e.args)
        except:
            return json.dumps({"status": "Error", "data": None, "message": "Server Error"})
        
        
     

