<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>공지사항 글작성</h3>
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
            <div class="modal-body">
              <form
                @submit.prevent="formSubmit"
                method="post"
                class="notice-wirte-form"
              >
                <div class="title-area">
                  <h3>제목</h3>
                  <!-- <textarea type="text" name="title" v-model="title" /> -->
                  <textarea
                    placeholder="제목을 입력해주세요"
                    maxlength="255"
                    required="required"
                    @keydown.enter.prevent
                    v-model="title"
                  ></textarea>
                </div>
                <div class="check-area">
                  <h3>공지 설정</h3>
                  <!-- <textarea type="text" name="title" v-model="title" /> -->
                  <div class="check-box btn_init" @click="isNotice = !isNotice">
                    <img
                      v-if="isNotice"
                      src="@/assets/btn-picking-s.svg"
                      alt="공지 설정 활성화"
                    />
                    <img
                      v-else
                      src="@/assets/btn-picking-n.svg"
                      alt="공지 설정 비활성화"
                    />
                  </div>
                </div>

                <div class="content-area">
                  <QuillEditor
                    class="editor"
                    theme="snow"
                    v-model:content="content"
                  />
                </div>
                <div class="file-area">
                  <input
                    type="file"
                    ref="selectFile"
                    multiple="multiple"
                    @change="previewFile"
                  />
                  <!-- <ul v-if="selectFile">
                    <li>lastModified : {{ selectFile.lastModified }}</li>
                    <li>
                      lastModifiedDate : {{ selectFile.lastModifiedDate }}
                    </li>
                    <li>name : {{ selectFile.name }}</li>
                    <li>size(byte) : {{ selectFile.size }}</li>
                    <li>type : {{ selectFile.type }}</li>
                    <li>
                      webkitRelativePath : {{ selectFile.webkitRelativePath }}
                    </li>
                  </ul> -->
                </div>

                <div class="modal-footer">
                  <button
                    class="modal-default-button btn_init btn_cancel"
                    @click="$emit('close')"
                  >
                    <span>취소</span>
                  </button>
                  <button
                    type="submit"
                    class="btn_init btn_submit"
                    :disabled="isUploading"
                  >
                    등록
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// axios module import
// refer: https://vueup.github.io/vue-quill/guide/usage.html#in-single-file-component
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "FormValidation",
  components: { QuillEditor },
  data() {
    return {
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
      title: null,
      // content: {"ops":[{"insert":"ㅁㄴㅇㅁㄴㅇ\nㅁㄴ\nㅇ"},{"attributes":{"header":1},"insert":"\n"},{"insert":"ㅁㄴㅇ"},{"attributes":{"header":1},"insert":"\n"},{"attributes":{"bold":true},"insert":"ㅁㄴㅁㅁㅁ"},{"insert":"\n"},{"attributes":{"bold":true},"insert":"ㅇㅁㄴ"},{"insert":"\n"},{"attributes":{"bold":true},"insert":"ㅇㅁㄴㅁㅁ"},{"insert":"\n\nㅇㅁㄴ\n\u001e\n"}]},
      content: "",
      editor: null,
      isNotice: false,
    };
  },
  inject: ["refreshGridData"],

  methods: {
    previewFile() {
      this.selectFile = this.$refs.selectFile.files;
      console.log(this.selectFile);
    },

    // previewFile() {
    //   // 선택된 파일이 있는가?
    //   if (0 < this.$refs.selectFile.files.length) {
    //     // 0 번째 파일을 가져 온다.
    //     this.selectFile = this.$refs.selectFile.files[0];
    //     // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
    //     let fileExt = this.selectFile.name.substring(
    //       this.selectFile.name.lastIndexOf(".") + 1
    //     );
    //     // 소문자로 변환
    //     fileExt = fileExt.toLowerCase();
    //     // 이미지 확장자 체크, 1메가 바이트 이하 인지 체크
    //     if (
    //       ["jpeg", "png", "gif", "bmp"].includes(fileExt) &&
    //       this.selectFile.size <= 1048576
    //     ) {
    //       // FileReader 를 활용하여 파일을 읽는다
    //       var reader = new FileReader();
    //       reader.onload = (e) => {
    //         // base64
    //         this.previewImgUrl = e.target.result;
    //       };
    //       reader.readAsDataURL(this.selectFile);
    //     } else if (this.selectFile.size <= 1048576) {
    //       // 이미지외 파일
    //       this.previewImgUrl = null;
    //     } else {
    //       alert("파일을 다시 선택해 주세요.");
    //       // this.selectFile = null;
    //       this.previewImgUrl = null;
    //     }
    //   } else {
    //     // 파일을 선택하지 않았을때
    //     this.selectFile = null;
    //     this.previewImgUrl = null;
    //   }
    //   console.log(this.selectFile);
    // },

    async formSubmit() {
      // 제목 필수
      if (this.title) {
        // Form 필드 생성
        let form = new FormData();

        // 파일객체가 있다면
        if (this.selectFile) {
          // form.append("file", this.selectFile); // 단일 파일
          // 다중 파일 추가
          for (var i = 0; i < this.selectFile.length; i++) {
            form.append("files", this.selectFile[i]);
          }
        }

        form.append(
          "noticeData",
          new Blob(
            [
              JSON.stringify({
                title: this.title,
                notice: this.isNotice,
                // String 형태로 저장
                content: JSON.stringify(this.content),
              }),
            ],
            {
              type: "application/json",
            }
          )
        );

        this.isUploading = true;

        axios
          .post("/api/notices", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.response = res;
            this.isUploading = false;
            this.refreshGridData(); // 그리드 데이터 새로고침
            alert("글이 등록 되었습니다");
          })
          .catch((error) => {
            this.response = error;
            this.isUploading = false;
          });
        this.$emit("close");
      } else {
        alert("제목을 입력해 주세요.");
      }
      return true;
    },
  },
};
</script>

<style scoped>
.notice-wirte-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-area {
  display: flex;
  width: 100%;
  height: 32px;
  margin-bottom: 10px;
}

.title-area h3 {
  width: 100px;
  font-size: 14px;
  line-height: 30px;
}

.title-area textarea {
  width: 100%;
  border: solid 1px #bac1c9;
  padding: 6px 8px;
  resize: none;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: -1px;
}

.title-area input {
  border: solid 1px #bac1c9;
  resize: none;
}

.check-area {
  display: flex;
  width: 100%;
  height: 32px;
  border-top: solid 1px #e2e6ec;
}

.check-area h3 {
  width: 90px;
  font-size: 14px;
  line-height: 30px;
}

.check-box {
  width: 20px;
}

.check-box img {
  src: "@/assets/btn-picking-s.svg";
}

.content-area {
  width: 100%;
  height: 300px;
}

.file-area {
  margin-top: 50px;
}

/* 모달 */
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

.modal-footer {
  padding: 20px;
  width: 100%;
}

.modal-footer span {
  font-size: 13px;
  font-weight: bold;
  text-align: center;
}

.btn_cancel,
.btn_submit {
  margin: auto;
  width: 120px;
  height: 32px;
  box-shadow: 0 2px 3px 0 var(--black-24-30);
  margin: 0 20px;
}

.btn_cancel {
  background: #eeeff0;
  border: solid 1px #c2c8cc;
}

.btn_submit {
  background: #3f484e;
  border: solid 1px #252c30;
  color: #fff;
}

.btn_cancel:hover {
  border: solid 1px #e0e3e5;
  background-color: #f6f7f7;
}

.btn_submit:hover {
  border: solid 1px #484d51;
  background-color: #5d656a;
}
</style>
