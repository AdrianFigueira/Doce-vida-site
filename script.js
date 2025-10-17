const PRODUCTS = [
  { id: 1, title: "Brigadeiro com Bombom de Beijinho", price: 12.0, img: "brownie1.jpg" },
  { id: 2, title: "Brigadeiro de ninho com Morango", price: 12.0, img: "brownie2.jpg" },
  { id: 3, title: "Doce de Leite com Amendoim", price: 12.0, img: "brownie3.jpg" },
];

let page = "home";
let cart = [];
let activeImage = 0;
let carouselInterval;

const mainContent = document.getElementById("mainContent");
const cartNotice = document.getElementById("cartNotice");
const orderNotice = document.getElementById("orderNotice");
const cartCount = document.getElementById("cartCount");
const darkModeSwitch = document.getElementById("darkModeSwitch");

function renderPage() {
  clearInterval(carouselInterval);
  let html = "";

  if (page === "home") {
    html = `
      <section class="home-section">
        <div class="home-left">
          <img class= "slogan-img" src="./src/img/slogan-home.png" alt="slogan">
        </div>
        <div class="home-right">
          <img id="carouselImg" src="${PRODUCTS[activeImage].img}" class="carousel-img">
        </div>
      </section>
      <section class= "home-bottom">
        <div class="quest-bar">
          <img class="quest" src="./src/img/quest-bar.png" alt="Vai de Brownies Doce Vida">
        </div>

      <div class="videoD">
        <video class="video-doces" controls autoplay muted loop>
          <source src="./src/video/video-brw-3.mp4" type="video/mp4">
          Seu navegador não suporta vídeos em HTML5.
        </video>
      </div>

      <div class="images-doces">
      <div class="choco">
        <img src="./brownie1.jpg" width="300px">
        <p>Brownie de chocolate com recheio cremoso de brigadeiro e pedaços de bombom de beijinho por cima. <br>
        — perfeito pra quem ama o clássico com um toque especial.</p>
      </div>
      <div class="morango">
        <img src="./brownie2.jpg" width="300px">
        <p>Brownie de brigadeiro branco com camada de leite em pó (Ninho) e fatias de morango frescas. <br>
        — combinação doce e refrescante.</p>
      </div>
      <div class="amendoim">
        <img src="./brownie3.jpg" width="300px">
        <p>Brownie de doce de leite e farofa de amendoim. <br>
        — doce com contraste de texturas cremosa e crocante.</p>
      </div>
    </div>
      <button onclick="changePage('catalog')" class="btn-peça">PEÇA JÁ O SEU !</button>
  </section>
    `;
    mainContent.innerHTML = html;
    startCarousel();
  }

  if (page === "catalog") {
    html = `<section class="catalog-section">
      <h2 style=
      "background:#d55fec;
      width: 150px;
      height: 60px;
      border-radius: 10px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      ">Doces</h2>
      <div class="product-grid">`;
    PRODUCTS.forEach((p) => {
      html += `
        <div class="product-card">
          <img src="${p.img}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>R$ ${p.price.toFixed(2)}</p>
          <button style="margin-top: 5px;" class="add-btn" onclick="addToCart(${p.id})">Adicionar +</button>
        </div>
      `;
    });
    html += `</div><button id="checkoutBtn" onclick="changePage('cart')">Ir para o carrinho</button></section>`;
    mainContent.innerHTML = html;
  }

  if (page === "cart") {
    html = `<section class="cart-section"><h2>Seu Carrinho</h2>`;
    if (cart.length === 0) {
      html += '<p>O carrinho está vazio.</p>';
    } else {
      html += `<div class="cart-items">`;
      cart.forEach((item) => {
        html += `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.title}">
            <div>
              <h4>${item.title}</h4>
              <p>R$ ${(item.price * item.qty).toFixed(2)}</p>
              <div class="qty-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
              </div>
              <button class="remove-btn" onclick="removeItem(${item.id})">Remover</button>
            </div>
          </div>`;
      });
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
      html += `</div>
      <h3>Total: R$ ${total} <span class="aviso" >*Valores cobrados no ato da entrega !</span> </h3>
      <form id="checkoutForm">
        <input type="text" id="firstName" placeholder="Nome" required>
        <input type="text" id="lastName" placeholder="Sobrenome" required>
        <input type="text" id="address" placeholder="Endereço e Numero" required>
        <input type="text" id="pedidoAdicional" placeholder="Pedido adicional (Opcional)">
        <button type="submit">Finalizar Pedido</button>
      </form>`;
    }
    html += `</section>`;
    mainContent.innerHTML = html;
  }

  if (page === "about") {
    mainContent.innerHTML = `<section class="sobre"
  style="max-width:900px;margin:2rem auto;padding:1rem;background:#f3e8ff;border-radius:16px;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
  <h2 style="color:#6B21A8;margin-bottom:1rem;">Sobre</h2>
  <p>Somos uma dupla apaixonada por doces. Criamos a Doce Vida com o objetivo de levar brownies artesanais e com um sabor unico para você e sua família.</p>

  <div class="imagem-casal">
    <img class="isah" src="./src/img/foto-isah.jpg" alt="isah">
    <img class="adrian" src="./src/img/foto-adrian.jpg" alt="adrian">
  </div>
</section>`
  }

  if (page === "contact") {
    mainContent.innerHTML = `<section style="max-width:900px;margin:2rem auto;padding:1rem;background:#f3e8ff;border-radius:16px;box-shadow:0 4px 10px rgba(0,0,0,0.1);"><h2 style="color:#6B21A8;margin-bottom:1rem;">Contato</h2><p>📧 contato.docevida.bc@gmail.com | 📱 (15) 997174443 | 📸 Instagram: @doce_vida_bc</p></section>`;
  }
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCartCount();
  showCartNotice();
}

function updateCartCount() {
  cartCount.innerText = cart.reduce((s, i) => s + i.qty, 0);
}

function showCartNotice() {
  cartNotice.classList.add("show-cart-notice");
  setTimeout(() => cartNotice.classList.remove("show-cart-notice"), 1500);
}

function showOrderNotice() {
  orderNotice.classList.add("show-order-notice");
  setTimeout(() => orderNotice.classList.remove("show-order-notice"), 1500);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  renderPage();
  updateCartCount();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderPage();
  updateCartCount();
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    activeImage = (activeImage + 1) % PRODUCTS.length;
    const img = document.getElementById("carouselImg");
    if (img) {
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = PRODUCTS[activeImage].img;
        img.style.opacity = 1;
      }, 400);
    }
  }, 3000);
}

function changePage(p) {
  page = p;
  renderPage();
}

document.getElementById("cartBtn").addEventListener("click", () => changePage("cart"));
darkModeSwitch.addEventListener("change", () => document.body.classList.toggle("dark"));

document.addEventListener("submit", (e) => {
  if (e.target.id === "checkoutForm") {
    e.preventDefault();
    const name = document.getElementById("firstName").value;
    const last = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const pedidoAdicional = document.getElementById("pedidoAdicional").value;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
    const msg = `*Pedido Doce Vida Brownies*

Nome: ${name} ${last}
Endereço: ${address}

Itens: 
${cart.map(i => `- ${i.title} x${i.qty} = R$ ${(i.price * i.qty).toFixed(2)}`).join("\n")}

Pedido adicional: ${pedidoAdicional}

Total: R$ ${total}`;
    window.open(`https://wa.me/5515997174443?text=${encodeURIComponent(msg)}`);
    showOrderNotice();
  }
});

renderPage();
