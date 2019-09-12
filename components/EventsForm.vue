<template>
    <section class="ni-form ni-form-events" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-form-events-title">
          <h2>{{blok.title}}</h2>
        </div>
      </div>
      <div class="ni-row">
        <div class="ni-form-events-text">
          <p v-if="!isSubmitted">{{blok.text}}</p>
          <p v-else-if="error">Sorry! There's been an error submitting your form. Please try again later.</p>
          <p v-else-if="isSubmitted">Thanks for your message! We'll get back you to you as soon as we can. Cheers!</p>
        </div>
        <div class="ni-form-form ni-form-contact-form">
          <form @submit.prevent="validate" v-if="!isSubmitted">
            <div class="ni-row">
              <div class="form-group">
                <label for="name">Name &#42;</label>
                <input type="text" v-model="name" placeholder="Your Name">
                <span v-if="$v.name.$error" class="error">Name is required</span>
              </div>
              <div class="form-group">
                <label for="emial">Email &#42;</label>
                <input type="email" v-model="email" placeholder="you@email.com">
                <span v-if="$v.email.$error" class="error">A valid email is required</span>
              </div>
            </div>
              <div class="ni-row">
                <div class="form-group">
                  <label for="phoneNumber">Phone Number</label>
                  <input type="text" v-model="phone" placeholder="(303) 555-5555">
                  <span v-if="$v.phone.$error" class="error">A valid phone number is required</span>
                </div>
                <div class="form-group">
                  <label for="eventDate">Event Date</label>
                  <datepicker v-model="date" name="eventDate"></datepicker>
                </div>
              </div>

            <div class="ni-row">
              <div class="form-group form-group-full">
                <label for="message">Message</label>
                <textarea name="message" v-model="message" cols="30" rows="10"></textarea>
                <span v-if="$v.message.$error" class="error">Message is required</span>
              </div>
            </div>
            <input type="hidden" v-model="hidden">
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
import axios from "axios";
import { email, minLength, required, numeric } from 'vuelidate/lib/validators'

export default {
  props: ['blok'],

  components: {
    'datepicker': () => import('vuejs-datepicker')
  },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      date: "",
      message: "",
      hidden: "",
      isSubmitted: false,
      submitting: false,
      error: false
    }
  },

  validations: {
    name: {
      required
    },
    message: {
      required
    },
    phone: {
      numeric,
      required
    },
    email: {
      required,
      email: email
    }
  },

  methods: {
    validate () {
      this.$v.$touch();

      if (this.$v.$error || this.submitting || this.hidden.length > 0) {
        return
      }
      this.formSubmit()
    },

    formSubmit () {
      this.submitting = true;
      this.error = false;
      axios.post('/api/events', {
          name: this.name,
          email: this.email,
          msg: this.message,
          date: this.date,
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
  },
}
</script>

