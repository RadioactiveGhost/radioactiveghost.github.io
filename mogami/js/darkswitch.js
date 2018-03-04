var index = 0;
var imageList = ['img/cyber_red.png', 'img/cyber_blue.png'];


function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  index = index + 1;
  if (index == imageList.length) {
     index = 0;
  }
  var image1 = document.getElementById("myImage");
  image1.src = imageList[index];
}
