<template>
  <div>
    <TheCohesionFactorHeader :cohesionFactor="cohesionFactor" />
    <div class="l-base">
      <TheStatisticalIndicatorCard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheCohesionFactorHeader from "@/components/TheCohesionFactorHeader.vue";
import TheStatisticalIndicatorCard from "@/components/TheStatisticalIndicatorCard.vue";
//init.json
import initJson from "@/assets/init.json";

export default {
  name: "CohesionFactorDetail",
  components: {
    TheStatisticalIndicatorCard,
    TheCohesionFactorHeader,
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
