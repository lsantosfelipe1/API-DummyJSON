document.getElementById("add-product-form").addEventListener("submit", function(event) {
    event.preventDefault();
    addProduct();
});

function fetchProducts() {
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            const productList = document.getElementById("product-list");
            productList.innerHTML = "";
            data.products.forEach(product => {
                productList.innerHTML += createProductCard(product);
            });
        });
}

function createProductCard(product) {
    return `
        <div class="product">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Preço: $${product.price}</p>
            <button onclick="viewDetails(${product.id})">Ver Detalhes</button>
        </div>
    `;
}

function viewDetails(id) {
    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            alert(`Nome: ${product.title}\nDescrição: ${product.description}\nPreço: $${product.price}`);
        });
}

function addProduct() {
    const title = document.getElementById("product-title").value;
    const price = document.getElementById("product-price").value;

    const newProduct = {
        title: title,
        price: price,
        thumbnail: "https://via.placeholder.com/150"
    };

    const productList = document.getElementById("product-list");
    productList.innerHTML += createProductCard(newProduct);

    document.getElementById("add-product-form").reset();
}

document.getElementById("search").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const title = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = title.includes(searchText) ? "block" : "none";
    });
});