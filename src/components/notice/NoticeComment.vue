<template>
  <div class="comment-area">
    <div class="comment-title-area">
      <span class="comment-title">
        <slot name="title">드림메디칼</slot>
        <div class="sep_tt_1"></div>

        <span class="comment-user"> (<slot name="author">기수지</slot>) </span>
      </span>
      <span class="comment-date"
        ><slot name="date">2021-08-15 15:01</slot></span
      >
    </div>
    <div class="comment-content-area">
      재고 없는 상품에 대해 재고없음 처리했습니다.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.comment-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.comment-content-area {
  margin-bottom: 10px;
}

.sep_tt_1 {
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0px 10px;
  background-color: #c9c9c9;
}

.comment-title-area {
  margin: 12px 0;
}

.comment-title {
  font-size: 13px;
  font-weight: bold;
}

/* .comment-title-area span:last-child {
  border-left: solid 1px #c9c9c9;
} */

.comment-title {
  font-size: 13px;
  font-weight: bold;
}
</style>
