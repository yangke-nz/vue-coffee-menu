import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, order) {
      const exists = state.cart.filter(el => el.code === order.code);
      if (exists.length) {
        exists[0].qty += 1;
      } else {
        state.cart.push(order);
      }
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
});
