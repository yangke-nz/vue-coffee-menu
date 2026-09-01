<template>
  <div id="app">
    <main>
      <CoffeeMenu />
    </main>
  </div>
</template>

<script>
import CoffeeMenu from './components/CoffeeMenu.vue';

export default {
  name: 'App',
  components: {
    CoffeeMenu,
  },
};
</script>

<style>
/* Bulma is imported as prebuilt CSS in main.js -- this app overrides none of
   its Sass variables, so there is nothing here to compile. */
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  width: 1024px;
  min-height: 300px;
}
</style>
