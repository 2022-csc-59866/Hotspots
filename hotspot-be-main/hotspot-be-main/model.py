from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
import datetime
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app) # initialize JWTManager
app.config['JWT_SECRET_KEY'] = 'adcd732a9de3414bd60f9d28f46f20df'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1) # define the life span of the token
# client = MongoClient("mongodb://localhost:27017")
# db = client["hotspot"]
# userCollection = db["user"]
app.config['MONGODB_SETTINGS'] = {
    'db': 'hotspot',
    'host': 'localhost',
    'port': 27017
}
db= MongoEngine(app)
CORS(app)


class User(db.Document):
    username = db.StringField(unique=True)
    email = db.StringField(unique=True)
    password = db.StringField()

# Create a mongodb model Event with following 7 fields
# Title: string and unique
# Location: string
# Description: string
# Date: Date
# Time: Time
# Entry fees: number
# Created by: string
class Event(db.Document): 
    title = db.StringField(unique=True)
    location = db.StringField()
    description = db.StringField()
    date = db.StringField()
    time = db.StringField()
    image = db.StringField()
    entry_fees = db.IntField()
    created_by = db.StringField()
    interested = db.ListField(db.StringField(), default=[])