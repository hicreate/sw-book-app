<template>
    <v-container
            id="tour-availability-main"
    >
        <v-row>
            <v-col>
                <v-card id="tour-availability-main">
                    <div
                            :class="{'d-flex flex-column pa-4': $vuetify.breakpoint.smAndDown, 'd-flex justify-space-between pa-4': $vuetify.breakpoint.smAndUp}"
                            style="width: 100%;"
                    >
                        <div>
                            <v-card-title>
                                Tour Availability
                            </v-card-title>
                            <v-card-subtitle>Select your desired departure date</v-card-subtitle>
                        </div>
                        <div
                                class="d-flex flex-column justify-center"
                        >
                            <v-btn
                                    color="primary"
                                    @click="showNext">
                                <v-icon
                                        dark
                                >fa-search</v-icon>
                                Show Next Available Date
                            </v-btn>
                        </div>
                    </div>

                    <v-card-text>
                        <v-date-picker
                                :key="key"
                                v-if="bookableDates"
                                id="tour-start-date-picker"
                                elevation="5"
                                v-model="startPicker"
                                :reactive="true"
                                :show-current="nextDate"
                                full-width
                                header-color="#8EC645"
                                :allowed-dates="getAllowedDates"
                        ></v-date-picker>
                        <v-slide-y-transition>
                            <div v-show="this.startPicker">
                                <!--                            <HowManyTravellers @number-travellers="howManySelected" :details="this.tourDetails" />-->
                                <RoomSelect @picked-rooms="this.pickedRooms" @total-single-supps="this.totalSingleSupplements" @total-travellers="this.totalTravellers" @total-rooms="this.totalRooms" :howMany="this.howMany" :options="this.tourOptions" :details="this.tourDetails" />
                                <OptionsChoices id="options-choices" @picked="onOptionSelect" :options="this.tourOptions" />
                                <v-divider></v-divider>
                            </div>
                        </v-slide-y-transition>

                        <v-slide-y-transition>
                            <v-row v-if="startPicker" class="pa-4 d-flex align-start">
                                <v-col
                                        md="6"
                                        cols="12"
                                >
                                    <div class="pr-10">
                                        <h4 style="line-height: 1.2em;" class="overline">Departure Date</h4>
                                        <p style="color:#8EC645; " class="vue-para">{{formatDepartDate}}</p>
                                    </div>
                                    <div>
                                        <h4 style="line-height: 1.2em;" class="overline">Return Date</h4>
                                        <p style="color:#E9BB51; " class="vue-para">{{formatReturnDate}}</p>
                                    </div>
                                </v-col>
                                <!--                                <v-spacer></v-spacer>-->
                                <v-col
                                        md="6"
                                        cols="12"
                                >
                                    <div class="pa-2 pb-0 mb-0">
                                        <p>Cost for Selected Dates</p>
                                    </div>
                                    <v-sheet
                                            v-if="tourPrice"
                                            class="pa-5 text-center d-flex flex-column mb-1"
                                            color="primary"
                                            style="color: #fff; font-size: 1.5em; font-weight: 700;"
                                    ><v-row>
                                        <v-col
                                                cols="3"
                                                class="d-flex justify-center align-center"
                                        >
                                            <v-icon
                                                    dark
                                            >fa-calculator</v-icon>
                                        </v-col>
                                        <v-col
                                                cols="9"
                                                class="d-flex flex-column"
                                        >
                                            <span>
                                            £{{(this.tourTotal/100).toFixed(2)}}
                                        </span>
                                            <span class="body-2">
                                            or, £{{(this.perPersonTotal/100).toFixed(2)}} per person
                                        </span>
                                        </v-col>
                                    </v-row>
                                    </v-sheet>
                                    <v-sheet
                                            v-if="tourPrice"
                                            class="pa-5 text-center d-flex flex-column"
                                            color="#8EC645"
                                            style="color: #fff; font-size: 1.5em; font-weight: 700;"
                                    ><v-row>
                                        <v-col
                                                cols="3"
                                                class="d-flex justify-center align-center"
                                        >
                                            <v-icon
                                                    dark
                                            >fa-credit-card</v-icon>
                                        </v-col>
                                        <v-col
                                                cols="9"
                                                class="d-flex flex-column"
                                        >
                                            <span>
                                            £{{(this.totalDeposit / 100).toFixed(2)}}
                                        </span>
                                            <span class="body-2">
                                            {{this.deposit * 100}}% deposit payable today
                                        </span>
                                        </v-col>
                                    </v-row>
                                    </v-sheet>
                                    <v-btn block dark large ripple class="mt-5" color="#E9BB51" @click.prevent=advanceBooking><v-icon class="pr-1">fa-plane</v-icon>Book Now></v-btn>
                                    <TravellerNumbersModal :openDialog="showNumberDialog" :details="this.tourDetails" :number="this.howMany" @closeDialog="closeDialogClick"/>
                                </v-col>
                            </v-row>
                        </v-slide-y-transition>

                        <v-alert
                                border="left"
                                color="green"
                                dense
                                dismissible
                                type="success"
                                v-model="this.showForm"
                                :class="{'mob-alert': $vuetify.breakpoint.smAndDown}"
                        >Great, your booking has been started - please complete your details within 20 mins to confirm it</v-alert>
                        <v-alert
                                border="left"
                                dense
                                dismissible
                                type="info"
                                @input="closeAvailability"
                                v-model="this.noAvailability"
                                :class="{'mob-alert': $vuetify.breakpoint.smAndDown}"
                        ><strong>ATTENTION</strong> - Sorry, this tour has no availability right now. Try again shortly.</v-alert>
                    </v-card-text>
                    <v-slide-y-transition>
                        <div v-show="showForm">
                            <v-card-text>
                                <BookingForm @paymentnow="showPaymentForm" @travellers="travellersUpdated" :number="this.howMany"></BookingForm>
                            </v-card-text>
                        </div>
                    </v-slide-y-transition>
                    <div v-if="this.component && this.bookingKey">
                        <v-slide-y-transition>
                            <div v-show="showPayment">
                                <v-card-text id="payment-form">
                                    <StripeCard :picked="this.picked" :totalDeposit="this.totalDeposit" :bookingId="this.bookingID" :value = this.valuePayable />
                                </v-card-text>
                            </div>
                        </v-slide-y-transition>
                    </div>
                    <div v-else>
                        <v-card-text class="text-center pa-0" >Sorry, the site is currently experiencing technical problems. Refresh and retry or try back later.</v-card-text>
                    </div>
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
    import StripeCard from "../components/StripeCard";
    import RoomSelect from "../components/RoomSelect";
    import TravellerNumbersModal from "../components/TravellerNumbersModal";

    export default {
        name: "TourAvailability",
        components:{
            BookingForm,
            OptionsChoices,
            RoomSelect,
            StripeCard,
            TravellerNumbersModal
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
                tourRate:'',
                showForm: false,
                bookableDates: [],
                howMany: 0,
                howManyTravellers: null,
                howManyRooms: null,
                showPayment: false,
                component: {},
                bookingKey: null,
                bookingID: null,
                bookingOptions: null,
                travellers: null,
                deposit: 0.2,
                nextDate: null,
                key: 1,
                totalSupps: null,
                showNumberDialog: false,
                picked: null,
                noAvailability: false
            }
        },
        methods:{
            closeAvailability(){
              this.noAvailability = false;
            },
            pickedRooms(value){
                this.picked = value;
            },
            closeDialogClick(value){
                this.showNumberDialog = value;
            },
            showNext(){
                this.key++;
                this.nextDate = this.nextBookable;
            },
            travellersUpdated(value){
                this.travellers = value;
            },
            startBooking(){
                tourCMSServices.startBooking(this.bookingKey, this.component.component_key, this.howMany, this.travellers, this.bookingOptions)
                    .then(response => {
                        this.bookingID = response.data.booking.booking_id
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
                // console.log(Number(this.howMany));
                // console.log(Number(this.tourDetails.min_booking_size));

                if( Number(this.howMany) >= Number(this.tourDetails.min_booking_size) && Number(this.howMany) <= Number(this.tourDetails.max_booking_size)){
                    this.getComponentKey();
                } else {
                    this.showNumberDialog = true;
                }
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

            //receive the emitted single supp total from the RoomSelect component and set a local variable with the total single supplements added
            totalSingleSupplements(value){
                this.totalSupps = value;
            },
            //take the total number of travellers from the RoomSelect component and set to local variable
            totalTravellers(value){
                this.howMany = value;
            },
            //take the total number of rooms from the RoomSelect component and set to local variable
            totalRooms(value){
                this.howManyRooms = value;
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
                const self = this;
                tourCMSServices.getTourComponentKey(
                    this.tourId,
                    this.startPicker,
                    this.howMany,
                    this.tourRate
                ).then( response => {
                    console.log(response);
                    if(response.data.available_components.component[0]){
                        self.component = response.data.available_components.component[0];
                        this.showForm = true;
                    } else{
                        self.noAvailability = true
                    }
                })
            },
            getTourPrice(tour){
                this.tourPrice = parseFloat(tour.price_1)*100
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
            async getTourDetails(){
                console.log('start fired');
                const self = this;
               tourCMSServices.getTourDetails(this.tourId)
                    .then(response => {
                         console.log('response looking for', response);
                        // console.log('rate is', response.data.tour.new_booking.people_selection.rate.rate_id);
                        // self.tourDetails = response.data.tour;
                        // self.tourOptions = response.data.tour.options.option;
                        // self.tourRate = 'yo';
                        self.setTourDetails(response.data);
                    })
            },
            setTourDetails(data){
                this.tourDetails = data.tour;
                this.tourRate = data.tour.new_booking.people_selection.rate.rate_id;
                if(data.tour.options){
                    this.tourOptions = data.tour.options.option;
                }
            },
            //calculate the total of the currently selected options
            extrasTotal(){
                //check first that there are options
                if(this.pickedOptions.length > 0){
                    let extras = [];
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;

                    //cycle through the options and ascertain if the option is accommodation then multiply by number of rooms, anything else by number of people
                    this.pickedOptions.forEach( option => {
                            if(option.group === "2"){
                                extras.push(Number(option.from_price * this.howManyRooms))
                            } else if (option.group === "4") {
                                extras.push(Number(option.from_price))
                            } else {
                                extras.push(Number(option.from_price * this.howMany))
                            }
                        }
                    );
                    this.extrasPrice = extras.reduce(reducer)*100;
                } else {
                    this.extrasPrice = 0;
                }
            },
            optionsForBooking(){
                const briefOpts = this.pickedOptions;
                const compOpts = this.component.options.option;
                const bookOpts = [];
                const finOpts = [];

                //cycle through the selected options and marry them up with those returned from checkAvailability
                briefOpts.forEach(bOpt=>{
                    const temp = compOpts.filter(cOpts=>{
                        return cOpts.option_name === bOpt.option_name;
                    });
                    bookOpts.push(temp[0]);
                });

                bookOpts.forEach(x=>{
                    const y = x.quantities_and_prices.selection.filter(z=>{
                        return z.quantity === this.howMany.toString();
                    });
                    finOpts.push(
                        {
                            'component_key': y[0].component_key
                        }
                    );
                });

                //set the new array to data
                this.bookingOptions = finOpts;
            }
        },
        computed:{
            //computed property to calculate the total value of the extras by either the number of rooms or the number of people.
            totalExtras(){
                return null
            },
            baseTotal(){
                return (this.tourPrice * this.howMany)
            },
            tourTotal(){
                return (this.baseTotal + this.extrasPrice + this.totalSupps)
            },
            perPersonTotal(){
                let amount = 0.00;
                if(this.tourTotal && this.howMany){
                    amount = this.tourTotal / this.howMany
                }
                return amount;
            },
            valuePayable(){
                return this.tourTotal * this.howMany
            },
            totalDeposit(){
                return (this.tourTotal * this.deposit)
            },
            formatDepartDate(){
                return moment(this.startPicker).format("DD/MM/YYYY");
            },
            formatReturnDate(){
                return moment(this.returnDate).format("DD/MM/YYYY");
            },
            nextBookable(){
                return this.tourDates[0].start_date;
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
            component: function (){
                this.optionsForBooking();
            }
        }
    }
</script>

<style scoped>
    .mob-alert{
        font-size: 0.75em;
    }


</style>
