<template>
  <div class="py-10">
    <v-card
    class="justify-center text-center pa-5"
    >
      <v-card-title
      class="text-center justify-center"
      >
        Book your tour today!
      </v-card-title>
      <v-card-subtitle>
        Book direct with us for the best rates. Click below to explore availability and confirm your booking.
      </v-card-subtitle>
      <v-card-actions
      class="justify-center"
      >
        <v-btn color="#8EC645" dark :to="{name: 'Availability'}"><v-icon>mdi-ab-testing</v-icon>Book Now </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
