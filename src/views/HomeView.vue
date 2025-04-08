<template>
  <div class="home">
    <b-container>
      <!-- Hero Banner Section -->
      <div class="full-width-banner-container">
        <div class="hero-banner overflow-hidden">
          <img src="https://www.pakstyle.pk/images/slider/party-wear-banner.png" alt="Pakistani Fashion Banner" class="banner-img">
          <div class="banner-overlay d-flex align-items-center justify-content-center">
            <div class="banner-content text-center">
              <h1 class="display-4 mb-3 text-white">ELEGANT PAKISTANI FASHION</h1>
              <p class="lead mb-4 text-white">Discover Premium Quality Traditional Women's Clothing & Exquisite Jewelry</p>
              <div>
                <b-button variant="primary" to="#" class="mr-2 px-4 btn-orange rounded-pill">SHOP NOW</b-button>
                <b-button variant="outline-light" to="/contact" class="rounded-pill">CONTACT US</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Categories -->
      <h2 class="section-title" style="color: #e67e22; font-weight: 600; margin-bottom: 25px;">Shop by Categories</h2>
      <b-row class="mb-5">
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm curved-box category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="gem" font-scale="3" style="color: #e67e22;" />
            </div>
            <h4 class="category-title">Jewelry Collections</h4>
            <p>Discover handcrafted Pakistani jewelry with intricate designs and cultural heritage</p>
            <b-button variant="outline-primary" to="#" class="mt-2 rounded-pill px-4 orange-btn">View Collection</b-button>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm curved-box category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="handbag" font-scale="3" style="color: #e67e22;" />
            </div>
            <h4 class="category-title">Traditional Dresses</h4>
            <p>Explore our range of beautifully designed Pakistani traditional garments</p>
            <b-button variant="outline-primary" to="#" class="mt-2 rounded-pill px-4 orange-btn">Shop Now</b-button>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="text-center h-100 border-0 shadow-sm curved-box category-card">
            <div class="feature-icon mb-3">
              <b-icon icon="stars" font-scale="3" style="color: #e67e22;" />
            </div>
            <h4 class="category-title">Wedding Collection</h4>
            <p>Find the perfect bridal attire and accessories for your special day</p>
            <b-button variant="outline-primary" to="#" class="mt-2 rounded-pill px-4 orange-btn">View Collection</b-button>
          </b-card>
        </b-col>
      </b-row>

      <!-- Products -->
      <h2 class="section-title" style="color: #e67e22; font-weight: 600; margin-bottom: 25px;">Featured Products</h2>
      <b-row>
        <b-col v-for="product in products" :key="product.id" md="4" class="mb-4">
          <b-card
            no-body
            class="product-card h-100 overflow-hidden curved-box"
          >
            <div class="product-img-container">
              <router-link :to="'/product/' + product.id">
                <b-img :src="product.image" :alt="product.name" fluid class="product-img" />
              </router-link>
            </div>
            <div class="p-3">
              <router-link :to="'/product/' + product.id" class="text-dark product-title-link">
                <h5 class="product-title">{{ product.name }}</h5>
              </router-link>
              <div class="mb-3 mt-2">
                <span class="price">{{ currency }}{{ product.price.toLocaleString() }}</span>
                <span v-if="product.originalPrice > product.price" class="original-price ml-2">
                  {{ currency }}{{ product.originalPrice.toLocaleString() }}
                </span>
              </div>
              <div class="product-btn-group">
                <b-button variant="primary" class="mr-2 btn-orange rounded-pill" @click="addToCart(product)">Add to Cart</b-button>
                <b-button variant="outline-primary" :to="'/product/' + product.id" class="rounded-pill btn-outline-orange">View Details</b-button>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <!-- Collection Showcase -->
      <div class="curved-box pakistani-pattern py-4 px-3 my-5">
        <h2 class="section-title mb-4" style="color: #e67e22; font-weight: 600;">New Arrivals</h2>
        <b-row class="mb-3">
          <b-col cols="12">
            <div class="text-center mb-4">
              <p class="lead">Discover our latest collection of traditional Pakistani designs</p>
            </div>
          </b-col>
        </b-row>
        <b-carousel
          id="new-arrivals-carousel"
          :interval="4000"
          controls
          indicators
          background="#fafafa"
          style="border-radius: 15px; overflow: hidden;"
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide img-src="https://www.pakstyle.pk/images/categories/bridal-dresses-2.jpg" caption="Traditional Bridal Wear" class="text-dark" />
          <b-carousel-slide img-src="https://www.pakstyle.pk/img/products/s/p17995-elegant-fashion-jewelry-set.jpg" caption="Luxury Wedding Collection" class="text-dark" />
          <b-carousel-slide img-src="https://www.pakstyle.pk/img/products/s/p17941-embroidered-lawn-dress.jpg" caption="Designer Party Wear" class="text-dark" />
        </b-carousel>
      </div>
      
      <!-- Testimonials -->
      <h2 class="section-title mt-5" style="color: #e67e22; font-weight: 600; margin-bottom: 25px;">What Our Customers Say</h2>
      <b-row>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm curved-box">
            <blockquote class="blockquote mb-0">
              <p>The embroidery on my traditional dress is absolutely stunning. The attention to detail is remarkable!</p>
              <footer class="blockquote-footer">
                <small>Ayesha from Lahore</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm curved-box">
            <blockquote class="blockquote mb-0">
              <p>I received so many compliments on my jewelry set. The craftsmanship is exquisite and truly represents our culture.</p>
              <footer class="blockquote-footer">
                <small>Fatima from Islamabad</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
        <b-col md="4" class="mb-4">
          <b-card class="h-100 border-0 shadow-sm curved-box">
            <blockquote class="blockquote mb-0">
              <p>My wedding dress exceeded all expectations. The design was unique and the fabric quality was outstanding!</p>
              <footer class="blockquote-footer">
                <small>Zainab from Karachi</small>
              </footer>
            </blockquote>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products'])
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', { product, quantity: 1 })
      this.$bvToast.toast(`${product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.feature-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-width-banner-container {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-bottom: 40px;
}

.hero-banner {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.banner-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.banner-content h1 {
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
}

.hero-section {
  background: linear-gradient(135deg, #fff6f0 0%, #ffffff 100%);
  margin-bottom: 30px;
  position: relative;
}

.hero-section h1 {
  color: #e67e22;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.product-card {
  transition: all 0.3s ease;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.product-img-container {
  padding: 15px 15px 0 15px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.4s ease;
}

.product-img:hover {
  transform: scale(1.05);
}

.product-title {
  font-weight: 600;
  margin-top: 10px;
  font-size: 1.1rem;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-title-link:hover {
  text-decoration: none;
}

.product-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn-orange {
  background-color: #e67e22 !important;
  border-color: #e67e22 !important;
}

.btn-orange:hover {
  background-color: #d35400 !important;
  border-color: #d35400 !important;
}

.btn-outline-orange {
  color: #e67e22 !important;
  border-color: #e67e22 !important;
}

.btn-outline-orange:hover {
  background-color: #e67e22 !important;
  color: white !important;
}

.orange-btn {
  color: #e67e22 !important;
  border-color: #e67e22 !important;
}

.orange-btn:hover {
  background-color: #e67e22 !important;
  color: white !important;
}

.category-card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-title {
  color: #e67e22;
  font-weight: 600;
}

.blockquote p {
  font-style: italic;
  position: relative;
  padding-left: 20px;
}

.blockquote p:before {
  content: '\201C';
  font-size: 30px;
  color: #e67e22;
  position: absolute;
  left: 0;
  top: -10px;
}

@media (max-width: 768px) {
  .hero-banner {
    height: 300px;
  }
  
  .banner-content h1 {
    font-size: 2rem;
  }
  
  .banner-content p {
    font-size: 1rem;
  }
}
</style>
