<template>
  <section class="ni-form ni-form-sales" id="sales" v-editable="$store.state.salesForm" v-if="$store.state.salesForm">
    <div class="ni-container">
      <div class="ni-form-container">
        <div class="ni-row">
          <div class="ni-form-sales-title">
            <h2>{{$store.state.salesForm.title}}</h2>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-form-sales-text">
            <div v-html="text"></div>
            <p v-if="error">Sorry! There's been an error submitting your form. Please try again later.</p>
            <p v-else-if="isSubmitted">Thanks for your message! We'll get back you to you as soon as we can. Cheers!</p>
          </div>
          <div class="ni-form-form ni-form-sales-form">
            <form @submit.prevent="validate" v-if="!isSubmitted">
              <div class="ni-row">
                <div class="form-group">
                  <label for="firstName">First Name &#42;</label>
                  <input type="text" v-model="firstName" placeholder="Cold">
                  <span v-show="$v.firstName.$error" class="error">First Name is required</span>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name &#42;</label>
                  <input type="text" v-model="lastName" placeholder="Beer">
                  <span v-show="$v.lastName.$error" class="error">Last Name is required</span>
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group">
                  <label for="email">Email &#42;</label>
                  <input type="email" v-model="email" placeholder="beer@now.com">
                  <span v-show="$v.email.$error" class="error">Email is required</span>
                </div>
                <div class="form-group">
                  <label for="phoneNumber">Phone Number &#42;</label>
                  <input type="text" v-model="phone" placeholder="(303) 555-5555">
                  <span v-show="$v.phone.$error" class="error">Phone is required and must be a number</span>
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group">
                  <label for="location">I have a: &#42;</label>
                  <div class="select">
                    <select name="location" v-model="location">
                      <option disabled selected>Choose One</option>
                      <option value="bar">Bar</option>
                      <option value="retail">Retail Store</option>
                    </select>
                  </div>
                  <span v-show="$v.location.$error" class="error">Location is required</span>
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group form-group-full">
                  <label for="message">Message &#42;</label>
                  <textarea name="message" v-model="message" cols="30" rows="10"></textarea>
                  <span v-show="$v.message.$error" class="error">Message is required</span>
                </div>
              </div>
              <div class="ni-row">
                <div class="ni-form-form-submit">
                  <button class="button button-submit" :disabled="submitting">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import marked from 'marked'
  import axios from 'axios';
  import { email, minLength, required , numeric} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        message: "",
        isSubmitted: false,
        submitting: false,
        error: false
    }
  },

  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    message: {
      required
    },
    phone: {
       numeric,
      required
    },
    location: {
      required
    },
    email: {
      required,
      email: email
    }
  },

  methods: {
    validate () {

      if (this.$v.$error || this.submitting) {
        return
      }
      this.formSubmit()
    },

    formSubmit () {
      this.submitting = true;
      this.error = false;
      axios.post('/api/sales', {
          name: this.firstName + " " + this.lastName,
          email: this.email,
          msg: this.message,
          phone: this.phone,
          location: this.location
        })
        .then(r => {
          this.submitting = false
          this.isSubmitted = true
        })
        .catch(e => {
          this.submitting = false
          this.error = true
          console.error(e)
        })
      }
  },

  computed: {
    text () {
      return marked(this.$store.state.salesForm.text)
    }
  }
}
</script>
