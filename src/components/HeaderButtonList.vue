<template>
  <ul class="header_btn_list">
    <li>
      <img src="@/assets/btn-header-alert-n.svg" class="btn_header_alert_n" />
      <span class="alert-count Rectangle"> 72 </span>
      <span class="blind">알람 버튼</span>
    </li>
    <li>
      <img src="@/assets/btn-header-setting-n.svg" class="btn_header_alert_n" />
      <span class="blind">설정 버튼</span>
    </li>
    <li>
      <img src="@/assets/btn-header-logout-n.svg" class="btn_header_alert_n" />
      <span class="blind">로그아웃 버튼</span>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.header_btn_list {
  margin-left: 7px;
  display: flex;
}

.header_btn_list li {
  position: relative;
}

.alert-count {
  color: #fff;
  font-size: 10px;
}

.Rectangle {
  position: absolute;
  left: 12px;
  z-index: 1;
  width: 20px;
  height: 13px;
  margin: 1px 0 0;
  border-radius: 6.5px;
  background-color: #f00;
}
</style>
