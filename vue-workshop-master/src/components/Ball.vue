<template>
    <img
        :class="status"
        class="soccer-ball"
        :src="image"
        alt="Soccer ball"
        @click="shoot">
</template>

<script>
export default {
    data () {
        return {
            status: ''
        }
    },

    props: [
        'image'
    ],

    watch: {
        status(){
            if (this.status === 'score'){
                this.$emit('score')
            } else if (this.status === 'miss') {
                this.$emit('miss')
            }
        }
    },

    methods: {
        shoot () { 
            const results = [
                'miss',
                'score'
            ]

            this.status = results[Math.floor(Math.random() * results.length)]

            //if (this.status === 'score') {}

            setTimeout(() => {
                this.reset()
            }, 800)
        },

        reset () {
            this.status = 'reset'
            setTimeout(() => {
                this.status = ''
                }, 500)
        }
    }
}
</script>

<style>

</style>


