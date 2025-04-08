<template>
  <div class="payment-success">
    <b-container>
      <div class="text-center py-5">
        <b-icon icon="check-circle" font-scale="5" variant="warning" class="mb-4 success-icon" />

        <h1 class="payment-title mb-4">Payment Successful!</h1>
        <p class="lead mb-4">Thank you for your order. Your order has been placed and is being processed.</p>

        <div class="order-details p-4 mx-auto curved-box" style="max-width: 500px;">
          <h4 class="mb-3 section-heading">Order Details</h4>
          <p><strong>Order Number:</strong> #{{ orderNumber }}</p>
          <p><strong>Date:</strong> {{ orderDate }}</p>

          <hr>

          <p>An email with your order details has been sent to your email address.</p>
          <p class="mb-0">You will receive a confirmation when your order ships.</p>
        </div>

        <div class="mt-5">
          <b-button variant="primary" to="/" class="mx-2 rounded-pill px-4">
            <b-icon icon="bag" class="mr-2" /> Continue Shopping
          </b-button>
          <b-button variant="outline-warning" to="/contact" class="mx-2 rounded-pill px-4">
            <b-icon icon="headset" class="mr-2" /> Contact Support
          </b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'PaymentSuccessView',
  data() {
    return {
      orderNumber: Math.floor(Math.random() * 1000000) + 10000,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.payment-success {
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.payment-title {
  color: #e67e22;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.section-heading {
  color: #e67e22;
  border-bottom: 2px solid #f7f7f7;
  padding-bottom: 10px;
  font-weight: 600;
}

.success-icon {
  color: #e67e22;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.order-details {
  border-radius: 15px;
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #fff6f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.curved-box {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

hr {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-color: rgba(230, 126, 34, 0.2);
}
</style>
