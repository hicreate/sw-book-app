<template>
    <div>
        <v-divider class="py-5" inset></v-divider>
        <v-form
                class="sw-book-form"
                ref="form"
                name="mainBookForm"
        >
            <p style="font-size: 1.5em; font-weight: 500; color:#8EC645;">Lead Customer Details</p>
            <!--        Line 1-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:50%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="First Name"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:50%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Last Name"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>
            <!--        Line 2-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:30%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Date of Birth"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:40%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Email"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:40%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Tel. No"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>
<!--            Additional Customer Details-->
            <p style="font-size: 1.5em; font-weight: 500; color:#8EC645;">Additional Customer Details</p>
            <v-item-group
            multiple
            >
                <div style="width: 100% !important;" v-for="(n, i) in this.number-1" :key="n">
                    <p class="mb-0 pb-0" style="color: #E9BB51;">Additional Customer {{n}}</p>
                    <div class="d-flex">
                        <div
                                style="width:40%;"
                        >
                            <v-text-field
                                    :rules="[rules.required]"
                                    v-model="additionalTravellers[i].firstName"
                                    label="First Name"
                                    elevation="0"
                                    solo
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                        <div
                                style="width:40%;"
                        >
                            <v-text-field
                                    :rules="[rules.required]"
                                    v-model="additionalTravellers[i].lastName"
                                    label="Last Name"
                                    elevation="0"
                                    solo
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                        <div
                                style="width:30%;"
                        >
                            <v-text-field
                                    :rules="[rules.required]"
                                    v-model="additionalTravellers[i].dob"
                                    label="Date of Birth"
                                    elevation="0"
                                    solo
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                    </div>
                </div>
            </v-item-group>
            <!--        Address Divider-->
            <div class="d-flex" style="width: 100% !important;">
                <v-divider class="py-5" inset></v-divider>
            </div>
            <div class="d-flex" style="width: 100% !important;">
                <p style="font-size: 1.5em; font-weight: 500;color:#8EC645;">Address Details</p>
            </div>
            <!--       Address Line 1-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:30%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="House Name/No."
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:70%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Street"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>

            <!--       Address Line 2-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:50%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Address Line 3"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:50%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Town/City"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>

            <!--       Address Line 3-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:30%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Postcode/Zip"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
                <div
                        style="width:70%;"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Country"
                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>

            <!--        Booking Notes Divider-->
            <div class="d-flex" style="width: 100% !important;">
                <v-divider class="py-5" inset></v-divider>
            </div>
            <div class="d-flex" style="width: 100% !important;">
                <p style="font-size: 1.5em; font-weight: 500;color:#8EC645;">Booking Notes</p>
            </div>
            <div class="d-flex" style="width: 100% !important;">
                <v-textarea
                        label="Please let us know any other details to accompany your booking"
                        elevation="0"
                        solo
                        class="ma-2"
                >
                </v-textarea>
            </div>
            <div class="d-flex px-5" style="width: 100% !important;">
               <v-checkbox
                       :rules="[rules.required]"
                       label="I confirm I am happy for my details to be processed in accordance with the published privacy policy."></v-checkbox>
            </div>
            <!--        Booking Notes Divider-->
            <div class="py-9" style="width: 100% !important;">
                <v-divider></v-divider>
            </div>
<!--            <div>-->
<!--                <v-card>-->
<!--                    <v-card-title>Price Breakdown</v-card-title>-->
<!--                    <v-card-subtitle>check out how your holiday price is calculated and the value of what is due to be paid to secure your Spirit Journey today!</v-card-subtitle>-->
<!--                </v-card>-->
<!--            </div>-->
            <v-slide-y-transition>
                <div v-if="!this.showPayment" class="d-flex flex-row justify-center" style="width: 100% !important;">
                    <v-btn dark large ripple class="mt-5" color="#E9BB51" @click="this.handleSubmit"><v-icon class="pr-1">fa-money-bill-wave</v-icon>Proceed to Payment</v-btn>
                </div>
            </v-slide-y-transition>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "BookingForm",
        props:{
            number: Number
        },
        data(){
            return{
                showPayment: false,
                rules: {
                    required: value => !!value || 'This field is required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                    maxLength: value => value.length < 255 || '255 characters max',
                },
            }
        },
        methods:{
            handleSubmit() {
                //console.log("form", this.form);
                if(this.$refs.form.validate()){
                    this.loading = true;
                    this.showPayment = true
                } else{

                    //remove this in production
                    this.loading = true;
                    this.showPayment = true
                }
            },
        },
        computed:{
            additionalTravellers(){
                let number = [];
                for (let step = 1; step < this.number; step++){
                    number.push({
                        id: step,
                        firstName: null,
                        lastName: null,
                        dob: null
                    })
                }
                return number;
            }
        },
        watch:{
            showPayment: function () {
                this.$emit('paymentnow', this.showPayment);
            },
        }
    }
</script>

<style scoped>

</style>