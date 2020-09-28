<template>
  <div class="l-card" id="l-statistical-indicator-card">
    <div
      class="statistical-indicator-card"
      v-for="statisticalIndicator in cohesionFactor.statisticalIndicators"
      :key="statisticalIndicator.id"
      :id="`statistical-indicator-${statisticalIndicator.id}-card`"
    >
      <router-link
        :to="{
          name: 'StatisticalIndicatorDetail',
          params: { statisticalIndicatorId: statisticalIndicator.id },
        }"
      >
        <div id="statistical-indicator-content-card">
          <div id="statistical-indicator-top-card">
            <span>{{ statisticalIndicator.name }}</span>
          </div>
          <div id="statistical-indicator-bottom-card">
            <div>
              <p>Indicateur</p>
              <span>{{ statisticalIndicator.name }}</span>
            </div>
            <div>
              <p>Enjeu</p>
              <span>{{ statisticalIndicator.challenge }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
//init.json
import initJson from "@/assets/init.json";

export default {
  name: "TheStatisticalIndicatorCard",
  data() {
    return {
      cohesionFactorSlug: this.$route.params.cohesionFactorSlug,
    };
  },
  computed: {
    cohesionFactor() {
      return initJson.cohesionFactors.find(
        (cohesionFactor) => cohesionFactor.slug === this.cohesionFactorSlug
      );
    },
  },
};
</script>
