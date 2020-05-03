<template>
  <div id="c-cohesion-factor">
    <div
      class="cohesion-factor"
      v-for="cohesionFactor in cohesionFactors"
      :key="cohesionFactor.id"
      :id="`cohesion-factor-${cohesionFactor.id}`"
    >
      <router-link
        :to="{
          name: 'CohesionFactorDetail',
          params: { cohesionFactorSlug: cohesionFactor.slug },
        }"
      >
        <button :class="`cohesion-factor-${cohesionFactor.id}-color`">
          <span class="title-cohesion-factor">{{ cohesionFactor.name }}</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
//init.json
import initJson from "@/assets/init.json";

export default {
  name: "TheCohesionFactorCard",
  data() {
    return {
      cohesionFactors: initJson.cohesionFactors,
    };
  },
};
</script>
