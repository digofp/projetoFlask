from app import db

class Recipe(db.Model):
    __tablename__ = "Recipe"
    
    idRecipe     = db.Column(db.Integer, primary_key=True)
    title        = db.Column(db.String(100), nullable=False)
    ingredients  = db.Column(db.String(1000))
    instructions = db.Column(db.String(4000))
    url          = db.Column(db.String(200))
    idRecipeType = db.Column(db.Integer)
    status       = db.Column(db.String(1), nullable=False)
