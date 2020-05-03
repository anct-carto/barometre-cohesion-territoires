<template>
  <div>
    <div class="layout-cards">
      <div id="c-statistical-indicator">
        <div
          class="statistical-indicator"
          v-for="statisticalIndicator in cohesionFactor.statisticalIndicators"
          :key="statisticalIndicator.id"
          :id="`statistical-indicator-${statisticalIndicator.id}`"
        >
          <router-link
            :to="{
              name: 'StatisticalIndicatorDetail',
              params: { statisticalIndicatorId: statisticalIndicator.id },
            }"
          >
            <div id="statistical-indicator-top">
              <span>{{ statisticalIndicator.name }}</span>
            </div>
            <div id="statistical-indicator-bottom">
              <div>
                <p>Indicateur</p>
                <span>{{ statisticalIndicator.name }}</span>
              </div>
              <div>
                <p>Enjeu</p>
                <span>{{ statisticalIndicator.challenge }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
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
