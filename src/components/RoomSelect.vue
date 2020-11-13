<template>
    <v-card
    class="mt-5"
    >
        <v-toolbar
                color="#8EC645"
                dark
        >
            <v-toolbar-title>Room Selection</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>fa-bed</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list class="room-selects pb-0">
            <v-list-item
                    v-for="(n, i) in this.numberRooms"
                    :key="i"
                    class="divided"
            >
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Room {{n}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                style="min-width: 360px;"
                >
                    <v-select
                            outlined
                            height="36"
                            label="Room Type"
                            attach
                            :items="rooms"
                            :item-text="'name'"
                            style="position: relative;"
                            clearable
                            clear-icon="fa-minus-circle"
                            full-width
                            return-object
                            @change="addRoom"
                    >
                    </v-select>
                    <v-slide-y-transition>
                        <v-select
                                outlined
                                v-if="picked[i]"
                                label="No. of Occupants"
                                :items="picked[i].occ"
                                attach
                                @change="addOccs($event, i)"
                        >
                        </v-select>
                    </v-slide-y-transition>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-card-actions
                style="background-color: #EDEDED;"
                class="d-flex justify-end"
        >
                <v-btn
                        dark
                        right
                        color="green"
                        @click="numberRooms++"
                >
                    <v-icon>fa-plus-circle</v-icon> Add Room
                </v-btn>
            <v-btn
                    dark
                    right
                    color="red"
                    @click="removeRoom"
            >
                <v-icon>fa-minus-circle</v-icon> Add Room
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "RoomSelect",
        props:{
            howMany: Number,
            details: Object,
            options: Array
        },
        data(){
            return{
                selected: null,
                rooms: [
                    {
                        name: 'Single',
                        min: 1,
                        max: 1,
                        beds: 1,
                        occ:[1]
                    },
                    {
                        name: 'Double',
                        min: 2,
                        max: 2,
                        beds: 1,
                        occ:[1, 2]
                    },
                    {
                        name: 'Twin',
                        min: 2,
                        max: 2,
                        beds: 2,
                        occ:[1, 2]
                    },
                    {
                        name: 'Family',
                        min: 3,
                        max: 4,
                        beds: 3,
                        occ:[1, 2, 3, 4]
                    },
                ],
                numberRooms: 1,
                picked:[],
                suppMessage: null,
                singleSupp: null,
                hasSupp: false
            }
        },
        methods:{
            checkForSupp(){
              let foundSupp = this.options.filter(supp => {
                  return supp.option_name === 'Single Supplement'
              });
                if(foundSupp.length > 0){
                    this.singleSupp = foundSupp;
                    this.hasSupp = true;
                }
            },
            addRoom(item){
                let newRoom = {};
                newRoom.type = item.name;
                newRoom.occ = item.occ;
                newRoom.max = item.max;
                newRoom.min = item.min;
                newRoom.id = this.picked.length;

                this.picked.push(newRoom);
            },
            addOccs(value, key){
                this.picked[key].numberIn = value;

                if(this.picked[key].numberIn < this.picked[key].min && this.hasSupp){
                    this.picked[key].supp_req = true;
                    this.picked[key].supp_value = this.singleSupp[0].from_price;
                    this.picked[key].supp_message = "Single supplement has been applied";
                } else {
                    this.picked[key].supp_req = false;
                    this.picked[key].supp_value = null;
                    this.picked[key].supp_message = null;
                }
            },
            removeRoom(){
                const removeKey = this.numberRooms - 1;
                let newRooms = this.picked.filter(room => {
                    return room.id !== removeKey
                });
                this.picked = newRooms;
                this.numberRooms = this.numberRooms - 1;
            },
        },
        computed:{
            numberTravellers(){
                let trav = [];
                const min = parseInt(this.details.min_booking_size, 10);
                const max = parseInt(this.details.max_booking_size, 10);

                for (let step = min; step < max+1; step++) {
                    // iterate over each number from min through max and push into array
                    trav.push(
                        step
                    )
                }
                return trav;
            },
            maxTravellers(){
                return parseInt(this.details.max_booking_size, 10);
            },
            minTravellers(){
                return parseInt(this.details.min_booking_size, 10);
            },
        },
        mounted() {
            this.checkForSupp();
        },
        watch:{
            selected: function () {
                this.$emit('number-travellers', this.selected);
            },
            picked:{
                deep: true,
                handler: function () {
                    console.log('watcher fired');
                }
            },
            options: function () {
                this.checkForSupp();
            }
        }
    }
</script>

<style>
    .v-text-field .v-label{
        z-index: 1;
    }

    .divided{
        border-bottom: lightgrey 1px solid;
    }
</style>