<template>
  <div class="comment-area">
    <div class="comment-title-area">
      <p>
        <slot name="division">드림메디칼</slot>
        <span class="comment-user"> (<slot name="author">기수지</slot>) </span>
        <span class="sep_tt_1"></span>
        <span class="comment-date"
          ><slot name="date">2021-08-15 15:01</slot></span
        >
      </p>

      <!-- 저장 취소 -->
      <div v-if="isFixMode">
        <button class="btn_init btn-type4"><span>저장</span></button>
        <button class="btn_init btn-type4" @click="onClickFixModeHandler">
          <span>취소</span>
        </button>
      </div>
      <!-- 수정 삭제 답글달기 -->
      <div v-else>
        <button class="btn_init btn-type4" @click="onClickFixModeHandler">
          <span>수정</span>
        </button>
        <button class="btn_init btn-type4"><span>삭제</span></button>
        <button
          class="btn_init btn-type4"
          v-if="!isChildComment"
          @click="showChildCommentForm = true"
        >
          <span>답글달기</span>
        </button>
      </div>
    </div>

    <!-- 댓글 수정 -->
    <textarea
      v-if="isFixMode"
      name="comment"
      cols="30"
      rows="10"
      placeholder="Text Placeholder"
      maxlength="255"
      required="required"
    ></textarea>
    <!-- 댓글 읽기 -->
    <span v-else class="comment-content-area">
      <slot name="content"> 재고 없는 상품에 대해 재고없음 처리했습니다. </slot>
    </span>
    <NoticeCommentForm
      v-if="showChildCommentForm"
      :noticeId="1"
      :parentId="commentId"
    >답글
    </NoticeCommentForm>
  </div>
</template>

<script>
import NoticeCommentForm from "@/components/notice/NoticeCommentForm.vue";

export default {
  components: { NoticeCommentForm },

  data() {
    return {
      isFixMode: false,
      showChildCommentForm: false,
    };
  },
  props: {
    isChildComment: {
      type: Boolean,
      default: false,
    },
    commentId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClickFixModeHandler() {
      this.isFixMode = !this.isFixMode;
    },
  },
};
</script>

<style scoped>
.comment-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.comment-area span {
  display: inline-block;
  font-size: 12px;
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
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
}

.comment-title-area p {
  font-size: 13px;
  font-weight: bold;
}
</style>
