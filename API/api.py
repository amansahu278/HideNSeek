from flask import Flask, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

import sys, os
sys.path.insert(0, '..')
from steganography.steganography import ImageSteg

app = Flask(__name__)
CORS(app)

app.config['IMAGES'] = "/Users/amansahu/code/HideNSeek/API"
app.config['ALLOWED_IMAGE_EXTENSIONS'] = ['PNG', 'JPG', 'JPEG']
app.config['OUTPUTFILENAME'] = "output.png"

def delete_file(path):
    if os.path.exists(path):
        os.remove(path)

def allowed_image(filename):
    
    if '.' not in filename:
        return False
    
    ext = filename.rsplit('.', 1)[1]

    if ext.upper() in app.config['ALLOWED_IMAGE_EXTENSIONS']:
        return True
    else: 
        return False

@app.before_request
def hook():
    delete_file(os.path.join(app.config['IMAGES'], app.config['OUTPUTFILENAME']))

@app.route('/embed', methods=['POST'])
def process_form():

    form_data = request.form

    filedata = request.files["file"]
    filename = secure_filename(filedata.filename)
    if filename == "" or not allowed_image(filename):
        return "Wrong filename or extension"

    PT = form_data['plain-text']
    password = form_data['password']
    filedata.save(filename)
    fp = filedata.read()
    
    try:
        steg = ImageSteg(filename, fp, app.config['OUTPUTFILENAME'])
        steg.encryptImage(password, PT)
        response = send_from_directory(app.config['IMAGES'],  app.config['OUTPUTFILENAME'], as_attachment=True)
    except:
        return "Error"
    delete_file(os.path.join(app.config['IMAGES'], filename))
    return response

@app.route('/retrieve', methods=['POST'])
def retrieve():
    form_data = request.form
    filedata = request.files["file"]
    filename = filedata.filename
    password = form_data['password']
    filedata.save(filename)
    fp = filedata.read()
    
    try:
        steg = ImageSteg(filename, fp=fp)
        PT = steg.decryptImage(password)
    except:
        return "Error!"

    delete_file(os.path.join(app.config['IMAGES'], filename))
    return f"Plain text: {PT}"

if __name__ == '__main__':
    app.run(debug=True)