/* ======================================================
   Lilah products
   Required fields : id, name, price, category, img
   Optional fields : badge ("New" or "Sale"), oldPrice, pos
   pos = which part of the photo is visible in the card
         (example: "center 30%" moves the photo up)
   Categories      : women, bags, dresses, shoes
   ====================================================== */
const products = [
    { id: 1,  name: "Crochet Blouses",        price: 59,  category: "women",   img: "images-webp/milada-vigerova-p8Drpg_duLw-unsplash_result.webp" },
    { id: 2,  name: "Cream Crossbody",        price: 79,  category: "bags",    img: "images-webp/latico-leathers-SNPDQAE4EHY-unsplash_result.webp", badge: "New", pos: "70% 80%" },
    { id: 3,  name: "Embroidered Flats",      price: 55,  category: "shoes",   img: "images-webp/farhan-chohan-3D-Ux-U-qpI-unsplash_result.webp", badge: "New", pos: "center 60%" },
    { id: 4,  name: "Red Floral Mini Dress",  price: 62,  category: "dresses", img: "images-webp/rainer-eli-yol-DJgqEj0-unsplash_result.webp", badge: "New" },
    { id: 5,  name: "Oversized White Blazer", price: 120, category: "women",   img: "images-webp/reza-delkhosh-iRAOJYtPHZE-unsplash_result.webp", badge: "New", pos: "center 45%" },
    { id: 6,  name: "Tan Leather Tote",       price: 95,  category: "bags",    img: "images-webp/latico-leathers-N2058Yn7BRo-unsplash_result.webp", pos: "center 70%" },
    { id: 7,  name: "Ankle Boots",            price: 89,  category: "shoes",   img: "images-webp/mostafa-mahmoudi-uianIkmhuvk-unsplash_result.webp" },
    { id: 8,  name: "Paisley Midi Dress",     price: 110, category: "dresses", img: "images-webp/filip-rankovic-grobgaard-Nn5tNjUVBJk-unsplash_result.webp", pos: "center 45%" },

    { id: 9,  name: "Soft Knit Sweater",      price: 49,  category: "women",   img: "images-webp/yuliia-pakhomova-g3AwbdZut70-unsplash_result.webp" },
    { id: 10, name: "Black Hobo Bag",         price: 82,  category: "bags",    img: "images-webp/kimia-kazemi-dfBa1wgTqKc-unsplash_result.webp", pos: "center 55%" },
    { id: 11, name: "Velcro Sneakers",        price: 75,  category: "shoes",   img: "images-webp/sj-BXbBAUoMbQ0-unsplash_result.webp", badge: "New" },
    { id: 12, name: "Lime Bubble Dress",      price: 88,  category: "dresses", img: "images-webp/julian-myles-JLJ41fdhRDY-unsplash_result.webp", badge: "New" },
    { id: 13, name: "Suede Shearling Jacket", price: 130, category: "women",   img: "images-webp/shayna-douglas-DF4VDEwiDis-unsplash_result.webp", pos: "center 55%" },
    { id: 14, name: "Leather Satchel",        price: 110, category: "bags",    img: "images-webp/personalgraphic-com-IFlg3kFbR0E-unsplash_result.webp" },
    { id: 15, name: "Platform Heels",         price: 85,  category: "shoes",   img: "images-webp/miss-lola-33NC7nn8iz4-unsplash_result.webp", pos: "center 80%" },
    { id: 16, name: "Satin Halter Mini",      price: 72,  category: "dresses", img: "images-webp/ahmed-elnokrashy-L8coY1OuSpM-unsplash_result.webp", pos: "center 35%" },

    { id: 17, name: "Pink Floral Shirt",      price: 58,  category: "women",   img: "images-webp/imana-UhBh6y_fQ1U-unsplash_result.webp", pos: "center 60%" },
    { id: 18, name: "White Flap Bag",         price: 98,  category: "bags",    img: "images-webp/jametlene-reskp-h7MlL4PsYI4-unsplash_result.webp", badge: "New" },
    { id: 19, name: "Gold Loafers",           price: 69,  oldPrice: 89, category: "shoes", img: "images-webp/mattia-occhi-VEq1k9rArI0-unsplash_result.webp", badge: "Sale", pos: "center 55%" },
    { id: 20, name: "Red Wrap Maxi Dress",    price: 135, category: "dresses", img: "images-webp/vladimir-fedotov-kEC0A-dOw4g-unsplash_result.webp" },
    { id: 21, name: "Houndstooth Top",        price: 42,  category: "women",   img: "images-webp/ziejel-luciano-MhDizgzb8ns-unsplash_result.webp", badge: "New", pos: "center 45%" },
    { id: 22, name: "Tote Bag",               price: 35,  category: "bags",    img: "images-webp/madeinegypt-ca-yLAuhSa_upQ-unsplash_result.webp" },
    { id: 23, name: "Buckle Sandals",         price: 45,  category: "shoes",   img: "images-webp/rydale-clothing-28d3E6aUE4Y-unsplash_result.webp", pos: "center 55%" },
    { id: 24, name: "White Eyelet Mini",      price: 66,  oldPrice: 82, category: "dresses", img: "images-webp/ilona-purdes-6Z1ZodAmLFk-unsplash_result.webp", badge: "Sale", pos: "center 60%" },

    { id: 25, name: "Dotted Chiffon Blouse",  price: 54,  oldPrice: 68, category: "women", img: "images-webp/valentina-schick-TktnthlEj4A-unsplash_result.webp", badge: "Sale", pos: "center 40%" },
    { id: 26, name: "Linen Shift Dress",      price: 58,  category: "dresses", img: "images-webp/reistor-dziVRZYOFpI-unsplash_result.webp", pos: "center 45%" },
    { id: 27, name: "Round Sunglasses",       price: 39,  category: "women",   img: "images-webp/farshad-sheikhzadeh-owqY93X7jGg-unsplash_result.webp", pos: "center 30%" },
    { id: 28, name: "White Lace Kaftan",      price: 64,  category: "dresses", img: "images-webp/muhammad-nadir-HVHIVKAd0R0-unsplash_result.webp", badge: "New", pos: "center 40%" },
    { id: 29, name: "Tortoise Glasses",       price: 45,  category: "women",   img: "images-webp/lance-reis-XdrKZj_K_sQ-unsplash_result.webp", pos: "center 30%" },
    { id: 30, name: "Dress",                  price: 95,  category: "dresses", img: "images-webp/yves-monrique-LR99Ho2eIec-unsplash_result.webp" },
    { id: 32, name: "Lace Bridal Gown",       price: 450, category: "dresses", img: "images-webp/jarvis-couture-bridal-prom-tyler-tx-pX6jHH-X5KY-unsplash_result.webp" },
    { id: 31, name: "Square Neck Dress",      price: 99,  category: "dresses", img: "images-webp/karen-willis-holmes-McLuTG2t4UQ-unsplash_result.webp" },
 ]; 
