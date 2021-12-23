<template>
  <form @submit.prevent="submit" class="comment-area">
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
        <button
          class="btn_init btn-type4"
          type="submit"
          @click="onClickUpdateRequest"
        >
          <span>저장</span>
        </button>
        <button class="btn_init btn-type4" @click="onClickFixModeHandler">
          <span>취소</span>
        </button>
      </div>
      <!-- 수정 삭제 답글달기 -->
      <div v-else>
        <button class="btn_init btn-type4" @click="onClickFixModeHandler" :disabled="isDeleted" >
          <span>수정</span>
        </button>
        <button class="btn_init btn-type4" @click="onClickDeleteRequest" :disabled="isDeleted">
          <span>삭제</span>
        </button>
        <button
          class="btn_init btn-type4"
          v-if="!isChildComment"
          @click="onClickshowCommentFormHandler"
          :disabled="isDeleted"
        >
          <span>답글달기</span>
        </button>
      </div>
    </div>

    <!-- 댓글 수정 -->
    <div class="commet-textarea">
      <textarea
        v-model="form.content"
        v-if="isFixMode"
        name="comment"
        placeholder="댓글을 입력해주세요"
        maxlength="255"
        required="required"
        @keyup.enter="onClickUpdateRequest"
        @keydown.enter.prevent
      ></textarea>

      <!-- 댓글 읽기 -->
      <span v-else class="comment-content-area">
        <slot name="content">
          재고 없는 상품에 대해 재고없음 처리했습니다.
        </slot>
      </span>
    </div>

    <!-- 답글 달기 Form -->
    <NoticeCommentForm
      v-if="showCommentForm"
      :noticeId="this.noticeId"
      :parentId="this.commentId"
      :showCommentFormEvent="this.onClickshowCommentFormHandler"
      :commentText="'답글'"
    />
  </form>
</template>

<script>
import NoticeCommentForm from "@/components/notice/NoticeCommentForm.vue";

export default {
  components: { NoticeCommentForm },
  data() {
    return {
      isFixMode: false,
      showCommentForm: false,
      form: {
        content: this.commentContent,
      },
    };
  },
  props: {
    isChildComment: {
      type: Boolean,
      default: false,
    },
    noticeId: {
      type: Number,
      required: true,
    },
    commentId: {
      type: Number,
      required: true,
    },
    commentContent: {
      type: String,
      required: false,
      default: "내용",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  inject: ["refresh"],
  methods: {
    onClickFixModeHandler() {
      this.isFixMode = !this.isFixMode;
    },
    onClickshowCommentFormHandler() {
      this.showCommentForm = !this.showCommentForm;
    },
    async onClickUpdateRequest() {
      this.api = await this.$patchApi(
        `/api/notices/${this.noticeId}/comments/${this.commentId}/content`,
        this.form
      );
      this.form.content = "";
      this.onClickFixModeHandler();
      this.refresh();
    },
    async onClickDeleteRequest() {
      this.api = await this.$deleteApi(
        `/api/notices/${this.noticeId}/comments/${this.commentId}`
      );
      this.refresh();
    },
  },
  watch: {
    commentContent() {
      this.form.content = this.commentContent;
    },
  },
};
</script>

<style scoped>
.commet-textarea textarea {
  width: 100%;
  border: solid 1px #bac1c9;
  padding: 6px 8px;
  resize: none;
  font-size: 12px;
  line-height: 1.42;
  letter-spacing: -1px;
  height: 42px;
  margin-bottom: 3px;
}

.commet-textarea {
  width: 100%;
  text-align: left;
}

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
