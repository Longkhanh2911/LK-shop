class Product {
  constructor(id, title, image, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.quantity = 1;
  }
}

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

let products = [];
let carts = [];
let obj = JSON.parse(localStorage.getItem("cart"));
if (obj) {
  carts = obj;
} else {
  carts = [];
}
let product1 = new Product(1, "Harman Kardon Onyx Studio", "./images/22.jpeg", 6990000);
let product2 = new Product(2, "JBL Partybox 710", "./images/710.jpg", 19890000);
let product3 = new Product(
  3,
  "Harman Kardon Aura Studio 3",
  "./images/6490.png",
  6490000
);
let product4 = new Product(
  4,
  "JBL Partybox 110",
  "./images/11890.jpg",
  11890000
);
let product5 = new Product(
  5,
  "Audio Pro A26",
  "./images/AudioProA26.jpg",
  14500000
);
let product6 = new Product(
  6,
  "JBL Boombox 3",
  "./images/JBLmoombox3.jpeg",
  11490000
);
let product7 = new Product(
  7,
  "KlipschR-51PM",
  "./images/KlipschR-51PM.jpg",
  11500000
);
let product8 = new Product(
  8,
  "Marshall Woburn 3",
  "./images/woburn3.jpg",
  14200000
);
products.push(product1);
products.push(product2);
products.push(product3);
products.push(product4);
products.push(product5);
products.push(product6);
products.push(product7);
products.push(product8);
let renderProduct = function (products) {
  let htmls = products.map(function (product) {
    return `
          <div class="product">
                <div class="product-image">
                  <img src= ${product.image} alt="Sản phẩm" />
                </div>
                <h4>${product.title}</h4>
                <span>${VND.format(product.price)}</span>
                <div>
                  <button onclick = "addProduct(${
                    product.id
                  })">Thêm vào giỏ hàng</button>
                </div>
              </div>
          `;
  });
  htmls = htmls.join("");
  document.getElementById("list-product").innerHTML = htmls;
};

let renderCart = function (carts) {
  let htmls = carts.map(function (product) {
    return `
    <div class="product-cart">
    <div class="productId">${product[0].id}</div>
    <div class="productImage">
    <img src=${product[0].image} alt=""></div>
    <div class="productTitle">${product[0].title}</div>
    <div style="color:red" class="productPrice">${VND.format(
      product[0].price
    )}</div>
    <div class="productQuantity">${product[0].quantity}</div>
    <div style="color:red" class="productTotal">${VND.format(
      product[0].price * product[0].quantity
    )}</div>
  </div>
            `;
  });
  htmls = htmls.join("");
  document.getElementById("list-cart").innerHTML = htmls;
};

let addProduct = function (id) {
  let product = products.filter(function (product) {
    return product.id == id;
  });
  carts.push(product);
  let cartJsons = JSON.stringify(carts);
  localStorage.setItem("cart", cartJsons);
  location.reload();
};

let removeAllProducts = function () {
  carts = [];
  let cartJsons = JSON.stringify(carts);
  localStorage.setItem("cart", cartJsons);
  location.reload();
};

let checkout = function () {
  if (carts.length != 0) {
    carts = [];
    let cartJsons = JSON.stringify(carts);
    localStorage.setItem("cart", cartJsons);
    location.reload();
    alert("Bạn đã thanh toán thành công!");
  } else {
    alert("Bạn không có sản phẩm nào trong giỏ hàng. Vui lòng thêm sản phẩm!");
  }
};

renderProduct(products);
renderCart(carts);
