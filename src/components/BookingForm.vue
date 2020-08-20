<template>
    <div>
        <v-divider class="py-5" inset></v-divider>
        <v-form id="sw-book-form">
            <p style="font-size: 1.5em; font-weight: 500; color:#8EC645;">Lead Customer Details</p>
            <!--        Line 1-->
            <div class="d-flex" style="width: 100% !important;">
                <div
                        style="width:50%;"
                >
                    <v-text-field
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
                            label="Tel. No"

                            elevation="0"
                            solo
                            class="ma-2"
                    >
                    </v-text-field>
                </div>
            </div>
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
               <v-checkbox label="I confirm I am happy for my details to be processed in accordance with the published privacy policy."></v-checkbox>
            </div>
            <div class="d-flex" style="width: 100% !important;">
                <v-spacer></v-spacer><v-btn dark large ripple class="mt-5" color="#E9BB51"><v-icon class="pr-1">fa-money-bill-wave</v-icon>Pay For Booking</v-btn>
            </div>

        </v-form>
    </div>

</template>

<script>
    export default {
        name: "BookingForm"
    }
</script>

<style scoped>

</style>