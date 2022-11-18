import ibm_db

db = ibm_db.connect("DATABASE=bludb;QUERYTIMEOUT=1;CONNECTTIMEOUT=10;HOSTNAME=55fbc997-9266-4331-afd3-888b05e734c0.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;PORT=31198;SECURITY=SSL;SSLServerCertificate=./certificates/DigiCertGlobalRootCA.crt;PROTOCOL=TCPIP;UID=gpf02299;PWD=yLEwXmSNoNCAhWGp", "", "")