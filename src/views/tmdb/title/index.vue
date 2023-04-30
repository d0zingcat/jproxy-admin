<template>
  <div class="container">
    <Breadcrumb :items="['menu.sonarr', 'menu.sonarr.tmdb']" />
    <TmdbForm
      v-model:visible="visible"
      :data="tmdb"
      :title="title"
      @save="save"
    ></TmdbForm>
    <a-card class="general-card" :title="t('menu.sonarr.tmdb')">
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
                <a-form-item field="title" :label="$t('tmdb.title.title')">
                  <a-input
                    v-model="queryForm.title"
                    allow-clear
                    :placeholder="$t('tmdb.title.title.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="tvdbId"
                  :label-col-props="{ span: 8 }"
                  :label="$t('tmdb.title.tvdbId')"
                >
                  <a-input-number
                    v-model="queryForm.tvdbId"
                    :min="0"
                    allow-clear
                    :placeholder="$t('tmdb.title.tvdbId.placeholder')"
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
              {{ $t('tmdb.title.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('tmdb.title.reset') }}
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
              {{ $t('tmdb.title.add') }}
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
              {{ $t('tmdb.title.remove') }}
            </a-button>
            <a-button type="primary" :loading="syncLoading" @click="sync">
              <template #icon>
                <icon-sync />
              </template>
              {{ $t('tmdb.title.sync') }}
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
        <template #title="{ record }">
          <a-input v-model="record.title" @change="onTitleChange(record)" />
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
        <template #edit="{ record }">
          <a-button type="text" size="mini" @click="edit(record)">
            <icon-edit size="medium" />
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import TmdbForm from '@/components/tmdb-form/index.vue';
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import type {
    TableColumnData,
    TableRowSelection,
    TableData,
  } from '@arco-design/web-vue/es/table/interface';
  import { Pagination } from '@/types/global';
  import {
    TmdbTitle,
    queryTmdbTitle,
    removeTmdbTitle,
    syncTmdbTitle,
    saveTmdbTitle,
  } from '@/api/tmdb';

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
  const syncLoading = ref(false);
  const selectedKeys = ref([]);
  const data = ref<TmdbTitle[]>([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  }) as TableRowSelection;
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('tmdb.title.tvdbId'),
      dataIndex: 'tvdbId',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('tmdb.title.tmdbId'),
      dataIndex: 'tmdbId',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('tmdb.title.language'),
      dataIndex: 'language',
      align: 'center',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('tmdb.title.title'),
      dataIndex: 'title',
      slotName: 'title',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('tmdb.title.cleanTitle'),
      dataIndex: 'cleanTitle',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('tmdb.title.validStatus'),
      dataIndex: 'validStatus',
      slotName: 'validStatus',
      align: 'center',
      width: 100,
    },
    {
      title: t('tmdb.title.edit'),
      slotName: 'edit',
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
      tvdbId: undefined,
      title: undefined,
    };
  };
  const queryForm = ref(generateQueryForm());
  const query = async (params: Pagination) => {
    showLoading(tableLoading);
    await queryTmdbTitle(params)
      .then((res) => {
        data.value = res.data.list;
        pagination.current = params.current;
        pagination.total = res.data.total;
      })
      .finally(() => {
        hideLoading(tableLoading);
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
  const title = ref('');
  const tmdb = ref({});
  const add = () => {
    title.value = t('tmdb.form.add.title');
    tmdb.value = { language: 'zh-CN' };
    visible.value = true;
  };
  const remove = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('tmdb.title.select.warning'));
      return;
    }
    showLoading(removeLoading);
    removeTmdbTitle(selectedKeys.value as Array<number>)
      .then(() => {
        Message.success(t('tmdb.title.remove.success'));
        query({ ...pagination, ...queryForm.value });
      })
      .finally(() => {
        hideLoading(removeLoading);
      });
  };
  const sync = () => {
    showLoading(syncLoading);
    syncTmdbTitle()
      .then(() => {
        Message.success(t('tmdb.title.sync.success'));
        search();
      })
      .finally(() => {
        hideLoading(syncLoading);
      });
  };
  const onTitleChange = (record) => {
    saveTmdbTitle(record).then(() => {
      Message.success(t('tmdb.title.save.success'));
      search();
    });
  };
  const edit = (record: TableData) => {
    title.value = t('tmdb.form.edit.title');
    tmdb.value = record;
    visible.value = true;
  };
  const save = (params: TmdbTitle, callback) => {
    saveTmdbTitle(params)
      .then(() => {
        Message.success(t('tmdb.title.save.success'));
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
