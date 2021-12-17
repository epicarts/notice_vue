<template>
  <div class="notice-grid-layout">
    <div class="search-area">
      <span>검색</span>
      <span class="ps-box">
        <input
          class="search-input"
          type="text"
          placeholder="제목, 내용, 작성자 검색"
          id="NoticeSearchValue"
        />

        <button type="button" class="btn_init">
          <img
            src="@/assets/btn-searchbar-search-n.svg"
            class="btn_searchbar_search_n"
            alt="검색 버튼 이미지"
          />
          <span class="blind"> 검색</span>
        </button>
      </span>
    </div>
    <div class="notice-grid">
      <ul>
        <li v-for="notice in api.content" :key="notice.noticeId">
          <span>{{ notice.noticeId }}</span>
          <span>{{ notice.title }}</span>
          <span>{{ notice.author }}</span>
          <span>{{ notice.created }}</span>
          <span>{{ notice.division }}</span>
        </li>
      </ul>
    </div>
    <div class="pagenation">
      <button @click="onClickPagenationHandler(-1)">감소</button>
      <button @click="onClickPagenationHandler(1)">증가</button>
    </div>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <!-- 모달 영역 -->
    <NoticeDetailModal v-if="showModal" @close="showModal = false">
      <!--
      you can use custom content here to overwrite
      default content
    -->
      <!-- <h3 slot="header">custom header</h3> -->
    </NoticeDetailModal>
  </div>
</template>

<script>
import axios from "axios";
import NoticeDetailModal from "@/components/notice/NoticeDetailModal";

export default {
  components: { NoticeDetailModal },
  data() {
    return {
      showModal: false,
      api: {},
      page: 0,
      size: 20,
    };
  },
  created() {
    this.apiDataRequest();
  },
  methods: {
    onClickPagenationHandler(count) {
      this.page += count;
      this.apiDataRequest();
    },
    apiDataRequest() {
      axios
        .get("/api/notices", {
          params: {
            page: this.page,
            size: this.size,
          },
        })
        .then((response) => {
          this.api = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
/* 검색바 영역 */
.search-area {
  display: flex;
  align-self: flex-end;
  margin: 12px;
  height: 24px;
  text-align: center;
}

.search-area > span {
  font-size: 13px;
  font-weight: bold;
  margin-right: 6px;
  display: flex;
  line-height: 1.8;
}

.search-area button {
  height: 17px;
}

.search-area input {
  /* border: none; */
  outline: none;
  border: none;
  line-height: 16px;
}

.ps-box {
  display: block;
  width: 200px;
  height: 24px;
  border-radius: 1px;
  border: solid 1px #bac1c9;
  padding: 4px 8px;
}

.btn_searchbar_search_n {
  width: 17px;
  height: 17px;
  object-fit: contain;
  position: absolute;
  top: -1px;
}

.notice-grid-layout {
  display: flex;
  flex-direction: column;
}
</style>
