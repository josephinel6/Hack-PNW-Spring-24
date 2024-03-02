from flask import Flask, render_template, request
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'folderUpload' not in request.files:
        return 'No file part'
    
    files = request.files.getlist('folderUpload')
    for file in files:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    return 'Files uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
