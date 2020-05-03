<template>
  <div
    id="h-statistical-indicator"
    :class="`cohesion-factor-${cohesionFactor.id}-color`"
  >
    <div>{{ cohesionFactor.name }}</div>
  </div>
</template>

<script>
//init.json


export default {
  name: "TheCohesionFactorHeader",
  data() {
    return {};
  },
  props: {
    cohesionFactor: {
      type: String,
      required: true,
    },
  },

};
</script>
