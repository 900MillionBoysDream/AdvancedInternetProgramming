<template>
    <div class="board">
        <div class="board-score">Your score is {{ score }}</div>
        <div class="board-miss">You missed {{ miss }}</div>
    </div>
</template>

<script>
export default {
    props: [
        'score',
        'miss'
    ]
}
</script>

<style>

</style>

