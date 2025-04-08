<template>
  <div class="cart-page">
    <b-container>
      <h1 class="section-title mt-4 mb-5">My Shopping Cart</h1>

      <div v-if="cart.length > 0">
        <b-table
          striped
          hover
          responsive
          :items="cartItems"
          :fields="fields"
          class="cart-table"
        >
          <template #cell(product)="data">
            <div class="d-flex align-items-center">
              <b-img :src="data.item.image" :alt="data.item.name" width="80" class="mr-3 rounded product-thumbnail" />
              <div>
                <router-link :to="'/product/' + data.item.id" class="font-weight-bold">
                  {{ data.item.name }}
                </router-link>
              </div>
            </div>
          </template>

          <template #cell(price)="data">
            {{ currency }}{{ data.item.price.toLocaleString() }}
          </template>

          <template #cell(quantity)="data">
            <b-form-spinbutton
              v-model="data.item.quantity"
              min="1"
              :max="data.item.stock"
              @change="updateQuantity(data.item.id, data.item.quantity)"
              class="quantity-control"
            />
          </template>

          <template #cell(total)="data">
            {{ currency }}{{ (data.item.price * data.item.quantity).toLocaleString() }}
          </template>

          <template #cell(actions)="data">
            <b-button variant="outline-danger" size="sm" @click="removeFromCart(data.item.id)" class="rounded-pill">
              <b-icon icon="trash" /> Remove
            </b-button>
          </template>
        </b-table>

        <div class="cart-summary mt-4">
          <b-row>
            <b-col md="6" offset-md="6">
              <b-card bg-variant="light" class="cart-summary-card curved-box">
                <h4>Cart Summary</h4>
                <hr>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span class="font-weight-bold">{{ currency }}{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span class="font-weight-bold">{{ currency }}1,000</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="h5">Total:</span>
                  <span class="h5 font-weight-bold">{{ currency }}{{ (cartTotal + 1000).toLocaleString() }}</span>
                </div>
                <div class="d-grid">
                  <b-button variant="primary" to="/checkout" class="btn-block rounded-pill py-2">
                    <b-icon icon="credit-card" class="mr-2" /> Proceed to Checkout
                  </b-button>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <b-icon icon="cart-x" font-scale="5" variant="secondary" class="mb-4" />
        <h3>Your cart is empty</h3>
        <p class="text-muted">Looks like you haven't added any products to your cart yet.</p>
        <b-button variant="primary" to="/" class="mt-3 rounded-pill px-4">
          <b-icon icon="bag" class="mr-2" /> Continue Shopping
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartView',
  data() {
    return {
      fields: [
        { key: 'product', label: 'Product' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'total', label: 'Total' },
        { key: 'actions', label: '' }
      ]
    }
  },
  computed: {
    ...mapState(['currency']),
    ...mapGetters(['cart', 'cartTotal']),
    cartItems() {
      return this.cart.map(item => ({
        ...item,
        total: item.price * item.quantity
      }))
    }
  },
  methods: {
    updateQuantity(productId, quantity) {
      this.$store.dispatch('updateCartItemQuantity', { productId, quantity })
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId)
      this.$bvToast.toast('Product removed from cart.', {
        title: 'Success',
        variant: 'success',
        solid: true
      })
    }
  }
}
</script>

<style scoped>
.quantity-control {
  width: 100px;
  border-radius: 20px;
}

.cart-summary {
  margin-bottom: 2rem;
}

.cart-summary-card {
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: none;
}

.cart-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.product-thumbnail {
  transition: transform 0.3s ease;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-thumbnail:hover {
  transform: scale(1.05);
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(230, 126, 34, 0.2);
}

/* Empty cart styling */
.cart-page :deep(.bi-cart-x) {
  color: #e67e22;
  opacity: 0.5;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .cart-table {
    font-size: 0.9rem;
  }
  
  .product-thumbnail {
    width: 60px !important;
  }
}
</style>
