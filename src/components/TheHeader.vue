<template>
  <header class="bg_header header">
    <div class="header-wrap">
      <div class="header-content">
        <Logo />
        <HeaderDepth />
      </div>
      <div class="header-content">
        <UserInfo />
        <HeaderButtonList />
      </div>
      <div class="access-info-layer">
        <AccessInfo />
      </div>
    </div>
    
  </header>
</template>

<script>
import Logo from "./OWOsstemLogo.vue";
import HeaderDepth from "./HeaderDepth.vue";
import UserInfo from "./user/UserInfoList.vue";
import HeaderButtonList from "./HeaderButtonList.vue";
import AccessInfo from "./user/AccessInfo.vue"

export default {
  components: { Logo, HeaderDepth, UserInfo, HeaderButtonList, AccessInfo},
  data() {
    return {};
  },
};
</script>

<style scoped>
.header {
  position: relative;
  height: 40px;
  margin: 0 0 8px;
  padding: 0 18px;
}

.header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  margin: auto;
}

.header-content {
  display: flex;
  align-items: center;
}

.bg_header {
  background-color: var(--header-bg-color);
}

.logo {
  margin-left: 10px;
}

.access-info-layer {
  position: absolute;
  right: 10px;
  top: 45px;
}
</style>
