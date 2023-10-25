from flask import Blueprint, render_template, redirect, url_for
from app import db
from app.forms import RecipeForm
from app.models import Recipe

main = Blueprint('main', __name__)

@main.route('/')
def index():
    recipes = Recipe.query.all()
    return render_template('read.html', recipes=recipes)

@main.route('/create', methods=['GET', 'POST'])
def create():
    form = RecipeForm()
    if form.validate_on_submit():
        recipe = Recipe(title=form.title.data, ingredients=form.ingredients.data, instructions=form.instructions.data)
        db.session.add(recipe)
        db.session.commit()
        return redirect(url_for('main.index'))
    return render_template('create.html', form=form)
