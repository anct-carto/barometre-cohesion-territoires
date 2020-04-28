"use strict";

//path data
const request = new Request("assets/data_reg_v2.json");
const unit = "%";

//-------------------------------------------------------------------------
//INITIALISATION
//-------------------------------------------------------------------------

//contructor Intl.NumberFormat for language sensitive number formatting
const numberFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

//console.log(numberFormat.format(1213131.24141));
//console.log(numberFormat.format(0.00004342));

//opts for svg
const opts = {
  breakpoint: 620,
  container: "#t-barchart",
  margin: {
    top: 30,
    right: 20,
    bottom: 30,
    left: 55,
  },
  get width() {
    return document.querySelector(this.container).clientWidth;
  },
  get height() {
    return document.querySelector(this.container).clientHeight;
  },
};

//opts for chart
const innerChart = {
  width: opts.width - opts.margin.left - opts.margin.right,
  height: opts.height - opts.margin.top - opts.margin.bottom,
};

//initalization svg
const svg = d3
  .select(opts.container)
  .append("svg")
  .attr("id", "svg0")
  .attr("width", opts.width)
  .attr("height", opts.height);

//inner chart dimensions
const g = svg
  .append("g")
  .attr("id", "svg0-group")
  .attr("transform", `translate(${opts.margin.left} ${opts.margin.top})`); //start (x,y)

//-------------------------------------------------------------------------
//DATA
//-------------------------------------------------------------------------

const getData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  throw new Error(response.status);
};

getData(request).then((data) => {
  console.log(data);

  //sort value
  data = data.sort((a, b) => {
    return d3.ascending(a.value2017, b.value2017);
  });

  //column name
  const nameValuet0 = d3.keys(data[0])[3].replace(/(?:^.{5})/, "");
  const nameValuet1 = d3.keys(data[0])[4].replace(/(?:^.{5})/, "");

  //button name
  const label = d3.selectAll(".button-value");
  Array.from(label.nodes()).forEach((el) => {
    el.htmlFor === "year0"
      ? (el.innerHTML = nameValuet0)
      : (el.innerHTML = nameValuet1);
  });

  // Axis

  //Axis scale
  const xmin = Math.min(
    d3.min(data, (d) => {
      return +d.value2013;
    }),
    d3.min(data, (d) => {
      return +d.value2017;
    })
  );
  const xmax = Math.max(
    d3.max(data, (d) => {
      return +d.value2013;
    }),
    d3.max(data, (d) => {
      return +d.value2017;
    })
  );

  const x = d3.scaleLinear().range([0, innerChart.width]).domain([xmin, xmax]);

  const y = d3
    .scaleBand()
    .range([innerChart.height, 0])
    .domain(
      data.map((d) => {
        return d.libreg;
      })
    )
    .paddingInner(0.3);

  //Call axis
  const xAxis = d3
    .axisBottom(x)
    .tickSizeOuter(0)
    .ticks(Math.max(innerChart.width / 100, 2));

  const yAxis = d3.axisLeft(y).tickSizeOuter(0);

  g.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0 ${innerChart.height})`)
    .call(xAxis);

  g.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0 0)`)
    .call(yAxis);

  //Animation barres
  const tBars = g.transition().duration(500).ease(d3.easePoly.exponent(3));

  //Label axis
  g.append("text")
    .attr("class", "label-axis label-y-axis")
    .attr("x", -30)
    .attr("y", -10)
    .text("Région");

  g.append("text")
    .attr("class", "label-axis label-x-axis")
    .attr("x", innerChart.width)
    .attr("y", innerChart.height - 10)
    .style("text-anchor", "end")
    .text(`(${unit})`);

  // Chart
  const bars = g.selectAll("rect").data(data);

  bars
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", 0)
          .attr("y", (d) => {
            return y(d.libreg);
          })
          .style("fill", "#b1b1b1")
          .attr("height", y.bandwidth())
          .call((enter) =>
            enter.transition(tBars).attr("width", (d) => {
              return x(d["value2017"]);
            })
          ),

      (update) =>
        update.attr("fill", "black").call((update) => update.transition(tBars)),

      (exit) =>
        exit
          .call((exit) => exit.transition(tBars))
          .attr("width", 0)
          .remove()
    )

    .on("mouseover", (d, i, arr) => {
      let posX = d3.event.pageX - 50;
      let posY = d3.event.pageY - 100;
      const widthTooltip = document.querySelector("#tooltip-barchart")
        .clientWidth;
      const heightTooltip = document.querySelector("#tooltip-barchart")
        .clientHeight;

      if (posX + widthTooltip > opts.width) {
        posX = posX - heightTooltip;
      }

      if (posY - heightTooltip < 0) {
        posY = posY + heightTooltip + 20;
      }

      d3.select(arr[i]).transition().duration(300).style("fill", "#4dbeff");

      // Tooltip
      d3.select(".tooltip")
        .transition()
        .duration(100)
        .style("opacity", 1)
        .style("left", posX + "px")
        .style("top", posY + "px");
      d3.select("#tooltip-barchart").html(`
                    <span>${d.libreg_long}</span>
                    <hr>
                    <div class="tooltip-item">
                    <p>${nameValuet0}</p><p>${numberFormat.format(
        d.value2013
      )} ${unit}</p>
                    </div>
                    <div class="tooltip-item">
                    <div>${nameValuet1}</div><div>${numberFormat.format(
        d.value2017
      )} ${unit}</div>
                    </div>
                    `);
    })

    .on("mouseout", (d, i, arr) => {
      d3.select(arr[i]).transition().duration(750).style("fill", "#b1b1b1");
      d3.select(".tooltip").transition().duration(100).style("opacity", 0);
    });

  const extraBarchartValue = d3.select("#extra-barchart-value");

  const value0 = d3.extent(data, (d) => {
    return +d.value2013;
  });
  const value1 = d3.extent(data, (d) => {
    return +d.value2017;
  });
  const extentValue0 = value0[1] - value0[0];
  const extentValue1 = value1[1] - value1[0];

  extraBarchartValue.html(`${extentValue1}`);

  //Event on click button
  const buttons = d3.selectAll('#h-barchart input[name="year"]');

  buttons.on("change", function (d) {
    let value;
    const selection = this.value;
    if (selection === "A") {
      d3.selectAll("rect")
        .transition(tBars)
        .attr("width", (d) => {
          return x(d["value2013"]);
        });

      extraBarchartValue.html(`${extentValue0} ${unit}`);
    } else {
      d3.selectAll("rect")
        .transition(tBars)
        .attr("width", (d) => {
          return x(d["value2017"]);
        });

      extraBarchartValue.html(`${extentValue1} ${unit}`);
    }
  });

  //WINDOW EVENT
  //-------------------------------------------------------------------------

  window.addEventListener("resize", () => {
    resize();
  });

  function resize() {
    //WIDTH & HEIGHT UPDATE
    //-------------------------------------------------------------------------

    //update svg width & height
    svg.attr("width", opts.width).attr("height", opts.height);

    //opts for chart
    innerChart.width = opts.width - opts.margin.left - opts.margin.right;
    innerChart.height = opts.height - opts.margin.top - opts.margin.bottom;

    //axis
    x.range([0, innerChart.width]);
    y.range([innerChart.height, 0]);

    d3.selectAll(".x-axis")
      .attr("transform", `translate(0 ${innerChart.height})`)
      .call(xAxis);

    d3.selectAll(".y-axis").attr("transform", `translate(0 0)`).call(yAxis);
    //Call axis
    xAxis.ticks(Math.max(innerChart.width / 100, 2));

    d3.select(".label-x-axis")
      .attr("x", innerChart.width)
      .attr("y", innerChart.height - 10);

    //Update bar heigh
    d3.selectAll("rect")
      .attr("y", (d) => {
        return y(d.libreg);
      })
      .attr("height", y.bandwidth());

    //Update bar width  click button
    Array.from(buttons.nodes()).forEach((el) => {
      if (el.checked) {
        el.value === "A"
          ? d3.selectAll("rect").attr("width", (d) => {
              return x(d["value2013"]);
            })
          : d3.selectAll("rect").attr("width", (d) => {
              return x(d["value2017"]);
            });
      }
    });
  }
}); //data request
