<template>
    <transition name="fade">
        <div class="popup-container" 
            ref="popupContainer"
            :style="{...containerStyle, ...stored.customStyle}" 
            v-show="showPopup"
        >
            <div class="popup-inner">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Popup",
    data() {
        return {
            showPopup: false,
            containerStyle: {
                left: "0px",
                top: "0px"
            },
            clientWidth: () => document.documentElement.clientWidth,
            clientHeight: () => document.documentElement.clientHeight,
            stored: {}
        }
    },
    props: {
        bindElementId: {
            type: String,
            default: undefined
        },
        customStyle: {
            type: Object,
            default: {
                width: '200px',
                height: '200px'
            }
        }
    },
    mounted() {
        this.stored.customStyle = {...this.customStyle}
        this.containerStyle.transform = `translateX(-${this.stored.customStyle.width})`
        window.addEventListener('mousemove', this.updatePopupState)
        window.addEventListener('touchstart', this.updatePopupState)
    },
    unmounted() {
        window.removeEventListener('mousemove', this.updatePopupState)
        window.removeEventListener('touchstart', this.updatePopupState)
    },
    methods: {
        updatePopupState(e) {
            if(this.$refs.popupContainer.contains(e.target)) return;
            let bindElem = document.getElementById(this.bindElementId);
            if(bindElem && bindElem.contains(e.target)) {
                let left = e.clientX, 
                    top = e.clientY,
                    marginPointerRight = 10,
                    marginPointerTop = 10,
                    popboxW = parseInt(this.stored.customStyle.width)
                    ;
                if(!left||!top) return;
                this.containerStyle.top = top + marginPointerTop + 'px';
                if ((left - marginPointerRight) > popboxW) {
                    this.containerStyle.left = left - marginPointerRight + 'px';
                    this.containerStyle.transform = `translateX(-${popboxW}px)`;
                } else {
                    this.containerStyle.left = '0px';
                    this.containerStyle.transform = 'unset';
                }
                if (this.clientWidth() <= popboxW) {
                    this.stored.customStyle.width = this.clientWidth() + 'px';
                } else {
                    this.stored.customStyle = {...this.customStyle};
                }
                this.showPopup = true;
            } else {
                this.showPopup = false;
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.popup-container
    position: fixed;
    z-index: 9999;
    background: #fff;
    border-radius: 8px;
    pointer-events: none
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    .popup-inner
        width: 100%
        height: 100%
        padding: 8px
        pointer-events: auto

.fade-enter-active, .fade-leave-active 
	transition: opacity .5s
.fade-enter, .fade-leave-to 
	opacity: 0

</style>
