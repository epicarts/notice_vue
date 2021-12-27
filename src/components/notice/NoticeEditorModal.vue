<template>
  <div class="file-upload">
    <form @submit.prevent="formSubmit" method="post">
      <p>제목 : <input type="text" name="title" v-model="title" /></p>
      <div>내용</div>
      <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
      <input
        type="file"
        ref="selectFile"
        multiple="multiple"
        @change="previewFile"
      />
      <button type="submit" :disabled="isUploading">Upload</button>
      <QuillEditor theme="snow" v-model:content="content" />

      <ul v-if="selectFile">
        <li>lastModified : {{ selectFile.lastModified }}</li>
        <li>lastModifiedDate : {{ selectFile.lastModifiedDate }}</li>
        <li>name : {{ selectFile.name }}</li>
        <li>size(byte) : {{ selectFile.size }}</li>
        <li>type : {{ selectFile.type }}</li>
        <li>webkitRelativePath : {{ selectFile.webkitRelativePath }}</li>
      </ul>

      <img v-if="previewImgUrl" :src="previewImgUrl" />
      <editor-content :editor="editor" :contentType="'html'" :disabled="true" :enable="false" />

      <div>
        <hr />
        response : {{ response }}
      </div>
    </form>
  </div>
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
    };
  },

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
      if (this.selectFile) {
        // Form 필드 생성
        let form = new FormData();

        // form.append("file", this.selectFile); // api file name

        // 다중 파일
        for (var i = 0; i < this.selectFile.length; i++) {
          form.append("files", this.selectFile[i]);
        }

        form.append(
          "noticeData",
          new Blob(
            [
              JSON.stringify({
                title: this.title,
                content: JSON.stringify(this.content),
              }),
            ],
            {
              type: "application/json",
            }
          )
        );
        // form.append("title", "제목"); // api file name
        // form.append("content", "내용들어감"); // api file name

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
          })
          .catch((error) => {
            this.response = error;
            this.isUploading = false;
          });
      } else {
        alert("파일을 선택해 주세요.");
      }

      return true;
    },
  },
};
</script>

<style scoped>
.u {
  text-decoration: underline red;
}
</style>