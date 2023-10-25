from flask import Blueprint, render_template

bp_recips = Blueprint("Recipe", __name__, template_folder="templates")

@bp_recips.route('/create')
def create():
    return render_template('recipe_create.html')