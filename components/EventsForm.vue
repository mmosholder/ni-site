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
          <p>{{blok.text}}</p>
        </div>
        <div class="ni-form-form ni-form-contact-form">
          <form action="">
            <div class="ni-row">
              <div class="form-group">
                <label for="name">Name &#42;</label>
                <input type="text" v-model="eventContact.name" placeholder="Your Name">
              </div>
              <div class="form-group">
                <label for="emial">Email &#42;</label>
                <input type="email" v-model="eventContact.email" placeholder="you@email.com">
              </div>
            </div>
            <div class="ni-row">
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" v-model="eventContact.phone" placeholder="(303) 555-5555">
              </div>
              <div class="form-group">
                <label for="eventDate">Event Date</label>
                <datepicker v-model="eventContact.date" name="eventDate"></datepicker>
              </div>
            </div>
            <div class="ni-row">
              <div class="form-group form-group-full">
                <label for="message">Message</label>
                <textarea name="message" v-model="eventContact.message" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="ni-row">
              <div class="ni-form-form-submit">
                <button class="button button-submit" @click.prevent="formSubmit(eventContact)">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  props: ['blok'],

  components: { Datepicker },

  data() {
    return {
      eventContact: {}
    }
  },

  methods: {
    formSubmit(info) {
      console.log(info);
    }
  }
}
</script>

