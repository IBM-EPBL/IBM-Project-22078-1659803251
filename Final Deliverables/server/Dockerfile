FROM python:buster

WORKDIR /app

COPY . .

RUN pip install flask setuptools ibm_db bcrypt requests sendgrid flask_cors

EXPOSE 5000

CMD ["python", "app.py"]