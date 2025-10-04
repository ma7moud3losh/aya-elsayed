const $ = id => document.getElementById(id);

const defaultProducts = [
  {id:1, title:'مرطب كوزمتكس', price:85, desc:'مرطب كوزمتكس', img:'images/product1.jpeg'},
  {id:2, title:'سيرم كوزمتكس', price:120, desc:'سيرم كوزمتكس', img:'images/product2.jpeg'},
  {id:3, title:'فيتامين سي', price:199, desc:'فيتامين سي', img:'images/product3.jpeg'}
];

const productsContainer = $("products");
const cartItems = $("cartItems");
const total = $("total");
const whatsappOrder = $("whatsappOrder");
const cartBtn = $("cartBtn");
const closeCartBtn = $("closeCart");
const cartDiv = $("cart");

let cartData = [];

function renderProducts() {
  productsContainer.innerHTML = "";
  defaultProducts.forEach(p => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p><strong>${p.price} EGP</strong></p>
        <button onclick="addToCart(${p.id})">أضف للسلة</button>
      </div>`;
  });
}

function addToCart(id) {
  const product = defaultProducts.find(p => p.id === id);
  cartData.push(product);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cartData.forEach((item, index) => {
    totalPrice += item.price;
    cartItems.innerHTML += `
      <li>${item.title} - ${item.price} EGP 
        <button onclick="removeFromCart(${index})">❌</button>
      </li>`;
  });

  total.innerText = `الإجمالي: ${totalPrice} EGP`;

  let message = "طلب جديد:\n";
  cartData.forEach(item => {
    message += `- ${item.title}: ${item.price} EGP\n`;
  });
  message += `الإجمالي: ${totalPrice} EGP`;

  whatsappOrder.href = `https://wa.me/201144382584?text=${encodeURIComponent(message)}`;
}

function removeFromCart(index) {
  cartData.splice(index, 1);
  renderCart();
}

cartBtn.addEventListener("click", () => {
  cartDiv.classList.toggle("hidden");
});
closeCartBtn.addEventListener("click", () => {
  cartDiv.classList.add("hidden");
});

renderProducts();