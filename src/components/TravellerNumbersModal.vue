<template>
    <div class="text-center">
        <v-dialog
                v-model="openDialog"
                width="500"
                persistent
                attach
        >
            <v-card>
                <v-card-title style="color: #ffffff;" class="deep-orange">
                    Sorry, we can't move forward
                </v-card-title>

                <v-card-text class="pt-2 text-left">
                    The number of travellers in your booking does not meet the criteria for this tour, please revise the number in line with the below details:
                </v-card-text>
                <v-card-text>
                    <v-list flat>
                        <v-subheader>BOOKING DETAILS</v-subheader>

                            <v-list-item>
                                <v-list-item-icon class="text-center icon-width justify-center">
                                    <v-icon color="deep-orange"> fa-user</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-left">
                                    <v-list-item-title>Min Persons - <span class="font-weight-bold">{{details.min_booking_size}}</span></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="text-center icon-width justify-center"><v-icon color="deep-orange"> fa-users</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="text-left">
                                <v-list-item-title>Max Persons - <span class="font-weight-bold">{{details.max_booking_size}}</span></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="text-center icon-width justify-center">
                                <v-icon color="deep-orange"> fa-calendar-alt</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="text-left">
                                <v-list-item-title>Current Booking Size - <span class="font-weight-bold">{{number}}</span></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="#8EC645"
                            style="color: #ffffff;"
                            @click="closeDialog"
                    >
                        Return to Booking
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "TravellerNumbersModal",
        props:{
            details: Object,
            openDialog: Boolean,
            number: Number
        },
        methods:{
            closeDialog(){
                this.$emit('closeDialog', false);
            }
        }
    }
</script>

<style scoped>
    .icon-width{
        min-width:64px;
    }

</style>