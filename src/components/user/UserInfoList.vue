<template>
  <div>
    <ul class="userinfo">
      <li>
        <img
          class="user-icon"
          src="../../assets/icn-header-user.png"
          alt="user-header-icon"
        />
      </li>
      <li><span>OW 개발총괄본부</span></li>
      <div class="Rectangle" />
      <li><span>OW 공통개발팀</span></li>
      <div class="Rectangle" />
      <li><span>최영호 사원</span></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.userinfo {
  display: flex;
  height: 24px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #1c3769;
}

.userinfo li {
  display: flex;
}

.userinfo span {
  font-size: 12px;
  color: #fff;
}

.Rectangle {
  width: 1px;
  height: 10px;
  margin: 3px 10px;
  background-color: #7787a5;
}

.user-icon {
  height: 12px;
  margin: 2px 4px 2px 0;
}
</style>
