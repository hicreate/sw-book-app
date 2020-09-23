<template>
    <div class="options-cont grey lighten-5">
        <v-list
                flat
                subheader
        >
            <v-subheader>Options/Extras</v-subheader>
            <v-list-item-group
                    v-model="selected"
                    multiple
                    active-class=""
            >
            <v-list-item v-for="option in options" :key="option.option_id">
                <template v-slot:default="{ active }">
                    <v-list-item-action>
                        <v-checkbox color="#8EC645" :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{option.option_name}}</v-list-item-title>
                        <div>
                            <span>from £{{option.from_price}} pp</span>
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
                pickedOptions:[]
            }
        },
        methods:{
            addOption(){
                console.log('Option selected');
                this.pickedOptions = [];
                this.selected.forEach(x => {
                    let picked = this.options[x];
                    this.pickedOptions.push(picked);
                })
            }
        },
        watch:{
            selected: function () {
                this.addOption();
            },
            pickedOptions: function () {
               this.$emit('picked', this.pickedOptions);
            },
        }
    }
</script>

<style scoped>

</style>