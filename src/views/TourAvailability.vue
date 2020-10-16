<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card id="tour-availability-main">
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
                            <div v-show="this.startPicker">
                                <HowManyTravellers @number-travellers="howManySelected" :details="this.tourDetails" />
                                <OptionsChoices id="options-choices" @picked="onOptionSelect" :options="this.tourOptions" />
                                <v-divider></v-divider>
                            </div>
                        </v-slide-y-transition>

                        <v-slide-y-transition>
                            <div v-if="startPicker" class="pa-4 d-flex align-center">
                                <div>
                                    <div class="pr-10">
                                        <h4 class="overline">Departure Date</h4>
                                        <p style="color:#8EC645; " class="vue-para">{{startPicker}}</p>
                                    </div>
                                    <div>
                                        <h4 class="overline">Return Date</h4>
                                        <p style="color:#E9BB51; " class="vue-para">{{returnDate}}</p>
                                    </div>
                                </div>
                                <v-spacer></v-spacer>
                                <div>
                                    <div class="pa-2 pb-0 mb-0">
                                        <p>Cost for Selected Dates</p>
                                    </div>
                                    <v-sheet
                                            v-if="tourPrice"
                                            class="pa-5 text-center d-flex flex-column"
                                            color="#8EC645"
                                            style="color: #fff; font-size: 1.5em; font-weight: 700;"
                                    ><span>£{{this.tourTotal * this.howMany}}</span><span class="body-2">or, £{{this.tourTotal}} per person</span></v-sheet>
                                    <v-btn block dark large ripple class="mt-5" color="#E9BB51" @click.prevent=advanceBooking><v-icon class="pr-1">fa-plane</v-icon>Book Now></v-btn>
                                </div>
                            </div>
                        </v-slide-y-transition>
                        <v-alert
                                border="left"
                                color="green"
                                dense
                                dismissible
                                type="success"
                                v-model="this.showForm"
                        >Great, your booking has been started - please complete your details within 20 mins to confirm it</v-alert>
                    </v-card-text>
                    <v-slide-y-transition>
                            <div v-show="showForm">
                                <v-card-text>
                                    <BookingForm @paymentnow="showPaymentForm" :number="this.howMany"></BookingForm>
                                </v-card-text>
                            </div>
                    </v-slide-y-transition>
                    <v-slide-y-transition>
                        <div v-show="showPayment">
                            <v-card-text id="payment-form">
                                <StripeCard :value = this.valuePayable />
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
    import OptionsChoices from "../components/OptionsChoices";
    import HowManyTravellers from "../components/HowManyTravellers";
    import StripeCard from "../components/StripeCard";

    export default {
        name: "TourAvailability",
        components:{
          BookingForm,
            OptionsChoices,
            HowManyTravellers,
            StripeCard
        },
        data(){
            return{
                tourId: null,
                tourDates: null,
                startPicker: null,
                returnDate: null,
                tourPrice: null,
                extrasPrice: 0,
                tourOptions: null,
                pickedOptions: null,
                tourDetails: null,
                tourRate: null,
                showForm: false,
                bookableDates: [],
                howMany: null,
                showPayment: false,
                component: {},
                bookingKey: null
            }
        },
        methods:{
            startBooking(){
                tourCMSServices.startBooking(this.bookingKey, this.component.component_key, this.howMany)
                .then(response => {
                    console.log('booking started', response)
                })
            },
            initialiseBooking(){
              this.showForm = false;
              this.showPayment = false;
            },
            getBookingID(){
                const urlParams = new URLSearchParams(window.location.href);
                this.bookingKey = urlParams.get('booking_key');
            },
            advanceBooking(){
               this.showForm = true;
               this.getComponentKey();
            },
            showPaymentForm(value){
              this.showPayment = value;
              this.startBooking();
            },
            onOptionSelect(value){
                this.pickedOptions = value;
            },
            howManySelected(value){
                this.howMany = value;
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
            getComponentKey(){
                //let self = this;
                tourCMSServices.getTourComponentKey(
                    this.tourId,
                    this.startPicker,
                    this.howMany,
                    this.tourRate
                ).then( response => {
                    this.component = response.data.available_components.component[0];
                    console.log(response);
                })
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
            },
            getTourDetails(){
                tourCMSServices.getTourDetails(this.tourId)
                    .then(response => {
                        this.tourDetails = response.data.tour;
                        this.tourOptions = response.data.tour.options.option;
                        this.tourRate = response.data.tour.new_booking.people_selection.rate.rate_id;
                    })
            },
            extrasTotal(){
                if(this.pickedOptions.length > 0){
                    let extras = [];
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;

                    this.pickedOptions.forEach( option => {
                            extras.push(Number(option.from_price))
                        }
                    );
                    this.extrasPrice = extras.reduce(reducer);
                } else {
                    this.extrasPrice = 0
                }
            },
        },
        computed:{
          tourTotal(){
              return (Number(this.tourPrice) + this.extrasPrice)
          },
            valuePayable(){
              return this.tourTotal * this.howMany
            }
        },
        mounted(){
            this.getTours();
            this.getTourDetails();
            this.getBookingID();
        },
        created(){
            this.getTourId();
        },
        watch: {
            startPicker: function () {
                this.getReturn(this.startPicker);
            },
            pickedOptions: function () {
                this.extrasTotal();
                this.initialiseBooking();
            },
            howMany: function () {
                this.initialiseBooking();
            },
        }
    }
</script>

<style scoped>

</style>