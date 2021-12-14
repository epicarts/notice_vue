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

        <button type="button" class="btn_search">
          <img
            src="@/assets/btn-searchbar-search-n.svg"
            class="btn_searchbar_search_n"
          />
          <span class="blind"> 검색</span>
        </button>
      </span>
    </div>
    <div class="notice-grid">그리드 영역</div>
    <div class="pagenation">페이지네이션 영역</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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

.btn_search {
  position: relative;
  border: none;
  margin: 0;
  text-align: center;
  text-decoration: none;
  background-color: #fff;
}

.notice-grid-layout {
  display: flex;
  flex-direction: column;
}
</style>
