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
    <!-- <div class="notice-grid">
      <ul>
        <li v-for="notice in api.content" :key="notice.noticeId">
          <span>{{ notice.noticeId }}</span>
          <span>{{ notice.title }}</span>
          <span>{{ notice.author }}</span>
          <span>{{ notice.created }}</span>
          <span>{{ notice.division }}</span>
          <button @click="openModal(notice.noticeId)">자세히보기</button>
        </li>
      </ul>
    </div> -->

    <div class="container-fluid">
      <wj-flex-grid
        :itemsSource="this.gridData"
        :initialized="flexInitialized"
        headers-visibility="Column"
      >
        <wj-flex-grid-column :header="'No'" :binding="'noticeId'" />
        <wj-flex-grid-column
          :header="'title'"
          :binding="'title'"
          width="2*"
          @click="openModal(notice.noticeId)"
        />
        <wj-flex-grid-column :header="'첨부파일'" :binding="'attachmentUrl'" />
        <wj-flex-grid-column :header="'작성자'" :binding="'author'" />
        <wj-flex-grid-column :header="'작성일'" :binding="'created'" />
        <wj-flex-grid-column :header="'조회수'" :binding="'numberOfComment'" />
      </wj-flex-grid>
    </div>

    <div class="pagenation">
      <button @click="onClickPagenationHandler(-1)">감소</button>
      <button @click="onClickPagenationHandler(1)">증가</button>
    </div>

    <!-- 모달 영역 -->
    <NoticeDetailModal
      :notice-id="modalData"
      v-if="showModal"
      @close="showModal = false"
    ></NoticeDetailModal>
  </div>
</template>

<script>
import NoticeDetailModal from "@/components/notice/NoticeDetailModal";
import "@grapecity/wijmo.styles/wijmo.css";
// import * as wjGrid from "@grapecity/wijmo.grid";
import { WjFlexGrid, WjFlexGridColumn } from "@grapecity/wijmo.vue2.grid";

export default {
  components: { NoticeDetailModal, WjFlexGrid, WjFlexGridColumn },
  data() {
    return {
      modalData: null,
      showModal: false,
      // api: [],
      gridData: [],
      page: 0,
      size: 20,
      search: "",

      // grid refresh를 위한 변수
      flexgrid: null,
    };
  },
  created() {
    this.apiPageRequest(); // pagenation 데이터 요청
    this.apiNoticeRequest(); // 공지사항 데이터 요청
  },
  methods: {
    // notice API
    apiNoticeRequest() {
      this.$getapi("/api/notices/notice", this.getParams()).then((data) => {
        this.gridData.unshift(
          ...data.map((e) => {
            e.noticeId = "공지";
            return e;
          })
        );
        this.flexgrid.refresh(); // 위즈모 gridData 새로 고침
      });
    },
    // pagenation API
    apiPageRequest() {
      this.$getapi("/api/notices", this.getParams()).then((data) => {
        this.gridData.push(...data.content);
        this.flexgrid.refresh(); // 위즈모 gridData 새로 고침
      });
    },
    // pagenation
    onClickPagenationHandler(count) {
      this.gridData.splice(0);
      this.page += count;
      this.apiPageRequest();
      this.apiNoticeRequest();
    },
    getParams() {
      return {
        page: this.page,
        size: this.size,
        search: this.search,
      };
    },
    // 모달
    openModal(data) {
      this.modalData = data;
      this.showModal = true;
    },
    // flexInitialized: (flexgrid) => {
    //   this.flexgriddd = flexgrid.CollectionView;
    //   console.log(flexgrid);
    // },
    flexInitialized: function (e) {
      this.flexgrid = e.collectionView;
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
