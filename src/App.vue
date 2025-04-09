<template>
  <div id="app">
    <header class="main-header">
      <b-navbar toggleable="lg" type="dark" variant="primary" class="rounded-navbar">
        <b-container>
          <b-navbar-brand to="/">
            <p class="brand-text">kkkshop</p>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse" />

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/" exact>Home</b-nav-item>
              <b-nav-item to="/contact">Contact Us</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/cart">
                <b-icon icon="cart" font-scale="1.2" />
                <span v-if="cartCount" class="cart-count">{{ cartCount }}</span>
                Cart
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="bg-primary text-white py-4 mt-5 curved-footer">
      <b-container>
        <b-row>
          <b-col md="4">
            <h5 class="footer-heading">Stay in Touch</h5>
            <p>Follow us for the latest Pakistani fashion trends</p>
            <div class="social-links">
              <a href="#" class="text-white mr-3"><b-icon icon="facebook" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="twitter" /></a>
              <a href="#" class="text-white mr-3"><b-icon icon="instagram" /></a>
            </div>
          </b-col>
          <b-col md="4">
            <h5 class="footer-heading">Shop Categories</h5>
            <ul class="list-unstyled footer-links">
              <li><router-link to="/" class="text-white">Home</router-link></li>
              <li><a href="#" class="text-white">Traditional Dresses</a></li>
              <li><a href="#" class="text-white">Jewelry Collections</a></li>
              <li><a href="#" class="text-white">Bridal Wear</a></li>
              <li><router-link to="/contact" class="text-white">Contact Us</router-link></li>
            </ul>
          </b-col>
          <b-col md="4">
            <h5 class="footer-heading">Contact Us</h5>
            <p><b-icon icon="envelope" /> kkkshop@kkkshop.blog</p>
            <p><b-icon icon="geo-alt" /> Badshahi Complex 6, Lahore, Pakistan</p>
          </b-col>
        </b-row>
        <hr class="bg-white mt-4">
        <div class="text-center">
          <p>&copy; Copyright © 2025 | Powered by Data Network Solutions (SMC-Private) Limited</p>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('initializeProducts')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.main-header {
  margin-bottom: 30px;
}

.rounded-navbar {
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 15px rgba(230, 126, 34, 0.15);
}

.brand-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  color: #ff8c00; /* 橘色 */
  font-size: 1.5rem;
  text-transform: uppercase;
  margin: 0;
  padding: 3px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  background: linear-gradient(45deg, #ff8c00, #e67e22);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.cart-count {
  display: inline-block;
  background-color: #fff;
  color: #e67e22;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

footer {
  margin-top: 50px;
}

.curved-footer {
  border-radius: 20px 20px 0 0;
  position: relative;
  overflow: hidden;
}

.curved-footer:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 C 50 20, 50 20, 100 0 L 100 100 L 0 100 Z" fill="%23ffffff" opacity="0.03"/></svg>');
  background-size: 100px;
}

.footer-heading {
  font-weight: 600;
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.footer-heading:after {
  content: '';
  display: block;
  width: 30px;
  height: 2px;
  background: #fff;
  margin-top: 5px;
  border-radius: 2px;
}

.footer-links li {
  margin-bottom: 8px;
  transition: transform 0.2s;
}

.footer-links li:hover {
  transform: translateX(5px);
}

.social-links a {
  font-size: 1.5em;
  transition: all 0.3s;
  display: inline-block;
}

.social-links a:hover {
  opacity: 0.8;
  transform: scale(1.1);
}
</style>
