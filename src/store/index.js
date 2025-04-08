import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    currency: 'Rs.'
  },
  getters: {
    products: state => state.products,
    cart: state => state.cart,
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartCount: state => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, { product, quantity }) {
      const existingProduct = state.cart.find(item => item.id === product.id)

      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity
        })
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
    initializeProducts({ commit }) {
      // In a real app, we would fetch from an API
      const products = [
        {
          "id": 1,
          "name": "Luxury Embroidered Cotton Suit 2025 with Bamber Chiffon Dupatta",
          "price": 3095,
          "originalPrice": 5000,
          "description": "3 Pieces Embroidered Cotton Dress with Heavy Embroidered Cotton Front, Plain Cotton Back, Embroidered Cotton Sleeves, Embroidered Daman, Embroidered Bamber Chiffon Dupatta, and Plain Cotton Trouser. Perfect for casual occasions.",
          "category": "Lawn Suits",
          "image": "https://ext.same-assets.com/3092408268/1503751369.jpeg",
          "stock": 15
        },
        {
          "id": 2,
          "name": "Heavy Sequins Embroidered Black Cotton Dress 2025 with Printed Diamond Dupatta",
          "price": 3695,
          "originalPrice": 6000,
          "description": "Elegant black cotton dress with heavy sequins embroidery, featuring a printed diamond dupatta and plain cotton trouser. Perfect for parties and special occasions.",
          "category": "Cotton Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17076-embroidered-lawn-dress.jpg",
          "stock": 12
        },
        {
          "id": 3,
          "name": "All-Over Print Schiffli Embroidered Lawn Dress 2025 with Chiffon Dupatta",
          "price": 3795,
          "originalPrice": 6000,
          "description": "Beautiful lawn dress with all-over print schiffli embroidery, comes with a matching chiffon dupatta and plain trouser. Perfect for summer occasions.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17939-embroidered-lawn-dress.jpg",
          "stock": 18
        },
        {
          "id": 4,
          "name": "Cultural Inspired Embroidered Cotton Dress 2025 with Chiffon Dupatta",
          "price": 3195,
          "originalPrice": 5000,
          "description": "A culturally inspired cotton dress with intricate embroidery details, paired with a matching chiffon dupatta. Ideal for traditional gatherings and events.",
          "category": "Cotton Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17941-embroidered-lawn-dress.jpg",
          "stock": 10
        },
        {
          "id": 5,
          "name": "Elegant 2-Piece Embroidered Summer Lawn Dress 2025",
          "price": 2395,
          "originalPrice": 3500,
          "description": "A stylish 2-piece embroidered lawn dress perfect for summer. Features elegant embroidery details and a comfortable design suitable for daily wear.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17920-2-piece-embroidered-lawn-dress.jpg",
          "stock": 20
        },
        {
          "id": 6,
          "name": "Heavy Panel Embroidered EID Lawn Dress with Chiffon Dupatta",
          "price": 3495,
          "originalPrice": 6000,
          "description": "Special EID collection featuring a lawn dress with heavy panel embroidery, complemented by a chiffon dupatta. Perfect for festive celebrations.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17983-embroidered-lawn-dress.jpg",
          "stock": 15
        },
        {
          "id": 7,
          "name": "3-Piece Vintage-Inspired Faux Pearl & Rhinestone Necklace with Ring, Earrings",
          "price": 1195,
          "originalPrice": 2000,
          "description": "An elegant 3-piece jewelry set featuring a vintage-inspired design with faux pearls and rhinestones. Includes a necklace, matching earrings, and a ring.",
          "category": "Jewellery",
          "image": "https://www.pakstyle.pk/img/products/l/p17919-elegant-fashion-necklace-set.jpg",
          "stock": 25
        },
        {
          "id": 8,
          "name": "4-Piece Trendy Butterfly Shape Jewelry Set with Bracelet, Earring, Necklace and Ring",
          "price": 795,
          "originalPrice": 1500,
          "description": "A trendy butterfly-themed jewelry set consisting of a bracelet, earrings, necklace, and ring. Perfect for adding a whimsical touch to any outfit.",
          "category": "Jewellery",
          "image": "https://www.pakstyle.pk/img/products/l/p17895-butterfly-fashion-jewelry-set.jpg",
          "stock": 30
        },
        {
          "id": 9,
          "name": "Heavy Bridal Long Mala Set with Choker, Earrings and Tikka",
          "price": 2395,
          "originalPrice": 4000,
          "description": "A luxurious bridal jewelry set featuring a long mala, matching choker, earrings, and tikka. Beautifully crafted for the perfect bridal look.",
          "category": "Bridal Jewellery",
          "image": "https://www.pakstyle.pk/img/products/l/p16518-heavy-bridal-mala-set.jpg",
          "stock": 8
        },
        {
          "id": 10,
          "name": "All-Over Print Embroidered EID Lawn Dress 2025 with Chiffon Dupatta",
          "price": 3795,
          "originalPrice": 6000,
          "description": "A stunning EID special lawn dress with all-over print embroidery, complemented by a matching chiffon dupatta. Perfect for festive occasions.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17990-embroidered-lawn-dress.jpg",
          "stock": 12
        },
        {
          "id": 11,
          "name": "IB Swiss Fashion Soft Egyptian Cotton Unstitched Men's Shalwar Kameez",
          "price": 2395,
          "originalPrice": 3500,
          "description": "Premium quality unstitched men's shalwar kameez made from soft Egyptian cotton. Comfortable and elegant for daily and formal wear.",
          "category": "Mens Clothing",
          "image": "https://www.pakstyle.pk/img/products/s/p13709-mens-shalwar-kameez.jpg",
          "stock": 18
        },
        {
          "id": 12,
          "name": "Pack of 2 Unstitched IB Swiss Fashion Soft Egyptian Cotton Men's Suits",
          "price": 4495,
          "originalPrice": 7000,
          "description": "Value pack containing 2 unstitched men's suits made from high-quality Egyptian cotton. Ideal for everyday wear and special occasions.",
          "category": "Mens Clothing",
          "image": "https://www.pakstyle.pk/img/products/l/p13716-pack-of-2-mens-cotton-suits.jpg",
          "stock": 10
        },
        {
          "id": 13,
          "name": "Unstitched Men's Wash n Wear Shalwar Kameez Suit",
          "price": 1295,
          "originalPrice": 2000,
          "description": "Practical and easy-to-maintain unstitched men's shalwar kameez in wash n wear fabric. Comfortable for daily wear with minimal maintenance.",
          "category": "Mens Clothing",
          "image": "https://www.pakstyle.pk/img/products/l/p17958-mens-wash-n-wear-shalwar-kameez.jpg",
          "stock": 22
        },
        {
          "id": 14,
          "name": "Endless Time Men's Day & Date Chain Watch - Silver",
          "price": 2195,
          "originalPrice": 3500,
          "description": "Stylish silver-tone men's watch with day and date features. Features a durable chain strap and elegant dial design suitable for everyday wear.",
          "category": "Mens Watches",
          "image": "https://www.pakstyle.pk/img/products/l/p17000-mens-day-date-chain-watch.jpg",
          "stock": 15
        },
        {
          "id": 15,
          "name": "SKMEI Men's Black Fashion Watch",
          "price": 2395,
          "originalPrice": 4000,
          "description": "Modern black men's watch from SKMEI featuring a sleek design with multiple functions. Water-resistant and durable for daily use.",
          "category": "Mens Watches",
          "image": "https://www.pakstyle.pk/img/products/l/p16127-skmei-men-watch.jpg",
          "stock": 18
        },
        {
          "id": 16,
          "name": "Men's Automatic Skeleton Watch",
          "price": 4995,
          "originalPrice": 8000,
          "description": "Luxury automatic skeleton watch for men showing the intricate movement mechanism. Features a premium design and comfortable strap.",
          "category": "Mens Watches",
          "image": "https://www.pakstyle.pk/img/products/s/p7584-skeleton-automatic-mens-watch.jpg",
          "stock": 7
        },
        {
          "id": 17,
          "name": "Ajmal Carbon Eau De Parfum",
          "price": 6995,
          "originalPrice": 8000,
          "description": "A sophisticated fragrance from Ajmal featuring bold and masculine notes. Long-lasting eau de parfum suitable for evening wear and special occasions.",
          "category": "Mens Perfumes",
          "image": "https://www.pakstyle.pk/img/products/s/p1002-carbon-spray-update.jpg",
          "stock": 10
        },
        {
          "id": 18,
          "name": "Original Rasasi Royale Blue Perfume for Men",
          "price": 3095,
          "originalPrice": 5000,
          "description": "A premium oriental fragrance from Rasasi with fresh and spicy notes. Long-lasting perfume perfect for all seasons.",
          "category": "Mens Perfumes",
          "image": "https://www.pakstyle.pk/img/products/l/p1575-rasasi-royale-blue.jpg",
          "stock": 15
        },
        {
          "id": 19,
          "name": "Original Rasasi Chastity for Men",
          "price": 3995,
          "originalPrice": 6000,
          "description": "An elegant fragrance from Rasasi designed for the modern man. Features a blend of woody and aromatic notes for a sophisticated scent.",
          "category": "Mens Perfumes",
          "image": "https://www.pakstyle.pk/img/products/l/p1602-rasasi-chastity-men.jpg",
          "stock": 12
        },
        {
          "id": 20,
          "name": "Indian Embroidered Black Chiffon Party Wear Maxi Dress",
          "price": 3495,
          "originalPrice": 6000,
          "description": "Elegant black chiffon maxi dress with detailed Indian-style embroidery. Perfect for parties and evening events with its flowing silhouette.",
          "category": "Maxi Dresses",
          "image": "https://www.pakstyle.pk/img/products/l/p17673-indian-embroidered-chiffon-maxi.jpg",
          "stock": 9
        },
        {
          "id": 21,
          "name": "Heavy Embroidered Fancy Chiffon Wedding Dress 2025",
          "price": 4195,
          "originalPrice": 7000,
          "description": "Luxurious wedding dress made from high-quality chiffon with heavy embroidery details. Designed for a stunning bridal appearance on special occasions.",
          "category": "Wedding Dresses",
          "image": "https://www.pakstyle.pk/img/products/s/p15717-embroidered-chiffon-dress.jpg",
          "stock": 8
        },
        {
          "id": 22,
          "name": "Heavy Embroidered Organza Wedding Dress 2025",
          "price": 3195,
          "originalPrice": 5000,
          "description": "Beautiful wedding dress crafted from premium organza fabric with exquisite embroidery. Elegant design suitable for wedding ceremonies and formal events.",
          "category": "Wedding Dresses",
          "image": "https://www.pakstyle.pk/img/products/l/p15424-embroidered-organza-party-dress.jpg",
          "stock": 10
        },
        {
          "id": 23,
          "name": "Luxury Embroidered with Heavy Handwork Organza Bridal Wear Dress 2025",
          "price": 5495,
          "originalPrice": 9000,
          "description": "Stunning bridal dress made from organza fabric featuring luxury embroidery and detailed handwork. Perfect for the bride seeking elegance and tradition.",
          "category": "Bridal Dresses",
          "image": "https://www.pakstyle.pk/img/products/l/p17818-embroidered-organza-bridal-dress.jpg",
          "stock": 5
        },
        {
          "id": 24,
          "name": "Elegant Embroidered EID Lawn Dress 2025 with Emb. Organza Dupatta",
          "price": 4495,
          "originalPrice": 7000,
          "description": "Special EID collection lawn dress with elegant embroidery, complemented by an embroidered organza dupatta. Perfect for festive celebrations.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p17033-embroidered-lawn-dress.jpg",
          "stock": 12
        },
        {
          "id": 25,
          "name": "Luxurious Schiffli Embroidered Lawn Dress with Printed Silk Dupatta",
          "price": 4995,
          "originalPrice": 8000,
          "description": "Premium lawn dress featuring elegant schiffli embroidery, paired with a printed silk dupatta. Sophisticated design for special occasions.",
          "category": "Lawn Suits",
          "image": "https://www.pakstyle.pk/img/products/l/p16939-embroidered-lawn-dress.jpg",
          "stock": 8
        },
        {
          "id": 26,
          "name": "Pair of Adjustable Golden Bracelet Kara for Women",
          "price": 995,
          "originalPrice": 2000,
          "description": "Elegant pair of adjustable golden bracelet karas for women. Versatile design that complements both casual and formal outfits.",
          "category": "Bracelets",
          "image": "https://www.pakstyle.pk/img/products/l/p16480-pair-of-adjustable-bracelet.jpg",
          "stock": 25
        },
        {
          "id": 27,
          "name": "Adorable Ball Shaped Zircon Jewelry Set with Bracelet & Earrings",
          "price": 1195,
          "originalPrice": 2000,
          "description": "Beautiful jewelry set featuring ball-shaped zircon details, includes a matching bracelet and earrings. Perfect for adding sparkle to any outfit.",
          "category": "Jewellery",
          "image": "https://www.pakstyle.pk/img/products/s/p15058-ball-shaped-jewelry-set.jpg",
          "stock": 18
        },
        {
          "id": 28,
          "name": "36 Pairs Mixed Color Earrings Set with Heart Shape Gift Packing",
          "price": 795,
          "originalPrice": 1000,
          "description": "Value set containing 36 pairs of mixed color earrings in various designs. Comes in attractive heart-shaped gift packaging, perfect for gifting.",
          "category": "Earrings",
          "image": "https://www.pakstyle.pk/img/products/l/p17866-36-pairs-earrings-set.jpg",
          "stock": 20
        },
        {
          "id": 29,
          "name": "Luxury Embroidered with Mirror & Handwork Chiffon Bridal Dress 2025",
          "price": 6795,
          "originalPrice": 9000,
          "description": "Exquisite bridal dress crafted from premium chiffon with luxury embroidery, mirror work, and detailed handwork. Perfect for the bride seeking a traditional yet glamorous look.",
          "category": "Bridal Dresses",
          "image": "https://www.pakstyle.pk/img/products/l/p15143-embroidered-chiffon-bridal-dress.jpg",
          "stock": 6
        },
        {
          "id": 30,
          "name": "Tomi Men's Watch with Gift Box",
          "price": 1295,
          "originalPrice": 2500,
          "description": "Stylish Tomi watch for men featuring a modern design and comfortable strap. Comes in an attractive gift box, making it a perfect present option.",
          "category": "Mens Watches",
          "image": "https://www.pakstyle.pk/img/products/l/p16977-tomi-mens-watch.jpg",
          "stock": 22
        }
      ]

      // Add more products to make 35 total

      commit('setProducts', products)
    },
    addToCart({ commit }, { product, quantity = 1 }) {
      commit('addToCart', { product, quantity })
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('updateCartItemQuantity', { productId, quantity })
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
})
