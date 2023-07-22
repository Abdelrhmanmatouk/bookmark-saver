let SiteName = document.getElementById("bookmarkName");
let SiteUrl = document.getElementById("bookmarkURL");
let bookmarkName = document.getElementById("bookmarkName");
let bookmarkContaineer = [];
if (localStorage.getItem("bookmarks") != null) {
  // bs2l el system aza kan el user dh 2dem wla gded
  bookmarkContaineer = JSON.parse(localStorage.getItem("bookmarks")); // low adem hytl3 el data mn local
  displaybookmark(bookmarkContaineer);
}
function addbookmark() {
  
    if (validateURL() == true && validateBookmarkName()==true && repeatedBookmarkName() ==false) {
      let bookmark = {
        name: SiteName.value,
        url: SiteUrl.value,
      };
      bookmarkContaineer.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkContaineer)); //hena b3ml save l2y input el user byd5lo
      displaybookmark(bookmarkContaineer); //b3ml invoke le function
      clearform();
    } 
    else {
      swal("Site Name or Url is not valid, Please follow the rules below :", `Site name must contain at least 3 characters 
      Site URL must be a valid one` , "warning");
      clearform();
    }
  
  
}
function displaybookmark(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<tr>
                <td>${i + 1}</td>
                <td>${arr[i].name}</td>
                <td><button  class="link-button btn btn-outline-warning btn-sm"> <a class="text-decoration-none "  href="${
                  bookmarkContaineer[i].url
                }" target="_blank"> Visit </a></button></td>
                <td><button onclick="deletebookmark(${i})" class="btn btn-outline-danger  btn-sm  "> delete</button></td>
            </tr>
        `;
  }
  document.getElementById("tablebody").innerHTML = cartona;
}
function clearform() {
  SiteName.value = "";
  SiteUrl.value = "";
}
function deletebookmark(bookmarkindex) {
  bookmarkContaineer.splice(bookmarkindex, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkContaineer)); //عشان امسحها من اللوكال استوريدج
  displaybookmark(bookmarkContaineer); // keda ana 3rdt el local storage el gdeda
}
function validateURL() {
  let regex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regex.test(SiteUrl.value) == true;
}
function validateBookmarkName() {
  let regex = /.{3}/
  return regex.test(SiteName.value) == true
}
function repeatedBookmarkName() {
 
  for (let i = 0; i < bookmarkContaineer.length; i++) {
    if (bookmarkContaineer[i].name == bookmarkName.value) {
      return true
    }
    
  }
  //لو لقا الاسم موجود المفروض يطلع ترو ............لو ملقاش الاسم المفروض يطلع فالص
  return false
}
