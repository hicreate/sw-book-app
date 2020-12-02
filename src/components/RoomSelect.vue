<template>
    <v-card
    class="mt-5"
    >
        <v-toolbar
                color="#8EC645"
                dark
        >
            <div class="d-flex flex-column mt-2">
                <v-toolbar-title>Room Selection</v-toolbar-title>
                <p class="font-italic">Please select the number of rooms & room types required.</p>
            </div>
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
                    <v-list-item-subtitle style="color: #8EC645 !important;" v-if="picked[i]" v-html="supplementMessage(i)"></v-list-item-subtitle>
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
                            clear-icon="fa-minus-circle"
                            full-width
                            return-object
                            @change="addRoom($event, i)"
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
                    <v-slide-y-transition>
                        <div v-if="picked[i]" class="d-flex flex-row">
                            <v-icon v-if="picked[i].roomNote" class="mr-1" x-small color="primary" >fa-info-circle</v-icon>
                            <p class="primary--text mb-0" v-html="roomNoteShow(i)"></p>
                        </div>
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
                    <v-icon x-small class="mr-1">fa-plus-circle</v-icon> Add Room
                </v-btn>
            <v-btn
                    dark
                    right
                    color="red"
                    @click="onRemove"
            >
                <v-icon x-small class="mr-1" >fa-minus-circle</v-icon> Remove Room
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
                occKey: 0,
                rooms:null,
                selected: null,
                numberRooms: 1,
                picked:[],
                suppMessage: null,
                singleSupp: null,
                hasSupp: false,
                totalTravellers: null,
                currentRoom: []
            }
        },
        methods:{
            //set the rooms whether there is a twin-shared within the staff notes on the property details
            setRooms(){
                   if(this.details && this.details.staff_note === "twin-shared"){
                        this.rooms = [
                            {
                                name: 'Single',
                                min: 1,
                                max: 1,
                                beds: 1,
                                occ:[1],
                            },
                            {
                                name: 'Double',
                                min: 2,
                                max: 2,
                                beds: 1,
                                occ:[1, 2],
                            },
                            {
                                name: 'Twin',
                                min: 2,
                                max: 2,
                                beds: 2,
                                occ:[1, 2],
                            },
                            {
                                name: 'Family',
                                min: 3,
                                max: 4,
                                beds: 3,
                                occ:[1, 2, 3, 4],
                            },
                            {
                                name: 'Twin Shared',
                                min: 1,
                                max: 1,
                                beds: 1,
                                occ:[1],
                                roomNote: "This is a room in a shared twin, allocated by the operator"
                            },
                        ]
                    } else {
                        this.rooms = [
                            {
                                name: 'Single',
                                min: 1,
                                max: 1,
                                beds: 1,
                                occ:[1],
                            },
                            {
                                name: 'Double',
                                min: 2,
                                max: 2,
                                beds: 1,
                                occ:[1, 2],
                            },
                            {
                                name: 'Twin',
                                min: 2,
                                max: 2,
                                beds: 2,
                                occ:[1, 2],
                            },
                            {
                                name: 'Family',
                                min: 3,
                                max: 4,
                                beds: 3,
                                occ:[1, 2, 3, 4],
                            },
                        ]
                    }
            },
            //function to return a supplement message
            supplementMessage(i){
                let room = this.picked[i];

                if(room.supp_req){
                    return room.supp_message;
                } else {
                    return ""
                }
            },

            roomNoteShow(i){
                let room = this.picked[i];

                if(room.roomNote){
                    return room.roomNote;
                } else {
                    return ""
                }
            },

            //method to fire when a new room is completed, checking for the total number of travellers across all rooms
            checkTotalTravellers(){
                let rooms = this.picked.filter(room => {
                    return room.numberIn
                    }
                );

                let travellerArray = [];

                if(rooms.length > 0){
                    for (let step = 0; step < rooms.length; step++) {
                        // Runs through all the rooms
                        let x = rooms[step];
                        travellerArray.push(x.numberIn);
                    }
                }

                let sum = travellerArray.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                }, 0);
                this.totalTravellers = sum;
                this.$emit('total-rooms', this.picked.length);
                console.log(travellerArray);
            },

            //check if a tour has a single supplement, if it does we'll need to charge this against rooms that don't book to full occupancy
            checkForSupp(){
              let foundSupp = this.options.filter(supp => {
                  return supp.option_name === 'Single Supplement'
              });
                if(foundSupp.length > 0){
                    this.singleSupp = foundSupp;
                    this.hasSupp = true;
                }
            },
            addRoom(item, i){

                this.occKey += 1;
                let newRoom = {};
                newRoom.type = item.name;
                newRoom.occ = item.occ;
                newRoom.max = item.max;
                newRoom.min = item.min;
                newRoom.id = this.picked.length;
                newRoom.supp_req = null;
                newRoom.supp_message = null;
                newRoom.supp_value = null;

                if(item.roomNote){
                    newRoom.roomNote = item.roomNote;
                }

                this.picked.splice(i, 1, newRoom);
            },

            //function for firing once occupants have been selected from the new room process
            addOccs(value, key){

                console.log('value', value);
                console.log('key', key);
                this.picked[key].numberIn = value;
                this.checkTotalTravellers();

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

            onRemove(){
                this.removeRoom();
            },

            removeRoom(){
                const removeKey = this.numberRooms - 1;
                let newRooms = this.picked.filter(room => {
                    return room.id !== removeKey
                });
                this.picked = newRooms;
                if(this.numberRooms > 1){
                    this.numberRooms = this.numberRooms - 1;
                }
            },
        },
        computed:{
              totalSingleSupps(){
                let supArray = this.picked.filter(supp=>{
                    return supp.supp_req
                });

                let totalSupps = [];

                //check if there are any instances of a single supplement being required and add the supp_value to an array to be reduced in the next step
                if(supArray.length > 0){
                    for (let step = 0; step < supArray.length; step++) {
                        // Runs through all the picked rooms and their details
                        let x = supArray[step];
                        totalSupps.push(parseFloat(x.supp_value));
                    }
                }

                let sum = totalSupps.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                }, 0);

                return sum;
            },

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
            //check for tour single supplement at component mount
            this.checkForSupp();
            this.setRooms();
        },
        watch:{
            selected: function () {
                this.$emit('number-travellers', this.selected);
            },
            totalTravellers: function(){
                this.$emit('total-travellers', this.totalTravellers);
            },
            totalSingleSupps: function(){
                this.$emit('total-single-supps', this.totalSingleSupps);
            },
            picked:{
                deep: true,
                handler: function () {
                    console.log('watcher fired');
                    this.checkTotalTravellers();
                }
            },
            options: function () {
                this.checkForSupp();
            },
            details: function () {
                this.setRooms();
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