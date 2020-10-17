<template>
    <div>
        <v-divider class="py-5"></v-divider>
        <v-form
                class="sw-book-form"
                ref="form"
                name="mainBookForm"
        >
            <p style="font-size: 1.5em; font-weight: 500; color:#8EC645;">Lead Customer Details</p>
            <!--        Line 1-->
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <div
                        class="fifty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="First Name"
                            elevation="0"
                            outlined
                            clearable
                            class="ma-2"
                            v-model="leadTraveller.firstName"
                    >
                    </v-text-field>
                </div>
                <div
                        class="fifty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Last Name"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.surname"
                    >
                    </v-text-field>
                </div>
            </div>
            <!--        Line 2-->
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <div
                        class="thirty-cent"
                >
                    <v-text-field
                            :rules="[rules.required, rules.dob]"
                            label="Date of Birth"
                            placeholder="dd/mm/yyyy"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.dob"
                    >
                    </v-text-field>
                </div>
                <div
                        class="forty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Email"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.email"
                    >
                    </v-text-field>
                </div>
                <div
                        class="forty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Tel. No"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.tel_home"
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
                    <div
                            class="d-flex"
                            :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    >
                        <div
                                class="forty-cent"
                        >
                            <v-text-field
                                    :rules="[rules.required]"
                                    v-model="travellers[i].firstname"
                                    label="First Name"
                                    elevation="0"
                                    clearable
                                    outlined
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                        <div
                                class="forty-cent"
                        >
                            <v-text-field
                                    :rules="[rules.required]"
                                    v-model="travellers[i].surname"
                                    label="Last Name"
                                    elevation="0"
                                    clearable
                                    outlined
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                        <div
                                class="thirty-cent"
                        >
                            <v-text-field
                                    :rules="[rules.required, rules.dob]"
                                    v-model="travellers[i].dob"
                                    label="Date of Birth"
                                    elevation="0"
                                    clearable
                                    placeholder="dd/mm/yyyy"
                                    outlined
                                    class="ma-2"
                            >
                            </v-text-field>
                        </div>
                    </div>
                </div>
            </v-item-group>
            <!--        Address Divider-->
            <div
                    class="d-flex"
                    style="width: 100% !important;"
            >
                <v-divider class="py-5"></v-divider>
            </div>
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <p style="font-size: 1.5em; font-weight: 500;color:#8EC645;">Address Details</p>
            </div>
            <!--       Address Line 1-->
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <div
                        class="thirty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="House Name/No."
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.no"
                    >
                    </v-text-field>
                </div>
                <div
                        class="seventy-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Street"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.street"
                    >
                    </v-text-field>
                </div>
            </div>

            <!--       Address Line 2-->
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <div
                        class="fifty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Address Line 3"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.lineThree"
                    >
                    </v-text-field>
                </div>
                <div
                        class="fifty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Town/City"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.city"
                    >
                    </v-text-field>
                </div>
            </div>

            <!--       Address Line 3-->
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <div
                        class="thirty-cent"
                >
                    <v-text-field
                            :rules="[rules.required]"
                            label="Postcode/Zip"
                            elevation="0"
                            clearable
                            outlined
                            class="ma-2"
                            v-model="leadTraveller.postcode"
                    >
                    </v-text-field>
                </div>
                <div
                        class="seventy-cent"
                >
<!--                    <v-text-field-->
<!--                            :rules="[rules.required]"-->
<!--                            label="Country"-->
<!--                            elevation="0"-->
<!--                            clearable-->
<!--                            outlined-->
<!--                            class="ma-2"-->
<!--                            v-model="leadTraveller.country"-->
<!--                    >-->
<!--                    </v-text-field>-->
                </div>
            </div>

            <!--        Booking Notes Divider-->
            <div
                    class="d-flex"
                    style="width: 100% !important;"
            >
                <v-divider class="py-5"></v-divider>
            </div>
            <div
                    class="d-flex"
                    :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <p style="font-size: 1.5em; font-weight: 500;color:#8EC645;">Booking Notes</p>
            </div>
            <div class="d-flex" style="width: 100% !important;">
                <v-textarea
                        label="Additional booking info"
                        elevation="0"
                        clearable
                        outlined
                        class="ma-2"
                        v-model="leadTraveller.contactNote"
                >
                </v-textarea>
            </div>
            <div class="d-flex px-5" style="width: 100% !important;">
               <v-checkbox
                       :rules="[rules.required]"
                       label="I confirm I am happy for my details to be processed in accordance with the published privacy policy."></v-checkbox>
            </div>
            <!--        Booking Notes Divider-->
            <div
                    :class="{'py-2': $vuetify.breakpoint.smAndDown, 'py-6': $vuetify.breakpoint.smAndUp}"
                    style="width: 100% !important;"
            >
                <v-divider></v-divider>
            </div>
            <v-slide-y-transition>
                <div v-if="!this.showPayment" class="d-flex flex-row justify-center" style="width: 100% !important;">
                    <v-btn dark large ripple class="mt-5" color="#E9BB51" @click="this.handleSubmit"><v-icon class="pr-1">fa-money-bill-wave</v-icon>Proceed to Payment</v-btn>
                </div>
            </v-slide-y-transition>
        </v-form>
    </div>
</template>

<script>
    import BirthdayPicker from "./BirthdayPicker";
    import * as moment from "moment/moment";
    import CountrySelect from "./CountrySelect";

    export default {
        name: "BookingForm",
        components: [
            BirthdayPicker,
            CountrySelect
        ],
        props:{
            number: Number
        },
        data: function() {
            return{
                showPayment: false,
                rules: {
                    required: value => !!value || 'This field is required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                    dob: value => {
                        const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm;
                        return pattern.test(value) || 'provide dob as dd/mm/yyyy'
                    },
                    maxLength: value => value.length < 255 || '255 characters max',
                },
                leadTraveller: {
                    firstName: null,
                    surname: null,
                    email: null,
                    tel_home: null,
                    dob: null,
                    no: null,
                    street: null,
                    lineThree: null,
                    city: null,
                    postcode: null,
                    country: null,
                    contactNote: null
                },
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' },
                ],
                country: null
            }
        },
        methods:{
            formatDOB(dob){
                return moment(dob).format("YYYY-MM-DD");
            },
            save (date) {
                this.$refs.menu.save(date)
            },
            sendTravellerDetails(){
                this.$emit('lead', this.travellerDetails);
            },
            handleSubmit() {
                //console.log("form", this.form);
                if(this.$refs.form.validate()){
                    this.loading = true;
                    this.showPayment = true
                }
                // else{
                //     //remove this in production
                //     this.loading = true;
                //     this.showPayment = true
                // }
            },
        },
        computed:{
            amendedLead(){
                return {
                    firstname: this.leadTraveller.firstName,
                    surname: this.leadTraveller.surname,
                    email: this.leadTraveller.email,
                    tel_home: this.leadTraveller.tel_home,
                    dob: this.formatDOB(this.leadTraveller.dob),
                    address: this.leadTraveller.no + ', ' + this.leadTraveller.street + ', ' + this.leadTraveller.lineThree,
                    city: this.leadTraveller.city,
                    postcode: this.leadTraveller.postcode,
                    country: this.leadTraveller.country,
                    contact_note: this.leadTraveller.contactNote
                }
            },
            travellerDetails(){
              let fullDetails = [];
              let additional = this.travellers;

              fullDetails.unshift(this.amendedLead);
              return fullDetails.concat(additional);
            },
            travellers(){
                let number = [];
                for (let step = 1; step < this.number; step++){
                    number.push({
                        //id: step,
                        firstname: null,
                        surname: null,
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
            travellerDetails: function (){
                this.$emit('travellers', this.travellerDetails);
            },
        }
    }
</script>

<style scoped>
    @media(min-width: 764px){
        .seventy-cent{
            width: 70%;
        }

        .fifty-cent{
            width:50%;
        }

        .forty-cent{
            width: 40%;
        }

        .thirty-cent{
            width: 30%;
        }
    }

    @media(max-width: 763px){
        .seventy-cent{
            width: 100%;
        }

        .fifty-cent{
            width:100%;
        }

        .forty-cent{
            width: 100%;
        }

        .thirty-cent{
            width: 100%;
        }
    }

</style>