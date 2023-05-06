<template>
    <div class="lb-container">
        <ul>
            <li v-for="(item, index) in options.palette" 
            :key="index" 
            :style="{ 
                background: item, 
                height: options.lineHeight + 'px'
            }"
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LinesBackground',
    props: {
        options: {
            type: Object,
            default: {
                lineHeight: 200,
                lineNums: 3,
                palette: [
                    "#f05261", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a", 
                    "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#f3d147", "#4adbc3"
                ],
            }
        }
    },
    created (){
        this.init();
    },
    methods: {
        init(){
            this.$props.options.palette.sort(() => { return 0.5-Math.random()});
        }       
    }
}
</script>

<style lang="stylus" scoped>
.lb-container 
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -9999;
    top: 0;
    display: grid;
    place-items: center;
    transform: rotateZ(-45deg);
    ul 
        position: absolute
        padding: 0;
        li
            width: 200%;
            display: block;
            transform: translateX(-25%);
        li:nth-child(2n+1)
            animation: lbRight 1.5s;
        li:nth-child(2n)
            animation: lbLeft 1.5s;

@media only screen and (min-aspect-ratio: 1/1) // 如果宽高比(w/h)大于1:1的话
    .lb-container ul 
        width: 150vw // 大于100*根号2即可

@media screen and (max-aspect-ratio: 1/1) // 如果宽高比(w/h)小于1:1 / 不支持媒体查询的客户端
    .lb-container ul 
        width: 150vh // 大于100*根号2即可

@keyframes lbRight
    0% 
        transform: translateX(-100%);
    100% 
        transform: translateX(-25%);
@keyframes lbLeft
    0% 
        transform: translateX(50%);
    100% 
        transform: translateX(-25%);

</style>