from flask import request
import json
from db.db import db
import ibm_db
import requests


class Transactions:

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
        if "amount" not in args:
            raise KeyError({
            "status": "Error",
            "message": "amount is required field",
            "data":  None
            })
        if "category" not in args:
            raise KeyError({
            "status": "Error",
            "message": "category is required field",
            "data":  None
            })
        if "description" not in args:
            raise KeyError({
            "status": "Error",
            "message": "description is required field",
            "data":  None
            })
        if "date" not in args:
            raise KeyError({
            "status": "Error",
            "message": "date is required field",
            "data":  None
            })
        if "type" not in args:
            raise KeyError({
            "status": "Error",
            "message": "type is required field",
            "data":  None
            })
        if "currency" not in args:
             raise KeyError({
            "status": "Error",
            "message": "currency is required field",
            "data":  None
            })


    def get(self):
        try:
            self.__middleware()
            result = ibm_db.exec_immediate(db, "SELECT * FROM TRANSACTIONS WHERE TRANSACTIONS.USER={}".format(self.user[0]))
            transactions = ibm_db.fetch_tuple(result)
            payload = []
            while (transactions):
                payload.append({
                    "amount": transactions[1],
                    "date": str(transactions[2]),
                    "category": transactions[3],
                    "description": transactions[4],
                    "type": transactions[5]
                })
                transactions = ibm_db.fetch_tuple(result)
            if len(payload) == 0:
                return json.dumps({"status": "Error", "data": None, "message": "No Transaction Availabele"})
            return json.dumps({"status": "Success", "data": payload, "message": "Transaction Retrived Successfully"})
        except ValueError as e:
            return (json.dumps(e.args[0]))
        except Exception as e:
            print(e)
            return (json.dumps({"status": "Error", "data": None, "message": "Server Error"}))
        

    def post(self):
        payload = request.json
        try:
            self.__middleware()
            self.__sanitizer(payload)
            currency = payload["currency"]
            amount = payload["amount"]
            if currency != self.user[4]:
                url = "https://api.apilayer.com/exchangerates_data/convert?to={}&from={}&amount={}".format(self.user[4],currency,payload["amount"])
                headers= {
                    "apikey": "FAlNhalPRf5Vrfv9BMNRloNqXwO8MmHS"
                }
                response = requests.get(url, headers=headers)
                data = response.json()
                amount = data["result"]
            
            ibm_db.exec_immediate(db, "INSERT INTO TRANSACTIONS(AMOUNT, DATE, CATEGORY, DESCRIPTION, TYPE, USER) VALUES('{}', '{}', '{}', '{}', '{}', {});".format(amount, payload["date"], payload["category"], payload["description"], payload["type"], self.user[0]))
            return json.dumps({"status": "Success", "data": None, "message": "Transaction Created Successfully"})
        except ValueError as e:
            return json.dumps(e.args)
        except Exception as e:
            print("error")
            print(e.args)
            return json.dumps({"status": "Error", "data": None, "message": "Server Error"})
        

        
        
        

