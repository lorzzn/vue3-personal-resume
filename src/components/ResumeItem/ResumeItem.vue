<template>
    <div class="resume-item-body" id="resume-item-body">
        <div class="resume-item-inner">
            <div class="resume-item-title">
                <div class="left">
                    <div><i class="ri-file-list-3-line"></i>{{ (+data.index) + 1 }}</div>
                    <div v-if="globalData.usingMouse && !globalData.usingTouch" id="drag-me">拖拽此处排序<i class="ri-draggable"></i></div>
                </div>
                <div class="buttons-container right">
                    <div class="buttons-container">
                        <button class="button" title="上移" 
                            @click="$emit('moveUpItem', data.index)"
                        >
                            <i class="ri-arrow-up-line"></i>
                            上移
                        </button>
                    </div>
                    <div class="buttons-container">
                        <button class="button" title="下移" 
                            @click="$emit('moveDownItem', data.index)"
                        >
                            <i class="ri-arrow-down-line"></i>
                            下移
                        </button>
                    </div>
                    <button class="button" title="删除" 
                        @click="$emit('deleteItem', data.index)"
                    >
                        <i style="color: red" class="ri-delete-bin-2-line"></i>
                    </button>
                </div>
            </div>
            
            <div class="form-line">
                <div class="form-title">项目种类</div>
                <select v-model="data.item.type">
                    <option v-for="(item, index) in types" 
                        :key="index" 
                        :value="item.type" 
                    >
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div v-if="data.item.type == 'img'">
                <div class="form-line">
                    <div class="form-title">图片名称</div>
                    <textarea rows="1" v-model="data.item.data.alt"></textarea>
                </div>
                <div class="form-line">
                    <div class="form-title">资源地址</div>
                    <textarea rows="3" v-model="data.item.data.src"></textarea>
                </div>
            </div>

            <div v-else>
                <div class="form-line">
                    <div class="form-title">内容&emsp;&emsp;</div>
                    <textarea rows="6" v-model="data.item.data.content"></textarea>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "ResumeItem",
    inject: [ 'globalData' ],
    data() {
        return {
            hasMouse: false,
            types: [
                {
                    type: "title-1",
                    name: "一级标题"
                },{
                    type: "title-2",
                    name: "二级标题"
                },{
                    type: "list",
                    name: "列表项目"
                },{
                    type: "text",
                    name: "文本"
                },{
                    type: "img",
                    name: "图片"
                }
            ]
        }
    },
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style lang="stylus" scoped>
.resume-item-body
    width: 98%
    margin: .8rem 1%
    padding: 1.5rem
    color: var(--default-font-color)
    font-size: 1.5rem

.resume-item-inner
    padding: 2rem
    background-color: darken(#fff, 2%)
    border-radius: .8rem
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2)
    .form-line
        display: flex
        .form-title, textarea, select
            padding: .5rem
            margin: 1rem
            line-height: 1.5  
        textarea
            flex: 1
            resize: none
            outline-color: var(--default-font-color)
        textarea, select
            color: var(--default-font-color)
            border: 1px solid var(--default-font-color)
            border-radius: .3rem
    
    .resume-item-title
        padding: 0 .5rem
        padding-bottom: 1rem
        margin: 1rem
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom 1px solid darken(#fff, 20%)
        .left, .right
            display: flex
            align-items: center
        .left #drag-me
            cursor: move
            &::before
                content: '\A0\A0|\A0\A0'

    .buttons-container 
        .button
            background: #fff
            color: #48a8e4
            font-size: 1.5rem
            padding: 1rem
            margin: 0 .5rem
            border-radius: .8rem
            border: 1px solid darken(#eee, 8%)
            user-select: none
            cursor: pointer
            transition: ease .2s;
            &:active
                background: darken(#eee, 10%)
                border-color: darken(#eee, 12%)

</style>
