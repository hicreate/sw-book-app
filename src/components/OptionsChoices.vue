<template>
    <div class="options-cont grey lighten-5">
        <v-list
                flat
                subheader
        >
            <v-subheader>Options/Extras</v-subheader>
            <v-list-item-group
                    v-if="cleanOptions"
                    v-model="selected"
                    multiple
                    active-class=""
            >

            <v-list-item v-for="option in cleanedOptions" :key="option.option_id">
                <template v-slot:default="{ active }">
                    <v-list-item-action>
                        <v-checkbox color="#8EC645" :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{option.option_name}}</v-list-item-title>
                        <div>
                            <span>from £{{option.from_price}}{{optionFrequency(option)}}</span>
                        </div>
                    </v-list-item-content>
                </template>
            </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "OptionsChoices",
        props:{
          options: Array,
        },
        data(){
            return{
                selected: [],
                pickedOptions:[],
                cleanedOptions: null
            }
        },
        methods:{
            addOption(){
                //console.log('Option selected');
                this.pickedOptions = [];
                this.selected.forEach(x => {
                    let picked = this.cleanedOptions[x];
                    this.pickedOptions.push(picked);
                })
            },
            //take the raw options and remove any that state 'Single Supplement'
            cleanOptions(){
                if(this.options){
                    let op = this.options.filter(x => {
                        return x.option_name !== 'Single Supplement'
                    });
                    this.cleanedOptions = op;
                }
            },
            optionFrequency(option){
                if(option.group === "2"){
                    return ' per room'
                } else if(option.group === "4"){
                    return ' per booking'
                } else {
                    return ' per person'
                }
            }
        },
        mounted() {
            this.cleanOptions();
        },
        watch:{
            selected: function () {
                this.addOption();
            },
            pickedOptions: function () {
               this.$emit('picked', this.pickedOptions);
            },
            options: function(){
                this.cleanOptions();
            }
        }
    }
</script>

<style scoped>

</style>
