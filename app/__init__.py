from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from migrations.config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.blueprints.main.routes import main
app.register_blueprint(main)

