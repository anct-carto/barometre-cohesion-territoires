Vue.component("cohesion-factor", {
  template: "#cohesion-factor-template",
  props: ["name"],
});

new Vue({
  el: "#app",
  data: {
    items: [
      {
        id: "000",
        name: "Solidarité",
      },
      {
        id: "001",
        name: "Qualité de vie",
      },
      {
        id: "010",
        name: "Transition socio-environnementale",
      },
      {
        id: "011",
        name: "Capacitation des territoires",
      },
      {
        id: "100",
        name: "Capital social des territoires",
      },
      {
        id: "101",
        name: "Coopération entre les territoires",
      },
    ],
  },
});
