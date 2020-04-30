Vue.component("cohesion-factor", {
  template: "#cohesion-factor-template",
  props: ["name"],
});

const request = new Request("assets/init.json");

const getData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  throw new Error(response.status);
};

getData(request).then((data) => {
  new Vue({
    el: "#app",
    data: {
      items: data.cohesionFactor,
    },
  });
}); //request data
