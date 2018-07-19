
<template>
  <div>
    <table class="table is-hoverable">
      <thead>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>SubTotal</th>
      </thead>
      <tbody v-for="(order, index) in cart" :key="index">
        <td>{{order.name}}</td>
        <td>{{order.price}}</td>
        <td>{{order.qty}}</td>
        <td>{{order.qty*order.price}}</td>
      </tbody>
      <tfoot>
        <td colspan="3">Total</td>
        <td>{{total}}</td>
      </tfoot>
    </table>

    <!-- <h1>cart</h1>
    <div v-for="(order, index) in cart" :key="index">
      {{order}}
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapState({
      cart: 'cart',
    }),
    total() {
      return this.cart.map(x => x.price * x.qty).reduce((x, y) => x + y);
    },
    // cart() {
    //   // return this.$store.state.cart;
    //   return this.$store.getters.cart;
    // },
  },
};
</script>
