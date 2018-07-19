<template>
    <div class="menu-options">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child box">
              <p class="title">css graphics<br /> to be added...</p>
            </div>
          </div>
          <div class="tile is-6 is-vertical is-parent">
            <div class="tile is-child box columns">
              <div class="column">
                <div class="coffee-options"
                v-for="(coffee, index) in menu.coffees" :key="index">
                    <button class="button is-primary"
                    v-bind:class="{'is-outlined': coffee!==selectedMainOpt}"
                    v-on:click="selectCoffee(coffee)">{{coffee.title}}</button>
                </div>
              </div>

              <div v-if="selectedMainOpt.subOptions" class="column">
                <!-- Select {{selectedMainOpt.subOptions.optionTypeName}} -->
                <div class="coffee-sub-options"
                v-for="(subOpts, index) in selectedMainOpt.subOptions.options" :key="index">
                  <button class="button is-info"
                  v-bind:class="{'is-outlined': subOpts!==selectedSubOpt}"
                  v-on:click="selectCoffee(subOpts)">
                    {{subOpts.name}}</button>
                </div>
              </div>
            </div>
            <div class="tile is-child box">
              <button class="button is-primary" @click="addToCart()"
              :disabled="selectedCoffee.code === undefined">
                <span class="icon is-small">
                  <i class="fas fa-cart-plus"></i>
                </span>
                <span>Add to Cart</span>
              </button>
              <shoppingCart />
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import menu from '../data/menu.data';
import ShoppingCart from '../components/ShoppingCart.vue';

export default {
  name: 'CoffeeMenu',
  components: {
    ShoppingCart,
  },
  data() {
    return {
      menu,
      selectedMainOpt: {},
      selectedSubOpt: {},
    };
  },
  computed: {
    selectedCoffee() {
      return {
        name: this.selectedMainOpt.subOptions ? `${this.selectedMainOpt.title} ${this.selectedSubOpt.name}` : this.selectedMainOpt.title,
        price: this.selectedSubOpt.price,
        code: this.selectedSubOpt.code,
      };
    },
  },
  methods: {
    ...mapMutations({
      add: 'addToCart',
    }),
    selectCoffee(opt) {
      // console.log(opt);
      // console.log(this.selectedCoffee.code === undefined);
      if (opt.subOptions === false) {
        this.selectedMainOpt = opt;
        this.selectedSubOpt = opt;
      } else if (typeof opt.subOptions === 'object') {
        this.selectedMainOpt = opt;
        this.selectedSubOpt = {};
      } else {
        this.selectedSubOpt = opt;
      }
    },
    addToCart() {
      const order = this.selectedCoffee;
      const qty = 1;
      // this.$store.commit('addToCart', Object.assign({}, order, { qty }));
      this.add(Object.assign({}, order, { qty }));
      this.selectedMainOpt = {};
      this.selectedSubOpt = {};
    },
  },
};
</script>

<style lang="scss" scoped>
button {
    margin: 10px;
}

</style>
