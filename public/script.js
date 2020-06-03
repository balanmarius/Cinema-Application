window.onload = function start() {
  this.sortMovies();
  this.disable();
}


///////////////movies.html/////////////////////

function sortMovies() {
  let a = document.getElementsByClassName("movies");
  var b = document.getElementsByClassName("sortingButton");

  for (let i = 0; i < a.length; ++i) {
    this.document
      .getElementById("sortingButtons")
      .addEventListener("click", function (event) {
        var c = event.target;
        if (c.id == b[0].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[1].id).style.display = "inline-block";
          document.getElementById(a[4].id).style.display = "inline-block";
          document.getElementById(a[8].id).style.display = "inline-block";
        }
        if (c.id == b[1].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[0].id).style.display = "inline-block";
          document.getElementById(a[1].id).style.display = "inline-block";
          document.getElementById(a[9].id).style.display = "inline-block";
          document.getElementById(a[5].id).style.display = "inline-block";
        }
        if (c.id == b[2].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[2].id).style.display = "inline-block";
          document.getElementById(a[11].id).style.display = "inline-block";
        }
        if (c.id == b[3].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[4].id).style.display = "inline-block";
          document.getElementById(a[9].id).style.display = "inline-block";
        }
        if (c.id == b[4].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[0].id).style.display = "inline-block";
          document.getElementById(a[3].id).style.display = "inline-block";
          document.getElementById(a[5].id).style.display = "inline-block";
          document.getElementById(a[7].id).style.display = "inline-block";
          document.getElementById(a[10].id).style.display = "inline-block";
        }
        if (c.id == b[5].id) {
          document.getElementById(a[i].id).style.display = "none";
          document.getElementById(a[3].id).style.display = "inline-block";
          document.getElementById(a[6].id).style.display = "inline-block";
        }
      });
    this.document
      .getElementById("b7")
      .addEventListener("click", function (event) {
        var d = event.target;
        if (d.id == "b7") {
          document.getElementById(a[i].id).style.display = "inline-block";
        }
      });
  }
};


////////////book.html////////////////


function rws(str) {
  return str.replace(/\s/g, "");
}

var checkboxes = document.getElementsByClassName("seats");

function disable() {
  for (let i = 0; i < checkboxes.length; ++i) {
    checkboxes[i].disabled = true;
  }

}

function takeData() {
  let text = document.getElementById("Username").value;
  if (rws(text) == "" || document.getElementById("NumSeats").value == "") {
    alert("Please complete mandatory fields!");
  }
  else {
    if (document.getElementById("NumSeats").value > checkboxes.length) {
      alert("Number of seats too big!");
    } else {
      alert("Now select you seats please!");
      for (let i = 0; i < checkboxes.length; ++i) {
        checkboxes[i].disabled = false;
      }
    }
  }
}

function movieName() {
  var mov = document.getElementsByClassName("movieTitles");
  console.log(mov[0].innerHTML);
}

var random;
function makeConfirmation() {
  let selected = [];
  let count = 0;
  for (let i = 0; i < checkboxes.length; ++i) {

    if (checkboxes[i].checked) {
      count++;
      selected.push(checkboxes[i].value);
    }

  }
  let nr = document.getElementById("NumSeats").value;
  if (count == nr) {
    for (let j = 0; j < selected.length; ++j) {
      for (let k = 0; k < checkboxes.length; ++k) {
        if (selected[j] == checkboxes[k].value) {
          let old = checkboxes[k].value;
          let another = document.createElement("div");
          checkboxes[k].replaceWith(another);
          another.className = "reserved";
          var seats = document.getElementById("seatsDisplay");
          seats.value += old + " ";
        }
      }

    }
    seats.value += "\n";
    let name = document.getElementById("nameDisplay");
    name.value += document.getElementById("Username").value + "\n";
    let num = document.getElementById("NumberDisplay");
    num.value += count + "\n";
    let movie = document.getElementById("movieDisplay");
    let selectedMovie = document.getElementById("selectMovie").value;
    movie.value += selectedMovie + "\n";

    document.getElementById("btnPrize").style.visibility = "visible";

  }
  else {
    alert("Please select number of seats correctly!");
  }
}


// function sendEmail() {

// }

