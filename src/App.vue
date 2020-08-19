<template>
  <div>
    <v-app>
      <keep-alive><router-view></router-view></keep-alive>
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
};
</script>
