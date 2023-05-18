# from flask import Flask, request, make_response, json

# app = Flask(__name__)

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

# @app.route('/login', methods=['POST'])
# def login_post():

#     print(request.json['email'])
#     print(request.json['password'])
#     data1 = dict()
#     data1['login'] = "successful"
#     response = app.response_class(
#         response=json.dumps(data1),
#         status=200,
#         mimetype='application/json'
        
#     )
#     return response

import json
from flask import request, jsonify
import hashlib
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import requests
from model import *



# db.init_app(app)

GOOGLE_CLIENT_ID = '190435149829-f517bqh6olk02lqr0c0idoc73s3cms4a.apps.googleusercontent.com'


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

# Create the event model in mongodb
# Event(title="Event 1", location="Location 1", description="Description 1", datetime="2021-05-01 10:00:00", entry_fees=100, created_by="user1").save()


@app.route('/')
def hello_world():
	return 'Hello, World!'

@app.route('/register', methods=['POST'])
def register():
    new_user = request.get_json() # store the json body request
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest() # encrpt password
    # Checking if user already exists
    if User.objects(username=new_user['username']).first():
        return jsonify({'msg': 'User Exists'}), 200
    # Creating user
    User(username=new_user['username'], email=new_user['email'], password=new_user['password']).save()
    return jsonify({'msg': 'User Created'}), 200

@app.route('/login', methods=['POST'])
def login():
    # Getting the login Details from payload
    login_data = request.get_json() # store the json body request
    # Checking if user exists in database or not
    user = User.objects(email=login_data['email']).first()
    if user:
        # Checking if password is correct
        encrypted_password = hashlib.sha256(login_data['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user['password']:
            # Create JWT Access Token
            access_token = create_access_token(identity=user['email'])
            # Return Token
            return jsonify({"msg": "Login successful" ,"access_token": access_token, "email": login_data['email']}), 200
    return jsonify({'msg': 'The email or password is incorrect'}), 200

@app.route('/google_login', methods=['POST'])
def google_login():
    # Get the google jwt token
    google_token = request.get_json()['google_token']
    print(google_token)
    # Verify the token
    try:
        # Verify the google token
        # request_session = requests.session()
        # cached_session = cachecontrol.CacheControl(request_session)
        # token_request = google.auth.transport.requests.Request(session=cached_session)
        # id_info = id_token.verify_oauth2_token(google_token, token_request, GOOGLE_CLIENT_ID)
        # print(id_info)
        # # If token is valid
        # if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        #     raise ValueError('Wrong issuer.')
        # Get the user email
        url = f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={google_token}"
        response = requests.get(url)
        user_info = json.loads(response.text)
        print(user_info)
        email = user_info['email']
        # Check if user exists in database
        user = User.objects(email=email).first()
        # If user does not exists
        if not user:
            # Create user
            User(email=email).save()
        # Create JWT Access Token
        access_token = create_access_token(identity=email)
        # Return Token
        return jsonify({"msg": "Login successful" ,"access_token": access_token, "email": email}), 200
    except Exception as e:
        print(e)
        return jsonify({'msg': 'Invalid login'}), 200

@app.route('/create_event', methods=['POST'])
@jwt_required()
def createEvent():
    user = get_jwt_identity()
    User.objects(username=user).first()
    # Create event
    event = request.get_json()
    try:
        Event(title=event['title'], location=event['location'], description=event['description'], entry_fees=event['entry_fees'],date=event['date'], time=event['time'], image=event['image'], created_by=user).save()
    except:
        return jsonify({'msg': 'Event already exists'}), 401
    return jsonify({'msg': 'Event created successfully'}), 200

@app.route('/delete_event', methods=['POST'])
@jwt_required()
def deleteEvent():
    user = get_jwt_identity()
    User.objects(username=user).first()
    # Delete event
    event = request.get_json()
    result = Event.objects(title=event['title'], created_by=user).delete()
    if not result:
        return jsonify({'msg': 'Event not found'}), 404
    return jsonify({'msg': 'Event deleted successfully'}), 200

@app.route('/get_event', methods=['GET'])
def getEvent():
    # Return all the events and remove the id field
    events = Event.objects().exclude('id')
    return jsonify(events), 200

@app.route('/get_event_user', methods=['GET'])
@jwt_required()
def getEventJWT():
    user = get_jwt_identity()
    User.objects(username=user).first()
    # Return all the events
    events = Event.objects(created_by=user).exclude('id')
    return jsonify(events), 200

@app.route('/interested', methods=['POST'])
@jwt_required()
def interested():
    try:
        user = get_jwt_identity()
        User.objects(username=user).first()
        # Return all the events
        event = request.get_json()
        Event.objects(title=event['title']).update_one(push__interested=event['email'])
        return jsonify({'msg': 'Interested updated successfully'}), 200
    except:
        return jsonify({'msg': 'Event not found'}), 404
