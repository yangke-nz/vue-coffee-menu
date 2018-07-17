
<template>
  <div>
          <h1>cart</h1>
          <div v-for="(order, index) in cart" :key="index">
            {{order}}
          </div>
        </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapState({ cart: 'cart' }),
    // cart() {
    //   // return this.$store.state.cart;
    //   return this.$store.getters.cart;
    // },
  },
};
</script>
