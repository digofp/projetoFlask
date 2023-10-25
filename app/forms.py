from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class RecipeForm(FlaskForm):
    title        = StringField('Title', validators=[DataRequired()])
    ingredients  = TextAreaField('Ingredients', validators=[DataRequired()])
    instructions = TextAreaField('Instructions', validators=[DataRequired()])
    url          = StringField('url', validators=[DataRequired()])
    idRecipeType = StringField('idRecipeType', validators=[DataRequired()])
    status       = StringField('status', validators=[DataRequired()])

    submit       = SubmitField('Save')
