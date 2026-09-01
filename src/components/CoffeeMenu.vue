<template>
  <div class="menu-options">
    <div class="columns">
      <div class="column">
        <div class="box">
          <p class="title">
            css graphics<br> to be added...
          </p>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <div class="columns">
            <div class="column">
              <div
                v-for="(coffee, index) in menu.coffees"
                :key="index"
                class="coffee-options"
              >
                <button
                  class="button is-primary"
                  :class="{'is-outlined': coffee!==selectedMainOpt}"
                  @click="selectCoffee(coffee)"
                >
                  {{ coffee.title }}
                </button>
              </div>
            </div>

            <div
              v-if="selectedMainOpt.subOptions"
              class="column"
            >
              <div
                v-for="(subOpts, index) in selectedMainOpt.subOptions.options"
                :key="index"
                class="coffee-sub-options"
              >
                <button
                  class="button is-info"
                  :class="{'is-outlined': subOpts!==selectedSubOpt}"
                  @click="selectCoffee(subOpts)"
                >
                  {{ subOpts.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <button
            class="button is-primary"
            :disabled="selectedCoffee.code === undefined"
            @click="addToCart()"
          >
            <span class="icon is-small">
              <!-- Font Awesome's cart-plus glyph, inlined. The webfont package
                   shipped ~1.1MB of fonts for this one icon. -->
              <svg
                viewBox="0 0 576 512"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <g transform="translate(0 448) scale(1 -1)">
                  <path d="M504.717 128H211.572L218.117 96H486.535C501.936 96 513.351 81.699 509.938 66.681L504.421 42.405C523.112 33.332 536 14.172 536 -8C536 -39.202 510.481 -64.444 479.176 -63.994C449.353 -63.565 424.826 -39.3630000000001 424.021 -9.547C423.581 6.74 430.106 21.502 440.824 32.001H231.176C241.553 21.835 248 7.674 248 -8C248 -39.813 221.472 -65.431 189.33 -63.938C160.79 -62.613 137.579 -39.553 136.079 -11.021C134.921 11.013 146.515 30.434 164.13 40.5650000000001L93.883 384H24C10.745 384 0 394.745 0 408V424C0 437.255 10.745 448 24 448H126.529C137.93 448 147.757 439.979 150.042 428.81L159.208 384H551.99C567.391 384 578.806 369.699 575.393 354.681L528.12 146.681C525.637 135.754 515.923 128 504.717 128zM408 280H360V320C360 328.837 352.837 336 344 336H328C319.163 336 312 328.837 312 320V280H264C255.163 280 248 272.837 248 264V248C248 239.163 255.163 232 264 232H312V192C312 183.163 319.163 176 328 176H344C352.837 176 360 183.163 360 192V232H408C416.837 232 424 239.163 424 248V264C424 272.837 416.837 280 408 280z" />
                </g>
              </svg>
            </span>
            <span>Add to Cart</span>
          </button>
          <ShoppingCart />
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

<style scoped>
button {
    margin: 10px;
}

/* Tiles used to stretch siblings to equal height; plain columns do not, so
   the left panel needs to fill its column to match the previous layout. */
.columns > .column > .box:only-child {
  height: 100%;
}

</style>
