<template>
  <div>
    <div class="forkMe">
      <a target="_blank" href="https://github.com/ppengryuu/vue3-personal-resume">
        <img src="../../assets/forkme.png" alt="fork me on Github" srcset="">
      </a>
    </div>
    <div class="home-header">
      <div class="title-inner">
        <div class="title">
          <h1>PPeng 的主页</h1>
        </div>
        <div class="subtitle">
          <ul>
            <li><i class="ri-smartphone-line"></i>电话: <a href="tel:15514985863">15514985863</a></li>
            <li><i class="ri-mail-line"></i>邮箱: <a href="mailto:&#x32;&#x35;&#53;&#52;&#x39;&#57;&#50;&#x31;&#x33;&#x40;&#113;&#113;&#x2e;&#x63;&#111;&#x6d;">&#x32;&#x35;&#53;&#52;&#x39;&#57;&#50;&#x31;&#x33;&#x40;&#113;&#113;&#x2e;&#x63;&#111;&#x6d;</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home-middle">
      <BettButton :buttons="buttons" @clickedOne="bbClicked"/>
    </div>
    <LinesBackground />
  </div>
</template>

<script>
import LinesBackground from '../../components/LinesBackground/LinesBackground.vue';
import BettButton from '../../components/BettButton/BettButton.vue';
export default {
  name: 'home',
  components: {
    LinesBackground,
    BettButton
  },
  data() {
    return {
      buttons: [
        {
          text: "简历",
          flavor: "simple-bigger",
          signal: "open-resume"
        },{
          text: "博客",
          flavor: "simple-bigger",
          signal: "open-blog"
        }
      ]
    }
  },
  created(){

  },
  methods: {
    bbClicked(args){
      switch(args){
        case "open-blog":
          window.location.href = "https://ppengryuu.cn";
          break;
        case "open-resume":
          this.$router.push("/resume");
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.forkMe
  position: fixed
  top: 0
  right: 0
  img
    width: 12rem
    height: 12rem
.home-header 
  display: grid
  place-items: center
  .title-inner
    text-align: center;
    margin-top: 100px;
    padding: 10px;
    color: var(--default-font-color);
    .subtitle ul 
      padding: 0;
      li 
        display: inline;
        margin: 0 5px;
        font-size: 1.4rem

.home-middle
  width: 100%
  display: grid
  place-items: center
  margin-top: 50px
</style>
  