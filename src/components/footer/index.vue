<template>
  <a-layout-footer class="footer">
    <a-link href="https://github.com/LuckyPuppy514/jproxy" target="_blank">
      © 2023 LuckyPuppy514
    </a-link>
    <icon-star-fill
      :spin="true"
      size="medium"
      :style="{ color: 'rgb(var(--arcoblue-6))' }"
    />
    <a-link
      href="https://github.com/arco-design/arco-design-pro-vue"
      target="_blank"
    >
      Powered by Arco Pro
    </a-link>
  </a-layout-footer>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
    background-color: var(--color-bg-2);
  }
  .footer a {
    text-decoration: none;
    margin: 5px;
    color: var(--color-text-2);
  }
  .footer a:hover {
    color: rgb(var(--primary-6));
    background-color: rgba(0, 0, 0, 0);
  }
  .footer .arco-icon-spin {
    animation: arco-loading-circle 1.5s infinite cubic-bezier(0, 0, 1, 1);
  }
</style>
