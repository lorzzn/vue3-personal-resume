<template>
  <div class="resume-index">
    <div class="topnav">
      <TopNav :buttons="topNavBtns" />
    </div>
    <MouseEnterPopup
      bindElementId="nav-button-share"
      :customStyle="{ width: '272px', height: '272px' }"
    >
      <div class="qr-container" ref="QRCodeBody"></div>
    </MouseEnterPopup>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="['resumeView', 'resumeEdit']">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import ResumeRenderer from "./../../components/ResumeRenderer/ResumeRenderer.vue";
import MouseEnterPopup from "./../../components/MouseEnterPopup/MouseEnterPopup.vue";
import TopNav from "./../../components/TopNav/TopNav.vue";
import QRCode from "qrcodejs2";

export default {
  name: "ResumeIndexView",
  components: {
    ResumeRenderer,
    MouseEnterPopup,
    TopNav,
  },
  data() {
    return {
      resumeViewBtns: [
        {
          index: 0,
          id: "nav-button-edit",
          title: "编辑",
          remixicon: "ri-edit-line",
          clickFn: () => {
            this.isEdit = true;
            this.$router.push("/resume/edit");
          },
        },
        {
          index: 1,
          id: "nav-button-share",
          remixicon: "ri-share-line",
          title: "分享",
        },
        {
          index: 2,
          id: "nav-button-print",
          remixicon: "ri-printer-line",
          title: "打印",
          clickFn: () => {
            if (window.print) {
              window.print();
            } else {
              alert(
                "您的浏览器不支持打印网页，建议您更换Chrome、Edge或FireFox浏览器"
              );
            }
          },
        },
      ],
      resumeEditBtns: [
        {
          index: 0,
          title: "添加一项",
          remixicon: "ri-add-line",
          clickFn: () => {
            this.$store.dispatch("newResumeItem");
            setTimeout(() => {
              window.scroll({
                top: document.body.scrollHeight,
                left: 0,
                behavior: "smooth",
              });
            }, 0);
          },
        },
        {
          index: 1,
          title: "查看",
          remixicon: "ri-save-line",
          clickFn: () => {
            this.isEdit = false;
            this.$router.push("/resume");
          },
        },
        {
          index: 2,
          title: "清空",
          text: "清空",
          style: {
            color: "red",
          },
          clickFn: () => {
            this.$store.dispatch("storeResumeContent", []);
          },
        },
      ],
    };
  },
  computed: {
    topNavBtns() {
      let route = this.$route;
      if (route.path == "/resume") {
        return this.resumeViewBtns;
      } else if (route.path == "/resume/edit") {
        return this.resumeEditBtns;
      }
      return [];
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.createQRCode();
  },
  methods: {
    init() {
      this.$http({
        url: this.$route.query.mdUrl || this.$config.resume.url(),
        method: "get",
      })
        .then((resp) => {
          return this.handleMdData(resp.data);
        })
        .then((data) => {
          this.$store.dispatch("storeResumeContent", data);
        })
        .catch((err) => {
          console.error(err);
          alert("请求数据失败！");
        });
    },
    handleMdLine(line) {
      let item = {},
        titleReg = /^(#+) +(.*)/,
        listReg = /^- +(.*)/,
        imageReg = /!\[(.*)\]\((.*)\)/,
        olistReg = /^\d+\. +(.*)/;
      if (titleReg.test(line)) {
        line.replace(titleReg, (m, p1, p2) => {
          item.type = `title-${p1.length}`;
          item.data = {
            content: p2,
          };
        });
      } else if (listReg.test(line)) {
        line.replace(listReg, (m, p1) => {
          if (!/: *$/.test(p1)) {
            item.type = "list";
            item.data = {
              content: p1,
            };
          }
        });
      } else if (olistReg.test(line)) {
        line.replace(olistReg, (m) => {
          item.type = "olist";
          item.data = {
            content: m,
          };
        });
      } else {
        if (imageReg.test(line)) {
          line.replace(imageReg, (m, p1, p2) => {
            (item.type = "img"),
              (item.data = {
                alt: p1,
                src: p2,
              });
          });
        } else {
          item.type = "text";
          item.data = {
            content: line,
          };
        }
      }
      if (JSON.stringify(item) !== "{}") {
        return item;
      }
      return null;
    },
    handleMdData(data) {
      return new Promise((resolve) => {
        const lines = data.split(/\r\n|\n/),
          result = [];
        for (let i in lines) {
          if (!lines[i].trim()) {
            continue;
          }
          let item = this.handleMdLine(lines[i]);
          if (item) {
            result.push(item);
          }
        }
        resolve(result);
      });
    },
    createQRCode() {
      return new QRCode(this.$refs.QRCodeBody, {
        text: window.location.href,
        width: 256,
        height: 256,
        colorDark: "#2c3e50",
        colorLight: "#fff",
        correctlevel: QRCode.CorrectLevel.H,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.qr-container
    width: 100%
    height: 100%
    display: grid
    place-items: center
    &:deep(img)
        padding: 8px
        width: 100%

@media print
    .topnav
        display: none

.fade-enter-from, .fade-leave-to
    transform: translateY(3px)
    opacity: 0

.fade-enter-to, .fade-leave-from
    transform: translateY(0)
    opacity: 1

.fade-enter-active
    transition: all .1s ease;

.fade-leave-active
    transition: all .1s ease;
</style>
