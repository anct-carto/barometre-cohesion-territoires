<template>
  <div>
    <div class="l-base">
      <TheCohesionFactorCard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheCohesionFactorCard from "@/components/TheCohesionFactorCard.vue";

export default {
  name: "Home",
  components: {
    TheCohesionFactorCard,
  },
};
</script>
