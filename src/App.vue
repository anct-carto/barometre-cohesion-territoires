<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<style lang="scss">
@import "./styles/global.scss";
</style>
