<template>
  <div id="l-statistical-indicator-content">
    <div id="stastical-indicator-explanation-content">
      {{ item.explanation }}
    </div>

    <div class="statiscal-indicator-global"></div>

    <hr />
    <h2>{{ item.highlight }}</h2>
    <div v-for="text in item.texts" :key="text.id" id="c-texts">
      <section class="c-all-niv" id="c-all-niv1">
        <div id="c-text-niv1">{{ text.niv1 }}</div>
        <div class="c-graph-niv" id="c-graph-niv1">
          <TheBarChart :data="barChartData" />
        </div>
      </section>
      <section class="c-all-niv" id="c-all-niv2">
        <div>{{ text.niv2 }}</div>
        <div class="c-graph-niv" id="c-graph-niv2">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(300,300)">
              <path
                d="M61.1,-107.2C86.9,-78.5,120.8,-74.6,126.6,-58.7C132.5,-42.9,110.3,-15.1,114.2,22.4C118.2,60,148.3,107.3,139.8,126.3C131.3,145.2,84.2,136,49.1,128.7C13.9,121.5,-9.4,116.4,-40.9,117.2C-72.4,118.1,-112.2,124.9,-151.8,112.8C-191.3,100.7,-230.8,69.8,-226.2,38.4C-221.7,6.9,-173.2,-25,-153.9,-71.6C-134.6,-118.1,-144.6,-179.4,-123.9,-210.4C-103.1,-241.4,-51.5,-242.2,-16.9,-215.8C17.7,-189.5,35.3,-136,61.1,-107.2Z"
                fill="#fcba03"
              />
            </g>
          </svg>
        </div>
      </section>
      <section class="c-all-niv" id="c-all-niv3">
        <div>{{ text.niv3 }}</div>
        <div class="c-graph-niv" id="c-graph-niv3">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(300,300)">
              <path
                d="M61.1,-107.2C86.9,-78.5,120.8,-74.6,126.6,-58.7C132.5,-42.9,110.3,-15.1,114.2,22.4C118.2,60,148.3,107.3,139.8,126.3C131.3,145.2,84.2,136,49.1,128.7C13.9,121.5,-9.4,116.4,-40.9,117.2C-72.4,118.1,-112.2,124.9,-151.8,112.8C-191.3,100.7,-230.8,69.8,-226.2,38.4C-221.7,6.9,-173.2,-25,-153.9,-71.6C-134.6,-118.1,-144.6,-179.4,-123.9,-210.4C-103.1,-241.4,-51.5,-242.2,-16.9,-215.8C17.7,-189.5,35.3,-136,61.1,-107.2Z"
                fill="#fc039d"
              />
            </g>
          </svg>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import TheBarChart from "@/components/TheBarChart.vue";
import data from "@/assets/data_reg_v2.json";

export default {
  name: "TheStatisticalIndicatorContent",
  components: {
    TheBarChart,
  },
  data() {
    return {
      barChartData: data,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
console.log(data);
</script>
