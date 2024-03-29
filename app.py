from flask import Flask, render_template, request
from flask_socketio import SocketIO
import os

# setups and global variables
app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
