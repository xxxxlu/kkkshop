<template>
  <div class="product-detail">
    <b-container v-if="product">
      <b-breadcrumb class="mt-3 pakistani-breadcrumb">
        <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
        <b-breadcrumb-item active>{{ product.name }}</b-breadcrumb-item>
      </b-breadcrumb>

      <b-row>
        <b-col md="5">
          <div class="product-image-container curved-box overflow-hidden">
            <b-img :src="product.image" :alt="product.name" fluid class="mb-3 product-detail-img" />
          </div>
        </b-col>
        <b-col md="7">
          <h1 class="mb-3 product-title">{{ product.name }}</h1>
          <p class="mb-4">{{ product.description }}</p>

          <div class="product-price mb-4">
            <span class="price h4">{{ currency }}{{ product.price.toLocaleString() }}</span>
            <span v-if="product.originalPrice > product.price" class="original-price ml-3">
              {{ currency }}{{ product.originalPrice.toLocaleString() }}
            </span>
            <b-badge variant="warning" pill class="discount-badge ml-3" v-if="product.originalPrice > product.price">
              {{ Math.round((product.originalPrice - product.price) / product.originalPrice * 100) }}% OFF
            </b-badge>
          </div>

          <div class="mb-4">
            <p><span class="feature-label">Category:</span> {{ product.category }}</p>
            <p><span class="feature-label">Availability:</span> <span class="text-success availability-badge">In Stock ({{ product.stock }} available)</span></p>
          </div>

          <div class="product-actions">
            <b-form-group label="Quantity:">
              <b-form-spinbutton v-model="quantity" min="1" :max="product.stock" class="mb-3 quantity-input" style="width: 150px;" />
            </b-form-group>

            <b-button variant="primary" class="mr-2 rounded-pill px-4" @click="addToCart" :disabled="product.stock <= 0">
              <b-icon icon="cart-plus" class="mr-1" /> Add to Cart
            </b-button>
            <b-button variant="warning" to="/checkout" class="rounded-pill px-4" :disabled="product.stock <= 0">
              <b-icon icon="credit-card" class="mr-1" /> Buy Now
            </b-button>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <h3 class="section-title">Product Details</h3>
          <b-card no-body class="product-tabs curved-box">
            <b-tabs card>
              <b-tab title="Description" active>
                <b-card-text>
                  <p>{{ product.description }}</p>
                  <h5>Features:</h5>
                  <ul>
                    <li>High quality cameras with night vision</li>
                    <li>Easy installation and setup</li>
                    <li>Mobile app for remote monitoring</li>
                    <li>Motion detection and alerts</li>
                    <li>Weatherproof and durable design</li>
                    <li>HD video quality</li>
                  </ul>
                </b-card-text>
              </b-tab>
              <b-tab title="Specifications">
                <b-card-text>
                  <b-row>
                    <b-col sm="3"><strong>Brand:</strong></b-col>
                    <b-col>{{ product.name.includes('HIKVISION') ? 'HIKVISION' : 'Dahua' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Model:</strong></b-col>
                    <b-col>{{ product.name.includes('HD') ? 'HD Series' : 'FHD Series' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Cameras:</strong></b-col>
                    <b-col>{{ product.name.match(/\d+/)[0] }} cameras</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Resolution:</strong></b-col>
                    <b-col>{{ product.name.includes('HD') ? '1280x720p' : '1920x1080p' }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Storage:</strong></b-col>
                    <b-col>1TB HDD included</b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="3"><strong>Warranty:</strong></b-col>
                    <b-col>1 Year</b-col>
                  </b-row>
                </b-card-text>
              </b-tab>
              <b-tab title="Reviews">
                <b-card-text>
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary" />
                      <div class="ml-3">
                        <h5 class="mb-0">Shahid Ahmed</h5>
                        <b-form-rating readonly value="5" variant="warning" class="p-0" size="sm" />
                      </div>
                    </div>
                    <p>Great product, easy installation and excellent quality. Very satisfied with my purchase.</p>
                  </div>
                  <hr>
                  <div class="review">
                    <div class="d-flex align-items-center mb-2">
                      <b-avatar variant="primary" />
                      <div class="ml-3">
                        <h5 class="mb-0">Fatima Khan</h5>
                        <b-form-rating readonly value="4" variant="warning" class="p-0" size="sm" />
                      </div>
                    </div>
                    <p>Good quality cameras, the night vision is excellent. Support is also helpful.</p>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>

      <h3 class="section-title mt-5">You May Also Like</h3>
      <b-row>
        <b-col v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" md="3" sm="6" class="mb-4">
          <b-card no-body class="product-card h-100 overflow-hidden">
            <div class="p-3">
              <router-link :to="'/product/' + relatedProduct.id">
                <b-img :src="relatedProduct.image" :alt="relatedProduct.name" fluid class="product-img" />
              </router-link>
              <router-link :to="'/product/' + relatedProduct.id" class="text-dark">
                <h6>{{ relatedProduct.name }}</h6>
              </router-link>
              <div>
                <span class="price">{{ currency }}{{ relatedProduct.price.toLocaleString() }}</span>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <div class="text-center py-5">
        <b-spinner label="Loading..." variant="primary" />
        <p class="mt-3">Loading product details...</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductDetailView',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['products']),
    product() {
      return this.products.find(p => p.id === parseInt(this.id, 10))
    },
    relatedProducts() {
      if (!this.product) return []
      return this.products
        .filter(p => p.id !== parseInt(this.id, 10) && p.category === this.product.category)
        .slice(0, 4)
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', { product: this.product, quantity: this.quantity })
      this.$bvToast.toast(`${this.product.name} added to cart.`, {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.pakistani-breadcrumb {
  background-color: transparent;
  padding: 8px 0;
}

.product-image-container {
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.product-image-container:hover {
  transform: translateY(-5px);
}

.product-detail-img {
  max-height: 400px;
  object-fit: contain;
  width: 100%;
  transition: transform 0.5s ease;
}

.product-detail-img:hover {
  transform: scale(1.02);
}

.product-title {
  color: #e67e22;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.product-price {
  display: flex;
  align-items: center;
}

.discount-badge {
  background-color: #e67e22 !important;
  padding: 0.5em 0.8em;
  font-weight: 600;
}

.feature-label {
  display: inline-block;
  width: 120px;
  font-weight: 600;
  color: #e67e22;
}

.availability-badge {
  font-weight: 600;
  background-color: rgba(40, 167, 69, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
}

.product-tabs {
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.quantity-input {
  border-radius: 20px;
  border-color: #e67e22;
}

.review {
  margin-bottom: 1.5rem;
  padding: 15px;
  border-radius: 15px;
  background-color: #fff6f0;
}

.review:hover {
  box-shadow: 0 2px 10px rgba(230, 126, 34, 0.1);
}

@media (max-width: 768px) {
  .product-detail-img {
    max-height: 300px;
  }
}
</style>
