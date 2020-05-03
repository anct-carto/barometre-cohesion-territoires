<template>
  <div>
    <div
      id="h-statistical-indicator"
      :class="`cohesion-factor-${cohesionFactor.id}-color`"
    >
      <div>{{ cohesionFactor.name }}</div>
    </div>
    <TheStatisticalIndicatorCard />
  </div>
</template>

<script>
// @ is an alias to /src
import TheStatisticalIndicatorCard from "@/components/TheStatisticalIndicatorCard.vue";
//init.json
import initJson from "@/assets/init.json";

export default {
  name: "CohesionFactorDetail",
  components: {
    TheStatisticalIndicatorCard,
  },
  data() {
    return {};
  },
  props: {
    cohesionFactorSlug: {
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
  },
};
</script>
