<template>
    <div>
        <v-fade-transition
                v-if="!showReceipt"
        >
            <div
                    id='app'>
                <h4
                        class="py-1"
                >Card details</h4>
                    <div
                            id="card-element"
                            class="pa-1"
                            style="background-color:#f7f7f7;border-radius: 8px;"
                    >
                    </div>
                <h4
                        class="font-weight-light"
                        style="color:red;"
                        id="card-errors">{{errorMessage}}</h4>
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
                >mdi-star-circle</v-icon>
                <div
                        class="text-center"
                >
                    <v-card-title
                            class="text-center mx-auto justify-center"
                    >{{this.receipt.payMessage}}</v-card-title>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Reference: {{this.receipt.refNo}}</v-card-subtitle>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Paid By: {{this.receipt.paymentMethod}}</v-card-subtitle>
                    <v-card-subtitle
                            class="text-center pa-0"
                    >Amount: £{{this.receipt.payAmount}}</v-card-subtitle>
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
        data () {
            return {
                complete: false,
                //stripeApiToken: 'pk_live_ogpXbBFRWSrKxBIEzkENnb3z00LgcjSRSV',
                stripeApiToken: 'pk_test_51GuyRNGVRXUKKMiHq00lRMoawLXkV0zJT6t52pYSmcIVaySeZ5brZYs5d9QUJuTMi71N6lIsWdS4ifMYqlke6HGx00zkyw7gWH',
                compToken:'',
                stripe: '',
                elements: '',
                card: '',
                errorMessage:'',
                showSubmit: false,
                showPaypal: true,
                loadingBtn:'',
                showReceipt: false,
                receipt: {
                    refNo: '',
                    paymentMethod: '',
                    payAmount:'',
                    payMessage: 'Success Your Payment was Processed'
                }
            }
        },
        props:{
            paypalReceipt:Object
        },
        components: {
        },
        methods: {
            errorUpdate(event){
                console.log(event.target.value);
            },
            // includeStripe( URL, callback ){
            //     let documentTag = document,
            //         tag = 'script',
            //         object = documentTag.createElement(tag),
            //         scriptTag = documentTag.getElementsByTagName(tag)[0];
            //     object.src = '//' + URL;
            //     if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
            //     scriptTag.parentNode.insertBefore(object, scriptTag);
            // },
            startStripe(){
                /* eslint-disable*/
                this.stripe = Stripe(this.stripeApiToken);
                this.elements = this.stripe.elements();
                this.card = this.elements.create('card', {
                    style: {
                        base: {
                            color: "#32325D",
                            backgroundColor:'#f7f7f7',
                            fontWeight: 500,
                            fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
                            fontSize: "16px",
                            fontSmoothing: "antialiased",
                            "::placeholder": {
                                color: "#CFD7DF"
                            }
                        },
                        invalid: {
                            color: "#E25950"
                        }
                    }});
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
            // createIntent(data){
            //     ProductService.createIntent(this.compToken, data)
            //         .then(response => {
            //             //console.log('intent created', response);
            //             this.confirmPayment(response.data.client_secret)
            //         }).catch(error => {
            //         console.log(error)
            //     })
            // },
            confirmPayment(clientSecret){
                this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: this.card,
                    }
                }).then(
                    response => {
                        //console.log("capture response" , response);
                        if(response.paymentIntent.status === 'succeeded'){
                            this.paymentCaptured(response);
                        }
                    }
                )
            },
            isPaypalReceiptEmpty(){
                const evar = JSON.stringify(this.paypalReceipt) !== '{}'
                //console.log(evar);
                return evar;
            },
            paymentCaptured(response){
                if(this.isPaypalReceiptEmpty()){
                    this.receipt.payAmount = response.purchase_units[0].amount.value;
                    this.receipt.paymentMethod = "Paid by Paypal, with email " + response.payer.email_address;
                    this.receipt.refNo = response.id;
                } else {
                    this.receipt.payAmount = response.paymentIntent.amount/100;
                    this.receipt.paymentMethod = response.paymentIntent.payment_method_types[0];
                    this.receipt.refNo = response.paymentIntent.id;
                }
                this.showPaypal = false;
                this.loadingBtn = false;
                this.showReceipt = true;
                this.showSubmit = false;
                this.$store.dispatch('emptyBasket');
            },
            async getToken(){
                this.compToken = await this.$auth.getTokenSilently();
            },
        },
        mounted(){
            this.getToken();
            // this.includeStripe('js.stripe.com/v3/', function(){
            //     this.configureStripe();
            // }.bind(this) );
            this.startStripe();
        },
        watch:{
            showSubmit: function (){
                this.$emit('showSubmitChange', this.showSubmit)
            },
            showPaypal: function (){
                this.$emit('showPaypalChange', this.showPaypal)
            },
            loadingBtn: function (){
                this.$emit('loadBtnChange', this.loadingBtn)
            }
        }
    }
</script>

<style>
    .stripe-card{
        border: 2px solid #000;
        border-radius: 10px;
        padding:10px;
        background-color: #F2F2F2;
    }
    .stripe-card.complete {
        border: 2px solid green;
    }
</style>
