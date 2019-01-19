<template>
    <section class="ni-form ni-form-contact" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-form-contact-title">
          <h2>{{blok.title}}</h2>
          <p v-if="!isSubmitted">{{blok.text}}</p>
          <p v-else-if="error">Sorry! There's been an error submitting your form. Please try again later.</p>
          <p v-else-if="isSubmitted">Thanks for your message! We'll get back you to you as soon as we can. Cheers!</p>
        </div>
      </div>
      <div class="ni-row">
        <div class="ni-form-form ni-form-contact-form">
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
                <span v-show="$v.email.$error" class="error">A valid email is required</span>
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" v-model="phone" placeholder="(303) 555-5555">
                <span v-show="$v.phone.$error" class="error">A valid phone number is required</span>
              </div>
            </div>
            <div class="ni-row">
              <div class="form-group form-group-full">
                <label for="message">Message</label>
                <textarea name="message" v-model="message" cols="30" rows="10"></textarea>
                <span v-show="$v.email.$error" class="error">Message is required</span>
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
  </section>
</template>

<script>
import { email, minLength, required, numeric } from 'vuelidate/lib/validators'
import axios from 'axios';

export default {
  props: ['blok'],

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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
    email: {
      required,
      email: email
    },
    phone: {
      numeric
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
      axios.post('/api/contact', {
          name: this.firstName + " " + this.lastName,
          email: this.email,
          msg: this.message,
          phone: this.phone
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
  }
}
</script>

