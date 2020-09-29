<template>
  <div>
    <svg :width="opts.width" :height="opts.height">
      <g :transform="`translate(${opts.margin.left} ${opts.margin.top})`">
        <g ref="xAxis" :transform="`translate(0 ${innerChart.height})`" />
        <g ref="yAxis" :transform="`translate(0 0)`" />
        <transition-group name="slide-right" tag="g" appear class="bars">
          <rect
            v-for="(d, index) in data"
            :key="index"
            :x="0"
            :y="yScale(d.libreg)"
            :width="xScale(d.value1)"
            :height="yScale.bandwidth()"
            fill="#b1b1b1"
          ></rect>
        </transition-group>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

const numberFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

//opts for svg
const opts = {
  breakpoint: 620,
  container: "#c-graph-niv1 div",
  margin: {
    top: 30,
    right: 20,
    bottom: 30,
    left: 55,
  },
  width: 0,
  height: 0,
};

const innerChart = {
  width: 0,
  height: 0,
};

export default {
  name: "TheBarChart",
  data() {
    return {
      opts,
      innerChart,
      numberFormat,
    };
  },
  props: {
    data: Array,
  },
  computed: {
    //minimum value of dataset
    xMin() {
      return Math.min(
        d3.min(this.data, (d) => {
          return +d.value0;
        }),
        d3.min(this.data, (d) => {
          return +d.value1;
        })
      );
    },
    //maximum value of dataset
    xMax() {
      return Math.max(
        d3.max(this.data, (d) => {
          return +d.value0;
        }),
        d3.max(this.data, (d) => {
          return +d.value1;
        })
      );
    },
    //x scale
    xScale() {
      return d3
        .scaleLinear()
        .range([0, innerChart.width])
        .domain([this.xMin, this.xMax]);
    },
    // y scale
    yScale() {
      return d3
        .scaleBand()
        .range([innerChart.height, 0])
        .domain(
          this.data.map((d) => {
            return d.libreg;
          })
        )
        .paddingInner(0.3);
    },
    // x Axis
    xAxis() {
      return d3
        .axisBottom(this.xScale)
        .tickSizeOuter(0)
        .ticks(Math.max(innerChart.width / 100, 2));
    },
    // y Axis
    yAxis() {
      return d3.axisLeft(this.yScale).tickSizeOuter(0);
    },
  },
  mounted: function () {
    //container width and height
    this.opts.width = document.querySelector(opts.container).clientWidth;
    this.opts.height = document.querySelector(opts.container).clientHeight;
    //inner chart width and height
    this.innerChart.width = opts.width - opts.margin.left - opts.margin.right;
    this.innerChart.height = opts.height - opts.margin.top - opts.margin.bottom;
    //xAxis
    d3.select(this.$refs.xAxis).call(this.xAxis);
    d3.select(this.$refs.yAxis).call(this.yAxis);
  },
  methods: {
    enter(rect) {
      rect.style.width = 0;
    },
  },
};
</script>
