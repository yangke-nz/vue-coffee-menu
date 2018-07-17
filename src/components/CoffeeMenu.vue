<template>
    <div class="menu-options">
        <div class="coffee-options" v-for="(coffee, index) in menu.coffees" :key="index">
            <button v-on:click="selectCoffee(coffee)">{{coffee.title}}</button>
        </div>
        <div v-if="selectedMainOpt.subOptions">
          Select {{selectedMainOpt.subOptions.optionTypeName}}
          <div class="coffee-sub-options"
          v-for="(subOpts, index) in selectedMainOpt.subOptions.options" :key="index">
            <button v-on:click="selectCoffee(subOpts)">{{subOpts.name}}</button>
          </div>
        </div>

        <div>
            selected: {{selectedCoffee}} ' - '
        </div>
        <button @click="addToCart()" :disabled="selectedCoffee.code === undefined">
          add to cart</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import menu from '../data/menu.data';

export default {
  name: 'CoffeeMenu',
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
      console.log(opt);
      console.log(this.selectedCoffee.code === undefined);
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
    },
  },
};
</script>

<style>
button {
    margin: 10px;
}

</style>
