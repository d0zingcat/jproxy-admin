<template>
  <div class="content">
    <a-result
      class="result"
      status="404"
      :subtitle="$t('exception.result.404.description')"
    >
    </a-result>
    <div class="operation-row">
      <a-button key="again" style="margin-right: 16px" @click="again">
        {{ $t('exception.result.404.retry') }}
      </a-button>
      <a-button key="back" type="primary" @click="back">
        {{ $t('exception.result.404.back') }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { DEFAULT_ROUTE_NAME } from '@/router/constants';

  const router = useRouter();
  const again = () => {
    router.go(0);
  };
  const back = () => {
    router.push({ name: DEFAULT_ROUTE_NAME });
  };
</script>

<style scoped lang="less">
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -200px;
    text-align: center;
  }
</style>
