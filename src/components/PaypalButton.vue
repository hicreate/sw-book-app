<template>
    <div id="first" class="d-flex align-end">
        <div id="second" class="mx-auto" style="height: 35px;" ref="paypal"></div>
    </div>
</template>

<script>
    export default {
        name: "PaypalBtn",
        data(){
            return{
                loaded: false,
                paidFor: false,
            }
        },
        props:{
            orderTotal: String
        },
        methods:{
            setLoaded: function(){
                this.loaded = true;
                window.paypal
                    .Buttons({
                        fundingSource: window.paypal.FUNDING.PAYPAL,
                        style:{
                            height: 35,
                            shape: 'pill'
                        },
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                intent: 'CAPTURE',
                                purchase_units:[
                                    {
                                        description: "Osprey artisan Co. - Quality, fresh west Highland Salmon",
                                        amount:{
                                            currency_code: 'GBP',
                                            value:this.orderTotal
                                        }
                                    }
                                ]
                            });
                        },
                        onApprove: async (data, actions) => {
                            const order = await actions.order.capture();
                            this.paidFor = true;
                           // console.log(order);
                            this.$emit('orderCon', order);
                        },
                        onError: err => {
                            console.log('there has been an error', err.code);
                        }
                    })
                    .render(this.$refs.paypal);
            }
        },
        mounted(){
            const script = document.createElement("script");
            //script.src = "https://www.paypal.com/sdk/js?client-id=AePe15bFINGJUyJgBwRVwSUSI1yQEYeH_O4-ITeSOAYvKMMK0bCUeJ6aEvof6SxDyd_gB4TaqsI_xkm3&components=buttons&currency=GBP";
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
        }
    }
</script>

<style scoped>

</style>
