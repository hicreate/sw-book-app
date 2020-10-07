<template>
    <div>
        <v-fade-transition
                v-if="!showReceipt"
        >
            <div
                    id='app'>
                <v-card class="pa-8 d-flex flex-column justify-center">
                    <div style="min-height: 250px;" v-show="!this.authorising">
                        <v-card-title
                                style="font-size: 1.5em; font-weight: 500; color:#8EC645;"
                                class="py-1 text-center justify-center mb-2"
                        >Card details</v-card-title>
                        <v-card-subtitle
                                class="text-center justify-center mx-auto"
                                style="color:#8EC645;"
                        >We accept all major cards from around the world!</v-card-subtitle>
                        <div
                                id="card-element"
                                class="pa-4 mx-auto"
                                style="background-color:#f7f7f7;border-radius: 8px; max-width: 75%;"
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
                v-else
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
                    >{{this.receipt.payMessage}}
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
                <v-card-text>A receipt has been emailed to you. Thank you for your order!</v-card-text>
                <v-card-actions
                        class="text-center justify-center"
                >
                    <v-btn
                            class="justify-center"
                            :to="{name:'Product List'}"
                            color="primary"
                    >
                        Back to Shop
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-fade-transition>

    </div>
</template>

<script>
    //import ProductService from "../services/ProductService";
    export default {
        data() {
            return {
                complete: false,
                //stripeApiToken: 'pk_live_ogpXbBFRWSrKxBIEzkENnb3z00LgcjSRSV',
                stripeApiToken: 'pk_test_1L1iEh31DiCIkjZgKAT1huxz00JzNhjpIO',
                compToken: '',
                stripe: '',
                elements: '',
                card: '',
                errorMessage: '',
                showSubmit: false,
                showPaypal: true,
                loadingBtn: '',
                showReceipt: false,
                receipt: {
                    refNo: '',
                    paymentMethod: '',
                    payAmount: '',
                    payMessage: 'Success Your Payment was Processed'
                },
                authorising: false,
            }
        },
        props: {
            paypalReceipt: Object
        },
        components: {},
        methods: {
            submitPayment(){
                this.authorising = true;
                this.showSubmit = false;
            },
            errorUpdate(event) {
                console.log(event.target.value);
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
                            fontSize: "18px",
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
            confirmPayment(clientSecret) {
                this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: this.card,
                    }
                }).then(
                    response => {
                        if (response.paymentIntent.status === 'succeeded') {
                            this.paymentCaptured(response);
                        }
                    }
                )
            },
            isPaypalReceiptEmpty() {
                const evar = JSON.stringify(this.paypalReceipt) !== '{}'
                return evar;
            },
            paymentCaptured(response) {
                if (this.isPaypalReceiptEmpty()) {
                    this.receipt.payAmount = response.purchase_units[0].amount.value;
                    this.receipt.paymentMethod = "Paid by Paypal, with email " + response.payer.email_address;
                    this.receipt.refNo = response.id;
                } else {
                    this.receipt.payAmount = response.paymentIntent.amount / 100;
                    this.receipt.paymentMethod = response.paymentIntent.payment_method_types[0];
                    this.receipt.refNo = response.paymentIntent.id;
                }
                this.showPaypal = false;
                this.loadingBtn = false;
                this.showReceipt = true;
                this.showSubmit = false;
                this.$store.dispatch('emptyBasket');
            },
        },
        mounted() {
            this.startStripe();
        },
        watch: {
            showSubmit: function () {
                this.$emit('showSubmitChange', this.showSubmit)
            },
            showPaypal: function () {
                this.$emit('showPaypalChange', this.showPaypal)
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
</style>
