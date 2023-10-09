from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    parameter = "Texto"
    return render_template("index.html", parameter=parameter)

@app.route('/contato')
def contato():
    data = {"profissao": "Analista", "nome": "Rodrigo"}
    return render_template("contato.html", data=data)

@app.route('/ajuda')
def ajuda():
    return render_template("ajuda.html")