<template>
    <div>
        <v-fade-transition
                v-if="!showReceipt"
        >
            <div
                    id='app'>
                <v-card
                        :class="{'pa-2 d-flex flex-column justify-center': $vuetify.breakpoint.smAndDown, 'pa-8 d-flex flex-column justify-center': $vuetify.breakpoint.smAndUp}"
                >
                    <div style="min-height: 250px;" v-show="!this.authorising">
                        <v-row
                                class="d-flex my-2 mx-0"
                                :class="{'mx-0 mt-0': $vuetify.breakpoint.smAndDown}"
                                style="width: 100% !important;"
                        >
                            <v-col
                            cols="12"
                            md="8"
                            class="green lighten-5"
                            >
                                <v-card-title
                                        color="primary"
                                        style="font-size: 1.5em; font-weight: 500;"
                                        class="py-1 text-left mb-2"
                                >Card details</v-card-title>
                                <v-card-subtitle
                                        class="text-left mx-auto"
                                        style="color:#8EC645;"
                                >We accept all major cards from around the world!</v-card-subtitle>
                                <v-img
                                        src="https://spiritjourneysworldwide.com/wp-content/uploads/2020/10/creditcards.png"
                                        max-width="164px"
                                        class="ml-5"
                                ></v-img>
                            </v-col>

                            <v-col
                                    class="pa-0"
                                    cols="12"
                                    md="4"
                                    color="#8EC645"
                            >
                                <v-sheet
                                        class="text-center d-flex flex-column"
                                        :class="{'pa-2 my-2': $vuetify.breakpoint.smAndDown, 'pa-5': $vuetify.breakpoint.smAndUp}"
                                        color="#8EC645"
                                        style="color: #fff; font-size: 1.5em; font-weight: 700;"
                                        id="payableToday"
                                ><v-row>
                                    <v-col
                                            cols="3"
                                            class="d-flex justify-center align-center"
                                    >
                                        <v-icon
                                                :class="{'pa-0': $vuetify.breakpoint.smAndDown}"
                                                dark
                                        >fa-credit-card</v-icon>
                                    </v-col>
                                    <v-col
                                            cols="9"
                                            class="d-flex flex-column justify-center align-center"
                                    >
                                            <span>
                                            £{{(this.totalDeposit / 100).toFixed(2)}}
                                        </span>
                                        <span class="body-2">
                                            payable today
                                        </span>
                                    </v-col>
                                </v-row>
                                </v-sheet>
                            </v-col>
                        </v-row>

                        <div
                                id="card-element"
                                class="pa-4 mx-auto"
                                style="background-color:#f7f7f7;border-radius: 8px;"
                                :style="{'max-width: 100%; font-size: 1em;': $vuetify.breakpoint.smAndDown, 'max-width: 75%': $vuetify.breakpoint.smAndUp}"
                        >
                        </div>
                        <div
                                class="py-1 text-center justify-center mx-auto"
                                style="max-width: 75%;">
                            <v-card-subtitle
                                    class="font-weight-light"
                                    style="color:red;"
                                    id="card-errors">{{errorMessage}}
                            </v-card-subtitle>
                        </div>
                        <v-card-actions class="d-flex flex-column py-5 justify-center text-center">
                            <!--                        Pay Now button for Stripe-->
                            <div

                                    style="width:100%;"
                            >
                                <v-btn
                                        :disabled="!this.showSubmit"
                                        min-width="220"
                                        class="pa-3 text-center mx-auto justify-center mb-2 white--text"
                                        color="#656EE8"
                                        @click="this.submitPayment"
                                ><v-icon color="white" class="mr-1">fa-credit-card</v-icon>Pay Now</v-btn>
                            </div>
                        </v-card-actions>
                    </div>
                    <v-fade-transition>
                        <div v-show="this.authorising" class="text-center" style="min-height: 250px;">
                            <v-card elevation="0">
                                <v-card-subtitle>Please wait a moment...</v-card-subtitle>
                                <v-card-text>
                                    <v-progress-circular
                                            indeterminate
                                            color="#E9BB51"
                                    ></v-progress-circular>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-fade-transition>
                </v-card>
            </div>
        </v-fade-transition>
        <v-fade-transition
                v-if="this.showReceipt"
        >
            <v-card
                    elevation="0"
                    class="text-center"
            >
                <v-icon
                        class="text-center"
                        x-large
                        color="success"
                >mdi-star-circle
                </v-icon>
                <div
                        class="text-center"
                >
                    <v-card-title
                            class="text-center mx-auto justify-center"
                            v-html="this.receipt.payMessage"
                    >
                    </v-card-title>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Reference: {{this.receipt.refNo}}
                    </v-card-subtitle>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Paid By: {{this.receipt.paymentMethod}}
                    </v-card-subtitle>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Amount: £{{this.receipt.payAmount}}
                    </v-card-subtitle>
                </div>
                <v-card-text>A receipt has been emailed to you. Thank you for your booking!</v-card-text>
                <v-card-actions
                        class="text-center justify-center"
                >
                    <v-btn
                            class="justify-center"
                            :to="{name:'Home'}"
                            color="#8EC645"
                            dark
                    >
                        See More
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-fade-transition>
        <v-fade-transition
                v-if="this.processError"
        >
            <v-card
                    elevation="0"
                    class="text-center pa-2 red lighten-5"
            >
                <v-icon
                        class="text-center"
                        x-large
                        color="error"
                >mdi-alert-circle
                </v-icon>
                <div
                        class="text-center"
                >
                    <v-card-title
                            class="text-center mx-auto justify-center"
                    >
                        There's been a problem!
                    </v-card-title>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >You're payment couldn't be processed, see below for further details.
                    </v-card-subtitle>
                    <v-card-text
                            class="text-center pa-3 red--text"
                    >{{this.processError}}
                    </v-card-text>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Please try again or contact us for assistance.
                    </v-card-subtitle>
                </div>
                <v-card-actions
                        class="text-center justify-center"
                >
                    <v-btn
                            class="justify-center"
                            to="/about-us/contact-us/"
                            color="#8EC645"
                            dark
                    >
                        Contact Us
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-fade-transition>

    </div>
</template>

<script>
    import tourServices from "../services/tourCMSServices";

    export default {
        data() {
            return {
                complete: false,
                stripeApiToken: 'pk_live_c8nWDygQw3HVmjcJ40ONSWQX00YhXWxwQL',
                //stripeApiToken: 'pk_test_1L1iEh31DiCIkjZgKAT1huxz00JzNhjpIO',
                compToken: '',
                stripe: '',
                elements: '',
                card: '',
                errorMessage: '',
                processError: null,
                showSubmit: false,
                showPaypal: true,
                loadingBtn: '',
                showReceipt: false,
                receipt: {
                    refNo: '',
                    paymentMethod: '',
                    payAmount: '',
                    payMessage: 'Success Your Payment<br> was Processed.'
                },
                authorising: false,
            }
        },
        props: {
            paypalReceipt: Object,
            value: Number,
            bookingId: String,
            totalDeposit: Number,
            picked: Array
        },
        components: {
            },
        methods: {
            submitPayment(){
                this.processError = null;
                this.authorising = true;
                //generate a payment intent by sending backend request to generate intent from Stripe
                tourServices.getIntent(this.totalDeposit)
                    .then(result => {
                        //console.log(result.data);
                        if(result.data){
                            this.completePayment(result.data.client_secret)
                        }
                    }).catch(function (error) {
                    //console.log('get intent error', error);
                    this.processError = error.message;
                    this.authorising = false;
                });
            },
            completePayment(cs){
                const self = this;
                this.stripe.confirmCardPayment(cs, {
                    payment_method: {
                        card: this.card,
                        billing_details: {
                        }
                    }
                }).then(function(result) {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        //console.log('complete payment', result);
                        self.authorising = false;
                        self.processError = result.error.message;
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            //console.log("successful payment made" , result);
                            self.receipt.paymentMethod = result.paymentIntent.payment_method_types[0];
                            self.receipt.payAmount = (result.paymentIntent.amount/100).toFixed(2);
                            self.receipt.refNo = result.paymentIntent.id;
                            tourServices.completeBooking(self.bookingId)
                            .then(result => {
                                //console.log(result);
                                if(result.data.error === "OK"){
                                    self.receipt.refNo = self.bookingId;
                                    self.renderReceipt();
                                    self.afterBooking();
                                } else{
                                    console.log('get intent error', result);
                                    self.processError = 'Sorry, there has been an error completing your booking - payment may have been captured, please contact us and we can assist with completing your booking.';
                                    self.authorising = false;
                                    //self.showReceipt = true;
                                }
                            }).catch(function () {
                                //console.log('get intent error', error);
                                self.processError = 'Sorry, there has been an error completing your booking - payment may have been captured with the below details, please contact us and we can assist with completing your booking.';
                                self.authorising = false;
                                //self.showReceipt = true;
                            });
                        }
                    }
                });
            },
            afterBooking(){
                //commit the payment to TourCms once the payment has been captured successfully - promise unresolved
                tourServices.commitPayment(this.bookingId, this.totalDeposit, this.receipt.refNo)
                    .catch(function () {
                        //console.log('commitPayment', error.response);
                        const self = this;
                        self.processError = "There has been an issue fully completing your booking details - contact us for further assistance - quote 'Commit Payment Error'"
                    });

                //raises a new booking note with the details from the picked property on Tour Availability - promise unresolved
                tourServices.roomNote(this.bookingId, 'SERVICE', this.bookingInfo)
                    .catch(function () {
                        //console.log('roomNote Error', error.response);
                        const self = this;
                        self.processError = "There has been an issue fully completing your booking details - contact us for further assistance - quote 'Room Note Commit Error'"
                    });
            },
            renderReceipt(){
                this.authorising = false;
                this.showReceipt = true;
            },
            startStripe() {
                /* eslint-disable*/
                this.stripe = Stripe(this.stripeApiToken);
                this.elements = this.stripe.elements();
                this.card = this.elements.create('card', {
                    style: {
                        base: {
                            color: "#32325D",
                            backgroundColor: '#f7f7f7',
                            fontWeight: 500,
                            fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
                            fontSize: this.inputSize,
                            fontSmoothing: "antialiased",
                            padding: "10px",
                            "::placeholder": {
                                color: "#CFD7DF"
                            }
                        },
                        invalid: {
                            color: "#E25950"
                        }
                    }
                });
                this.card.addEventListener('change', ({error}) => {
                    if (error) {
                        this.errorMessage = error.message;
                    } else {
                        this.errorMessage = '';
                    }
                });
                this.card.addEventListener('change', (event) => {
                    if (event.complete) {
                        this.showSubmit = true;
                        this.showPaypal = false;
                        //console.log("yay")
                    } else if (event.error) {
                        this.showSubmit = false;
                    }
                });
                this.card.mount('#card-element');
            },
        },
        mounted() {
            this.startStripe();
        },
        computed:{
            inputSize(){
                let fontSize = '14px';

                if(this.$vuetify.breakpoint.smAndDown){
                    fontSize = '18px'
                }
                return fontSize;
            },
            creditCards(){
                return require('../assets/creditcards.jpg');
            },
            bookingInfo(){
                let bookString = 'ROOM CONFIGS - ';

                if(this.picked){
                    this.picked.forEach(room => {
                            bookString += 'ROOM = room type:' + room.type + ', ' + 'number of occupants:' + room.numberIn + '  '
                    });
                }

                return bookString;
            }
        },
        watch: {
            showSubmit: function () {
                this.$emit('showSubmitChange', this.showSubmit)
            },
            loadingBtn: function () {
                this.$emit('loadBtnChange', this.loadingBtn)
            }
        }
    }
</script>

<style>
    .stripe-card {
        border: 2px solid #000;
        border-radius: 10px;
        padding: 10px;
        background-color: #F2F2F2;
    }

    .stripe-card.complete {
        border: 2px solid green;
    }

    @media(min-width:764px){
        #payableToday{
            height: 100%;
        }
    }

</style>
