// Dados dos produtos
const products = [
    { id: 1, name: "Miss you", description: "Mid floral dress", price: 99.99, image: "roupa1.jpeg" },
    { id: 2, name: "Kill my mind", description: "Mid dark dress", price: 324.00, image: "roupa2.jpeg" },
    { id: 3, name: "Always you", description: "Basic dress", price: 134.99, image: "roupa3.jpeg" },
    { id: 4, name: "Fearless", description: "Blue dress", price: 200.00, image: "roupa4.jpeg" },
    { id: 5, name: "Walls", description: "Purple dress", price: 199.99, image: "roupa5.jpeg" }
];

let currentIndex = 0;

// Renderiza os produtos no carrossel
function renderCarousel() {
    const carousel = document.getElementById("carousel");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        carousel.appendChild(productCard);
    });
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`"${product.name}" Has been added to cart!`);
}

// Controla a navegação no carrossel
function updateCarousel() {
    const carousel = document.getElementById("carousel");
    const productWidth = document.querySelector(".product").offsetWidth;
    const gap = 20; // Espaço entre os itens
    const offset = -(currentIndex * (productWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
}

// Botões de navegação
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < products.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Inicializa o carrossel
document.addEventListener("DOMContentLoaded", () => {
    renderCarousel();
    updateCarousel();
});

// Array para armazenar os itens do carrinho
let cartItems = [];

// Função para renderizar o carrinho
function renderCart() {
    const cart = document.getElementById("cart");
    cart.innerHTML = ""; // Limpa o conteúdo anterior do carrinho

    if (cartItems.length === 0) {
        cart.innerHTML = "<p>The cart is empty :(</p>";
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Delete</button>
        `;

        cart.appendChild(cartItem);
    });

    // Exibir o total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    cart.appendChild(totalElement);
}

// Modifica a função addToCart para adicionar itens ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cartItems.push(product); // Adiciona o produto ao carrinho
    alert(`"${product.name}" Has been added to cart! `);
    renderCart(); // Atualiza a interface do carrinho
}

// Função para remover itens do carrinho
function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove o item pelo índice
    renderCart(); // Atualiza a interface do carrinho
}

// Inicializa o carrossel
document.addEventListener("DOMContentLoaded", () => {
    renderCarousel();
    updateCarousel();
    renderCart(); // Inicializa o carrinho vazio
});

// Atualiza o carrinho no DOM
function renderCart() {
    const cart = document.getElementById("cart");
    const checkoutButton = document.getElementById("checkoutButton");

    cart.innerHTML = ""; // Limpa o conteúdo anterior

    if (cartItems.length === 0) {
        cart.innerHTML = "<p> The cart is empty.</p>";
        checkoutButton.style.display = "none"; // Esconde o botão de finalizar compra
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Delete</button>
        `;

        cart.appendChild(cartItem);
    });

    // Exibe o total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    cart.appendChild(totalElement);

    // Mostra o botão de finalizar compra
    checkoutButton.style.display = "block";
}

// Função para finalizar a compra
function checkout() {
    if (cartItems.length === 0) {
        alert("The cart is empty.");
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    // Exibe uma mensagem de confirmação
    const confirmation = confirm(`The total of your purchase is R$ ${total}. Do you want to finalize the purchase?`
    );

    if (confirmation) {
        alert("Purchase completed successfully! Thank you for shopping with us.");
        cartItems = []; // Limpa o carrinho
        renderCart(); // Atualiza a visualização do carrinho
    }
}

// Adiciona o evento ao botão de finalizar compra
document.getElementById("checkoutButton").addEventListener("click", checkout);
