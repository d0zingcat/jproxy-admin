<template>
  <div class="container">
    <Breadcrumb :items="['menu.radarr', 'menu.radarr.example']" />
    <ExampleForm v-model:visible="visible" @save="save"></ExampleForm>
    <a-card class="general-card" :title="t('menu.radarr.example')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 7 }"
            :wrapper-col-props="{ span: 17 }"
            label-align="left"
            :model="queryForm"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="originalText"
                  :label="$t('radarr.example.originalText')"
                >
                  <a-input
                    v-model="queryForm.originalText"
                    allow-clear
                    :placeholder="$t('radarr.example.originalText.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="validStatus"
                  :label="$t('radarr.example.validStatus')"
                  :label-col-props="{ span: 5 }"
                  :wrapper-col-props="{ span: 15 }"
                >
                  <a-select
                    v-model="queryForm.validStatus"
                    allow-clear
                    :placeholder="$t('radarr.example.validStatus.placeholder')"
                  >
                    <a-option value="1">{{
                      t('radarr.example.validStatus.pass')
                    }}</a-option>
                    <a-option value="0">{{
                      t('radarr.example.validStatus.fail')
                    }}</a-option>
                  </a-select>
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
              {{ $t('radarr.example.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('radarr.example.reset') }}
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
              status="success"
              :loading="addLoading"
              @click="add"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('radarr.example.add') }}
            </a-button>
            <a-button
              type="primary"
              status="danger"
              :loading="removeLoading"
              @click="remove"
            >
              <template #icon>
                <icon-delete />
              </template>
              {{ $t('radarr.example.remove') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKeys"
        row-key="hash"
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
  import ExampleForm from '@/components/example-form/index.vue';
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import type {
    TableColumnData,
    TableRowSelection,
  } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import {
    RadarrExample,
    queryRadarrExample,
    removeRadarrExample,
    saveRadarrExample,
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
  const visible = ref(false);
  const searchLoading = ref(false);
  const tableLoading = ref(false);
  const addLoading = ref(false);
  const removeLoading = ref(false);
  const selectedKeys = ref([]);
  const data = ref<RadarrExample[]>([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  }) as TableRowSelection;
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('radarr.example.validStatus'),
      dataIndex: 'validStatus',
      slotName: 'validStatus',
      align: 'center',
      width: 100,
    },
    {
      title: t('radarr.example.originalText'),
      dataIndex: 'originalText',
      ellipsis: true,
      tooltip: true,
      sortable: { sortDirections: ['ascend', 'descend'] },
    },
    {
      title: t('radarr.example.formatText'),
      dataIndex: 'formatText',
      width: 500,
      ellipsis: true,
      tooltip: true,
      sortable: { sortDirections: ['ascend', 'descend'] },
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
      originalText: undefined,
      validStatus: undefined,
    };
  };
  const queryForm = ref(generateQueryForm());
  const query = async (params: Pagination) => {
    showLoading(tableLoading);
    await queryRadarrExample(params)
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
  const add = () => {
    visible.value = true;
  };
  const remove = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('radarr.example.select.warning'));
      return;
    }
    showLoading(removeLoading);
    removeRadarrExample(selectedKeys.value as Array<string>)
      .then(() => {
        Message.success(t('radarr.example.remove.success'));
        query({ ...pagination, ...queryForm.value });
      })
      .finally(() => {
        hideLoading(removeLoading);
      });
  };
  const save = (params: string, callback) => {
    showLoading(addLoading);
    saveRadarrExample(params)
      .then(() => {
        Message.success(t('radarr.example.add.success'));
        search();
        callback(true);
      })
      .catch(() => {
        callback(false);
      })
      .finally(() => {
        hideLoading(addLoading);
      });
  };
  search();
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
