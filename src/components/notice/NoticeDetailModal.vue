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

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              <span>목록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style>
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
  width: 1050px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 16px 36px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
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

.modal-body {
  padding-bottom: 10px;
  margin: 17px 17px 0;
  border-bottom: 1px solid var(--pale-grey);
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
