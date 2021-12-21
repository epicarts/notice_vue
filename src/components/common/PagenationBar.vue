<template>
  <div class="pagenation">
    <div class="allow-btn-group">
      <img
        src="@/assets/ico-pre-2.svg"
        alt="맨 뒤로 이동하기"
        @click="onClickPrevPageSet"
      />
      <img
        src="@/assets/ico-pre-1.svg"
        alt="이전 페이지로 이동"
        @click="onClickPrevPage"
      />
    </div>
    <ul class="page-btn-list">
      <li
        v-for="index in visiblePages"
        :key="index"
        :class="{ active: index === currentPage }"
        class="pageBtn"
        @click="onClickPageButton(index)"
      >
        {{ index }}
      </li>
    </ul>
    <div class="allow-btn-group">
      <img
        src="@/assets/ico-next-1.svg"
        alt="다음 페이지로 이동"
        @click="onClickNextPage"
      />
      <img
        src="@/assets/ico-next-2.svg"
        alt="맨 앞으로 이동하기"
        @click="onClickNextPageSet"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 전체 페이지
    totalPages: {
      type: Number,
      required: true,
    },
    // 현재 페이지 인덱스
    currentPage: {
      type: Number,
      default: 0,
      required: true,
    },
    // 페이지 숫자 목록
    pageCount: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      startPageNumber: 1,
    };
  },
  methods: {
    // 페이지 버튼 클릭시
    onClickPageButton(clickNumber) {
      // 부모에서 보낸 이벤트 핸들러 적용 https://v3.ko.vuejs.org/guide/migration/v-model.html
      this.$emit("update:currentPage", clickNumber);
    },
    // 첫 페이지로 이동
    onClickPrevPageSet() {
      this.$emit("update:currentPage", this.startPageNumber);
    },
    // 이전 페이지로 이동
    onClickPrevPage() {
      // 첫 페이지 도달시 동작하지 않음
      if (this.currentPage > this.startPageNumber) {
        this.$emit("update:currentPage", this.currentPage - 1);
      }
    },
    // 다음 페이지로 이동
    onClickNextPage() {
      // 마지막 페이지 도달시 동작하지 않음
      if (this.currentPage < this.totalPages) {
        this.$emit("update:currentPage", this.currentPage + 1);
      }
    },
    // 마지막 페이지로 이동
    onClickNextPageSet() {
      this.$emit("update:currentPage", this.totalPages);
    },
  },
  computed: {
    visiblePages() {
      console.log(this.totalPages);
      const pages = [];
      const start = Math.max(
        1,
        Math.min(this.currentPage - 2, this.totalPages - this.pageCount + 1)
      );
      const end = Math.min(start + this.pageCount, this.totalPages + 1);
      for (let i = start; i < end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #333;
  color: #fff;
}

.pagenation {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn-list {
  display: flex;
  justify-content: center;
  margin: 0 6px;
}

.page-btn-list li {
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.allow-btn-group {
  display: flex;
  cursor: pointer;
}
</style>
