from flask import request
import bcrypt
import json
import uuid
from db.db import db
import ibm_db
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail



class Register:

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
        if "name" not in args:
            raise KeyError({
            "status": "Error",
            "message": "name is required field",
            "data":  None
            })
        if "currency" not in args:
            raise KeyError({
            "status": "Error",
            "message": "currency is required field",
            "data":  None
            })

    def post(self):
        payload = request.json
        try:
            self.__sanitizer(payload)
            hashed_password = bcrypt.hashpw(bytes("{}".format(payload["password"]), 'utf-8'),bcrypt.gensalt(13))
            token = str(uuid.uuid4())
            ibm_db.exec_immediate(db, "INSERT INTO USERS(NAME, EMAIL, PASSWORD,CURRENCY, TOKEN) VALUES('{}', '{}', '{}', '{}', '{}');".format(payload["name"], payload["email"], str(hashed_password, "utf-8"), payload["currency"], token))
            message = Mail(
                from_email="nanthakumarans.19ece@kongu.edu",
                to_emails=payload["email"],
                subject='Verify Your Email Address',
                html_content='<h3>Please Verify Your Email Address By Click The Link Below</h3><br /><a href="http://localhost:5000/verification/{}">Verify Now</a>'.format(payload["email"]))
            sg = SendGridAPIClient("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")
            res = sg.send(message)
            print(res.headers)
            print(res.body)
            
            payload = {
            "email": payload["email"],
            "token": token
            }
            return json.dumps({"status": "Success", "data": payload, "message": "User Created Successfully"})
        except KeyError as e:
            return json.dumps(e.args)
        except:
            return json.dumps({"status": "Error", "data": None, "message": "Server Error"})
        

    def verify(self, email):
        result = ibm_db.exec_immediate(db, "SELECT * FROM USERS WHERE EMAIL='{}'".format(email))
        value = ibm_db.fetch_tuple(result)
        if value == False:
            return "<h1>Invalid</h1>"
        if value[2] == email:
            result = ibm_db.exec_immediate(db, "UPDATE USERS SET VERIFIED=TRUE WHERE EMAIL='{}'".format(email))
            return "<h1>Account Verified Successfully</h1>"
        else:
            return "<h1>Invalid</h1>"

        
        
        

