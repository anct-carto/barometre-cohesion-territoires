<template>
  <div>
    <TheCohesionFactorHeader :cohesionFactor="cohesionFactor" />

    <h1>{{ statisticalIndicator.name }}</h1>

    <div class="l-base">
      <TheStatisticalIndicatorContent :item="item" />
    </div>
  </div>
</template>

<script>
//init.json
import initJson from "@/assets/init.json";
import contentJson from "@/assets/content.json";
import TheCohesionFactorHeader from "@/components/TheCohesionFactorHeader.vue";
import TheStatisticalIndicatorContent from "@/components/TheStatisticalIndicatorContent.vue";

export default {
  components: {
    TheCohesionFactorHeader,
    TheStatisticalIndicatorContent,
  },
  data() {
    return {};
  },
  props: {
    cohesionFactorSlug: {
      type: String,
      required: true,
    },
    statisticalIndicatorId: {
      type: String,
      required: true,
    },
  },
  computed: {
    cohesionFactor() {
      return initJson.cohesionFactors.find(
        (cohesionFactor) => cohesionFactor.slug === this.cohesionFactorSlug
      );
    },
    statisticalIndicator() {
      return this.cohesionFactor.statisticalIndicators.find(
        (statisticalIndicator) =>
          statisticalIndicator.id === this.statisticalIndicatorId
      );
    },
    item() {
      return contentJson.statisticalIndicators.find(
        (item) => item.id === this.statisticalIndicatorId
      );
    },
  },
};
</script>
