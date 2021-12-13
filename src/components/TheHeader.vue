<template>
  <header class="bg_header header">
    <div class="header-content">
      <Logo />
      <HeaderDepth />
    </div>
    <div class="header-content">
      <UserInfo />
      <HeaderButtonList />
    </div>
  </header>
</template>

<script>
import Logo from './OWOsstemLogo.vue'
import HeaderDepth from './HeaderDepth.vue'
import UserInfo from './user/UserInfoList.vue'
import HeaderButtonList from './HeaderButtonList.vue'

export default {
  components: { Logo, HeaderDepth, UserInfo, HeaderButtonList },
  data() {
    return {}
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  height: 40px;
  margin: 0 0 8px;
  padding: 0 18px;
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
</style>