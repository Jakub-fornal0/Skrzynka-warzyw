document.addEventListener("DOMContentLoaded", function () {
  showSummary();
});

function showSummary() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  var el_basket = document.getElementById("count");
  if (basket === null) {
    el_basket.innerHTML = 0;
  } else {
    el_basket.innerHTML = basket.length;
  }
}
