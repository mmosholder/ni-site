<template>
  <section class="ni-form ni-form-sales" v-editable="$store.state.salesForm" v-if="$store.state.salesForm">
    <div class="ni-container">
      <div class="ni-form-container">
        <hr>
        <div class="ni-row">
          <div class="ni-form-sales-title">
            <h2>{{$store.state.salesForm.title}}</h2>
            <div v-html="text"></div>
          </div>
        </div>
        <div class="ni-row">
          <div class="ni-form-form ni-form-sales-form">
            <form action="">
              <div class="ni-row">
                <div class="form-group">
                  <label for="firstName">First Name &#42;</label>
                  <input type="text" v-model="newSalesInquiry.firstName" placeholder="Cold">
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name &#42;</label>
                  <input type="text" v-model="newSalesInquiry.lastName" placeholder="Beer">
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group">
                  <label for="email">Email &#42;</label>
                  <input type="email" v-model="newSalesInquiry.email" placeholder="beer@now.com">
                </div>
                <div class="form-group">
                  <label for="phoneNumber">Phone Number &#42;</label>
                  <input type="tel" v-model="newSalesInquiry.phone" placeholder="(303) 555-5555">
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group">
                  <label for="location">I have a: &#42;</label>
                  <select name="location" v-model="newSalesInquiry.location">
                    <option disabled selected>Choose One</option>
                    <option value="bar">Bar</option>
                    <option value="retail">Retail Store</option>
                  </select>
                </div>
              </div>
              <div class="ni-row">
                <div class="form-group form-group-full">
                  <label for="message">Message</label>
                  <textarea name="message" v-model="newSalesInquiry.message" cols="30" rows="10"></textarea>
                </div>
              </div>
              <div class="ni-row">
                <div class="ni-form-form-submit">
                  <button class="button button-submit" @click.prevent="formSubmit(newSalesInquiry)">Send Message</button>
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

  export default {
    data() {
      return {
        newSalesInquiry: {}
      }
    },

    computed: {
      text () {
        return marked(this.$store.state.salesForm.text)
      }
    },

    methods: {
      formSubmit(formData) {
        console.log(formData);
      }
    }
  }
</script>
