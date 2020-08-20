<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Tour Availability
                    </v-card-title>
                    <v-card-subtitle>Select your desired departure date</v-card-subtitle>
                    <v-card-text>
                        <v-date-picker
                                v-if="bookableDates"
                                id="tour-start-date-picker"
                                elevation="5"
                                show-current
                                v-model="startPicker"
                                full-width
                                header-color="#8EC645"
                                :allowed-dates="getAllowedDates"
                        ></v-date-picker>
                        <v-slide-y-transition>
                            <div v-if="startPicker" class="pa-4 d-flex align-center">
                                <div class="pr-10">
                                    <h4 class="overline">Departure Date</h4>
                                    <p style="color:#8EC645; " class="vue-para">{{startPicker}}</p>
                                </div>
                                <div>
                                    <h4 class="overline">Return Date</h4>
                                    <p style="color:#E9BB51; " class="vue-para">{{returnDate}}</p>
                                </div>
                                <v-spacer></v-spacer>
                                <div>
                                    <div class="pa-2 pb-0 mb-0">
                                        <p>Cost for Selected Dates</p>
                                    </div>
                                    <v-sheet
                                            v-if="tourPrice"
                                            class="pa-5 text-center"
                                            color="#8EC645"
                                            style="color: #fff; font-size: 1.5em; font-weight: 700;"
                                    >£{{tourPrice}}<span class="body-2">pp</span></v-sheet>
                                    <v-btn block dark large ripple class="mt-5" color="#E9BB51" @click.prevent="showForm = true"><v-icon class="pr-1">fa-plane</v-icon>Book Now></v-btn>
                                </div>
                            </div>
                        </v-slide-y-transition>
                    </v-card-text>
                    <v-slide-y-transition>
                            <div v-show="showForm">
                                <v-card-text>
                                    <BookingForm></BookingForm>
                                </v-card-text>
                            </div>
                    </v-slide-y-transition>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import tourCMSServices from "../services/tourCMSServices";
    import * as moment from "moment/moment";
    import BookingForm from "../components/BookingForm";

    export default {
        name: "TourAvailability",
        components:{
          BookingForm
        },
        data(){
            return{
                tourId: null,
                tourDates: null,
                startPicker: null,
                returnDate: null,
                tourPrice: null,
                showForm: false,
                bookableDates: []
            }
        },
        methods:{
            showBookForm(){
               this.showForm = true
            },
            getAllowedDates (value) {
                const date = moment(value);
                const day = date.format("YYYY-MM-DD").toLowerCase();
                return this.bookableDates.includes(day);
            },
            getReturn(startDate){
                const dateEntry = this.tourDates.filter(date => {
                    return date.start_date === startDate
                });
                this.returnDate = dateEntry[0].end_date;
                this.getTourPrice(dateEntry[0]);
            },
            getTourPrice(tour){
                this.tourPrice = tour.price_1
            },
          getTourId(){
              /*global wpData:true*/
              /*eslint no-undef: "error"*/
              this.tourId = `${wpData.tour_id}`;
          },
            getTours(){
              tourCMSServices.getTourDates(this.tourId)
                .then(response => {
                    this.tourDates = response.data;
                    response.data.forEach(date => {
                        const newDate = new Date(date.start_date);
                        this.bookableDates.push(moment(newDate).format('YYYY-MM-DD'));
                    })
                })
            }
        },
        mounted(){
            this.getTours();
        },
        created(){
            this.getTourId();
        },
        watch: {
            startPicker: function () {
                this.getReturn(this.startPicker)
            },
        }
    }
</script>

<style scoped>

</style>