<template>
    <div class="content">
      <div class="top">
        设置
      </div>
      <div class="items">
        <div class="item"></div>
      </div>

      <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "Set"
    }
</script>

<style scoped lang="less">
  .content {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #f8f8f8;
    font-size: 15px;
    color: #262626;

    .top {
      width: 100%;
      background-color: white;
      border-bottom: 1px solid gainsboro;
      text-align: center;
      padding: 10px 0;
    }
  }
</style>
