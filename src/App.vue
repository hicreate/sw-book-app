<template>
   <v-app id="my-app" class="page-wrapper">
       <div class="content-container">
           <router-view></router-view>
       </div>
    </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  mounted(){
//add a booking button the single tour page header
      var d1 = document.getElementsByClassName('btSingleTourInfoInner');
      d1.insertAdjacentHTML('beforeend', '<div class="custom-book-btn"><div class="hi-book-btn-outer"><a href="#tour-availability-main"><div class="hi-book-btn-outer">Book Now</div></a></div></div>');
  }
};
</script>

<style>
  #tour-start-date-picker table td{
    padding: 0px !important;
  }

  #tour-start-date-picker .v-btn:not(.v-btn--disabled){
    background-color: #8EC645 !important;
    color: #fff;
  }

  .sw-book-form label{
    padding-left: 15px !important;
  }

  .sw-book-form input{
    border: none;
   -webkit-box-shadow: 0 0 0 0 rgba(0,0,0,0);
  box-shadow: 0 0 15px rgba(0,0,0,0)
  }

  input {
      border: none !important;
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
      box-shadow: none !important;
  }

  .sw-book-form textarea{
    border: none;
    -webkit-box-shadow: 0 0 0px rgba(0,0,0,0);
    box-shadow: 0 0 15px rgba(0,0,0,0)
  }

  #input-82{
    background-color: rgba(0,0,0,0);
  }

  .vue-para{
  font-size: 2em;
  font-weight: 700;
    }

  .v-textarea textarea{
        height: 85% !important;
  }

  .content-container {
      position: relative !important;
  }

 .sw-birthday-picker td{
     padding: 0em !important;
 }

 .room-selects .v-input{
     width: 100% !important;
     min-width: 200px;
 }

</style>
