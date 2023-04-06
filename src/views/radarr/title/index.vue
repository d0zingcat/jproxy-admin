<template>
  <div class="container">
    <Breadcrumb :items="['menu.radarr', 'menu.radarr.title']" />
    <a-card class="general-card" :title="t('menu.radarr.title')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 5 }"
            :wrapper-col-props="{ span: 15 }"
            label-align="left"
            :model="queryForm"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="title" :label="$t('radarr.title.title')">
                  <a-input
                    v-model="queryForm.title"
                    allow-clear
                    :placeholder="$t('radarr.title.title.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="tmdbId"
                  :label-col-props="{ span: 8 }"
                  :label="$t('radarr.title.tmdbId')"
                >
                  <a-input-number
                    v-model="queryForm.tmdbId"
                    :min="0"
                    allow-clear
                    :placeholder="$t('radarr.title.tmdbId.placeholder')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 35px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :size="18">
            <a-button type="primary" :loading="searchLoading" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('radarr.title.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('radarr.title.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button
              type="primary"
              status="danger"
              :loading="removeLoading"
              @click="remove"
            >
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('radarr.title.remove') }}
            </a-button>
            <a-button type="primary" :loading="syncLoading" @click="sync">
              <template #icon>
                <icon-sync />
              </template>
              {{ $t('radarr.title.sync') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKeys"
        row-key="id"
        size="medium"
        :data="data"
        :columns="columns"
        :bordered="false"
        :loading="tableLoading"
        :pagination="pagination"
        :row-selection="rowSelection"
        @page-size-change="onPageSizeChange"
        @page-change="onPageChange"
      >
        <template #monitored="{ record }">
          <icon-eye
            v-if="record.monitored === 1"
            size="21"
            :style="{
              color: 'rgb(var(--green-6))',
            }"
          />
          <icon-eye-invisible
            v-else
            size="21"
            :style="{
              color: 'var(--color-neutral-6)',
            }"
          />
        </template>
        <template #validStatus="{ record }">
          <icon-check-circle
            v-if="record.validStatus === 1"
            size="21"
            :style="{
              color: 'rgb(var(--green-6))',
            }"
          />
          <icon-close-circle
            v-else
            size="21"
            :style="{
              color: 'rgb(var(--orange-6))',
            }"
          />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import {
    RadarrTitle,
    queryRadarrTitle,
    removeRadarrTitle,
    syncRadarrTitle,
  } from '@/api/radarr';

  const showLoading = (loading) => {
    loading.value = true;
  };
  const hideLoading = (loading) => {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  };
  const { t } = useI18n();
  const searchLoading = ref(false);
  const tableLoading = ref(false);
  const removeLoading = ref(false);
  const syncLoading = ref(false);
  const selectedKeys = ref([]);
  const data = ref<RadarrTitle[]>([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  }) as TableRowSelection;
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('radarr.title.tmdbId'),
      dataIndex: 'tmdbId',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.sno'),
      dataIndex: 'sno',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.mainTitle'),
      dataIndex: 'mainTitle',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.title'),
      dataIndex: 'title',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.cleanTitle'),
      dataIndex: 'cleanTitle',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.year'),
      dataIndex: 'year',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.monitored'),
      dataIndex: 'monitored',
      slotName: 'monitored',
      align: 'center',
      width: 105,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('radarr.title.validStatus'),
      dataIndex: 'validStatus',
      slotName: 'validStatus',
      align: 'center',
      width: 100,
    },
  ]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    showTotal: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 100, 1000],
    ...basePagination,
  });

  const generateQueryForm = () => {
    return {
      tmdbId: undefined,
      title: undefined,
    };
  };
  const queryForm = ref(generateQueryForm());
  const query = async (params: Pagination) => {
    showLoading(tableLoading);
    await queryRadarrTitle(params)
      .then((res) => {
        data.value = res.data.list;
        pagination.current = params.current;
        pagination.total = res.data.total;
      })
      .finally(() => {
        hideLoading(tableLoading);
        selectedKeys.value = [];
      });
  };
  const search = () => {
    showLoading(searchLoading);
    query({
      ...basePagination,
      ...queryForm.value,
    }).finally(() => {
      hideLoading(searchLoading);
    });
  };
  const reset = () => {
    queryForm.value = generateQueryForm();
  };
  const onPageChange = (current: number) => {
    query({ ...basePagination, current, ...queryForm.value });
  };
  const onPageSizeChange = (pageSize: number) => {
    basePagination.pageSize = pageSize;
    pagination.pageSize = pageSize;
    query({ ...pagination, ...queryForm.value });
  };
  const remove = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('radarr.title.select.warning'));
      return;
    }
    showLoading(removeLoading);
    removeRadarrTitle(selectedKeys.value as Array<number>)
      .then(() => {
        Message.success(t('radarr.title.remove.success'));
        query({ ...pagination, ...queryForm.value });
      })
      .finally(() => {
        hideLoading(removeLoading);
      });
  };
  const sync = () => {
    showLoading(syncLoading);
    syncRadarrTitle()
      .then(() => {
        Message.success(t('radarr.title.sync.success'));
        search();
      })
      .finally(() => {
        hideLoading(syncLoading);
      });
  };
  search();
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
