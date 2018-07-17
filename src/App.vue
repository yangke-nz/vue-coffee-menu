<template>
  <div id="app">
    <main>
      <CoffeeMenu />
      <shoppingCart />
    </main>
  </div>
</template>

<script>
// import HomePage from './components/HomePage.vue';
import CoffeeMenu from './components/CoffeeMenu.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export default {
  name: 'app',
  components: {
    CoffeeMenu,
    ShoppingCart,
  },
};
</script>


<style>
body {
  background: linear-gradient(to botton, #555, #999);
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
