#!/usr/bin/env python
# -*- coding:utf-8 -*-

from flask import Flask, render_template, session, request, jsonify
from flask_socketio import SocketIO, emit, disconnect

app = Flask(__name__)
socketio = SocketIO(app)

##### flask #####

@app.route('/')
def index():
    return render_template('index.html')

##### socketio #####

@socketio.on('connect')
def connect():
    print('<welcome>', request.sid)

@socketio.on('echo', namespace='/test')
def echo(msg):
    print('<echo>', "Got '%s' from %s" % (msg, request.sid))
    emit('echo', msg)

@socketio.on('disconnect')
def disconnect():
    print('<bye>', request.sid)

##### run main #####

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
