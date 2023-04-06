<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.cache']" />
    <div class="system-cache-div">
      <a-row :gutter="30">
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.system.config')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[0].loading"
              @click="clear(0)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.sonarr.rule')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[1].loading"
              @click="clear(1)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.radarr.rule')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[2].loading"
              @click="clear(2)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="30">
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.sonarr.title.sync.interval')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[3].loading"
              @click="clear(3)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.tmdb.title.sync.interval')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[4].loading"
              @click="clear(4)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            class="system-cache-card"
            :title="$t('system.cache.radarr.title.sync.interval')"
          >
            <a-button
              type="secondary"
              status="danger"
              :loading="caches[5].loading"
              @click="clear(5)"
            >
              <template #icon>
                <icon-eraser size="medium" />
              </template>
              {{ t('system.cache.clear') }}
            </a-button>
          </a-card>
        </a-col>
      </a-row>
      <div class="system-cache-action">
        <a-button
          type="primary"
          status="danger"
          :loading="caches[6].loading"
          @click="clearAll"
        >
          <template #icon>
            <icon-eraser size="medium" />
          </template>
          {{ $t('system.cache.clear.all') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { clearAllSystemCache, clearSystemCache } from '@/api/system';
  import { Message } from '@arco-design/web-vue';

  const { t } = useI18n();
  const caches = ref([
    {
      name: 'system_config',
      loading: false,
    },
    {
      name: 'sonarr_rule',
      loading: false,
    },
    {
      name: 'radarr_rule',
      loading: false,
    },
    {
      name: 'sonarr_title_sync_interval',
      loading: false,
    },
    {
      name: 'tmdb_title_sync_interval',
      loading: false,
    },
    {
      name: 'radarr_title_sync_interval',
      loading: false,
    },
    {
      name: 'all',
      loading: false,
    },
  ]);
  const clearAll = () => {
    caches.value.forEach((cache) => {
      cache.loading = true;
    });
    clearAllSystemCache()
      .then(() => {
        Message.success(t('system.cache.clear.success'));
      })
      .finally(() => {
        setTimeout(() => {
          caches.value.forEach((cache) => {
            cache.loading = false;
          });
        }, 300);
      });
  };
  const clear = (index: number) => {
    caches.value[index].loading = true;
    clearSystemCache(caches.value[index].name)
      .then(() => {
        Message.success(t('system.cache.clear.success'));
      })
      .finally(() => {
        setTimeout(() => {
          caches.value[index].loading = false;
        }, 300);
      });
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    height: calc(100% - 60px);
    :deep(.system-cache-div) {
      padding: 6%;
      height: 100%;
      background-color: var(--color-bg-2);
    }
  }
  .system-cache-card {
    margin-bottom: 30px;
    text-align: center;
    border: 1px solid var(--color-neutral-3);
    box-shadow: 0 0 20px var(--color-fill-1);
  }
  .system-cache-action {
    position: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    text-align: center;
  }
  .system-cache-div button {
    height: 35px;
    width: 150px;
  }
  .system-cache-div button:last-child {
    margin-top: 20px;
  }
</style>
