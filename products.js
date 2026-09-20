/* ======================================================
   Lilah products
   Required fields : id, name, price, category, img
   Optional fields : badge ("New" or "Sale"), oldPrice, pos
   pos = which part of the photo is visible in the card
         (example: "center 30%" moves the photo up)
   Categories      : women, bags, dresses, shoes
   ====================================================== */
const products = [
    { id: 1,  name: "Crochet Blouses",        price: 59,  category: "women",   img: "images/milada-vigerova-p8Drpg_duLw-unsplash.jpg" },
    { id: 2,  name: "Cream Crossbody",        price: 79,  category: "bags",    img: "images/latico-leathers-SNPDQAE4EHY-unsplash.jpg", badge: "New", pos: "70% 80%" },
    { id: 3,  name: "Embroidered Flats",      price: 55,  category: "shoes",   img: "images/farhan-chohan-3D-Ux-U-qpI-unsplash.jpg", badge: "New", pos: "center 60%" },
    { id: 4,  name: "Red Floral Mini Dress",  price: 62,  category: "dresses", img: "images/rainer-eli-yol-DJgqEj0-unsplash.jpg", badge: "New" },
    { id: 5,  name: "Oversized White Blazer", price: 120, category: "women",   img: "images/reza-delkhosh-iRAOJYtPHZE-unsplash.jpg", badge: "New", pos: "center 45%" },
    { id: 6,  name: "Tan Leather Tote",       price: 95,  category: "bags",    img: "images/latico-leathers-N2058Yn7BRo-unsplash.jpg", pos: "center 70%" },
    { id: 7,  name: "Ankle Boots",            price: 89,  category: "shoes",   img: "images/mostafa-mahmoudi-uianIkmhuvk-unsplash.jpg" },
    { id: 8,  name: "Paisley Midi Dress",     price: 110, category: "dresses", img: "images/filip-rankovic-grobgaard-Nn5tNjUVBJk-unsplash.jpg", pos: "center 45%" },

    { id: 9,  name: "Soft Knit Sweater",      price: 49,  category: "women",   img: "images/yuliia-pakhomova-g3AwbdZut70-unsplash.jpg" },
    { id: 10, name: "Black Hobo Bag",         price: 82,  category: "bags",    img: "images/kimia-kazemi-dfBa1wgTqKc-unsplash.jpg", pos: "center 55%" },
    { id: 11, name: "Velcro Sneakers",        price: 75,  category: "shoes",   img: "images/sj-BXbBAUoMbQ0-unsplash.jpg", badge: "New" },
    { id: 12, name: "Lime Bubble Dress",      price: 88,  category: "dresses", img: "images/julian-myles-JLJ41fdhRDY-unsplash.jpg", badge: "New" },
    { id: 13, name: "Suede Shearling Jacket", price: 130, category: "women",   img: "images/shayna-douglas-DF4VDEwiDis-unsplash.jpg", pos: "center 55%" },
    { id: 14, name: "Leather Satchel",        price: 110, category: "bags",    img: "images/personalgraphic-com-IFlg3kFbR0E-unsplash.jpg" },
    { id: 15, name: "Platform Heels",         price: 85,  category: "shoes",   img: "images/miss-lola-33NC7nn8iz4-unsplash.jpg", pos: "center 80%" },
    { id: 16, name: "Satin Halter Mini",      price: 72,  category: "dresses", img: "images/ahmed-elnokrashy-L8coY1OuSpM-unsplash.jpg", pos: "center 35%" },

    { id: 17, name: "Pink Floral Shirt",      price: 58,  category: "women",   img: "images/imana-UhBh6y_fQ1U-unsplash.jpg", pos: "center 60%" },
    { id: 18, name: "White Flap Bag",         price: 98,  category: "bags",    img: "images/jametlene-reskp-h7MlL4PsYI4-unsplash.jpg", badge: "New" },
    { id: 19, name: "Gold Loafers",           price: 69,  oldPrice: 89, category: "shoes", img: "images/mattia-occhi-VEq1k9rArI0-unsplash.jpg", badge: "Sale", pos: "center 55%" },
    { id: 20, name: "Red Wrap Maxi Dress",    price: 135, category: "dresses", img: "images/vladimir-fedotov-kEC0A-dOw4g-unsplash.jpg" },
    { id: 21, name: "Houndstooth Top",        price: 42,  category: "women",   img: "images/ziejel-luciano-MhDizgzb8ns-unsplash.jpg", badge: "New", pos: "center 45%" },
    { id: 22, name: "Tote Bag",               price: 35,  category: "bags",    img: "images/madeinegypt-ca-yLAuhSa_upQ-unsplash.jpg" },
    { id: 23, name: "Buckle Sandals",         price: 45,  category: "shoes",   img: "images/rydale-clothing-28d3E6aUE4Y-unsplash.jpg", pos: "center 55%" },
    { id: 24, name: "White Eyelet Mini",      price: 66,  oldPrice: 82, category: "dresses", img: "images/ilona-purdes-6Z1ZodAmLFk-unsplash.jpg", badge: "Sale", pos: "center 60%" },

    { id: 25, name: "Dotted Chiffon Blouse",  price: 54,  oldPrice: 68, category: "women", img: "images/valentina-schick-TktnthlEj4A-unsplash.jpg", badge: "Sale", pos: "center 40%" },
    { id: 26, name: "Linen Shift Dress",      price: 58,  category: "dresses", img: "images/reistor-dziVRZYOFpI-unsplash.jpg", pos: "center 45%" },
    { id: 27, name: "Round Sunglasses",       price: 39,  category: "women",   img: "images/farshad-sheikhzadeh-owqY93X7jGg-unsplash.jpg", pos: "center 30%" },
    { id: 28, name: "White Lace Kaftan",      price: 64,  category: "dresses", img: "images/muhammad-nadir-HVHIVKAd0R0-unsplash.jpg", badge: "New", pos: "center 40%" },
    { id: 29, name: "Tortoise Glasses",       price: 45,  category: "women",   img: "images/lance-reis-XdrKZj_K_sQ-unsplash.jpg", pos: "center 30%" },
    { id: 30, name: "Dress",                  price: 95,  category: "dresses", img: "images/yves-monrique-LR99Ho2eIec-unsplash.jpg" },
    { id: 31, name: "Square Neck Dress",      price: 99,  category: "dresses", img: "images/karen-willis-holmes-McLuTG2t4UQ-unsplash.jpg" },
    { id: 32, name: "Lace Bridal Gown",       price: 450, category: "dresses", img: "images/jarvis-couture-bridal-prom-tyler-tx-pX6jHH-X5KY-unsplash.jpg" }
];