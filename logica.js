
let Products = [];


function parseDataToProducts() {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        let product = new Product(
            map["name"],
            map["caracteristica1"],
            map["caracteristica2"],
            map["caracteristica3"],
            map["precio"],
            map["cantidad"],
            map["imagenes"]
        );
        Products.push(product);
    }
}


function renderAllProducts() {
    let container = document.getElementById("box");
    container.innerHTML = ""; 

    for (let i = 0; i < Products.length; i++) {
        let product = Products[i];
        container.innerHTML += product.htmlCard(i); 
    }
}


function renderSelectedProducts(indices) {
    let container = document.getElementById("box");
    container.innerHTML = ""; 


    for (let i = 0; i < indices.length; i++) {
        let pos = indices[i];
        if (pos < Products.length) {
            let product = Products[pos];
            container.innerHTML += product.htmlCard(pos); 
        }
    }
}


function productSelected(pos) {
    let productselected = Products[pos];
    
    window.location = "./producto1.html?name=" + encodeURIComponent(productselected.name);
}


function initializeMainPage() {
    parseDataToProducts();
    renderSelectedProducts([1, 3, 4]); 
}


function initializeStorePage() {
    parseDataToProducts();
    renderAllProducts(); 



if (window.location.pathname.includes("mainpage.html")) {
    window.onload = initializeMainPage;
} else if (window.location.pathname.includes("tienda.html")) {
    window.onload = initializeStorePage; 
}
}
