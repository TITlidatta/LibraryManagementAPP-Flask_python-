alert("hiiii");

function headto(idx)
{
  window.location.href=  "http://127.0.0.1:5000/memDashboard/" + idx["idx"];
}
function moveto(idx)
{
  window.location.href=  "http://127.0.0.1:5000/memstat/" + idx["idx"];
}


function generateBookList(bookG,idx,hh) {
    var container = hh ;

    for (let i = 0; i < bookG.length; i++) {
        var book = bookG[i];

        var colDiv = document.createElement("div");
        colDiv.className = "col-md-2 mb-4";

        var cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.style = "height:50vh;width:13vw;";

        var img = document.createElement("img");
        img.className = "card-img-top";
        img.src = book["Bimage"]; 
        img.alt = "Book Cover";
        img.style = "height:28vh;";

        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body d-flex flex-column";

        var title = document.createElement("p");
        title.className = "card-title";
        title.textContent = book["Name"];
        title.style="margin-bottom:1px; font-size: 13px;";

        var author = document.createElement("p");
        author.className = "card-text";
        author.textContent = book["Author"]+book["id"];
        author.style="margin-bottom:1px; font-size: 13px;";

        var requestBtn = document.createElement("a");
        requestBtn.href = "#";
        requestBtn.className = "btn btn-sm btn-primary mt-auto";
        requestBtn.textContent = "Request";
        requestBtn.style="font-size: 12px; padding: 2px 2px;";
        requestBtn.setAttribute('data-book-id', book["id"]);

        requestBtn.addEventListener("click", function (event) {
            var bookId = event.target.getAttribute('data-book-id');
            sendRequestToServer(bookId, idx["idx"]);
        });
    

        cardBodyDiv.appendChild(title);
        cardBodyDiv.appendChild(author);
        cardBodyDiv.appendChild(requestBtn);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        colDiv.appendChild(cardDiv);

      
        container.appendChild(colDiv);
    }
}

function sendRequestToServer(x,y){
   var adding='http://127.0.0.1:5000/requesthandle';
  fetch( adding, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-access-token',
    },
    body: JSON.stringify({idb: x,idu:y}),
    redirect: 'manual'
  }).then(response => {
 
    if (response.ok) {
        console.log('Request sent successfully');
        return response.json();
    } else {
      console.log('Request sent not successfully');
    }
})
.then(data => {
  console.log(data);
  if (data && data.statusofit) {
   if(data.statusofit == "ok")
   {
    console.log("here1");
    alert('request sent successfully');
   }
  else{
    console.log("here1");
    alert('you cannot request more than 5 books');
  }
}})
.catch(error => {
    console.error('Error sending request:', error);
});
  
}


function dob()
{ event.preventDefault();
  document.getElementById("gridCheck").setAttribute("setdata","1");
}

  function func1()
  {
    event.preventDefault();
    ndata= new FormData(document.getElementById("loginform"));
    check=document.getElementById("gridCheck").getAttribute("setdata");
    ndata.append('check', check);
    ndata.append('val', '1');        
    var x=document.getElementById("inputPassword4").value;
    if(x.length > 9 || x.length < 2)
    {
      alert("incorrect password format");
    }
   else{
    fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer your-access-token', 
          },
          body: JSON.stringify(Object.fromEntries(ndata.entries())),
          redirect: 'follow'
        }).then(response => {
          if (response.ok) {
            return response.json(); 
          } else {
            console.error('Failed to log in');
          }
        })
        .then(data => {
            window.location.href = data.redirect_url; 
        })
        .catch(error => {
          console.error('Error during login:', error);
        });
      }
  }
  function func2()
  {
    event.preventDefault();
    ndata= new FormData(document.getElementById("loginform"));
    check=document.getElementById("gridCheck").getAttribute("setdata");;
    ndata.append('check', check);
    ndata.append('val', '2');        
    var x=document.getElementById("inputPassword4").value;
    if(x.length > 9 || x.length < 2)
    {
      alert("incorrect password format");
    }
    else{
    fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token', 
          },
          body: JSON.stringify(Object.fromEntries(ndata.entries())),
          redirect: 'follow'
        }).then(response => {
          if (response.ok) {
            return response.json(); 
          } else {
            console.error('Failed to log in');
          }
        })
        .then(data => {
            window.location.href = data.redirect_url; 
        })
        .catch(error => {
          console.error('Error during login:', error);
        });
      }
  }

  function sendrequest(){
    fetch('/requesthandlerlib', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-access-token',
      },
      redirect: 'manual'
    }).then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        console.error('Failed to log in');
        throw new Error('Failed to log in'); 
      }
    }).then(data => {
              window.location.href = data.redirect_url;
    }).catch(error => {
      console.error('Error during login:', error);
    });
  }


  function getValue(sectionx) {
    event.preventDefault();
      var searchInput = document.getElementById('search');
      var inputValue = searchInput.value;
      console.log('Input Value:', inputValue);
      var z = [];
      var containerElement = document.getElementById("changed");
      
      containerElement.innerHTML = '';

      for (var i = 0; i < sectionx.length; i++) {
          if (sectionx[i]["Name"] == inputValue ) {
              z.push(sectionx[i]); 
          }
      }

        for (var i = 0; i < z.length; i++) {
          var cardContainer = document.createElement("div");
          cardContainer.className = "col-md-3 mb-4";
  
          var cardElement = document.createElement("div");
          cardElement.className = "card";
  
          var imgElement = document.createElement("img");
          imgElement.src = z[i]['Simage'];
          imgElement.className = "card-img-top";
          imgElement.alt = "...";
          imgElement.style.height = "30vh";
  
          var cardBodyElement = document.createElement("div");
          cardBodyElement.className = "card-body";
  
          var titleElement = document.createElement("h5");
          titleElement.className = "card-title";
          titleElement.textContent = z[i]['Name'];
  
          var booksCountElement = document.createElement("p");
          booksCountElement.className = "card-text";
          booksCountElement.textContent = "No of books: " + z[i]['bookscount'];
  
          var addButtonElement = document.createElement("button");
          addButtonElement.className = "btn btn-primary";
          addButtonElement.textContent = "Add Books";
          addButtonElement.setAttribute("sec",z[i]['Name']);
          addButtonElement.addEventListener("click", function () {
            addbook(this);
        });

          var visitButtonElement = document.createElement("button");
          visitButtonElement.className = "btn btn-primary";
          visitButtonElement.style.marginLeft = "60px";
          visitButtonElement.textContent = "Visit";
          visitButtonElement.setAttribute("data-title", z[i]['Name'])
          visitButtonElement.addEventListener("click", function () {
            visit(this);
        });
  
          cardBodyElement.appendChild(titleElement);
          cardBodyElement.appendChild(booksCountElement);
          cardBodyElement.appendChild(addButtonElement);
          cardBodyElement.appendChild(visitButtonElement);
  
          cardElement.appendChild(imgElement);
          cardElement.appendChild(cardBodyElement);
  
          cardContainer.appendChild(cardElement);
  
          containerElement.appendChild(cardContainer);
      }
  }


  function visit(clickedElement)
  {
    var att = clickedElement.getAttribute('data-title');
    fetch('/sectionbook/' + att, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-access-token',
      },
      redirect: 'manual'
    }).then(response => {
      if (response.ok) {
        return response.json();  
      } else {
        console.error('Failed to log in');
        throw new Error('Failed to log in');  
      }
    }).then(data => {
              window.location.href = data.redirect_url;
    }).catch(error => {
      console.error('Error during login:', error);
    });
  }


  function addbook(tagg) {
              
    var divv = document.createElement("div");
    var sect = tagg.getAttribute("sec");
    divv.id="overlay";
    divv.style.display = "none";  
    document.body.appendChild(divv);
    var form = document.createElement("form");
    form.classList.add("row", "gy-2", "gx-3", "align-items-center");
    form.id ="formnow";

    
    var fields = [
      { id: "autoSizingInput1", placeholder: "Name" , name : "Name"},
      { id: "autoSizingInput2", placeholder: "Author", name: "Author" },
      { id: "autoSizingInput3", placeholder: "Book-Cover" , name: "Bimage"},
      { id: "autoSizingInput4", placeholder: "Content", name: "content" }
    ];
    
    fields.forEach(function (field) {
      var row = document.createElement("div");
      row.classList.add("row");
      row.style.paddingBottom = "10px";

      var col = document.createElement("div");
      col.classList.add("col-auto");

      var label = document.createElement("label");
      label.classList.add("visually-hidden");
      label.htmlFor = field.id;
      label.textContent = field.placeholder;

      var input = document.createElement("input");
      input.type = "text";
      input.classList.add("form-control");
      input.id = field.id;
      input.placeholder = field.placeholder;
      input.name = field.name;

      col.appendChild(label);
      col.appendChild(input);
      row.appendChild(col);
      form.appendChild(row);
    });

    
    var submitRow = document.createElement("div");
    submitRow.classList.add("row");
    submitRow.style.paddingLeft = "140px";

    var submitCol = document.createElement("div");
    submitCol.classList.add("col-auto");

    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn", "btn-primary", "btn-sm");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", function () {
      subc(1,sect);
  });

    submitCol.appendChild(submitButton);
    submitRow.appendChild(submitCol);
    form.appendChild(submitRow);
    divv.appendChild(form);
    var c =document.getElementById("overlay");
    c.style.display ="flex";

    
  }
  function addsection()
  {
    var divv = document.createElement("div");
    divv.id="overlay";
    divv.style.display = "none";  // Initial state is hidden
    document.body.appendChild(divv);
    var form = document.createElement("form");
    form.classList.add("row", "gy-2", "gx-3", "align-items-center");
    form.id ="formnow";

    
    var fields = [
      { id: "autoSizingInput1", placeholder: "Name" , name :"Name"},
      { id: "autoSizingInput2", placeholder: "image" ,name: "Simage"},
    ];

    
    fields.forEach(function (field) {
      var row = document.createElement("div");
      row.classList.add("row");
      row.style.paddingBottom = "10px";

      var col = document.createElement("div");
      col.classList.add("col-auto");

      var label = document.createElement("label");
      label.classList.add("visually-hidden");
      label.htmlFor = field.id;
      label.textContent = field.placeholder;

      var input = document.createElement("input");
      input.type = "text";
      input.classList.add("form-control");
      input.id = field.id;
      input.placeholder = field.placeholder;
      input.name = field.name;

      col.appendChild(label);
      col.appendChild(input);
      row.appendChild(col);
      form.appendChild(row);
    });

  
    var submitRow = document.createElement("div");
    submitRow.classList.add("row");
    submitRow.style.paddingLeft = "140px";

    var submitCol = document.createElement("div");
    submitCol.classList.add("col-auto");

    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn", "btn-primary", "btn-sm");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", function () {
      subbc(0,0)});
    submitCol.appendChild(submitButton);
    submitRow.appendChild(submitCol);
    form.appendChild(submitRow);
    divv.appendChild(form);
    var c =document.getElementById("overlay");
    c.style.display ="flex";
  }
  function subbc(x,y)
  {
    
    event.preventDefault();
    var ndata= new FormData(document.getElementById("formnow"));
  
    if (x == 1)
    {
        console.log(y);
        console.log(x);
        if(y == "MATH")
        {
          console.log("ok");
        }
        ndata.append("Section",y);
        console.log(ndata);
        var adding='http://127.0.0.1:5000/addbook' ;
        fetch( adding, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token',
          },
          body: JSON.stringify(Object.fromEntries(ndata.entries())),
          redirect: 'manual'
        }).then(response => {
        
          if (response.ok) {
              console.log('Request sent successfully');
              alert('book added successfully');

          } else {
              console.error('Failed to send request:', response.statusText);
          }
      })
      .catch(error => {
          console.error('Error sending request:', error);
      });
    }
    else
    {
      var adding='http://127.0.0.1:5000/addsect' ;
      fetch( adding, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-access-token',
        },
        body: JSON.stringify(Object.fromEntries(ndata.entries())),
        redirect: 'manual'
      }).then(response => {
        
        if (response.ok) {
            console.log('Request sent successfully');
            alert('section added successfully RELOAD TO SEE ALL NEW SECTIONS');

        } else {
            console.error('Failed to send request:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending request:', error);
    });
    }
    var formc= document.getElementById("overlay");
         formc.remove();
  }

  function edit(tagg)
  {
    var secc = tagg.getAttribute("sec");
          var divv = document.createElement("div");
          divv.id="overlay";
          divv.style.display = "none";
          document.body.appendChild(divv);
          var form = document.createElement("form");
          form.classList.add("row", "gy-2", "gx-3", "align-items-center");
          form.id ="formnow";
          var fields = [
            { id: "autoSizingInput1", placeholder: "Name" , name : "Name"},
            { id: "autoSizingInput2", placeholder: "Author", name: "Author" },
            { id: "autoSizingInput3", placeholder: "Book-Cover" , name: "Bimage"},
            { id: "autoSizingInput4", placeholder: "Content", name: "content" }
          ];

          fields.forEach(function (field) {
            var row = document.createElement("div");
            row.classList.add("row");
            row.style.paddingBottom = "10px";

            var col = document.createElement("div");
            col.classList.add("col-auto");

            var label = document.createElement("label");
            label.classList.add("visually-hidden");
            label.htmlFor = field.id;
            label.textContent = field.placeholder;

            var input = document.createElement("input");
            input.type = "text";
            input.classList.add("form-control");
            input.id = field.id;
            input.placeholder = field.placeholder;
            input.name = field.name;

            col.appendChild(label);
            col.appendChild(input);
            row.appendChild(col);
            form.appendChild(row);
          });

          var submitRow = document.createElement("div");
          submitRow.classList.add("row");
          submitRow.style.paddingLeft = "140px";

          var submitCol = document.createElement("div");
          submitCol.classList.add("col-auto");

          var submitButton = document.createElement("button");
          submitButton.type = "submit";
          submitButton.classList.add("btn", "btn-primary", "btn-sm");
          submitButton.textContent = "Submit";
          submitButton.addEventListener("click", function () {
            subc(secc);
        });

          submitCol.appendChild(submitButton);
          submitRow.appendChild(submitCol);
          form.appendChild(submitRow);
          divv.appendChild(form);
          var c =document.getElementById("overlay");
          c.style.display ="flex";
  }
  function subc(y)
        {
          event.preventDefault();
          ndata= new FormData(document.getElementById("formnow"));
          var sect= y;
          ndata.append("Bid",sect);
          var adding='http://127.0.0.1:5000/changebook' ;
          fetch( adding, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer your-access-token',
                },
                body: JSON.stringify(Object.fromEntries(ndata.entries())),
                redirect: 'manual'
              }).then(response => {
                if (response.ok) {
                    console.log('Request sent successfully');
                    alert('book modified successfully');
      
                } else {
                    console.error('Failed to send request:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error sending request:', error);
            });
              
          var formc= document.getElementById("overlay");
               formc.remove();
        }

        function revoke(r)
        {
            var x= r.getAttribute("bi");
              var y = r.getAttribute("ui");
            var av=y+x+'o';
              var adding='http://127.0.0.1:5000/revokehandle/' + x +'/'+ y ;
              fetch( adding, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer your-access-token',
                },
                redirect: 'manual'
              }).then(response => {
                
                if (response.ok) {
                    alert('revoked successfully');
                    document.getElementById(av).remove();
      
                } else {
                    console.error('Failed to send request:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error sending request:', error);
            });
          
          }

          function grnt(g)
          {
            var x= g.getAttribute("bi");
            var y = g.getAttribute("ui");
            var adding='http://127.0.0.1:5000/grantreject/' + x +'/'+ y+'/' + 1;
            fetch( adding, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-access-token',
              },
              redirect: 'manual'
            }).then(response => {
              // Handle the response from the server
              if (response.ok) {
                  console.log('Request sent successfully');
                  alert('granted successfully');
    
              } else {
                  console.error('Failed to send request:', response.statusText);
              }
          })
          .catch(error => {
              console.error('Error sending request:', error);
          });
          }

          function rejct(r)
          {
            var x= r.getAttribute("bi");
            var y = r.getAttribute("ui");
            var adding='http://127.0.0.1:5000/grantreject/' + x +'/'+ y+'/' + 0;
            fetch( adding, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-access-token',
              },
              redirect: 'manual'
            }).then(response => {
            
              if (response.ok) {
                  console.log('Request sent successfully');
                  alert('rejected successfully');
    
              } else {
                  console.error('Failed to send request:', response.statusText);
              }
          })
          .catch(error => {
              console.error('Error sending request:', error);
          });
          }

          function intro(){
            fetch('/memDashboard/1', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-access-token',
              },
              body: JSON.stringify({id: 1}),
              redirect: 'manual'
            }).then(response => {
              if (response.ok) {
                return response.json();  
              } else {
                console.error('Failed to log in');
                throw new Error('Failed to log in');  
              }
            }).then(data => {
                      window.location.href = data.redirect_url;
            }).catch(error => {
              console.error('Error during login:', error);
            });
            
      }


      function getVaalue(bookx) {
        event.preventDefault();
          var searchInput = document.getElementById('search');
          var inputValue = searchInput.value;
          console.log('Input Value:', inputValue);
  
          var z = [];
          var changeElement = document.getElementById("change");
          
          changeElement.innerHTML = '';
  
          for (var i = 0; i < bookx.length; i++) {
              if (bookx[i]["Name"] == inputValue || bookx[i]["Section"] == inputValue || bookx[i]["Author"] == inputValue) {
                  z.push(bookx[i]); // Use push instead of append
              }
          }
  
          for (var i = 0; i < z.length; i++) {
            
              var liElement = document.createElement("li");
              liElement.className = "list-group-item";
              liElement.style.width = "80vw";
              var lik = z[i]["content"];
              console.log("the link to it is" + lik);
              liElement.setAttribute("put1",z[i]["id"])
              var anchorElement = document.createElement("a");
              anchorElement.href = lik; // Set the href attribute
              var buttonElement = document.createElement("button");
              buttonElement.type = "button";
              buttonElement.className = "btn btn-secondary btn-sm";
              buttonElement.style.marginLeft = "auto";
              buttonElement.appendChild(anchorElement); 
              
              // Set inner HTML for li element
              liElement.innerHTML = z[i]["Name"] + '||' + z[i]["Author"] + '||' + z[i]["Section"] + lik+
                  buttonElement.outerHTML + 
                  '<button type="button" class="btn btn-secondary btn-sm" style="margin-left:5px;" onclick="bookreturn(this)"return</button>';
    
              changeElement.appendChild(liElement);
              
          }
      }



      function setxx(bookx)
      {
        var changeElement = document.getElementById("change");
              
        changeElement.innerHTML = '';
        for (var i = 0; i < bookx.length; i++) {
         
          var liElement = document.createElement("li");
          liElement.className = "list-group-item";
          liElement.style.width = "80vw";
          liElement.style.marginBottom ="5px";
          liElement.id =bookx[i]["id"]
          liElement.setAttribute("put1",bookx[i]["id"])
          liElement.innerHTML = bookx[i]["Name"] + '||' + bookx[i]["Author"] + '||' + bookx[i]["Section"] +
              '<button type="button" class="btn btn-secondary btn-sm" style="margin-left:auto;">' +
              '<a href ="' + bookx[i]["content"] + '">view</a></button>' +
              '<button type="button" class="btn btn-secondary btn-sm" style="margin-left:5px;" onclick ="bookreturn(this)">return</button>'
          changeElement.appendChild(liElement);
      }
      }
  


      function bookreturn(lix)
      {
        var x= lix.parentElement.getAttribute("put1");
        var y = idx["idx"];
        var adding='http://127.0.0.1:5000/returnhandle/' + x +'/'+ y;
        fetch( adding, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-access-token',
          },
          redirect: 'manual'
        }).then(response => {
       
          if (response.ok) {
              console.log('Request sent successfully');
              alert('Returned successfully');
              var myDiv = document.getElementById(x);
              if (myDiv) {
                  myDiv.remove();
              }

          } else {
              console.error('Failed to send request:', response.statusText);
          }
      })
      .catch(error => {
          console.error('Error sending request:', error);
      });
        
      }