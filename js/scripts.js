document.addEventListener("DOMContentLoaded", function () {
  showSummary();
});

function removeItem(i) {
  var basket = JSON.parse(localStorage.getItem("basket"));
  if (confirm("Usunąć przedmiot?")) basket.splice(i, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  if (basket.length === 0) localStorage.removeItem("basket");
  showSummary();
}

function showShippingForm() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  var total = 0;
  basket.forEach((element) => {
    total += element.total_price;
  });
  var el = document.getElementById("shipping_form");
  var str = "<div class='summary_head'><h1>Dane do wysyłki:</div>";
  str += "<form  onsubmit='return addShippingInformation()'>";
  str += "<div class='form-floating mb-3'>";
  str += "<input class='form-control' id='name' type='text' />";
  str += "<label for='name'>Imię i nazwisko</label>";
  str += " <p id='name_error' style='color:red'></p></div>";

  str += "<div class='form-floating mb-3'>";
  str += "<input class='form-control' id='street' type='text' />";
  str += "<label for='street'>Ulica</label>";
  str += " <p id='street_error' style='color:red'></p></div>";

  str += "<div class='form-floating mb-3'>";
  str += "<input class='form-control' id='city' type='text' />";
  str += "<label for='city'>Miasto</label>";
  str += " <p id='city_error' style='color:red'></p></div>";

  str += "<div class='form-floating mb-3'>";
  str += "<input class='form-control' id='city_code' type='text' />";
  str += "<label for='city_code'>Kod pocztowy</label>";
  str += " <p id='city_code_error' style='color:red'></p></div>";

  str += "<div class='form-floating mb-3'>";
  str += "<input class='form-control' id='tel' type='text' />";
  str += "<label for='tel'>Numer telefonu</label>";
  str += " <p id='tel_error' style='color:red'></p></div>";

  str += "<div class = 'final_summary'><h3>Podsumowanie:</h3>";
  str +=
    "<p>Koszt całkowity: <span class='space_summary'>" +
    total +
    "</span> zł</p>";
  str += "<p id='insert_name'></p>";
  str += "<p id='insert_street'></p>";
  str += "<p id='insert_city'></p>";
  str += "<p id='insert_city_code'></p>";
  str += "<p id='insert_tel'></p>";

  var input_name = document.getElementById("name");
  var input_street = document.getElementById("street");
  var input_city = document.getElementById("city");
  var input_city_code = document.getElementById("city_code");
  var input_tel = document.getElementById("tel");

  var insert_name = document.getElementById("insert_name");
  var insert_street = document.getElementById("insert_street");
  var insert_city = document.getElementById("insert_city");
  var insert_city_code = document.getElementById("insert_city_code");
  var insert_tel = document.getElementById("insert_tel");

  if (input_name) {
    input_name.addEventListener("input", function (e) {
      insert_name.textContent = e.target.value;
    });
  }

  str += "</div>";
  str += "</form>";

  el.innerHTML = str;
}

function showSummary() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  var el = document.getElementById("basket_summary");
  var el_basket = document.getElementById("count");
  var shipping = document.getElementById("shipping_form");
  if (basket === null) {
    el.innerHTML = "<p>Twój koszyk jest pusty.</p>";
    el_basket.innerHTML = 0;
    shipping.innerHTML = "";
  } else {
    var str = "<table class ='basket_summary_inside'>";
    str +=
      "<tr><td></td><td><b>Lp.</b></td><td><b>Nazwa:</b></td><td><b>Cena:</b></td><td><b>Ilość:</b></td><td><b>Razem:</b></td></tr>";
    for (i = 0; i < basket.length; i++) {
      str +=
        "<tr><td><button class='delete_item' onclick='removeItem(" +
        i +
        ")'>X</button> " +
        "</td><td>" +
        (i + 1) +
        "</td><td>" +
        basket[i].name +
        "</td><td>" +
        basket[i].price +
        " zł</td><td>" +
        basket[i].quantity +
        "</td><td>" +
        basket[i].total_price +
        " zł</td></tr>";
    }
    str += "</table>";
    el.innerHTML = str;
    el_basket.innerHTML = basket.length;
    showShippingForm();
  }
}

function addProduct(number) {
  var basket = JSON.parse(localStorage.getItem("basket"));
  if (basket === null) basket = [];

  var item = {};
  var arr_name = [
    "Zielony koszyk",
    "Żółty koszyk",
    "Czerwony koszyk",
    "Zdrowy koszyk",
    "Pomidor",
    "Ogórek",
    "Sałata",
    "Ziemniaki",
    "Rzodkiewka",
  ];
  var arr_id = [
    "green_basket",
    "yellow_basket",
    "red_basket",
    "healthy_basket",
    "tomato",
    "cucumber",
    "lettuce",
    "potato",
    "radish",
  ];
  var arr_price = [50, 55, 40, 70, 5, 3, 6, 2, 1];

  var quantity = document.getElementById(arr_id[number - 1]).value;
  if (quantity < 1) {
    alert("Za mała ilość.");
    return false;
  } else {
    item.name = arr_name[number - 1];
    item.quantity = quantity;
    item.price = arr_price[number - 1];
    item.total_price = quantity * arr_price[number - 1];
    alert("Dodano produkt do koszyka");
  }

  basket.push(item);
  localStorage.setItem("basket", JSON.stringify(basket));
  showSummary();
}
