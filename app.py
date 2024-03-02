from flask import Flask, send_from_directory

app = Flask(__name__)

# Define the folder containing images
IMAGE_FOLDER = 'images'

# Route to serve images
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
