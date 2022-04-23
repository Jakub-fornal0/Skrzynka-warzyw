document.addEventListener("DOMContentLoaded", function () {
  fetch("json/products.json")
    .then((res) => res.json())
    .then((data) => {
      var myProducts = {};
      myProducts = data;
      var products = document.getElementById("products");
      row = document.createElement("div");
      row.classList.add("row");
      products.appendChild(row);
      for (i = 0; i < myProducts.length; i++) {
        maindiv = document.createElement("div");
        maindiv.classList.add("col-lg-4");
        maindiv.classList.add("col-md-6");
        maindiv.classList.add("col-sm-6");
        row.appendChild(maindiv);

        product = document.createElement("div");
        product.classList.add("product");
        maindiv.appendChild(product);

        product_image = document.createElement("div");
        product_image.classList.add("product_image");
        product.appendChild(product_image);

        img = document.createElement("img");
        img.src = myProducts[i].img;
        img.classList.add("img");
        img.classList.add("img-fluid");
        product_image.appendChild(img);

        product_description = document.createElement("div");
        product_description.classList.add("product_description");
        product.appendChild(product_description);

        h1 = document.createElement("h1");
        h1.innerHTML = myProducts[i].name;
        product.appendChild(h1);

        p = document.createElement("p");
        p.innerHTML = myProducts[i].description;
        product.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = "<b>Cena: </b>" + myProducts[i].price + "zł";
        product.appendChild(p);

        product_buttons = document.createElement("div");
        product_buttons.classList.add("product_buttons");
        product_buttons.classList.add("row");
        product.appendChild(product_buttons);

        quantity = document.createElement("div");
        quantity.classList.add("quantity");
        quantity.classList.add("col-lg-6");
        product_buttons.appendChild(quantity);

        input = document.createElement("input");
        input.classList.add("product_quantity");
        input.classList.add("form-control");
        input.id = myProducts[i].name;
        input.type = "number";
        input.min = "1";
        input.placeholder = "Ilość";
        quantity.appendChild(input);

        product_button = document.createElement("div");
        product_button.classList.add("product_button");
        product_button.classList.add("col-lg-6");
        product_buttons.appendChild(product_button);

        button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Dodaj";
        button.setAttribute("onclick", "addProduct(" + (i + 1) + ")");
        product_button.appendChild(button);
      }
    });
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

  document.getElementById("space_summary").innerHTML = total;

  var input_name = document.getElementById("name");
  var input_street = document.getElementById("street");
  var input_city = document.getElementById("city");
  var input_city_code = document.getElementById("city_code");
  var input_tel = document.getElementById("tel");
  var input_email = document.getElementById("email");

  var insert_name = document.getElementById("insert_name");
  var insert_street = document.getElementById("insert_street");
  var insert_city = document.getElementById("insert_city");
  var insert_city_code = document.getElementById("insert_city_code");
  var insert_tel = document.getElementById("insert_tel");
  var insert_email = document.getElementById("insert_email");

  input_name.addEventListener("input", function (e) {
    insert_name.innerHTML = e.target.value;
  });

  input_street.addEventListener("input", function (e) {
    insert_street.innerHTML = e.target.value;
  });

  input_city.addEventListener("input", function (e) {
    insert_city.innerHTML = e.target.value;
  });

  input_city_code.addEventListener("input", function (e) {
    insert_city_code.innerHTML = e.target.value;
  });

  input_tel.addEventListener("input", function (e) {
    insert_tel.innerHTML = e.target.value;
  });

  input_email.addEventListener("input", function (e) {
    insert_email.innerHTML = e.target.value;
  });
}

function showSummary() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  var el = document.getElementById("basket_summary");
  var el_basket = document.getElementById("count");
  var total = 0;

  if (basket != null) {
    basket.forEach((element) => {
      total += element.total_price;
    });
  }

  if (basket === null) {
    document.getElementById("shipping_form").style.display = "none";
    el.innerHTML = "<p>Twój koszyk jest pusty.</p>";
    el_basket.innerHTML = 0;
  } else {
    document.getElementById("shipping_form").style.display = "block";
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
    str +=
      "<tr><td></td><td></td><td></td><td></td><td style='font-size: 22px'><b>Razem:</b></td><td style='font-size: 22px'>" +
      total +
      " zł</td></tr>";
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
  var arr_id = [
    "Zielona skrzynka",
    "Żółta skrzynka",
    "Czerwona skrzynka",
    "Zdrowa skrzynka",
    "Pomidor",
    "Ogórek",
    "Sałata",
    "Ziemniaki",
    "Rzodkiewka",
  ];
  var arr_price = [50, 55, 40, 70, 5, 3, 6, 2, 1];

  var quantity = document.getElementById(arr_id[number - 1]).value;
  if (quantity < 1) {
    alert("Za mała ilość.");
    return false;
  } else {
    item.name = arr_id[number - 1];
    item.quantity = quantity;
    item.price = arr_price[number - 1];
    item.total_price = quantity * arr_price[number - 1];
    alert("Dodano produkt do koszyka");
  }

  basket.push(item);
  localStorage.setItem("basket", JSON.stringify(basket));
  showSummary();
}

function clearFinalSummary() {
  document.getElementById("insert_name").innerHTML = "";
  document.getElementById("insert_street").innerHTML = "";
  document.getElementById("insert_city").innerHTML = "";
  document.getElementById("insert_city_code").innerHTML = "";
  document.getElementById("insert_tel").innerHTML = "";
  document.getElementById("insert_email").innerHTML = "";
  //localStorage.removeItem("basket");
  showSummary();
}

function checkField(field, regex) {
  var fieldToCheck = document.getElementById(field);
  if (!regex.test(fieldToCheck.value)) return false;
  else return true;
}

function checkData() {
  var correctData = true;
  regTel = /^[_0-9]{9}$/;
  regEmail =
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
  regCityCode = /^[_0-9]{2}-[_0-9]{3}$/;

  if (document.getElementById("name").value === "") {
    correctData = false;
    document.getElementById("name_error").innerHTML =
      "Pole nie może być puste.";
  } else {
    document.getElementById("name_error").innerHTML = "";
  }

  if (document.getElementById("street").value === "") {
    correctData = false;
    document.getElementById("street_error").innerHTML =
      "Pole nie może być puste.";
  } else {
    document.getElementById("street_error").innerHTML = "";
  }

  if (document.getElementById("city").value === "") {
    correctData = false;
    document.getElementById("city_error").innerHTML =
      "Pole nie może być puste.";
  } else {
    document.getElementById("city_error").innerHTML = "";
  }

  if (!checkField("city_code", regCityCode)) {
    correctData = false;
    document.getElementById("city_code_error").innerHTML =
      "Podaj kod pocztowy w formacie xx-xxx.";
  } else {
    document.getElementById("city_code_error").innerHTML = "";
  }

  if (!checkField("tel", regTel)) {
    correctData = false;
    document.getElementById("tel_error").innerHTML =
      "Podaj numer w formacie xxxxxxxxx";
  } else {
    document.getElementById("tel_error").innerHTML = "";
  }

  if (!checkField("email", regEmail)) {
    correctData = false;
    document.getElementById("email_error").innerHTML =
      "Podaj email w formacie xx@xx.xx";
  } else {
    document.getElementById("email_error").innerHTML = "";
  }

  return correctData;
}

function order() {
  if (checkData()) {
    var order = {};
    order.name = document.getElementById("name").value;
    order.street = document.getElementById("street").value;
    order.city = document.getElementById("city").value;
    order.city_code = document.getElementById("city_code").value;
    order.tel = document.getElementById("tel").value;
    order.email = document.getElementById("email").value;

    var orderData = JSON.parse(localStorage.getItem("orderData"));
    if (orderData === null) orderData = [];
    orderData.push(order);
    localStorage.setItem("orderData", JSON.stringify(orderData));
    document.getElementById("summary").style.display = "none";
    document.getElementById("shipping_form").innerHTML =
      "<h1 style='color: #fff; text-align: center;'>Dziękujemy za złożenie zamówienia.</h1>";
    localStorage.removeItem("basket");
  } else return false;
}
