from flask import Flask, request, render_template

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route('/login', methods=("POST", "GET"))
def login():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form['email']
    return f'Name: {name}<br/>Register mobile num: {phone}<br/>Email: {email}'


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
