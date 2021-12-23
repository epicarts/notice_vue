<template>
  <div class="notice-grid-layout">
    <div class="grid-header-area">
      <div class="notice-count-warp">
        <span class="notice-count-title">글 등록현황</span>
        <span>
          공지 글 <strong> {{ this.totalNoticeSize }} </strong> 건
        </span>
        <span class="sep-bar"></span>
        <span
          >조회 글 <strong> {{ this.totalElements }}</strong> 건
        </span>
      </div>
      <div class="search-area">
        <PageSize
          :pageSize="pageSize"
          @update:pageSize="updatePageSizeHandler"
        />
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
              <span
                v-if="cell.item.numberOfComment"
                class="comment-number-view"
              >
                [{{ cell.item.numberOfComment }}]
              </span>
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
      tabindex="0"
      @keyup.esc="showModal = false"
      :notice-id="modalData"
      v-if="showModal"
      @close="showModal = false"
    ></NoticeDetailModal>
  </div>
</template>

<script>
import NoticeDetailModal from "@/components/notice/NoticeDetailModal";
import PagenationBar from "@/components/common/PagenationBar.vue";
import PageSize from "@/components/common/PagenationPageSize.vue";

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
    PageSize,
  },
  data() {
    return {
      modalData: null,
      showModal: false,
      gridData: [],
      page: 1,
      search: "",
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      totalNoticeSize: 0,
      flexgridCollectionView: null,
    };
  },
  mounted() {
    this.refreshGridData();
  },
  methods: {
    // 검색
    async submit(e) {
      this.search = e.target.NoticeSearchValue.value;
      this.page = 1; // 검색을 하므로 페이지를 초기화
      this.refreshGridData();
    },
    // 페이지네이션(pagenation)
    updateHandler(clickPage) {
      this.page = clickPage;
      this.refreshGridData();
    },
    updatePageSizeHandler(selectPageSize) {
      this.pageSize = selectPageSize;
      this.refreshGridData();
    },
    // notice API
    async apiNoticeRequest() {
      return await this.$getapi("/api/notices/notice");
    },
    // pagenation API
    async apiPageRequest() {
      return await this.$getapi("/api/notices", this.getParams());
    },
    refreshGridData() {
      // 2개의 API 요청이 끝날때 까지 가다림
      Promise.all([this.apiPageRequest(), this.apiNoticeRequest()])
        .then(([pageList, noticeList]) => {
          this.gridData.splice(0);

          this.gridData.push(...pageList.content);
          this.gridData.unshift(...noticeList);

          this.totalNoticeSize = noticeList.length;
          this.totalElements = pageList.totalElements;
          this.totalPages = pageList.totalPages;
          this.flexgridCollectionView.refresh(); // 위즈모 gridData 새로 고침
        })
        .catch((reason) => {
          console.log(reason);
        });
    },
    getParams() {
      return {
        // API 요청시 page는 0 부터 시작함으로 -1을 해줌
        page: this.page - 1,
        size: this.pageSize,
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
.comment-number-view {
  color: #176de2;
}

/* 검색바 영역 */
.grid-header-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

/* 글 등록 현황 */
.notice-count-warp {
  align-items: center;
  display: flex;
}

.notice-count-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
}

.sep-bar {
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 4px 10px 1px;
  background-color: #c9c9c9;
}
</style>
