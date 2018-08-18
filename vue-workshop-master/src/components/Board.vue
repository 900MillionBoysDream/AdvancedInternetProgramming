<template>
    <div class="board">
        <div class="board-score">Your score is {{ score }}</div>
        <div class="board-miss">You missed {{ miss }}</div>
    </div>
</template>

<script>
export default {
    props: [
        'results'
    ],

    computed: {
        score(){
            var score = 0

            for (var i =0; i <this.results.length; i++){
                if (this.results(i)  == 'score'){
                    score ++
                }
            }
            return score
        },

        miss(){
            var miss = 0

            for (var i =0; i <this.results.length; i++){
                if (this.results(i)  == 'miss'){
                    miss ++
                }
            }
            return miss
        }
    }
}
</script>

<style>

</style>

