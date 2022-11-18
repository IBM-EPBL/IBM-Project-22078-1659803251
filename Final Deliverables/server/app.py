from flask import Flask, request, Response
from controllers.login import Login
from controllers.register import Register
from controllers.budgets import Budgets
from controllers.transactions import Transactions
from db.db import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

login__controller = Login()
register_controller = Register()
budget__controller = Budgets()
transaction__controller = Transactions()

@app.route("/api/login", methods=["post"])
def auth():
    return Response(login__controller.post(), mimetype="application/json")

@app.route("/api/register", methods=["post"])
def register():
    return Response(register_controller.post(), mimetype="application/json")

@app.route("/verification/<email>", methods=["get"])
def verify(email):
    return register_controller.verify(email)

@app.route("/api/budget", methods=["get", "post"])
def budget():
    if request.method == "GET":
        return Response(budget__controller.get(), mimetype="application/json")
    elif request.method == "POST":
        return Response(budget__controller.post(), mimetype="application/json")

@app.route("/api/transaction", methods=["get","post"])
def transaction():
    if request.method == "GET":
        return Response(transaction__controller.get(), mimetype="application/json")
    elif request.method == "POST":
        return Response(transaction__controller.post(), mimetype="application/json")

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5000)