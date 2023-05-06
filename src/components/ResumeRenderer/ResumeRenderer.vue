<template>
    <div class="rr-container">
        <div class="rr-body">
            <div v-for="(item, index) in contentList" :key="index">
                <div v-if="item.type == 'img'" class="img">
                    <a :href="item.data.src" :title="item.data.alt" target="_blank">
                        <img v-if="item.type == 'img'" 
                            :src="item.data.src" 
                            :alt="item.data.alt" 
                        >
                    </a>
                </div>
                <div v-else :class="item.type" v-html="linkify(item.data.content)"></div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: "ResumeRenderer",
    computed: {
        ...mapGetters({
            contentList: 'readResumeContent'
        })
    },
    methods:{
        linkify(inputText) {
            if(!inputText) return;
            inputText = this.escapeHTML(inputText);
            let result, reg1, reg2, reg3;
            // 匹配 http://, https://, ftp://
            reg1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            result = inputText.replace(
                reg1, 
                '<i class="ri-links-line"></i><a href="$1" target="_blank">$1</a>'
            );
            // 匹配 "www."
            reg2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            result = result.replace(
                reg2, 
                '<i class="ri-links-line"></i>$1<a href="http://$2" target="_blank">$2</a>'
            );
            // 匹配 email
            reg3 = /(([a-zA-Z0-9\-_\.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
            result = result.replace(
                reg3, 
                '<a href="mailto:$1">$1</a>'
            );
            return result;
        },
        escapeHTML(str) {
            return str.replace(/[&<>'"]/g, tag =>
                        ({
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            "'": '&#39;',
                            '"': '&quot;'
                        }[tag] || tag)
                    );
        }
    }
}

</script>

<style lang="stylus" scoped>
.rr-container
    width: 100%
    height: 100%
    line-height: 1.8
    color: var(--default-font-color)
    .rr-body::after
        content: ''
        display: block
        clear: both
    .rr-body div
        [class^=title]
            clear: both
            padding: .3rem 1.5rem
            margin: 1rem 0
        .title-1 
            font-size: 2.2rem
            border-bottom: 1px solid var(--default-font-color)
            &::before
                font-family: 'remixicon'!important
                content: '\ECFB\A0'
        .title-2 
            font-size: 1.8rem
            &::before   
                font-family: 'remixicon'!important
                content: '\F05A\A0'
        .list, .text
            font-size: 1.6rem
            padding: 0 2.5rem
        .list::before
            font-family: 'remixicon'!important
            content: "\EB7D\A0"
            display: inline-block
            transform: scale(.6)
        .img  
            float: left
            padding: 1rem 2.5rem
            a
                img
                    width: 10rem
                    height: 10rem
                    object-fit: cover
                    border-radius: .8rem
                &:hover
                        filter: none !important

</style>
