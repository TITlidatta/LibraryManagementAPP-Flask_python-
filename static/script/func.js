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