# imports
from flask import Flask, render_template
from flask_socketio import SocketIO
# imports
from flask import Flask, render_template
from flask_socketio import SocketIO

# setups and global variables
# setups and global variables
app = Flask(__name__)
socketio = SocketIO(app)
socketio = SocketIO(app)

# app routes
@app.route('/')
def index():
    return render_template('index.html')
# app routes
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)