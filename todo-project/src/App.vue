<template>
  <div id="app">
    <h1>
      <b-icon-list-task font-scale="1" animation="cylon"></b-icon-list-task> My
      tasks
    </h1>
    <AllTasks></AllTasks>
  </div>
</template>

<script>
import AllTasks from "./components/AllTasks.vue";

export default {
  name: "App",
  components: {
    AllTasks,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
