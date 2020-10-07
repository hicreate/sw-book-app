<template>
  <div class="py-10">
    <v-card
    class="justify-center text-center pa-5"
    >
      <v-card-actions>
        <div>
          <div>

          </div>
        </div>
      </v-card-actions>
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
<!--        <v-btn color="#8EC645" dark :to="{name: 'Availability'}"><v-icon class="pr-1">fa-suitcase-rolling</v-icon>Book Now </v-btn>-->
        <v-btn color="#8EC645" dark @click="getRedirect" ><v-icon class="pr-1">fa-suitcase-rolling</v-icon>Book Now </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>

  import tourServices from '../services/tourCMSServices'

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
     currentAddress: null
    }
  },
  methods:{
    getRedirect(){
      tourServices.getRedirect(this.currentAddress)
      .then(response => {
        console.log(response.data);
        window.open(response.data, '_self');
      })
    },
    getCurrentPage(){
      this.currentAddress = window.location.href + 'tour-availability'
    }
  },
  mounted(){
      this.getCurrentPage();
  }
}
</script>
