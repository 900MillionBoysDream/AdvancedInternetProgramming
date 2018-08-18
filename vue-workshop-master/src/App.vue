<template>
  <div id="app">
    <div class="sports-field">
      <h1 style="color: palevioletred;">{{ title }}</h1>
      <board :results="results"></board>
      <goal></goal>
      <ball :image="src" @score="storeResult('score')" @miss="storeResult('miss')"></ball>
    </div>
  </div>
</template>

<script>
import Goal from './components/Goal.vue'
import Ball from './components/Ball.vue'
import Board from './components/Board.vue'
export default {
  components: {
    Goal,
    Ball,
    Board
  }, 

  data () {
    return {
      results: [],
      score: 0,
      miss: 0,
      status: '',
      title: "🐷 Let's play soccer 🐷",
      goalClass: "something-great",
      src: '/static/soccer-ball.png'
    }
  },

  methods: {
    storeResult (results){
      this.results.push(results)
    },
    // shoot () { 
    //   const results = [
    //     'miss',
    //     'score'
    //   ]

    //   this.status = results[Math.floor(Math.random() * results.length)]

    //   setTimeout(() => {
    //     this.reset()
    //   }, 800)
    // },

    reset () {
      this.status = 'reset'
      setTimeout(() => {
        this.status = ''
      }, 500)
    },

    // imageSrc(){
    //   return '/static/soccer-ball.png'
    // }
  }
}
</script>

<style>
</style>
