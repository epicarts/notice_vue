<template>
  <div class="page-size-layout">
    <span>페이지 보기</span>
    <select name="" id="" @change="selectPageSizeOption">
      <option
        v-for="(option, index) in pageSizeOptions"
        :key="index"
        :value="option"
      >
        {{ option }} <span>건</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    pageSizeOptions: {
      type: Array,
      default: () => ["10", "20", "50", "100"],
      required: false,
    },
  },
  methods: {
    // 페이지 버튼 클릭시
    selectPageSizeOption(e) {
      this.$emit("update:pageSize", e.target.value);
    },
  },
};
</script>

<style scoped>
.page-size-layout {
  display: flex;
  align-content: center;
  margin-right: 10px;
  align-items: center;
}

.page-size-layout span {
  margin-right: 5px;
}

.page-size-layout select {
  height: 20px;
}
</style>
