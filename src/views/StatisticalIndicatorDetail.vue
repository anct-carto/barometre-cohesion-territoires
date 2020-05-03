<template>
  <div>
    <div
      id="h-statistical-indicator"
      :class="`cohesion-factor-${cohesionFactor.id}-color`"
    >
      <div>{{ cohesionFactor.name }}</div>
    </div>
    Je suis directement sur la page de l'indicateur
    <div>{{ cohesionFactor.name }}</div>
  </div>
</template>

<script>
//init.json
import initJson from "@/assets/init.json";

export default {
  components: {},
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
