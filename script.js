/* =====================================================
   MAI FAST
   Cute Inventory + Shopping + Shipping + Tax System
===================================================== */


/* ================= PRODUCTS ================= */

const defaultProducts = [

    {
        id: 1,
        name: "กล่องสุ่มการ์ด Pokémon",
        category: "กล่องสุ่ม",
        price: 350,
        quantity: 25,
        image: "images/pokemon.jpg",
        fallback: "🎁"
    },

    {
        id: 2,
        name: "การ์ด One Piece",
        category: "การ์ด",
        price: 220,
        quantity: 18,
        image: "images/onepiece.jpg",
        fallback: "🃏"
    },

    {
        id: 3,
        name: "POP MART Labubu",
        category: "กล่องสุ่ม",
        price: 590,
        quantity: 12,
        image: "images/labubu.jpg",
        fallback: "🧸"
    },

    {
        id: 4,
        name: "Gundam Model Kit",
        category: "ของเล่น",
        price: 1250,
        quantity: 8,
        image: "images/gundam.jpg",
        fallback: "🤖"
    },

    {
        id: 5,
        name: "การ์ดอนิเมะ Waifu",
        category: "การ์ด",
        price: 180,
        quantity: 30,
        image: "images/figure.jpg",
        fallback: "🃏"
    },

    {
        id: 6,
        name: "Mini Animal Figure",
        category: "ของเล่น",
        price: 250,
        quantity: 6,
        image: "images/figure.jpg",
        fallback: "🐰"
    },

    {
        id: 7,
        name: "Mystery Toy Box",
        category: "กล่องสุ่ม",
        price: 450,
        quantity: 4,
        image: "images/labubu.jpg",
        fallback: "🎁"
    },

    {
        id: 8,
        name: "Anime Card Collection",
        category: "การ์ด",
        price: 390,
        quantity: 15,
        image: "images/onepiece.jpg",
        fallback: "✨"
    }

];


let products =
    JSON.parse(
        localStorage.getItem("maiFastProducts")
    ) || defaultProducts;


let cart =
    JSON.parse(
        localStorage.getItem("maiFastCart")
    ) || [];


let orders =
    JSON.parse(
        localStorage.getItem("maiFastOrders")
    ) || [];


let currentCategory = "all";


/* ================= SAVE ================= */

function saveAll() {

    localStorage.setItem(
        "maiFastProducts",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "maiFastCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "maiFastOrders",
        JSON.stringify(orders)
    );

}


/* ================= MONEY ================= */

function money(value) {

    return new Intl.NumberFormat(
        "th-TH",
        {
            style: "currency",
            currency: "THB"
        }
    ).format(value);

}


/* ================= TOAST ================= */

function toast(message) {

    const box =
        document.getElementById("toast");

    const text =
        document.getElementById("toastText");

    text.textContent = message;

    box.classList.add("show");

    setTimeout(() => {

        box.classList.remove("show");

    }, 2200);

}


/* ================= DATE ================= */

document.getElementById("today")
    .textContent =
    new Date().toLocaleDateString(
        "th-TH",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


/* ================= NAVIGATION ================= */

const navButtons =
    document.querySelectorAll(".nav-btn");


const pages =
    document.querySelectorAll(".page");


const pageNames = {

    home: [
        "หน้าหลัก",
        "เปิดกล่องความสุขทุกวันกับ mai fast"
    ],

    products: [
        "สินค้า",
        "กล่องสุ่ม • การ์ด • ของเล่น"
    ],

    inventory: [
        "คลังสินค้า",
        "ตรวจสอบจำนวนสินค้าในคลัง"
    ],

    shipping: [
        "ขนส่ง",
        "คำนวณค่าจัดส่ง"
    ],

    tax: [
        "ภาษีและราคา",
        "คำนวณยอดรวมและภาษี"
    ],

    orders: [
        "คำสั่งซื้อ",
        "ประวัติคำสั่งซื้อ"
    ]

};


function goPage(pageName) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageName);

    if (target)
        target.classList.add("active");


    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    document.getElementById("pageTitle")
        .textContent =
        pageNames[pageName][0];


    document.getElementById("pageSubtitle")
        .textContent =
        pageNames[pageName][1];

}


document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("[data-page]");

        if (!button) return;

        goPage(button.dataset.page);

    }
);


/* ================= IMAGE FALLBACK ================= */

function imageError(img, emoji) {

    img.onerror = null;

    img.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500">

                <rect
                    width="100%"
                    height="100%"
                    fill="#e5eadc"/>

                <text
                    x="50%"
                    y="48%"
                    text-anchor="middle"
                    font-size="100">

                    ${emoji}

                </text>

                <text
                    x="50%"
                    y="70%"
                    text-anchor="middle"
                    font-size="22"
                    fill="#527a45">

                    mai fast

                </text>

            </svg>

        `);

}


/* ================= STATUS ================= */

function getStatus(quantity) {

    if (quantity <= 0) {

        return {
            text: "หมด",
            className: "out"
        };

    }


    if (quantity <= 5) {

        return {
            text: "ใกล้หมด",
            className: "low"
        };

    }


    return {
        text: "พร้อมขาย",
        className: "normal"
    };

}


/* ================= PRODUCT CARD ================= */

function productCard(product) {

    const status =
        getStatus(product.quantity);


    return `

        <div class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="imageError(this,'${product.fallback}')"
                >

                <span class="category-label">
                    ${product.category}
                </span>

            </div>


            <div class="product-info">

                <div class="product-name">
                    ${product.name}
                </div>


                <div
                    class="stock-text ${status.className}">

                    ${
                        product.quantity > 0
                        ? `⭐ คงเหลือ ${product.quantity} ชิ้น`
                        : "⚠️ สินค้าหมด"
                    }

                </div>


                <div class="product-price">

                    ${money(product.price)}

                </div>


                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                    ${product.quantity <= 0 ? "disabled" : ""}>

                    ${
                        product.quantity <= 0
                        ? "สินค้าหมด"
                        : "🛒 เพิ่มลงตะกร้า"
                    }

                </button>

            </div>

        </div>

    `;

}


/* ================= RENDER HOME PRODUCTS ================= */

function renderHomeProducts() {

    const container =
        document.getElementById(
            "homeProductsGrid"
        );


    container.innerHTML =
        products
            .slice(0,5)
            .map(productCard)
            .join("");

}


/* ================= RENDER ALL PRODUCTS ================= */

function renderProducts() {

    const container =
        document.getElementById(
            "allProductsGrid"
        );


    const search =
        document.getElementById(
            "productSearch"
        ).value.toLowerCase();


    const filtered =
        products.filter(product => {

            const nameMatch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const categoryMatch =
                currentCategory === "all"
                ||
                product.category === currentCategory;


            return nameMatch &&
                   categoryMatch;

        });


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="cute-panel">

                ไม่พบสินค้าที่ค้นหา 🔍

            </div>

        `;

        return;

    }


    container.innerHTML =
        filtered
            .map(productCard)
            .join("");

}


/* ================= SEARCH ================= */

document
    .getElementById("productSearch")
    .addEventListener(
        "input",
        renderProducts
    );


/* ================= CATEGORY ================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentCategory =
                    button.dataset.category;


                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");

                renderProducts();

            }
        );

    });


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    if (product.quantity <= 0) {

        toast("สินค้าหมดแล้ว");

        return;

    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        if (
            existing.quantity >=
            product.quantity
        ) {

            toast("เพิ่มได้สูงสุดเท่าจำนวนในคลัง");

            return;

        }


        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveAll();

    renderCart();

    toast(
        `เพิ่ม ${product.name} ลงตะกร้าแล้ว 🛒`
    );

}


/* ================= CART ================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    document.getElementById(
        "cartCount"
    ).textContent =
        cart.reduce(
            (sum,item) =>
                sum + item.quantity,
            0
        );


    if (cart.length === 0) {

        container.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:50px 10px;
                    color:var(--muted);
                ">

                🛒<br><br>
                ยังไม่มีสินค้าในตะกร้า

            </div>

        `;


        updateCartSummary();

        return;

    }


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            if (!product)
                return "";


            return `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="imageError(this,'${product.fallback}')"
                    >


                    <div>

                        <div class="cart-item-name">
                            ${product.name}
                        </div>

                        <div class="cart-item-price">
                            ${money(product.price)}
                        </div>


                        <div class="quantity-control">

                            <button
                                onclick="
                                    changeCart(
                                        ${product.id},
                                        -1
                                    )
                                ">

                                −

                            </button>


                            <strong>
                                ${item.quantity}
                            </strong>


                            <button
                                onclick="
                                    changeCart(
                                        ${product.id},
                                        1
                                    )
                                ">

                                +

                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-cart"
                        onclick="
                            removeFromCart(
                                ${product.id}
                            )
                        ">

                        🗑

                    </button>

                </div>

            `;

        }).join("");


    updateCartSummary();

}


function changeCart(id, amount) {

    const item =
        cart.find(
            i => i.id === id
        );


    const product =
        products.find(
            p => p.id === id
        );


    if (!item || !product)
        return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                i => i.id !== id
            );

    }


    if (
        item &&
        item.quantity > product.quantity
    ) {

        item.quantity =
            product.quantity;

        toast(
            "จำนวนเกินสินค้าในคลัง"
        );

    }


    saveAll();

    renderCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveAll();

    renderCart();

    toast("ลบสินค้าออกจากตะกร้าแล้ว");

}


/* ================= CART BUTTON ================= */

document
    .getElementById("cartButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cartOverlay")
                .classList.add("show");

            renderCart();

        }
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("cartOverlay")
                .classList.remove("show");

        }
    );


document
    .getElementById("cartOverlay")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "cartOverlay"
            ) {

                event.target.classList.remove(
                    "show"
                );

            }

        }
    );


/* ================= SHIPPING FORMULA ================= */

function calculateShippingPrice(
    company,
    weight,
    distance,
    type
) {

    const base = {

        Flash: 35,

        Kerry: 40,

        "J&T": 35,

        "Thailand Post": 30

    };


    let price =
        base[company] || 35;


    if (weight > 1) {

        price +=
            Math.ceil(
                weight - 1
            ) * 12;

    }


    if (distance > 50) {

        price +=
            Math.ceil(
                (distance - 50) / 50
            ) * 5;

    }


    if (type === "express") {

        price *= 1.5;

    }


    return Math.round(price);

}


/* ================= SHIPPING PAGE ================= */

document
    .getElementById("calculateShipping")
    .addEventListener(
        "click",
        () => {

            const company =
                document.getElementById(
                    "shippingCompany"
                ).value;


            const weight =
                Number(
                    document.getElementById(
                        "shippingWeight"
                    ).value
                );


            const distance =
                Number(
                    document.getElementById(
                        "shippingDistance"
                    ).value
                );


            const type =
                document.getElementById(
                    "shippingType"
                ).value;


            if (
                !weight ||
                weight <= 0 ||
                distance < 0
            ) {

                toast(
                    "กรุณากรอกข้อมูลให้ถูกต้อง"
                );

                return;

            }


            const price =
                calculateShippingPrice(
                    company,
                    weight,
                    distance,
                    type
                );


            document
                .querySelector(
                    "#shippingResult strong"
                )
                .textContent =
                money(price);


            document.getElementById(
                "taxShipping"
            ).value = price;


            toast(
                "คำนวณค่าขนส่งเรียบร้อย 🚚"
            );

        }
    );


/* ================= HOME SHIPPING ================= */

document
    .getElementById(
        "homeShippingCalculate"
    )
    .addEventListener(
        "click",
        () => {

            const company =
                document.getElementById(
                    "homeShippingCompany"
                ).value;


            const weight =
                Number(
                    document.getElementById(
                        "homeWeight"
                    ).value
                );


            if (!weight || weight <= 0) {

                toast(
                    "กรุณากรอกน้ำหนัก"
                );

                return;

            }


            const price =
                calculateShippingPrice(
                    company,
                    weight,
                    20,
                    "normal"
                );


            document.getElementById(
                "homeShippingResult"
            ).textContent =
                `ค่าขนส่ง ${money(price)}`;

        }
    );


/* ================= TAX ================= */

function calculateTaxValues() {

    const productPrice =
        Number(
            document.getElementById(
                "taxProductPrice"
            ).value
        ) || 0;


    const shipping =
        Number(
            document.getElementById(
                "taxShipping"
            ).value
        ) || 0;


    const discount =
        Number(
            document.getElementById(
                "taxDiscount"
            ).value
        ) || 0;


    const taxRate =
        Number(
            document.getElementById(
                "taxRate"
            ).value
        ) || 0;


    const beforeTax =
        Math.max(
            0,
            productPrice +
            shipping -
            discount
        );


    const tax =
        beforeTax *
        taxRate / 100;


    const total =
        beforeTax + tax;


    return {

        productPrice,

        shipping,

        discount,

        tax,

        total

    };

}


document
    .getElementById("calculateTax")
    .addEventListener(
        "click",
        () => {

            const result =
                calculateTaxValues();


            document.getElementById(
                "taxResultProduct"
            ).textContent =
                money(result.productPrice);


            document.getElementById(
                "taxResultShipping"
            ).textContent =
                money(result.shipping);


            document.getElementById(
                "taxResultDiscount"
            ).textContent =
                "-" + money(result.discount);


            document.getElementById(
                "taxResultTax"
            ).textContent =
                money(result.tax);


            document.getElementById(
                "taxGrandTotal"
            ).textContent =
                money(result.total);


            toast(
                "คำนวณภาษีเรียบร้อย 🧾"
            );

        }
    );


/* ================= CART SUMMARY ================= */

function getCartSubtotal() {

    return cart.reduce(
        (sum,item) => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            if (!product)
                return sum;


            return sum +
                product.price *
                item.quantity;

        },
        0
    );

}


function getCartWeight() {

    return cart.reduce(
        (sum,item) =>
            sum + item.quantity,
        0
    );

}


function updateCartSummary() {

    const subtotal =
        getCartSubtotal();


    const weight =
        getCartWeight();


    const company =
        document.getElementById(
            "cartShippingCompany"
        ).value;


    const distance =
        Number(
            document.getElementById(
                "cartDistance"
            ).value
        ) || 0;


    let shipping = 0;


    if (weight > 0) {

        shipping =
            calculateShippingPrice(
                company,
                weight,
                distance,
                "normal"
            );

    }


    const tax =
        (
            subtotal +
            shipping
        ) * 0.07;


    const total =
        subtotal +
        shipping +
        tax;


    document.getElementById(
        "cartSubtotal"
    ).textContent =
        money(subtotal);


    document.getElementById(
        "cartShipping"
    ).textContent =
        money(shipping);


    document.getElementById(
        "cartTax"
    ).textContent =
        money(tax);


    document.getElementById(
        "cartTotal"
    ).textContent =
        money(total);


    document.getElementById(
        "checkoutButton"
    ).disabled =
        cart.length === 0;

}


document
    .getElementById(
        "cartShippingCompany"
    )
    .addEventListener(
        "change",
        updateCartSummary
    );


document
    .getElementById(
        "cartDistance"
    )
    .addEventListener(
        "input",
        updateCartSummary
    );


/* ================= CHECKOUT ================= */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        checkout
    );


function checkout() {

    if (cart.length === 0) {

        toast(
            "ยังไม่มีสินค้าในตะกร้า"
        );

        return;

    }


    /* CHECK STOCK */

    for (const item of cart) {

        const product =
            products.find(
                p => p.id === item.id
            );


        if (
            !product ||
            item.quantity >
            product.quantity
        ) {

            toast(
                "สินค้าบางรายการมีจำนวนไม่พอ"
            );

            return;

        }

    }


    const subtotal =
        getCartSubtotal();


    const weight =
        getCartWeight();


    const company =
        document.getElementById(
            "cartShippingCompany"
        ).value;


    const distance =
        Number(
            document.getElementById(
                "cartDistance"
            ).value
        ) || 0;


    const shipping =
        calculateShippingPrice(
            company,
            weight,
            distance,
            "normal"
        );


    const tax =
        (subtotal + shipping)
        * 0.07;


    const total =
        subtotal +
        shipping +
        tax;


    /* REDUCE INVENTORY */

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        product.quantity -=
            item.quantity;

    });


    /* CREATE ORDER */

    const order = {

        id:
            "MF-" +
            Date.now()
                .toString()
                .slice(-7),

        product:
            cart.map(item => {

                const product =
                    products.find(
                        p => p.id === item.id
                    );

                return `${product.name} × ${item.quantity}`;

            }).join(", "),

        subtotal,

        shipping,

        tax,

        total,

        company,

        date:
            new Date()
                .toLocaleDateString(
                    "th-TH"
                ),

        status:
            "กำลังเตรียมสินค้า"

    };


    orders.unshift(order);


    cart = [];


    saveAll();


    renderEverything();


    document
        .getElementById(
            "cartOverlay"
        )
        .classList.remove("show");


    toast(
        `สั่งซื้อ ${order.id} สำเร็จ 🎉`
    );

}


/* ================= INVENTORY ================= */

function renderInventory() {

    const table =
        document.getElementById(
            "inventoryTable"
        );


    table.innerHTML =
        products.map(product => {

            const status =
                getStatus(
                    product.quantity
                );


            return `

                <tr>

                    <td>

                        <div class="table-product">

                            <img
                                src="${product.image}"
                                onerror="
                                    imageError(
                                        this,
                                        '${product.fallback}'
                                    )
                                "
                            >

                            <strong>
                                ${product.name}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${product.category}
                    </td>


                    <td>
                        ${money(product.price)}
                    </td>


                    <td>

                        <div class="stock-control">

                            <button
                                onclick="
                                    changeStock(
                                        ${product.id},
                                        -1
                                    )
                                ">

                                −

                            </button>


                            <strong>
                                ${product.quantity}
                            </strong>


                            <button
                                onclick="
                                    changeStock(
                                        ${product.id},
                                        1
                                    )
                                ">

                                +

                            </button>

                        </div>

                    </td>


                    <td>

                        <span
                            class="
                                status
                                ${status.className}
                            ">

                            ${status.text}

                        </span>

                    </td>


                    <td>

                        <button
                            class="stock-control button"
                            onclick="
                                addToCart(
                                    ${product.id}
                                )
                            "
                            ${
                                product.quantity <= 0
                                ? "disabled"
                                : ""
                            }>

                            🛒

                        </button>

                    </td>

                </tr>

            `;

        }).join("");


    updateInventoryNumbers();

}


function changeStock(id, amount) {

    const product =
        products.find(
            p => p.id === id
        );


    if (!product)
        return;


    product.quantity += amount;


    if (product.quantity < 0)
        product.quantity = 0;


    saveAll();

    renderEverything();

}


/* ================= INVENTORY NUMBERS ================= */

function updateInventoryNumbers() {

    const totalStock =
        products.reduce(
            (sum,p) =>
                sum + p.quantity,
            0
        );


    const low =
        products.filter(
            p =>
                p.quantity > 0 &&
                p.quantity <= 5
        ).length;


    const out =
        products.filter(
            p =>
                p.quantity === 0
        ).length;


    const value =
        products.reduce(
            (sum,p) =>
                sum +
                p.price *
                p.quantity,
            0
        );


    document.getElementById(
        "inventoryTotalProducts"
    ).textContent =
        products.length;


    document.getElementById(
        "inventoryTotalStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "inventoryLowStock"
    ).textContent =
        low;


    document.getElementById(
        "inventoryOutStock"
    ).textContent =
        out;


    document.getElementById(
        "homeProducts"
    ).textContent =
        products.length;


    document.getElementById(
        "homeStock"
    ).textContent =
        totalStock;


    document.getElementById(
        "homeLowStock"
    ).textContent =
        low;


    document.getElementById(
        "homeValue"
    ).textContent =
        money(value);

}


/* ================= HOME STOCK CHECK ================= */

document
    .getElementById(
        "homeStockSearchBtn"
    )
    .addEventListener(
        "click",
        checkHomeStock
    );


document
    .getElementById(
        "homeStockSearch"
    )
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                checkHomeStock();

            }

        }
    );


function checkHomeStock() {

    const search =
        document.getElementById(
            "homeStockSearch"
        ).value
        .trim()
        .toLowerCase();


    const result =
        document.getElementById(
            "homeStockResult"
        );


    if (!search) {

        result.innerHTML = `

            <div class="stock-result">

                กรุณาพิมพ์ชื่อสินค้า 🔍

            </div>

        `;

        return;

    }


    const found =
        products.find(
            product =>
                product.name
                    .toLowerCase()
                    .includes(search)
        );


    if (!found) {

        result.innerHTML = `

            <div class="stock-result">

                ❌ ไม่พบสินค้านี้

            </div>

        `;

        return;

    }


    const status =
        getStatus(found.quantity);


    result.innerHTML = `

        <div class="stock-result">

            <strong>
                ${found.name}
            </strong>

            <br>

            จำนวนในคลัง:
            <strong>
                ${found.quantity}
                ชิ้น
            </strong>

            <br>

            <span class="
                status
                ${status.className}
            ">

                ${status.text}

            </span>

        </div>

    `;

}


/* ================= ORDERS ================= */

function renderOrders() {

    const table =
        document.getElementById(
            "ordersTable"
        );


    if (orders.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:40px;
                        color:var(--muted);
                    ">

                    📋 ยังไม่มีคำสั่งซื้อ

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        orders.map(order => `

            <tr>

                <td>
                    <strong>
                        ${order.id}
                    </strong>
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${money(order.total)}
                </td>

                <td>
                    ${order.date}
                </td>

                <td>

                    <span
                        class="
                            status normal
                        ">

                        ${order.status}

                    </span>

                </td>

            </tr>

        `).join("");

}


/* ================= DARK MODE ================= */

const themeButton =
    document.getElementById(
        "themeButton"
    );


function updateThemeButton() {

    const dark =
        document.body.classList.contains(
            "dark"
        );


    themeButton.textContent =
        dark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

}


themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        localStorage.setItem(
            "maiFastTheme",

            document.body.classList.contains(
                "dark"
            )
            ? "dark"
            : "light"
        );


        updateThemeButton();

    }
);


if (
    localStorage.getItem(
        "maiFastTheme"
    ) === "dark"
) {

    document.body.classList.add("dark");

}


updateThemeButton();


/* ================= MOBILE MENU ================= */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.toggle(
                    "mobile-open"
                );

        }
    );


/* ================= RENDER EVERYTHING ================= */

function renderEverything() {

    renderHomeProducts();

    renderProducts();

    renderInventory();

    renderOrders();

    renderCart();

    updateInventoryNumbers();

}


/* ================= START ================= */

renderEverything();