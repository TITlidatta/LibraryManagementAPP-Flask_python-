from flask import Flask, request,render_template,redirect,url_for,render_template_string
from flask import jsonify
from flask import current_app as app
from .models import Books,User,userBook,Section
from .database import db
from sqlalchemy import or_ 
import matplotlib.pyplot as plt

def setup_routes(app):
    @app.route('/login',methods=["POST","GET"])
    def login():
        if request.method =='GET':
            #print("ok")
            return render_template('login.html')
        elif request.method =='POST':
            showx= request.get_json()
            if showx['val'] == '1':
                if showx['check'] == '0':
                    x=User.query.all()
                    filtered_users = User.query.filter(User.password == showx['Password']).first()
                    return jsonify({'redirect_url': url_for("memDashboard", id=filtered_users.id)})
                else:
                    return jsonify({'redirect_url': url_for("libDashboard")})
                    
            else:
                new_user = User(username= showx['Username'], password = showx['Password'], Name = showx['Name'], type = 1)
                db.session.add(new_user)
                db.session.commit()
                filtered_users = User.query.filter(User.password == showx['Password']).first()
                return jsonify({'redirect_url': url_for("memDashboard", id=filtered_users.id)})
    
    @app.route('/memDashboard/<int:id>',methods=["POST","GET"])
    def memDashboard(id):
        if request.method == 'GET':
            L=[]
            #print("I am here")
            bk=userBook.query.filter(userBook.userid == id ,userBook.status=="granted")
            for i in bk:
                L.append(i.Bookid)
            bookx = Books.query.filter(Books.id.in_(L)).all()
            bookx_data_list = [
               {
                'id': book.id,
                'Name': book.Name,
                'Author': book.Author,
                'Section': book.Section,
                'content': book.content,
            }
            for book in bookx
            ]
            idv={"idx": id}
            print(bookx_data_list)
            try:
                return render_template('memDashboard.html',bookx_data_list=bookx_data_list,idx=idv)
            except Exception as e:
                print(f"Exception: {e}")
                print("Error here")
        elif request.method =='POST':
          idv = request.get_json()
          user_to_delete = User.query.filter(User.id == 1).first()
          if user_to_delete:
              db.session.delete(user_to_delete)
              db.session.commit()
              user_books_to_delete = userBook.query.filter(userBook.userid == idv['id']).all()
              if user_books_to_delete:
                for user_book in user_books_to_delete:
                    db.session.delete(user_book)
              db.session.commit()
              return jsonify({'redirect_url': url_for("login")})
          else:
              print("User not found")
              return jsonify({'error': 'User not found'})
          
    @app.route('/generalbooks/<int:id>',methods=["POST","GET"])
    def generalbooks(id):
        if request.method == 'GET':
            bookGg=Books.query.all()
           
            H = [
               {
                'id': book.id,
                'Name': book.Name,
                'Author': book.Author,
                'Section': book.Section,
                'content': book.content,
                'Bimage': book.Bimage
            }
            for book in bookGg
            ]
            idv={"idx": id}
            return render_template("generalbooks.html",bookG=H,idx=idv)
    @app.route('/requesthandle',methods=['POST'])
    def requesthandle():
        if request.method == 'POST':
            myobj= request.get_json()
            new_user = userBook(Bookid= myobj["idb"],userid=myobj["idu"], status='requested')
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'statusofit': 'ok'})

    @app.route('/libDashboard',methods=["POST","GET"])
    def libDashboard():
        if request.method == 'GET':
            print("here librarian")
            L= Section.query.all()
            H = [
               {
                'id': i.id,
                'Name': i.Name,
                'bookscount': i.bookscount,
                'Simage': i.Simage
            }
            for i in L
            ]
        
            return render_template('libDashboard.html',sectionn =H)
        
    @app.route('/requesthandlerlib',methods=["POST"])
    def requesthandlerlib():
        if request.method == 'POST':
            return jsonify({'redirect_url': url_for("requests")})
    
    @app.route('/requests',methods=["GET","POST"])
    def requests():
        if request.method == 'GET':
            items = userBook.query.filter(userBook.status =="requested").all()
            D=[]
            for i in items:
                bookdet = Books.query.filter(Books.id == i.Bookid).first()
                H={}
                H['Name'] = bookdet.Name
                H['Author'] = bookdet.Author
                H['bookid']=bookdet.id
                H['user'] = i.userid
                D.append(H)
        
            return render_template("requests.html", bbk=D)
        
    @app.route('/sectionbook/<string:x>',methods=["GET","POST"])
    def sectionbook(x):
        if request.method == 'GET':
            bookS= Books.query.filter(Books.Section == x).all()
            H = [
               {
                'id': book.id,
                'Name': book.Name,
                'Author': book.Author,
                'Section': book.Section,
                'content': book.content,
                'Bimage': book.Bimage
            }
            for book in bookS
            ]
            return render_template("SectionBooks.html",BB=H)
        elif request.method == 'POST':
            return jsonify({'redirect_url': url_for("sectionbook",x=x)})
    @app.route('/returnhandle/<int:x>/<int:y>',methods=["POST"])
    def returnhandle(x,y):
        rowx=userBook.query.filter(userBook.Bookid==x , userBook.userid ==y).first()
        db.session.delete(rowx)
        db.session.commit()
        return jsonify({'statusofit': 'ok'})
    
    @app.route('/grantreject/<int:x>/<int:y>/<int:z>',methods=["POST"])
    def grantreject(x,y,z):
        if z == 1:
            user = userBook.query.filter(userBook.Bookid == x , userBook.userid == y).first()
            user.status = 'granted'
            db.session.commit()
            return jsonify({'statusofit': 'ok'})
        else:
            user = userBook.query.filter(userBook.Bookid == x , userBook.userid == y).first()
            user.status = 'requested'
            db.session.commit()
            return jsonify({'statusofit': 'ok'})
        
    @app.route('/addbook',methods=["POST"])
    def addbook():
        showx= request.get_json()
        newv = Books(Name= showx["Name"],Author=showx["Author"], Bimage= showx["Bimage"], Section=showx["Section"], content=showx["content"])
        db.session.add(newv)
        rowname= Section.query.filter_by(Name=showx["Section"]).first()
        rowname.bookscount=rowname.bookscount + 1
        db.session.commit()
        return jsonify({'statusofit': 'ok'})

    @app.route('/addsect',methods=["POST"])
    def addsect():
        showx= request.get_json()
        newb = Section(Name= showx["Name"],bookscount=0, Simage=showx["Simage"])
        db.session.add(newb)
        db.session.commit()
        return jsonify({'statusofit': 'ok'})
    
    @app.route('/memstat/<int:id>', methods=["GET"])
    def memstat(id):
        import matplotlib
        matplotlib.use('Agg')
        Booklist=userBook.query.filter(userBook.userid == id).all()
        Bid=[]
        for book in Booklist:
            if book.status == 'granted':
                Bid.append(book.Bookid)
        Booklistx=Books.query.filter(or_(Books.id.in_(Bid))).all()
        G={'ok'}
        Gen={} #dict of genres with count of each
        for i in Booklistx:
            G.add(i.Section)
        G.remove('ok')
        for  i in G:
            Gen[i]=0
        for i in Booklistx:
            Gen[i.Section]=Gen[i.Section]+1
        last_row_id = Section.query.order_by(Section.id.desc()).first().id
        genno=len(G)
        percentg= (genno/last_row_id)*100
        comppercentg=100-percentg
        labelsg = ['Genres visited', 'Genres not visited']
        sizesg = [percentg,comppercentg ]
        plt.figure()
        plt.pie(sizesg, labels=labelsg, autopct='%1.1f%%', startangle=90, colors=['lightblue', 'lightcoral'])
        plt.savefig("C:/Users/suneh/library/static/mempi1.png")
        plt.close()
        lastid = Books.query.order_by(Books.id.desc()).first().id
        bokno=len(Bid)
        percentb=(bokno/lastid)*100
        comppercentb=100-percentb
        labelsb = ['Books Read', 'Books Not Read']
        sizesb = [percentb,comppercentb ]
        plt.figure()
        plt.pie(sizesb, labels=labelsb, autopct='%1.1f%%', startangle=90, colors=['lightblue', 'lightcoral'])
        plt.savefig("C:/Users/suneh/library/static/mempi2.png")
        plt.close()
        elements = list(Gen.keys())
        counts = list(Gen.values())
        plt.figure()
        plt.bar(elements, counts)
        plt.xlabel('count')
        plt.ylabel('Genres')
        plt.savefig("C:/Users/suneh/library/static/membar1.png")
        plt.close()
        return render_template("userstatistics.html")
    
    @app.route('/libstat',methods=["GET"])
    def libstat():
        import matplotlib
        matplotlib.use('Agg')
        netuserbook = userBook.query.all()
        netuser=User.query.count() - 1
        xr=0
        xg=0
        elements=[]
        count=[]
        for j in netuserbook:
            if j.status == 'granted':
                xg=xg+1
            else:
                xr=xr+1
        genrec=Section.query.all()
        for item in genrec:
            elements.append(item.Name)
            count.append(item.bookscount)
        plt.barh(elements, count)
        plt.xlabel('No of books')
        plt.ylabel('Genres')
        plt.savefig("C:/Users/suneh/library/static/libbar1.png")
        return render_template("libstatistics.html",netuser=netuser,xg=xg,xr=xr)
        
         

         
