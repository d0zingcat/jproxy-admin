<template>
  <div class="container">
    <Breadcrumb :items="['menu.sonarr', 'menu.sonarr.rule']" />
    <RuleForm
      v-model:visible="visible"
      :token-list="tokenList"
      :data="rule"
      :title="title"
      @save="save"
    ></RuleForm>
    <a-card class="general-card" :title="t('menu.sonarr.rule')">
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
                <a-form-item field="token" :label="$t('sonarr.rule.token')">
                  <a-select
                    v-model="queryForm.token"
                    :options="tokenList"
                    :placeholder="$t('sonarr.rule.token.placeholder')"
                    allow-search
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="remark"
                  :label-col-props="{ span: 8 }"
                  :label="$t('sonarr.rule.remark')"
                >
                  <a-input
                    v-model="queryForm.remark"
                    allow-clear
                    :placeholder="$t('sonarr.rule.remark.placeholder')"
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
              {{ $t('sonarr.rule.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('sonarr.rule.reset') }}
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
              {{ $t('sonarr.rule.add') }}
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
              {{ $t('sonarr.rule.remove') }}
            </a-button>
            <a-button type="primary" :loading="syncLoading" @click="sync">
              <template #icon>
                <icon-sync />
              </template>
              {{ $t('sonarr.rule.sync') }}
            </a-button>
            <a-tooltip :content="$t('sonarr.rule.enable')">
              <a-button
                type="primary"
                status="success"
                :loading="enableLoading"
                @click="enable"
              >
                <template #icon>
                  <icon-check-circle size="21" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip :content="$t('sonarr.rule.disable')">
              <a-button
                type="primary"
                status="warning"
                :loading="disableLoading"
                @click="disable"
              >
                <template #icon>
                  <icon-close-circle size="21" />
                </template>
              </a-button>
            </a-tooltip>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-space>
            <a-upload :custom-request="upload" :show-file-list="false">
              <template #upload-button>
                <a-button
                  type="primary"
                  :loading="uploadLoading"
                  status="success"
                >
                  <template #icon>
                    <icon-upload />
                  </template>
                  {{ $t('sonarr.rule.import') }}
                </a-button>
              </template>
            </a-upload>
            <a-button
              type="primary"
              status="normal"
              :loading="downloadLoading"
              @click="download"
            >
              <template #icon>
                <icon-download />
              </template>
              {{ $t('sonarr.rule.export') }}
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
        <template #seasonNumber="{ record }">
          <icon-minus
            v-if="record.seasonNumber === -1"
            size="13"
            :style="{
              color: 'var(--color-neutral-6)',
            }"
          />
          <span v-else>{{ record.seasonNumber }}</span>
        </template>
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
  import RuleForm from '@/components/rule-form/index.vue';
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
    SonarrRule,
    querySonarrRule,
    removeSonarrRule,
    syncSonarrRule,
    saveSonarrRule,
    importSonarrRule,
    exportSonarrRule,
    enableSonarrRule,
    disableSonarrRule,
    listSonarrRuleToken,
  } from '@/api/sonarr';

  const showLoading = (loading) => {
    loading.value = true;
  };
  const hideLoading = (loading) => {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  };
  const { t } = useI18n();
  const tokenList = ref([] as string[]);
  const visible = ref(false);
  const tableLoading = ref(false);
  const searchLoading = ref(false);
  const addLoading = ref(false);
  const removeLoading = ref(false);
  const syncLoading = ref(false);
  const enableLoading = ref(false);
  const disableLoading = ref(false);
  const uploadLoading = ref(false);
  const downloadLoading = ref(false);
  const selectedKeys = ref([]);
  const data = ref<SonarrRule[]>([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
  }) as TableRowSelection;
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('sonarr.rule.validStatus'),
      dataIndex: 'validStatus',
      slotName: 'validStatus',
      align: 'center',
      width: 100,
    },
    {
      title: t('sonarr.rule.token'),
      dataIndex: 'token',
      width: 100,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.priority'),
      dataIndex: 'priority',
      width: 105,
      ellipsis: true,
      tooltip: true,
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      title: t('sonarr.rule.regex'),
      dataIndex: 'regex',
      width: 300,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.replacement'),
      dataIndex: 'replacement',
      width: 150,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.offset'),
      dataIndex: 'offset',
      width: 100,
      align: 'center',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.remark'),
      dataIndex: 'remark',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.author'),
      dataIndex: 'author',
      width: 150,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('sonarr.rule.edit'),
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
      token: undefined,
      remark: undefined,
    };
  };
  const queryForm = ref(generateQueryForm());
  const query = async (params: Pagination) => {
    showLoading(tableLoading);
    await querySonarrRule(params)
      .then((res) => {
        data.value = res.data.list;
        pagination.current = params.current;
        pagination.total = res.data.total;
      })
      .finally(() => {
        hideLoading(tableLoading);
        selectedKeys.value = [];
      });
    await listSonarrRuleToken().then((res) => {
      tokenList.value = res.data;
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
  const rule = ref({});
  const add = () => {
    title.value = t('rule.form.add.title');
    rule.value = {
      priority: 1000,
      regex: '.*().*',
      replacement: '$1',
      offset: 0,
      author: localStorage.getItem('author'),
    };
    visible.value = true;
  };
  const remove = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('sonarr.rule.select.warning'));
      return;
    }
    showLoading(removeLoading);
    removeSonarrRule(selectedKeys.value as Array<string>)
      .then(() => {
        Message.success(t('sonarr.rule.remove.success'));
        query({ ...pagination, ...queryForm.value });
      })
      .finally(() => {
        hideLoading(removeLoading);
      });
  };
  const sync = () => {
    showLoading(syncLoading);
    syncSonarrRule()
      .then(() => {
        Message.success(t('sonarr.rule.sync.success'));
        search();
      })
      .finally(() => {
        hideLoading(syncLoading);
      });
  };
  const upload = (option) => {
    showLoading(uploadLoading);
    importSonarrRule(option.fileItem.file)
      .then(() => {
        Message.success(t('sonarr.rule.import.success'));
        search();
      })
      .finally(() => {
        hideLoading(uploadLoading);
      });
    return {
      upload,
    };
  };
  const download = () => {
    showLoading(downloadLoading);
    exportSonarrRule(selectedKeys.value as Array<string>)
      .then((res) => {
        let author = localStorage.getItem('author');
        author = author ? `@${author}` : '';
        const elink = document.createElement('a');
        elink.download = `sonarr${author}.json`;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(new Blob([res.data]));
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      })
      .finally(() => {
        hideLoading(downloadLoading);
      });
  };
  const edit = (record: TableData) => {
    title.value = t('rule.form.edit.title');
    rule.value = record;
    visible.value = true;
  };
  const save = (params: SonarrRule, callback) => {
    if (!params.id) {
      showLoading(addLoading);
      localStorage.setItem('author', params.author);
    }
    saveSonarrRule(params)
      .then(() => {
        Message.success(t('sonarr.rule.save.success'));
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
  const enable = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('sonarr.rule.select.warning'));
      return;
    }
    showLoading(enableLoading);
    enableSonarrRule(selectedKeys.value as Array<string>)
      .then(() => {
        search();
        Message.success(t('sonarr.rule.enable.success'));
      })
      .finally(() => {
        hideLoading(enableLoading);
      });
  };
  const disable = () => {
    if (!selectedKeys.value || selectedKeys.value.length === 0) {
      Message.warning(t('sonarr.rule.select.warning'));
      return;
    }
    showLoading(disableLoading);
    disableSonarrRule(selectedKeys.value as Array<string>)
      .then(() => {
        search();
        Message.success(t('sonarr.rule.disable.success'));
      })
      .finally(() => {
        hideLoading(disableLoading);
      });
  };
  search();
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
