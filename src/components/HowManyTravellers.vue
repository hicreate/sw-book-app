<template>
    <v-row class="sw-book-form d-flex flex-row pt-5 grey lighten-5 pa-5">
        <v-col
                class="px-2 d-flex"
                :class="{'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row align-center': $vuetify.breakpoint.smAndUp}"
                lg="6"
                cols="12"
        >
            <v-chip
                color="green"
                class="white--text mr-1"
                :class="{'my-1': $vuetify.breakpoint.smAndDown}"
                >
                <v-icon
                        small
                        color="white"
                        class="mr-1"
                >
                    fa-user-friends
                </v-icon>
                min. <span v-if="this.details.has_f">2</span><span v-else>1</span>
            </v-chip>
            <v-chip
                color="orange"
                class="white--text mr-1"
                :class="{'my-1': $vuetify.breakpoint.smAndDown}"
        >
            <v-icon
                    small
                    color="white"
                    class="mr-1"
            >
                fa-umbrella-beach
            </v-icon>
            <span v-if="this.details.categories.group.name">{{this.details.categories.group.name}}</span>
        </v-chip>
            <v-chip
                    color="primary"
                    class="white--text mr-1"
                    :class="{'my-1': $vuetify.breakpoint.smAndDown}"
            >
                <v-icon
                        small
                        color="white"
                        class="mr-1"
                >
                    fa-calendar-alt
                </v-icon>
                <span v-if="this.details.available">{{this.details.available}}</span>
            </v-chip>
        </v-col>
        <v-col
        lg="6"
        cols="12"
        >
            <p class="mb-0">How many people are travelling?</p>
            <p style="font-size:10px !important;" class="overline mb-0">Including adults & children</p>
            <v-radio-group
                    row="true"
            v-model="selected"
            mandatory
            :rules="[rules.required]"
            >
                <v-select
                        outlined
                        placeholder="no. of travellers"
                        class="pb-1"
                        :items="numberTravellers"
                        v-model="selected"
                        attach
                ></v-select>
            </v-radio-group>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "HowManyTravellers",
        props:{
            details: Object
        },
        data(){
            return{
                number: [],
                maxNumber: null,
                minNumber: null,
                selected: null,
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
            populateNumber(){

             },
            calcMin(){

            }
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
            }
        },
        mounted(){
        },
        watch:{
            selected: function () {
                this.$emit('number-travellers', this.selected);
            },
            details: function (newVal) {
                //console.log(newVal.has_f);
                this.calcMin(newVal);
            },
        }
    }
</script>

<style scoped>
    @media(min-width:764px){
        .half-col{
            width: 50%;
        }
    }

    @media(max-width:763px){
        .half-col{
            width: 100%;
        }
    }


</style>