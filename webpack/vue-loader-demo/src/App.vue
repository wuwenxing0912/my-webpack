<template>
  <div class="App-vue">App</div>
</template>

<script>
import A from "./a.vue";
export default {
  created() {
    let App1 = "App1";
    const App2 = "App2";
    const f = () => {
      console.log(App1, App2);
    };
    console.log("App");
  },
};
</script>
<style scoped>
.body {
  background-color: blue;
}
</style>
