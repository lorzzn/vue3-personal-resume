<template>
    <div class="resume-items-container" ref="resumeItemsContainer" :ondragover="dragoverHandler">
        <ResumeItem v-for="(item, index) in contentList" 
            class="resume-item"
            :key="index" 
            :data="{index, item}" 
            :data-id="index"
            @deleteItem="deleteItem" 
            @moveUpItem="moveUpItem" 
            @moveDownItem="moveDownItem" 
        ></ResumeItem>
    </div>
</template>

<script>
import ResumeItem from "./../../components/ResumeItem/ResumeItem.vue";

export default {
    name: "resumeEdit",
    components: {
        ResumeItem
    },
    data() {
        return {
            dragStartItem: null,
            dragEnterItem: null,
            globalData: {
                usingMouse: false,
                usingTouch: false
            }
        }
    },
    provide() {
        return {
            globalData: this.globalData
        }
    },
    computed: {
        contentList() {
            return [...this.$store.getters.readResumeContent];
        },
        RIContainer() {
            return this.$refs.resumeItemsContainer;
        }
    },
    watch: {
        'contentList': {
            handler() {
                this.$nextTick(this.initItems)
            }
        }
    },
    mounted() {
        this.init();
    },
    beforeUnmount(){
        this.RIContainer.removeEventListener("dragstart", this.handleDragStart);
        this.RIContainer.removeEventListener("dragenter", this.handleDragEnter);
        this.RIContainer.removeEventListener("dragend", this.handleDragEnd);
        this.RIContainer.removeEventListener("mousedown", this.enableDraggable);
        this.RIContainer.removeEventListener("mouseup", this.disableDraggable);
    },
    methods: {
        init() {
            this.RIContainer.addEventListener("dragstart", this.handleDragStart);
            this.RIContainer.addEventListener("dragenter", this.handleDragEnter);
            this.RIContainer.addEventListener("dragend", this.handleDragEnd);
            this.RIContainer.addEventListener("mousedown", this.enableDraggable);
            this.RIContainer.addEventListener("mouseup", this.disableDraggable);
            document.addEventListener('mousemove', this.detectMouse);
            document.addEventListener('touchstart', this.detectTouch);
            this.initItems();
        },
        detectMouse() {
            this.globalData.usingMouse = true;
            document.removeEventListener('mousemove', this.detectMouse);
        },
        detectTouch() {
            this.globalData.usingTouch = true;
            document.removeEventListener('touchstart', this.detectTouch);
        },
        enableDraggable(e){
            if(e.target.id == 'drag-me' || e.target.parentElement.id == 'drag-me') {
                let parent = e.target.closest('#resume-item-body');
                parent.setAttribute('draggable', true);
            }
        },
        disableDraggable(e) {
            if(e.target.id == 'drag-me' || e.target.parentElement.id == 'drag-me') {
                let parent = e.target.closest('#resume-item-body');
                parent.setAttribute('draggable', false);
            }
        },
        initItems(){
            let items = this.RIContainer.querySelectorAll(".resume-item");
            if (items.length > 0) {
                return [...items].reduce((prev, cur, index) => {
                    let rect = cur.getBoundingClientRect();
                    let height = rect.height;
                    cur.style.top = parseInt(prev.style.top) + prev.height + 'px';
                    cur.height = height;
                    return cur;
                }, {
                    height: 0,
                    style: { top: 0 }
                })
            }
            return null;
        },
        handleDragStart(e){
            if(e.target.id == "resume-item-body") { 
                this.dragStartItem = e.target;
                setTimeout(() => {
                    this.dragStartItem.classList.add('dragging');
                    this.dragStartItem.style.opacity = 0;
                }, 0);
            } else {
                e.preventDefault();
            }
        },
        handleDragEnter(e) {
            if(e.target == this.dragStartItem) return;
            if(e.target.id == "resume-item-body") { 
                this.dragEnterItem = e.target;
            }
            if(this.dragEnterItem && this.dragEnterItem.contains(e.target)) {
                document.querySelectorAll('.dragenter').forEach(elem => {
                    elem.classList.remove('dragenter')
                })
                this.dragEnterItem.classList.add('dragenter');
                this.initItems();
            }
        },
        handleDragEnd(){
            if(this.dragEnterItem) { 
                let sid = this.dragStartItem.dataset.id;
                let eid = this.dragEnterItem.dataset.id;
                let sobj = this.contentList.splice(sid, 1)[0];
                if( sid < eid ) {
                    this.contentList.splice(eid-1, 0, sobj);
                } else {
                    this.contentList.splice(eid, 0, sobj);
                }
                this.$store.commit("storeResumeContent", this.contentList);
                document.querySelectorAll('.dragenter').forEach(elem => {
                    elem.classList.remove('dragenter')
                })  
                this.dragEnterItem = null;
            }
            this.dragStartItem.setAttribute('draggable', false);
            this.dragStartItem.classList.remove('dragging')
            this.dragStartItem.style.opacity = 1;
            this.dragStartItem = null;
        },
        dragoverHandler(e){
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        },
        deleteItem(index){
            this.contentList.splice(index, 1);
            this.$store.commit("storeResumeContent", this.contentList);
        },
        moveUpItem(index) {
            if(index == 0) return;
            [this.contentList[index-1], this.contentList[index]] = [
                this.contentList[index], this.contentList[index-1]
            ]
            this.$store.commit("storeResumeContent", this.contentList);
        },
        moveDownItem(index) {
            if(index == (this.contentList.length-1)) return;
            [this.contentList[index], this.contentList[index+1]] = [
                this.contentList[index+1], this.contentList[index]
            ]
            this.$store.commit("storeResumeContent", this.contentList);
        }
    }
}

</script>

<style lang="stylus" scoped>
.resume-items-container
    position: relative

.resume-item
    position: absolute
    opacity: 1
    transition: ease .3s

.dragging 
    height: 0

.dragenter 
    &:deep(.resume-item-inner)
        box-shadow: 0 -4px 4px 0 rgba(44, 62, 80, .2)

</style>
