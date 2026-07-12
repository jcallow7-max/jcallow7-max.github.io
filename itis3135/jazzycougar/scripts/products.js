const products = {
    "house-blend": {
        name: "House Blend",
        price: "$14 per pack",
        description: "A smooth, balanced everyday cigarette prepared by "
            + "hand in small batches. The House Blend offers a warm flavor "
            + "and clean finish."
    },

    "golden-hour": {
        name: "Golden Hour",
        price: "$16 per pack",
        description: "A lighter aromatic cigarette with a mellow character, "
            + "made for slow afternoons and early evenings."
    },

    "after-hours": {
        name: "After Hours",
        price: "$17 per pack",
        description: "A richer hand-rolled cigarette with a bold flavor and "
            + "lingering finish. It is the strongest of our house blends."
    },

    "house-reserve": {
        name: "House Reserve Cigar",
        price: "$18 each",
        description: "A medium-bodied cigar with warm, earthy notes and an "
            + "even construction."
    },

    "burgundy-box": {
        name: "Burgundy No. 5 Box",
        price: "$220",
        description: "Ten full-bodied Burgundy No. 5 cigars arranged inside "
            + "a burgundy-and-gold wooden keepsake box."
    },

    "private-box": {
        name: "JC's Private Box",
        price: "$295",
        description: "Ten premium cigars selected by JC and presented inside "
            + "an espresso-stained wooden box with antique-gold hardware."
    },

    "loose-blend": {
        name: "Loose House Blend",
        price: "$22 per pouch",
        description: "A pouch of Jazzy Cougar's signature loose tobacco blend, "
            + "prepared for pipes or customers who prefer to roll their own."
    },

    "gold-lighter": {
        name: "Antique-Gold Lighter",
        price: "$28",
        description: "A refillable metal lighter with an antique-gold finish "
            + "and a small engraved prowling-cougar emblem."
    },

    "cigar-case": {
        name: "Leather Cigar Case",
        price: "$36",
        description: "A dark espresso leather carrying case designed to "
            + "protect up to three cigars while traveling."
    }
};

const shops = {
    "shop-one": "Tobacco Shop 1",
    "shop-two": "Tobacco Shop 2",
    "shop-three": "Tobacco Shop 3"
};

const inventory = {};

Object.keys(products).forEach((productKey) => {
    inventory[productKey] = {};

    Object.keys(shops).forEach((shopKey) => {
        inventory[productKey][shopKey] = Math.floor(Math.random() * 13);
    });
});

const productSelect = document.querySelector("#product-select");
const productPanel = document.querySelector("#product-panel");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productQuantity = document.querySelector("#product-quantity");
const shopSelect = document.querySelector("#shop-select");
const stockButton = document.querySelector("#stock-button");
const stockResult = document.querySelector("#stock-result");

function displayProduct() {
    const productKey = productSelect.value;
    const selectedProduct = products[productKey];

    stockResult.textContent = "";
    stockResult.className = "stock-result";

    if (!selectedProduct) {
        productPanel.hidden = true;
        return;
    }

    productName.textContent = selectedProduct.name;
    productPrice.textContent = selectedProduct.price;
    productDescription.textContent = selectedProduct.description;
    productQuantity.value = "1";
    productPanel.hidden = false;
}

function checkStock() {
    const productKey = productSelect.value;
    const shopKey = shopSelect.value;
    const requestedQuantity = Number.parseInt(productQuantity.value, 10);

    if (!products[productKey] || !shops[shopKey]) {
        stockResult.textContent = "Please select a product and tobacco shop.";
        stockResult.className = "stock-result stock-error";
        return;
    }

    if (
        Number.isNaN(requestedQuantity)
        || requestedQuantity < 1
        || requestedQuantity > 20
    ) {
        stockResult.textContent = "Enter a quantity between 1 and 20.";
        stockResult.className = "stock-result stock-error";
        return;
    }

    const availableQuantity = inventory[productKey][shopKey];
    const product = products[productKey];
    const shop = shops[shopKey];

    if (availableQuantity === 0) {
        stockResult.textContent = product.name + " is currently out of stock at "
            + shop + ".";
        stockResult.className = "stock-result stock-unavailable";
    } else if (requestedQuantity <= availableQuantity) {
        stockResult.textContent = "In stock — " + availableQuantity
            + " available at " + shop + ".";
        stockResult.className = "stock-result stock-available";
    } else {
        stockResult.textContent = "Limited stock — only " + availableQuantity
            + " available at " + shop + ".";
        stockResult.className = "stock-result stock-limited";
    }
}

productSelect.addEventListener("change", displayProduct);
stockButton.addEventListener("click", checkStock);