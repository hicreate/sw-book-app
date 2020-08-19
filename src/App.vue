<template>
  <div>
    <v-app>
      <keep-alive>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
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
};
</script>
