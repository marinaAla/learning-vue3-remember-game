<template>
  <div class="app">
    <img class="app__logo" alt="Vue logo" src="./assets/logo.png">
    <h1 class="app__title">Remember Me, Vue 3</h1>
    <p class="app__description">Remember and open all green cells</p>

    <Board />
  </div>
</template>

<script>
import Board from '@/components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style scoped>
  .app {
    padding: 30px 20px 80px;

    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
  }

  .app__logo {
    width: 100px;
  }
</style>
