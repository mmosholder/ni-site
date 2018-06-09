<template>
  <section class="ni-contact-top" v-editable="blok">
    <div class="ni-container">
      <div class="ni-row">
        <div class="ni-contact-top-content">
          <h2>{{blok.title}}</h2>
          <ContactAddress />
        </div>
        <div class="ni-contact-top-map">
          <img src="~/assets/images/map-square.png" alt="Map showing New Image's Brewpub location at 5622 Yukon Street, Arvada CO 80002">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ContactAddress from '~/components/ContactAddress'

export default {
  props: ['blok'],

  components: {ContactAddress}
}
</script>


