<template>
    <div class="bettbutton-container">
        <ul>
            <li v-for="(item, index) in buttons" :key="index">
                <button :flavor="item.flavor" @click="sendClickEvent(item)">{{ item.text }}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "BettButton",
    props: {
        buttons: {
            type: Array,
            default: []
        }
    },
    created(){

    },
    methods: {
        sendClickEvent(args){
            this.$emit("clickedOne", args.signal);
        }
    }
}
</script>

<style lang="stylus" scoped>
.bettbutton-container
    ul 
        padding: 0;
        li
            margin: 1.5rem;
            button 
                background: #fff
                transition: ease .2s;
                color: var(--default-font-color)
                user-select: none
                cursor: pointer
                &:active
                    background: darken(#fff, 10%)

</style>