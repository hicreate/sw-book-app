<template>
  <div>
    <v-app>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </v-app>
  </div>
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
   -webkit-box-shadow: 0 0 0px rgba(0,0,0,0);
  box-shadow: 0 0 15px rgba(0,0,0,0)
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
</style>
