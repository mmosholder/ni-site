<template>
  <section class="ni-address-hours -taproom">
    <div class="ni-address-hours-item">
      <p class="ni-address-hours-item-title">Location:</p>
        <div class="ni-address-hours-address">
        <p>{{$store.state.address.ni_address_line1}}</p>
        <p>{{$store.state.address.ni_address_line2}}</p>
        <p>{{$store.state.address.ni_phone}}</p>
      </div>
    </div>
    <div class="ni-address-hours-item">
      <p class="ni-address-hours-item-title">Hours:</p>
      <div class="ni-address-hours-hours">
        <ul>
          <li v-for="(item, i) in $store.state.hours.day_time_blocks" :key="i">
            <p>{{item.days}}</p>
            <h3>{{item.time}}</h3>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
 created() {
    this.$store.dispatch("loadAddress")
    this.$store.dispatch("loadHours")
  }
}
</script>

