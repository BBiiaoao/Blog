<template>
  <div id="app">
    <!--<add-blog></add-blog>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1000px;
  margin: 100px auto;
  box-sizing: border-box;
  color: #222222;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 2px #aaaaaa;
  border-radius: 5px;
}
</style>
