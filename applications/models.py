from .database import db

class Books(db.Model):
    __tablename__="Books"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True,nullable=False)
    Name=db.Column(db.String(150))
    Author=db.Column(db.String(150))
    Section=db.Column(db.String(150))
    Bimage=db.Column(db.String(150))
    content=db.Column(db.String(150))

class User(db.Model):
    __tablename__="User"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True,nullable=False)
    Name=db.Column(db.String(150),nullable=False)
    username=db.Column(db.String(150),nullable=False)
    password=db.Column(db.String(150),nullable=False)
    type=db.Column(db.Integer,nullable=False)

class userBook(db.Model):
    __tablename__= "userBook"

    id=db.Column(db.Integer,primary_key=True,autoincrement=True,nullable=False)
    Bookid=db.Column(db.Integer,nullable=False)
    status=db.Column(db.String(150),nullable=False)
    Day=db.Column(db.Integer)
    userid=db.Column(db.Integer,nullable=False)



class Section(db.Model):
    __tablename__= "Section"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True,nullable=False)
    Name=db.Column(db.String(150))
    bookscount=db.Column(db.Integer)
    Simage=db.Column(db.String(150))



