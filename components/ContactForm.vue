<template>
    <section class="ni-form ni-form-contact" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-form-contact-title">
          <h2>{{blok.title}}</h2>
          <p>{{blok.text}}</p>
        </div>
      </div>
      <div class="ni-row">
        <div class="ni-form-form ni-form-contact-form">
          <form action="">
            <div class="ni-row">
              <div class="form-group">
                <label for="firstName">First Name &#42;</label>
                <input type="text" v-model="contact.firstName" placeholder="Cold">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name &#42;</label>
                <input type="text" v-model="contact.lastName" placeholder="Beer">
              </div>
            </div>
            <div class="ni-row">
              <div class="form-group">
                <label for="email">Email &#42;</label>
                <input type="email" v-model="contact.email" placeholder="beer@now.com">
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" v-model="contact.phone" placeholder="(303) 555-5555">
              </div>
            </div>
            <div class="ni-row">
              <div class="form-group form-group-full">
                <label for="message">Message</label>
                <textarea name="message" v-model="contact.message" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="ni-row">
              <div class="ni-form-form-submit">
                <button class="button button-submit" @click.prevent="formSubmit(contact)">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['blok'],

  data() {
    return {
      contact: {}
    }
  }
}
</script>

