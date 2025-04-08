<template>
  <div class="contact-page">
    <b-container>
      <h1 class="page-title text-center mt-4 mb-5">Contact Us</h1>

      <b-row>
        <b-col lg="6" class="mb-5">
          <b-card class="h-100 curved-box contact-form-card">
            <h4 class="mb-4 section-heading">Send us a message</h4>
            <b-form @submit.prevent="submitForm">
              <b-form-group label="Your Name" label-for="name">
                <b-form-input id="name" v-model="form.name" placeholder="Enter your name" required class="rounded-pill" />
              </b-form-group>

              <b-form-group label="Email Address" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="rounded-pill"
                />
              </b-form-group>

              <b-form-group label="Subject" label-for="subject">
                <b-form-input id="subject" v-model="form.subject" placeholder="Enter message subject" required class="rounded-pill" />
              </b-form-group>

              <b-form-group label="Message" label-for="message">
                <b-form-textarea
                  id="message"
                  v-model="form.message"
                  placeholder="Enter your message"
                  rows="5"
                  required
                  class="rounded-3 message-textarea"
                />
              </b-form-group>

              <b-button type="submit" variant="primary" class="mt-3 rounded-pill px-4">
                <b-icon icon="send" class="mr-2" /> Send Message
              </b-button>
            </b-form>
          </b-card>
        </b-col>

        <b-col lg="6">
          <b-card class="mb-4">
            <h4 class="mb-4 section-heading">Contact Information</h4>
            <p class="lead">
              Have questions about our products or services? Contact us via any of the channels below.
            </p>

            <div class="d-flex align-items-center mb-3">
              <div class="contact-icon mr-3">
                <b-icon icon="geo-alt" font-scale="1.5" variant="warning" />
              </div>
              <div>
                <h5 class="mb-0">Address</h5>
                <p class="mb-0">Badshahi Complex 6, Lahore, Pakistan</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-3">
              <div class="contact-icon mr-3">
                <b-icon icon="envelope" font-scale="1.5" variant="warning" />
              </div>
              <div>
                <h5 class="mb-0">Email</h5>
                <p class="mb-0">
                  <a href="#">kkkshop@kkkshop.blog</a>
                </p>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <div class="contact-icon mr-3">
                <b-icon icon="clock" font-scale="1.5" variant="warning" />
              </div>
              <div>
                <h5 class="mb-0">Business Hours</h5>
                <p class="mb-0">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p class="mb-0">Sunday: Closed</p>
              </div>
            </div>
          </b-card>

          <!-- <b-card class="mb-4">
            <h4 class="mb-4 section-heading">Our Location</h4>
            <div class="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.5068106476365!2d74.30818711499774!3d31.59396848134383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b0b52563a15%3A0x35cb026d88c82a90!2sBadshahi%20Mosque!5e0!3m2!1sen!2s!4v1625245036267!5m2!1sen!2s"
                width="100%"
                height="300"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
              />
            </div>
          </b-card> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // In a real app, we would submit the form to a backend
      this.$bvToast.toast('Your message has been sent. We will get back to you soon!', {
        title: 'Success',
        variant: 'success',
        solid: true
      })

      // Reset the form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.page-title {
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

.contact-form-card {
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.curved-box {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.curved-box:hover {
  transform: translateY(-5px);
}

.message-textarea {
  border-color: #e0e0e0;
  transition: border-color 0.3s ease;
}

.message-textarea:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 0.2rem rgba(230, 126, 34, 0.25);
}

.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(230, 126, 34, 0.1);
  transition: transform 0.3s ease;
}

.contact-icon:hover {
  transform: scale(1.1);
}

.map-responsive {
  overflow: hidden;
  padding-bottom: 0;
  position: relative;
  height: 300px;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
