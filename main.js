let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

//@desc get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +texes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(143, 17, 8)";
  }
}
//@desc create products
let dataProducts;
if (localStorage.product != null) {
  dataProducts = JSON.parse(localStorage.product);
} else {
  dataProducts = [];
}
let mood = "create";
let index;
submit.onclick = function createProduct() {
  let newProduct = {
    id: dataProducts.length + 1,
    title: title.value,
    price: price.value,
    texes: texes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; newProduct.count > i; i++) {
          dataProducts.push(newProduct);
        }
      } else {
        dataProducts.push(newProduct);
      }
    } //update mood
    else {
      dataProducts[index] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  } else {
    alert("Please fill all fields");
  }

  localStorage.setItem("product", JSON.stringify(dataProducts));
  showData();
};
//@desc clear data
function clearData() {
  title.value = "";
  price.value = "";
  texes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}
//@desc show data in table

function showData() {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].texes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button  onclick="updateData (${i})" id="ubdate">ubdate</button></td>
        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>

    </tr> `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProducts.length > 0) {
    btnDeleteAll.innerHTML = `<button  onclick="deleteAll()"  >delete all (${dataProducts.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
//@desc delet all date
function deleteAll() {
  localStorage.clear();
  dataProducts.splice(0);
  showData();
}

//@desc delete data
function deleteData(i) {
  dataProducts.splice(i, 1);

  localStorage.product = JSON.stringify(dataProducts);
  showData();
}
//@desc update data
function updateData(i) {
  title.value = dataProducts[i].title;
  price.value = dataProducts[i].price;
  texes.value = dataProducts[i].texes;
  ads.value = dataProducts[i].ads;
  discount.value = dataProducts[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProducts[i].category;
  submit.innerHTML = "update";
  mood = "update";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//@desc search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;

  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMood == "title") {
      if (dataProducts[i].title.includes(value)) {
        table += `
              <tr>
              <td>${i + 1}</td>
              <td>${dataProducts[i].title}</td>
              <td>${dataProducts[i].price}</td>
              <td>${dataProducts[i].texes}</td>
              <td>${dataProducts[i].ads}</td>
              <td>${dataProducts[i].discount}</td>
              <td>${dataProducts[i].total}</td>
              <td>${dataProducts[i].category}</td>
              <td><button  onclick="updateData (${i})" id="ubdate">ubdate</button></td>
              <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
      
          </tr> `;
      }
    } else {
      if (dataProducts[i].category.includes(value)) {
        table += `
              <tr>
              <td>${i + 1}</td>
              <td>${dataProducts[i].title}</td>
              <td>${dataProducts[i].price}</td>
              <td>${dataProducts[i].texes}</td>
              <td>${dataProducts[i].ads}</td>
              <td>${dataProducts[i].discount}</td>
              <td>${dataProducts[i].total}</td>
              <td>${dataProducts[i].category}</td>
              <td><button  onclick="updateData (${i})" id="ubdate">ubdate</button></td>
              <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
      
          </tr> `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
