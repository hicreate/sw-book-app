<template>
    <div class="sw-book-form d-flex flex-row pt-5 grey lighten-5 pa-5">
        <div
                style="width: 50%;"
                class="px-2 d-flex flex-row align-center"
        >
            <v-chip
                color="green"
                class="white--text mr-1"
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
        </div>
        <div style="width:50%;">
            <p>How many people are travelling?</p>
            <v-radio-group
            row='true'
            v-model="selected"
            mandatory
            :rules="[rules.required]"
            >
                <v-radio class="pb-1" v-for="(x, key) in number" :key="key" :label=x.value :value=x.value></v-radio>
            </v-radio-group>
        </div>
    </div>
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
                maxNumber: 11,
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
                if(this.minNumber === 2){
                    for (let step = 2; step < this.maxNumber; step++) {
                        // Runs 5 times, with values of step 0 through 4.
                        this.number.push({
                            name: step,
                            value: step
                        })
                    }
                } else {
                    for (let step = 1; step < this.maxNumber; step++) {
                        // Runs 5 times, with values of step 0 through 4.
                        this.number.push({
                            name: step,
                            value: step
                        })
                    }
                }

            },
            calcMin(x){
                let min;
                if(x.has_f){
                    min = 2;
                } else {
                    min = 1;
                }
                this.minNumber = min;
                this.number = [];
                this.populateNumber();
            }
        },
        computed:{
        },
        mounted(){
        },
        watch:{
            selected: function () {
                this.$emit('number-travellers', this.selected);
            },
            details: function (newVal) {
                console.log(newVal.has_f);
                this.calcMin(newVal);
            },
        }
    }
</script>

<style scoped>

</style>