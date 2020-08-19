<template>
    <v-container>
        <v-row>
            <v-col>
                <h3>Tour Availability</h3>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "TourAvailability",
        data(){
            return{
                tourId: null
            }
        },
        methods:{
          getTourId(){
              /*global wpData:true*/
              /*eslint no-undef: "error"*/
              this.tourId = `${wpData.tour_id}`;
          }
        },
        mounted(){
this.getTourId();
        }
    }
</script>

<style scoped>

</style>