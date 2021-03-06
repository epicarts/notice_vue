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
                    <td colspan="5">{{ api.title }}</td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>{{ api.author }}</td>
                    <th>작성일시</th>
                    <td>{{ api.created }}</td>
                    <th>번호</th>
                    <td>{{ api.noticeId }}</td>
                  </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td colspan="5">
                      <a
                        v-for="attachment in api.attachments"
                        :key="attachment.attachmentId"
                        :href="attachment.fileUrl"
                        @click.prevent="downloadAttachment(attachment)"
                      >
                        {{ attachment.originFileName }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">
                      <div class="text-area" id="noticeContent"></div>
                    </td>
                  </tr>
                </table>
                <NoticeCommentForm
                  v-if="api.noticeId"
                  :noticeId="api.noticeId"
                  class="notice-comment-form"
                  :commentText="'댓글'"
                />
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
                    <NoticeComment
                      :commentId="comment.commentId"
                      :noticeId="api.noticeId"
                      :commentContent="comment.content"
                      :isDeleted="comment.isDeleted"
                    >
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
                      <template v-slot:date>
                        {{ comment.created }}
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
                          :isChildComment="true"
                          :commentId="childComment.commentId"
                          :noticeId="api.noticeId"
                          :commentContent="childComment.content"
                          :isDeleted="childComment.isDeleted"
                        >
                          <template v-slot:division>
                            {{ childComment.division }}
                          </template>
                          <template v-slot:author>
                            {{ childComment.author }}
                          </template>
                          <template v-slot:created>
                            {{ childComment.created }}
                          </template>
                          <template v-slot:content>
                            {{ childComment.content }}
                          </template>
                          <template v-slot:date>
                            {{ childComment.created }}
                          </template>
                        </NoticeComment>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div class="modal-footer">
              <button
                class="modal-default-button btn_init"
                @click="$emit('close')"
              >
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
import { Quill } from "@vueup/vue-quill";
import axios from "axios";

export default {
  components: { NoticeCommentForm, NoticeComment },
  // provide로 refresh 함수를 제공함
  provide() {
    return {
      refresh: this.refreshData,
    };
  },
  data() {
    return {
      api: [],
      data: {},
    };
  },
  props: {
    noticeId: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.apiDataRequest(this.noticeId);
  },
  methods: {
    async apiDataRequest(id) {
      this.api = await this.$getapi(`/api/notices/${id}`);
      let noticeContent = document.getElementById("noticeContent");

      // Parse API data to delta Object
      let editor = new Quill(noticeContent, { readOnly: true });

      try {
        let delta = JSON.parse(this.api.content);
        editor.setContents(delta);
      } catch (error) {
        // parse가 안될경우 innerText 로 데이터를 넣음.
        noticeContent.innerText = this.api.content;
      }
    },
    refreshData() {
      this.apiDataRequest(this.noticeId);
    },
    downloadAttachment({ fileUrl, originFileName }) {
      axios
        .get(new URL(fileUrl).pathname, { responseType: "blob" }) //CORS 문제 해결을 위해 fileUrl 추출
        .then((response) => {
          const blob = new Blob([response.data]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = originFileName;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
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
  width: 900px;
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
  height: 600px;
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

.modal-footer button:hover {
  border: solid 1px #484d51;
  background-color: #5d656a;
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
