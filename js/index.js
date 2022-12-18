var submitBtn = document.getElementById("submitBtn");
var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var validUrl = document.getElementById("validUrl");
var validName = document.getElementById("validName");
var regEx1;
var regEx;
var bookMarkContainer = [];
if (localStorage.getItem("bookmark") != null) {
  bookMarkContainer = JSON.parse(localStorage.getItem("bookmark"));
  displayData();
}
function getData() {
  if (validationSiteName() == true && validationSiteUrl() == true) {
    var bookMarks = {
      name: siteName.value,
      url: siteUrl.value,
    };
    console.log(bookMarks);
    bookMarkContainer.push(bookMarks);
    console.log(bookMarkContainer);
    localStorage.setItem("bookmark", JSON.stringify(bookMarkContainer));
    clearForm();
    displayData();
  }
}
submitBtn.addEventListener("click", getData);

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  validName.innerHTML = "";
  validUrl.innerHTML = "";
}

function displayData() {
  var container = "";
  for (var i = 0; i < bookMarkContainer.length; i++) {
    container += `<div class="col-md-4">
    <div class="card border-0 text-center position-relative">
    <img src="img/attachment.jpg" class="card-img-top">
    <div class="mark">
        <img src="img/image_processing20210614-32358-1qiljj (4).png" class="position-absolute top-0 start-0">
    </div>
    <div class="card-body">
      <h5 class="card-title">${bookMarkContainer[i].name}</h5>
      <button class="btn btn-primary"><a id='anchor' href="${bookMarkContainer[i].url}" target="_blank">Visit</a></button>
      <button class="btn btn-primary" onclick="deleteData(${i})"<a href="#">Delete</a></button>
    </div>
    </div></div>`;
  }
  document.getElementById("rowContainer").innerHTML = container;
}

function deleteData(index) {
  bookMarkContainer.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkContainer));
  displayData();
}
// function visitUrl() {
//   var anchor = document.getElementById('anchor');
//   anchor.setAttribute('target','_blank')
// }
function validationSiteName() {
  regEx1 = /^[A-Z][a-z]+$/;
  console.log(bookMarkContainer);
  if (siteName.value == "") {
    validName.innerHTML = "Enter site Name";
    return false;
  } else {
    if (regEx1.test(siteName.value) == true) {
      validName.innerHTML = "";
      return true;
    } else {
      validName.innerHTML =
        " invalid site Name [ starts with only one uppercase letter and other letters are lowercase without any spaces]";
      return false;
    }
  }
}

siteName.addEventListener("input", validationSiteName);
function validationSiteUrl() {
  regEx = /^(ftp:\/\/|http:\/\/|https:\/\/)(www\.)([a-z]+)\.([a-z]{2,})$/;

  console.log(bookMarkContainer);
  if (siteUrl.value == "") {
    validUrl.innerHTML = "Enter site url";
    return false;
  } else {
    if (regEx.test(siteUrl.value) == true) {
      validUrl.innerHTML = "";
      return true;
    } else {
      validUrl.innerHTML =
        " invalid site url make it as http://www.example.com";
      return false;
    }
  }

  // else if (siteUrl.value == "") {
  //   return false;
  // } else if (regEx1.test(siteName.value) == true) {
  //   if (regEx.test(siteUrl.value) == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } else {
  //   return false;
  // }
}
siteUrl.addEventListener("input", validationSiteUrl);
