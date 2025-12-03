// إدارة السلة

let cartItems = [];
let cartCount = 0;

const cartToggleBtn = document.getElementById("cart-toggle");
const heroCartBtn = document.getElementById("hero-cart-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartItemsList = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartSummary = document.getElementById("cart-summary");
const cartTotal = document.getElementById("cart-total");
const payVisaBtn = document.getElementById("pay-visa");
const payPaypalBtn = document.getElementById("pay-paypal");

// تحديث نص زر السلة
function updateCartButtonText() {
  if (cartToggleBtn) {
    cartToggleBtn.textContent = `🛒 السلة (${cartCount})`;
  }
}

// فتح وإغلاق المودال
function openCart() {
  if (cartOverlay) {
    cartOverlay.classList.add("open");
  }
}

function closeCart() {
  if (cartOverlay) {
    cartOverlay.classList.remove("open");
  }
}

if (cartToggleBtn) {
  cartToggleBtn.addEventListener("click", openCart);
}

if (heroCartBtn) {
  heroCartBtn.addEventListener("click", openCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

// إغلاق عند الضغط خارج المودال
if (cartOverlay) {
  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) {
      closeCart();
    }
  });
}

// إضافة إلى السلة
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price || "0");

    const existing = cartItems.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cartItems.push({ name, price, qty: 1 });
    }

    cartCount += 1;
    updateCartButtonText();
    renderCart();
  });
});

// شراء الآن (تجريبي)
document.querySelectorAll(".buy-now").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    alert(
      `🛒 عملية شراء تجريبية:\n\nالمنتج: ${name}\nالسعر: ${price}$\n\nهنا يمكنك لاحقًا ربط الزر ببوابة دفع حقيقية.`
    );
  });
});

// عرض محتوى السلة
function renderCart() {
  cartItemsList.innerHTML = "";
  if (cartItems.length === 0) {
    cartEmpty.style.display = "block";
    cartSummary.style.display = "none";
    cartTotal.textContent = "$0.00";
    return;
  }

  cartEmpty.style.display = "none";
  cartSummary.style.display = "flex";

  let total = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const nameSpan = document.createElement("span");
    nameSpan.className = "cart-item-name";
    nameSpan.textContent = item.name;

    const qtySpan = document.createElement("span");
    qtySpan.className = "cart-item-qty";
    qtySpan.textContent = `الكمية: ${item.qty}`;

    info.appendChild(nameSpan);
    info.appendChild(qtySpan);

    const priceSpan = document.createElement("span");
    priceSpan.className = "cart-item-price";
    const itemTotal = item.price * item.qty;
    priceSpan.textContent = `$${itemTotal.toFixed(2)}`;

    li.appendChild(info);
    li.appendChild(priceSpan);
    cartItemsList.appendChild(li);

    total += itemTotal;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// أزرار الدفع
if (payVisaBtn) {
  payVisaBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("السلة فارغة، أضف منتجاً أولاً.");
      return;
    }
    alert(
      "✅ تم اختيار الدفع ببطاقة فيزا.\n\nهذا مثال تجريبي فقط، لاحقًا يمكنك ربطه ببوابة دفع حقيقية أو صفحة دفع خاصة بك."
    );
  });
}

if (payPaypalBtn) {
  payPaypalBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("السلة فارغة، أضف منتجاً أولاً.");
      return;
    }
    alert(
      "❌ الدفع عبر PayPal غير متوفر حاليًا.\n\nالرجاء اختيار طريقة الدفع ببطاقة فيزا."
    );
  });
}

// تهيئة
updateCartButtonText();
renderCart();
