function toggleRegulamento() {
  var reg = document.getElementById("regulamento");
  var currentClass = reg.className;
  reg.className = currentClass == "open" ? "close" : "open";
}
