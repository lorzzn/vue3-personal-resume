<template>
    <div class="resume">
        <div class="main">
            <ResumeRenderer />
        </div>
    </div>
</template>

<script>
import ResumeRenderer from "./../../components/ResumeRenderer/ResumeRenderer.vue";

export default {
    name: "resumeView",
    components:{
        ResumeRenderer
    }
}
</script>

<style lang="stylus" scoped>
.resume .main
    margin: 5rem 2rem

@media print
    .resume .main
        margin: 0!important
    
</style>

<style lang="stylus">
    @media print
        html
            font-size: 50%!important
        
        body>*:not(#app)
            display: none
        
        :root
            --default-font-color: rgb(0, 0, 0) !important

</style>
