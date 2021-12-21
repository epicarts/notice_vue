<template>
  <div class="notice-grid-layout">
    <div class="search-area">
      <span>검색</span>
      <form @submit.prevent="submit" class="search-form">
        <input
          class="search-input"
          type="text"
          placeholder="제목, 내용, 작성자 검색"
          id="NoticeSearchValue"
        />

        <button type="submit" class="btn_init">
          <img
            src="@/assets/btn-searchbar-search-n.svg"
            class="btn_searchbar_search_n"
            alt="검색 버튼 이미지"
          />
          <span class="blind"> 검색</span>
        </button>
      </form>
    </div>

    <div class="container-fluid">
      <wj-flex-grid
        :itemsSource="this.gridData"
        :initialized="flexInitialized"
        :isReadOnly="true"
        headers-visibility="Column"
      >
        <wj-flex-grid-column :header="'No'" align="center" width="2*">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span v-if="cell.item.isNotice" style="font-weight: bold">
              {{ "공지" }}
            </span>
            <span v-else>
              {{ cell.item.noticeId }}
            </span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>

        <wj-flex-grid-column
          :header="'제목'"
          align="center"
          width="13*"
          @click="openModal(notice.noticeId)"
        >
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <a @click="openModal(cell.item.noticeId)" class="open-modal-cell">
              {{ cell.item.title }}
            </a>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>

        <wj-flex-grid-column
          width="3*"
          :header="'첨부파일'"
          :binding="'attachmentUrl'"
          align="center"
        />
        <wj-flex-grid-column
          width="4*"
          :header="'작성자'"
          :binding="'author'"
          align="center"
        />
        <wj-flex-grid-column
          width="4*"
          :header="'작성일'"
          :binding="'created'"
          align="center"
        />
        <wj-flex-grid-column
          width="2*"
          :header="'조회수'"
          :binding="'views'"
          align="center"
        />
      </wj-flex-grid>
    </div>

    <!-- pagenation 영역 -->
    <div class="pagenation-warp">
      <PagenationBar
        :totalPages="this.totalPages"
        :currentPage="page"
        @update:currentPage="updateHandler"
      />
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
import PagenationBar from "@/components/common/PagenationBar.vue";

import "@grapecity/wijmo.styles/wijmo.css";
// import * as wjGrid from "@grapecity/wijmo.grid";
import {
  WjFlexGrid,
  WjFlexGridColumn,
  WjFlexGridCellTemplate,
} from "@grapecity/wijmo.vue2.grid";

export default {
  components: {
    NoticeDetailModal,
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridCellTemplate,
    PagenationBar,
  },
  data() {
    return {
      modalData: null,
      showModal: false,
      gridData: [],
      page: 1,
      search: "",
      size: 10,
      totalPages: 0,
      // grid refresh를 위한 이벤트 객체 저장
      flexgridCollectionView: null,
    };
  },
  created() {
    this.getApiAndrefresh();
  },
  methods: {
    // 검색
    async submit(e) {
      this.search = e.target.NoticeSearchValue.value;
      this.page = 1; // 검색을 하므로 페이지를 초기화
      this.getApiAndrefresh();
    },
    // 페이지네이션(pagenation)
    updateHandler(clickPage) {
      this.page = clickPage;
      this.getApiAndrefresh();
    },
    // notice API
    async apiNoticeRequest() {
      var noticeList = await this.$getapi("/api/notices/notice");
      this.gridData.unshift(...noticeList);
    },
    // pagenation API
    async apiPageRequest() {
      var PageList = await this.$getapi("/api/notices", this.getParams());
      this.gridData.push(...PageList.content);
      this.totalPages = PageList.totalPages;
    },
    async getApiAndrefresh() {
      this.gridData.splice(0);
      await this.apiPageRequest();
      await this.apiNoticeRequest();
      this.flexgridCollectionView.refresh(); // 위즈모 gridData 새로 고침
    },
    getParams() {
      return {
        // API 요청시 page는 0 부터 시작함으로 -1을 해줌
        page: this.page - 1,
        size: this.size,
        search: this.search,
      };
    },
    // 모달
    openModal(data) {
      this.modalData = data;
      this.showModal = true;
    },
    flexInitialized: function (e) {
      this.flexgridCollectionView = e.collectionView;
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

.search-form {
  display: flex;
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

.open-modal-cell {
  cursor: pointer;
}

.pagenation-warp {
  margin-top: 20px;
  margin-bottom: 30px;
}

/* 위즈모 그리드 CSS */

.wj-header {
  border-right: none;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.wj-header::after {
  content: "";
  position: absolute;
  right: 0;
  height: 20px;
  width: 1px;
  background-color: #d7dce3;
}

.wj-cell.wj-header {
  background-color: #fff;
}

div[wj-part="ch"] {
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 26%);
}

.wj-cell {
  padding: 9px;
}

.wj-cell {
  font-size: 12px;
  color: #111;
  box-sizing: border-box;
  border: none;
  box-shadow: inset -1px -1px 0 0 var(--pale-grey);
  background-color: #f1f5f9;
}

.wj-cell.wj-alt {
  background: #fff;
}
</style>
