/*
  GET    - http://127.0.0.1:5000/reciepts
  GET    - http://127.0.0.1:5000/reciepts/0
  POST   - http://127.0.0.1:5000/reciepts
  PUT    - http://127.0.0.1:5000/reciepts/0
  DELETE - http://127.0.0.1:5000/reciepts/0
*/

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/reciepts");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML += "<td>" + object["title"] + "</td>";
          trHTML += "<td>" + object["description"] + "</td>";
          trHTML += '<td><a href="' + object["url"] + '"/></td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showRecieptEditBox(' + object["id"] + ')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="recieptDelete(' + object["id"] + ')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function showRecieptCreateBox() {
    Swal.fire({
      title: "Create Reciept",
      html:
        '<input id="id" type="hidden">' +
        '<input id="title" class="swal2-input" placeholder="title">' +
        '<input id="description" class="swal2-input" placeholder="description">' +
        '<input id="url" class="swal2-input" placeholder="url">',
      focusConfirm: false,
      preConfirm: () => {
        recieptCreate();
      },
    });
  }
  
  function recieptCreate() {
    const title       = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const url         = document.getElementById("url").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/reciepts");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        title: title,
        description: description,
        url: url,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }

  function showRecieptEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/reciepts/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        console.log(objects);
        //const reciept = objects["reciept"];
        //console.log(reciept);
        Swal.fire({
          title: "Edit Reciept",
          html:
            '<input id="id" type="hidden" value=' + objects["id"] + ">" +
            '<input id="title" class="swal2-input" placeholder="title" value="' + objects["title"] + '">' +
            '<input id="description" class="swal2-input" placeholder="description" value="' + objects["description"] + '">' +
            '<input id="url" class="swal2-input" placeholder="url" value="' + objects["url"] + '">',
          focusConfirm: false,
          preConfirm: () => {
            recieptEdit();
          },
        });
      }
    };
  }
  
  function recieptEdit() {
    const id          = document.getElementById("id").value;
    const title       = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const url         = document.getElementById("url").value;
    const xhttp       = new XMLHttpRequest();
    xhttp.open("PUT", "http://127.0.0.1:5000/reciepts/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
        title: title,
        description: description,
        url: url,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }

  function recieptDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://127.0.0.1:5000/reciepts/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }