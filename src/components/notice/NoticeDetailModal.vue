<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>공지사항 상세</h3>
            <button
              class="modal-default-button btn_init"
              @click="$emit('close')"
            >
              <img
                src="@/assets/btn-popup-m-close-n.svg"
                class="btn_popup_m_close_n"
                alt="닫기 버튼 이미지"
              />
              <span class="blind">닫기</span>
            </button>
          </div>

          <div class="modal-scroll-layer">
            <!-- 상세 table -->
            <div class="modal-body">
              <!-- 공지사항 표시 영역 -->
              <div class="notice-area">
                <table class="tbl-type">
                  <tr>
                    <th>제목</th>
                    <td colspan="5">DPONT EX-11C</td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>홍길동</td>
                    <th>작성일시</th>
                    <td>2021-05-15</td>
                    <th>번호</th>
                    <td>45</td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td colspan="5">
                      <a href="#">공지사항문서1</a>
                      <a href="#">공지사항 이미지</a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">
                      <div class="text-area">
                        <p>8월 합배송 공지사항입니다.</p>

                        합배송 협력사는 재고 발생시 재고 없음 처리를 꼭 해주시기
                        바랍니다. 합배송 협력사는 재고 발생시 재고 없음 처리를
                        꼭 해주시기 바랍니다. 합배송 협력사는 재고 발생시 재고
                        없음 처리를 꼭 해주시기 바랍니다. 합배송 협력사는 재고
                        발생시 재고 없음 처리를 꼭 해주시기 바랍니다. 합배송
                        협력사는 재고 발생시 재고 없음 처리를 꼭 해주시기
                        바랍니다. 합배송 협력사는 재고 발생시 재고 없음 처리를
                        꼭 해주시기 바랍니다. 합배송 협력사는 재고 발생시 재고
                        없음 처리를 꼭 해주시기 바랍니다. 합배송 협력사는 재고
                        발생시 재고 없음 처리를 꼭 해주시기 바랍니다.
                      </div>
                    </td>
                  </tr>
                </table>
                <NoticeCommentForm class="notice-comment-form"
                  >댓글</NoticeCommentForm
                >
              </div>

              <!-- 공지사항 표시 영역 -->
              <div class="comments-area">
                <span class="comments-area-title">
                  전체 댓글
                  <span>{{ api.numberOfComment }}</span>
                </span>
                <!-- 댓글 -->
                <ul class="comments-list">
                  <li v-for="comment in api.comments" :key="comment.commentId">
                    <NoticeComment :comment-id="comment.commentId">
                      <template v-slot:division>
                        {{ comment.division }}
                      </template>
                      <template v-slot:author>
                        {{ comment.author }}
                      </template>
                      <template v-slot:created>
                        {{ comment.created }}
                      </template>
                      <template v-slot:content>
                        {{ comment.content }}
                      </template>
                    </NoticeComment>

                    <!-- 대댓글 -->
                    <ul
                      v-if="comment.childComments.length"
                      class="comments-list"
                    >
                      <li
                        v-for="childComment in comment.childComments"
                        :key="childComment.commentId"
                      >
                        <NoticeComment
                          :is-child-comment="true"
                          :comment-id="childComment.commentId"
                          :comment-content="childComment.content"
                        >
                          <template v-slot:title>
                            {{ childComment.content }}
                          </template>
                          <template v-slot:author>
                            {{ childComment.author }}
                          </template>
                          <template v-slot:created>
                            {{ childComment.created }}
                          </template>
                          <template v-slot:content>
                            {{ comment.content }}
                          </template>
                        </NoticeComment>
                      </li>
                    </ul>
                  </li>
                </ul>
                <NoticeCommentForm class="comment-form">답글</NoticeCommentForm>
              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-default-button" @click="$emit('close')">
                <span>목록</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import NoticeCommentForm from "@/components/notice/NoticeCommentForm.vue";
import NoticeComment from "@/components/notice/NoticeComment.vue";

export default {
  components: { NoticeCommentForm, NoticeComment },
  data() {
    return {
      api: [],
      data: {},
    };
  },
  created() {
    this.apiDataRequest();
  },
  methods: {
    async apiDataRequest() {
      this.api = await this.$getapi("/api/notices/1");
    },
  },
};
</script>

<style scoped>
.child-comment-item-list {
  margin-left: 30px;
}

.child-comment-item-list li:last-child {
  border: none;
}

.comments-list ul {
  padding-left: 30px;
  border-top: solid 1px var(--pale-grey);
}

.comments-list ul li::before {
  position: absolute;
  left: -22px;
  top: 12px;
  content: url("~@/assets/ico-comment.svg");
}

.comments-list {
  width: 100%;
}

.comments-list li {
  position: relative;
  width: 100%;
  border-bottom: solid 1px var(--pale-grey);
}

.comments-list li:last-child {
  border: none;
}

/* .child-comment-item-list li:first-child {
  border: none;
} */

.comments-area-title {
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: solid 1px var(--pale-grey);
  width: 100%;
  text-align: left;
}

.comments-area-title > span {
  color: #176de2;
}

.comments-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1050px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 16px 36px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  height: 36px;
  text-align: center;
  padding: 12px 16px;
  align-items: center;
  background-image: linear-gradient(to bottom, #7893b6, #637d9e);
}

.modal-header h3 {
  font-size: 14px;
  color: #fff;
}

.modal-scroll-layer {
  height: 800px;
  overflow: auto;
}

.modal-body {
  padding-bottom: 10px;
  margin: 17px 17px 0;
}

.btn_popup_m_close_n {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.modal-footer {
  padding: 20px;
}

.modal-footer span {
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  color: #fff;
}

.modal-footer button {
  margin: auto;
  width: 120px;
  height: 32px;
  box-shadow: 0 2px 3px 0 var(--black-24-30);
  border: solid 1px #252c30;
  background-color: #3f484e;
}

.notice-comment-form {
  border-bottom: solid 1px var(--pale-grey);
  border-right: solid 1px var(--pale-grey);
  border-left: solid 1px var(--pale-grey);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
