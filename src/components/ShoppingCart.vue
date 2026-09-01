<template>
  <div>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th class="num">
            Price
          </th>
          <th class="num">
            Qty
          </th>
          <th class="num">
            SubTotal
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in cart"
          :key="index"
        >
          <td>{{ order.name }}</td>
          <td class="num">
            {{ money(order.price) }}
          </td>
          <td class="num">
            {{ order.qty }}
          </td>
          <td class="num">
            {{ money(order.qty * order.price) }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            Total
          </td>
          <td class="num">
            {{ money(total) }}
          </td>
        </tr>
      </tfoot>
    </table>
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
      return this.cart.map(x => x.price * x.qty).reduce((x, y) => x + y, 0);
    },
  },
  methods: {
    // Prices are dollars; show them as such rather than as bare numbers.
    money(value) {
      return `$${Number(value).toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
/* Figures line up on the decimal point instead of drifting left. */
.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

tfoot td {
  font-weight: 600;
}
</style>
