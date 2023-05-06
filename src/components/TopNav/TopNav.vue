<template>
    <div class="topnav-height"></div>
    <div class="topnav-container">
        <div class="topnav-body">
            <div class="left">
                <button v-if="backable" class="routeback button" title="后退" @click="routeGo(-1)">
                    <i class="ri-arrow-left-line"></i>
                </button>
                <button v-if="forwardable" class="routego button" title="前进" @click="routeGo(1)">
                    <i class="ri-arrow-right-line"></i>
                </button>
                <button class="refresh button" title="刷新" @click="refresh">
                    <i class="ri-refresh-line"></i>
                </button>
                <button class="gohome button" title="主页" @click="goHome">
                    <i class="ri-home-line"></i>
                </button>
            </div>
            <div class="right">
                <button class="button" 
                    :id="item.id" 
                    :style="item.style" 
                    :title="item.title" 
                    v-for="(item, index) in buttons" 
                    :key="index" 
                    @click="item.clickFn" 
                >
                    <i v-if="item.remixicon" :class="item.remixicon"></i>
                    {{ item.text ? item.text : '' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopNav",
    props: {
        buttons: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            backable: false,
            forwardable: false
        }
    },
    watch: {
        "$route": {
            handler() {
                this.updateNavBtnStatus();
            }
        }
    },
    created() {
        this.updateNavBtnStatus();
    },
    methods: {
        updateNavBtnStatus() {
            this.backable = !!history.state.back;
            this.forwardable = !!history.state.forward;
        },
        routeGo(delta) {
            this.$router.go(delta)
        },
        goHome(){
            if (process.env.NODE_ENV == 'development') {
                window.location.href = '/';
            }
            else if (process.env.NODE_ENV == 'production') {
                window.location.href = this.$config.site.home;
            }
        },
        refresh() {
            window.location.reload();
        }
    }
}
</script>

<style lang="stylus" scoped>
$topnav-height = 6rem

.topnav-height
    height: $topnav-height
.topnav-container
    position: fixed
    width: 100%
    height: $topnav-height
    top: 0
    left: 0
    z-index: 9999
    background: rgba(238, 238, 238, .8)
    backdrop-filter: blur(3px)
    .topnav-body
        width: 100%
        height: 100%
        padding: 0 1rem
        display: flex
        justify-content: space-between
        align-items: center
        .left, .right
            display: flex
            .button
                background: #fff
                padding: 1rem
                margin: 0 .5rem
                color: #48a8e4
                font-size: 1.5rem
                border-radius: .8rem
                border: 1px solid darken(#eee, 8%)
                user-select: none
                cursor: pointer
                transition: ease .2s;
                &:active
                    background: darken(#eee, 10%)
                    border-color: darken(#eee, 12%)

</style>
