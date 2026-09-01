<template>
  <div class="inspector">
    <h2 class="title is-5">
      State inspector
    </h2>
    <p class="subtitle is-7">
      Everything below is live. Pick a coffee, then add it, and watch which
      tier of state reacts.
    </p>

    <!-- 1. Local -->
    <section class="tier">
      <h3 class="tier__head">
        <span class="tag is-light">1</span>
        Component state
        <code>CoffeeMenu.data()</code>
      </h3>
      <dl class="kv">
        <dt>selectedMainOpt</dt>
        <dd>{{ mainOption.title || '{}' }}</dd>
        <dt>selectedSubOpt</dt>
        <dd>{{ subOption.name || '{}' }}</dd>
      </dl>
      <p class="note">
        Private to one component. Nothing else in the app can read it, and it
        resets on reload.
      </p>
    </section>

    <!-- 2. Derived -->
    <section class="tier">
      <h3 class="tier__head">
        <span class="tag is-light">2</span>
        Derived state
        <code>computed</code>
      </h3>
      <pre class="json">{{ pretty(computedOrder) }}</pre>
      <p class="note">
        <code>selectedCoffee</code> is recomputed from tier 1 and cached until
        those values change. It is never assigned to.
      </p>
    </section>

    <!-- 3. Store -->
    <section class="tier">
      <h3 class="tier__head">
        <span class="tag is-primary">3</span>
        Store state
        <code>$store.state</code>
        <span
          v-if="flash"
          class="flash"
        >changed</span>
      </h3>
      <pre
        class="json"
        :class="{ 'json--flash': flash }"
      >{{ pretty(storeState) }}</pre>
      <p class="note">
        Shared and reactive. The cart table renders from this same object, so
        it repaints without either component knowing about the other.
      </p>
    </section>

    <!-- 4. Mutations -->
    <section class="tier">
      <h3 class="tier__head">
        <span class="tag is-light">4</span>
        Mutations
        <span class="counter">{{ log.length }}</span>
      </h3>

      <p
        v-if="!log.length"
        class="note"
      >
        None yet. State can only change by committing one &mdash; captured here
        with <code>store.subscribe()</code>.
      </p>

      <ol
        v-else
        class="log"
      >
        <li
          v-for="entry in log"
          :key="entry.seq"
          class="log__item"
        >
          <div class="log__head">
            <span class="log__seq">#{{ entry.seq }}</span>
            <code class="log__type">{{ entry.type }}</code>
            <span class="log__time">{{ entry.at }}</span>
          </div>
          <pre class="json json--sm">{{ entry.payload }}</pre>
          <p class="log__effect">
            &rarr; {{ entry.effect }}
          </p>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
/**
 * A read-only window onto the app's state, for demonstrating how Vue and Vuex
 * actually move data around. It writes nothing: the mutation log is kept in
 * this component's own data rather than in the store, so that watching the
 * state does not itself become part of the state.
 */
const LOG_LIMIT = 6;

export default {
  name: 'StateInspector',
  props: {
    // Tier 1 -- passed down raw so the panel stays a pure view.
    mainOption: {
      type: Object,
      required: true,
    },
    subOption: {
      type: Object,
      required: true,
    },
    // Tier 2 -- the computed derived from them.
    computedOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      log: [],
      flash: false,
      seq: 0,
      lastLineCount: 0,
    };
  },
  computed: {
    storeState() {
      return this.$store.state;
    },
  },
  created() {
    // The idiomatic hook for observing commits. Returns its own unsubscriber.
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      this.record(mutation, state);
    });
  },
  beforeDestroy() {
    if (this.unsubscribe) this.unsubscribe();
    clearTimeout(this.flashTimer);
  },
  methods: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },

    record(mutation, state) {
      this.seq += 1;

      // addToCart branches: it either appends a line or bumps an existing
      // qty. Comparing the line count is the clearest way to show which ran.
      const lines = state.cart.length;
      const effect = lines > this.lastLineCount
        ? `pushed a new line (cart.length ${this.lastLineCount} to ${lines})`
        : 'incremented qty on an existing line';
      this.lastLineCount = lines;

      this.log.unshift({
        seq: this.seq,
        type: mutation.type,
        // Snapshot, not the live reference: addToCart pushes this very object
        // into the cart, so a later qty increment would rewrite history here.
        payload: this.pretty(mutation.payload),
        at: new Date().toLocaleTimeString(),
        effect,
      });
      if (this.log.length > LOG_LIMIT) this.log.pop();

      this.flash = true;
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => {
        this.flash = false;
      }, 900);
    },
  },
};
</script>

<style scoped>
.inspector {
  font-size: 0.85rem;
}

.subtitle {
  margin-bottom: 1.25rem !important;
  color: #7a7a7a;
}

.tier {
  padding-top: 0.9rem;
  margin-top: 0.9rem;
  border-top: 1px solid #ededed;
}

.tier:first-of-type {
  padding-top: 0;
  margin-top: 0;
  border-top: 0;
}

.tier__head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #363636;
}

.tier__head code,
.note code,
.log__type {
  padding: 0.1rem 0.35rem;
  font-size: 0.75rem;
  color: #00947e;
  background: #f0fbf9;
  border-radius: 3px;
}

.counter {
  padding: 0.05rem 0.45rem;
  font-size: 0.7rem;
  color: #fff;
  background: #363636;
  border-radius: 10px;
}

/* key/value list for the raw local state */
.kv {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 0.75rem;
  font-family: monospace;
  font-size: 0.78rem;
}

.kv dt {
  color: #7a7a7a;
}

.kv dd {
  margin: 0;
  color: #363636;
}

.json {
  padding: 0.55rem 0.7rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.45;
  color: #363636;
  background: #fafafa;
  border: 1px solid #ededed;
  border-radius: 4px;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.json--sm {
  padding: 0.4rem 0.55rem;
  font-size: 0.72rem;
}

.json--flash {
  background: #effaf5;
  border-color: #00d1b2;
}

.flash {
  padding: 0.05rem 0.4rem;
  font-size: 0.68rem;
  color: #00947e;
  background: #effaf5;
  border-radius: 3px;
  animation: fade 0.9s ease;
}

@keyframes fade {
  0% { opacity: 1; }
  100% { opacity: 0.35; }
}

.note {
  margin-top: 0.4rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #7a7a7a;
}

.log {
  margin: 0;
  list-style: none;
}

.log__item + .log__item {
  padding-top: 0.55rem;
  margin-top: 0.55rem;
  border-top: 1px dashed #ededed;
}

.log__head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.3rem;
}

.log__seq {
  font-family: monospace;
  font-size: 0.72rem;
  color: #b5b5b5;
}

.log__time {
  margin-left: auto;
  font-size: 0.7rem;
  color: #b5b5b5;
}

.log__effect {
  margin-top: 0.25rem;
  font-size: 0.72rem;
  color: #7a7a7a;
}
</style>
