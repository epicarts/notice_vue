<template>
  <form
    class="comment-form"
    action="/notices/1/comments"
    method="post"
    id="comment"
  >
    <div class="comment-title-area">
      <span class="comment-title"> <slot>글</slot> 작성 </span>
      <span class="comment-form-help"
        >모든 <slot>글</slot>은 비밀글 작성만 가능합니다.</span
      >
      <!-- slot -->
    </div>
    <div class="commet-textarea">
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="Text Placeholder"
        maxlength="255"
        required="required"
      ></textarea>
      <button type="submit" form="comment">등록</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px;
  background-color: #f4f4f4;
  width: 100%;
}

.commet-textarea textarea {
  width: 100%;
  border: solid 1px #bac1c9;
  padding: 6px 8px;
  resize: none;
  font-size: 12px;
  line-height: 1.42;
  letter-spacing: -1px;
  height: 42px;
}

.commet-textarea button {
  width: 50px;
  height: 42px;
  box-shadow: 0 2px 3px 0 var(--black-24);
  border: solid 1px #267995;
  margin-left: 2px;
  background-image: linear-gradient(to bottom, #34add4 1%, #2c8faf);
  border-radius: 2px;
  color: #fff;
}

.commet-textarea {
  width: 100%;
  display: flex;
}

.comment-title-area {
  margin-bottom: 10px;
}

.comment-title {
  font-size: 13px;
  font-weight: bold;
  margin-right: 12px;
}

.comment-form-help {
  font-size: 12px;
}
</style>
