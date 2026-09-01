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
html {
  /* The gradient lives here as well so short pages don't leave a white band
     below the content, where the body box stops. */
  background: linear-gradient(to bottom, #555, #999);
}
body {
  min-height: 100vh;
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  box-sizing: border-box;
  /* max-width rather than width, so narrow viewports don't overflow. */
  width: 100%;
  max-width: 1024px;
  min-height: 300px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: 1024px) {
  main {
    margin: 32px auto;
  }
}

@media screen and (max-width: 768px) {
  main {
    padding: 18px;
  }
}
</style>
