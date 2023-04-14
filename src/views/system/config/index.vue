<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.config']" />
    <a-form
      ref="systemConfigRef"
      :model="systemConfig"
      :label-col-props="{ span: 6 }"
      :wrapper-col-props="{ span: 18 }"
    >
      <a-row :gutter="20">
        <a-col :span="12">
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.sonarr')"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/80i41c" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="sonarrUrl"
              :label="$t('system.config.url')"
              :validate-status="systemConfigValidStatus.sonarrUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.sonarrUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="sonarrApikey"
              :label="$t('system.config.apikey')"
              :validate-status="systemConfigValidStatus.sonarrApikey"
              feedback
            >
              <a-input
                v-model="systemConfig.sonarrApikey"
                allow-clear
                type="password"
                :placeholder="$t('system.config.apikey.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="sonarrIndexerFormat"
              :label="$t('system.config.indexerFormat')"
              :validate-status="systemConfigValidStatus.sonarrIndexerFormat"
              feedback
            >
              <a-input
                v-model="systemConfig.sonarrIndexerFormat"
                :placeholder="$t('system.config.indexerFormat.placeholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="sonarrLanguage1"
              :label="$t('system.config.language1')"
            >
              <a-select
                v-model="systemConfig.sonarrLanguage1"
                :placeholder="$t('system.config.language1.placeholder')"
                :options="languageList"
                allow-search
              >
              </a-select>
            </a-form-item>
            <a-form-item
              class="form-item"
              field="sonarrLanguage2"
              :label="$t('system.config.language2')"
            >
              <a-select
                v-model="systemConfig.sonarrLanguage2"
                :placeholder="$t('system.config.language2.placeholder')"
                :options="languageList"
                allow-search
              >
              </a-select>
            </a-form-item>
          </a-card>
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.indexer')"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/pVIb3w" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="jackettUrl"
              :label="$t('system.config.jackett')"
              :validate-status="systemConfigValidStatus.jackettUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.jackettUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="prowlarrUrl"
              :label="$t('system.config.prowlarr')"
              :validate-status="systemConfigValidStatus.prowlarrUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.prowlarrUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
          </a-card>
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.qbittorrent')"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/EGZxGR" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="qbittorrentUrl"
              :label="$t('system.config.url')"
              :validate-status="systemConfigValidStatus.qbittorrentUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.qbittorrentUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="qbittorrentUsername"
              :label="$t('system.config.username')"
              :validate-status="systemConfigValidStatus.qbittorrentUsername"
              feedback
            >
              <a-input
                v-model="systemConfig.qbittorrentUsername"
                allow-clear
                :placeholder="$t('system.config.username.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="qbittorrentPassword"
              :label="$t('system.config.password')"
              :validate-status="systemConfigValidStatus.qbittorrentPassword"
              feedback
            >
              <a-input
                v-model="systemConfig.qbittorrentPassword"
                type="password"
                allow-clear
                :placeholder="$t('system.config.password.placeholder')"
              />
            </a-form-item>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.radarr')"
            :style="{ padding: '0 0 103px 0' }"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/YR2UK2" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="radarrUrl"
              :label="$t('system.config.url')"
              :validate-status="systemConfigValidStatus.radarrUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.radarrUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="radarrApikey"
              :label="$t('system.config.apikey')"
              :validate-status="systemConfigValidStatus.radarrApikey"
              feedback
            >
              <a-input
                v-model="systemConfig.radarrApikey"
                allow-clear
                type="password"
                :placeholder="$t('system.config.apikey.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="radarrIndexerFormat"
              :label="$t('system.config.indexerFormat')"
              :validate-status="systemConfigValidStatus.radarrIndexerFormat"
              feedback
            >
              <a-input
                v-model="systemConfig.radarrIndexerFormat"
                allow-clear
                :placeholder="$t('system.config.indexerFormat.placeholder')"
              />
            </a-form-item>
          </a-card>
          <a-card hoverable class="form-card" :title="$t('system.config.tmdb')">
            <template #extra>
              <a-link href="https://kutt.lckp.top/5mekxe" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="tmdbUrl"
              :label="$t('system.config.url')"
              :validate-status="systemConfigValidStatus.tmdbUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.tmdbUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="tmdbApikey"
              :label="$t('system.config.apikey')"
              :validate-status="systemConfigValidStatus.tmdbApikey"
              feedback
            >
              <a-input
                v-model="systemConfig.tmdbApikey"
                allow-clear
                type="password"
                :placeholder="$t('system.config.apikey.placeholder')"
              />
            </a-form-item>
          </a-card>
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.transmission')"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/Ukf7bd" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="transmissionUrl"
              :label="$t('system.config.url')"
              :validate-status="systemConfigValidStatus.transmissionUrl"
              feedback
            >
              <a-input
                v-model="systemConfig.transmissionUrl"
                allow-clear
                :placeholder="$t('system.config.url.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="transmissionUsername"
              :label="$t('system.config.username')"
              :validate-status="systemConfigValidStatus.transmissionUsername"
              feedback
            >
              <a-input
                v-model="systemConfig.transmissionUsername"
                allow-clear
                :placeholder="$t('system.config.username.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="transmissionPassword"
              :label="$t('system.config.password')"
              :validate-status="systemConfigValidStatus.transmissionPassword"
              feedback
            >
              <a-input
                v-model="systemConfig.transmissionPassword"
                type="password"
                allow-clear
                :placeholder="$t('system.config.password.placeholder')"
              />
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-card
            hoverable
            class="form-card"
            :title="$t('system.config.other')"
          >
            <template #extra>
              <a-link href="https://kutt.lckp.top/BqV9HI" target="_blank">
                <icon-question-circle size="large" />
              </a-link>
            </template>
            <a-form-item
              class="form-item"
              field="cleanTitleRegex"
              :label="$t('system.config.cleanTitleRegex')"
              :validate-status="systemConfigValidStatus.cleanTitleRegex"
              feedback
            >
              <a-input
                v-model="systemConfig.cleanTitleRegex"
                allow-clear
                :placeholder="$t('system.config.cleanTitleRegex.placeholder')"
              />
            </a-form-item>
            <a-form-item
              class="form-item"
              field="ruleSyncAuthors"
              :label="$t('system.config.ruleSyncAuthors')"
            >
              <a-select
                v-model="systemConfig.ruleSyncAuthors"
                multiple
                :default-value="['ALL']"
                :options="authorList"
                :scrollbar="true"
                :placeholder="$t('system.config.ruleSyncAuthors.placeholder')"
                @change="onAuthorChange"
              >
              </a-select>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <div class="actions">
        <a-button @click="reset">
          {{ $t('system.config.reset') }}
        </a-button>
        <a-button type="primary" :loading="loading" @click="save">
          {{ $t('system.config.save') }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInstance, ValidateStatus } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import {
    querySystemConfig,
    updateSystemConfig,
    SystemConfig,
    listAuthor,
  } from '@/api/system';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const systemConfigRef = ref<FormInstance>();
  const { loading, setLoading } = useLoading();
  const languageList = [
    'af-ZA',
    'ar-AE',
    'ar-SA',
    'be-BY',
    'bg-BG',
    'bn-BD',
    'ca-ES',
    'ch-GU',
    'cn-CN',
    'cs-CZ',
    'cy-GB',
    'da-DK',
    'de-AT',
    'de-CH',
    'de-DE',
    'el-GR',
    'en-AU',
    'en-CA',
    'en-GB',
    'en-IE',
    'en-NZ',
    'en-US',
    'eo-EO',
    'es-ES',
    'es-MX',
    'et-EE',
    'eu-ES',
    'fa-IR',
    'fi-FI',
    'fr-CA',
    'fr-FR',
    'ga-IE',
    'gd-GB',
    'gl-ES',
    'he-IL',
    'hi-IN',
    'hr-HR',
    'hu-HU',
    'id-ID',
    'it-IT',
    'ja-JP',
    'ka-GE',
    'kk-KZ',
    'kn-IN',
    'ko-KR',
    'ky-KG',
    'lt-LT',
    'lv-LV',
    'ml-IN',
    'mr-IN',
    'ms-MY',
    'ms-SG',
    'nb-NO',
    'nl-BE',
    'nl-NL',
    'no-NO',
    'pa-IN',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'ro-RO',
    'ru-RU',
    'si-LK',
    'sk-SK',
    'sl-SI',
    'sq-AL',
    'sr-RS',
    'sv-SE',
    'ta-IN',
    'te-IN',
    'th-TH',
    'tl-PH',
    'tr-TR',
    'uk-UA',
    'vi-VN',
    'zh-CN',
    'zh-HK',
    'zh-SG',
    'zh-TW',
    'zu-ZA',
  ];
  const systemConfig = reactive({
    sonarrUrl: '',
    sonarrApikey: '',
    sonarrIndexerFormat: '',
    sonarrLanguage1: '',
    sonarrLanguage2: '',
    radarrUrl: '',
    radarrApikey: '',
    radarrIndexerFormat: '',
    jackettUrl: '',
    prowlarrUrl: '',
    qbittorrentUrl: '',
    qbittorrentUsername: '',
    qbittorrentPassword: '',
    transmissionUrl: '',
    transmissionUsername: '',
    transmissionPassword: '',
    tmdbUrl: '',
    tmdbApikey: '',
    cleanTitleRegex: '',
    ruleSyncAuthors: [] as string[],
  });
  const systemConfigValidStatus = reactive({
    sonarrUrl: 'validating' as ValidateStatus,
    sonarrApikey: 'validating' as ValidateStatus,
    sonarrIndexerFormat: 'validating' as ValidateStatus,
    radarrUrl: 'validating' as ValidateStatus,
    radarrApikey: 'validating' as ValidateStatus,
    radarrIndexerFormat: 'validating' as ValidateStatus,
    jackettUrl: 'validating' as ValidateStatus,
    prowlarrUrl: 'validating' as ValidateStatus,
    qbittorrentUrl: 'validating' as ValidateStatus,
    qbittorrentUsername: 'validating' as ValidateStatus,
    qbittorrentPassword: 'validating' as ValidateStatus,
    transmissionUrl: 'validating' as ValidateStatus,
    transmissionUsername: 'validating' as ValidateStatus,
    transmissionPassword: 'validating' as ValidateStatus,
    tmdbUrl: 'validating' as ValidateStatus,
    tmdbApikey: 'validating' as ValidateStatus,
    cleanTitleRegex: 'validating' as ValidateStatus,
  });
  const systemConfigId = reactive({
    sonarrUrl: -1,
  });
  const authorList = ref(['ALL', 'LuckyPuppy514']);
  const reset = async () => {
    await querySystemConfig().then((res) => {
      res.data.forEach((element) => {
        systemConfigId[element.key] = element.id;
        systemConfig[element.key] = undefined;
        systemConfigValidStatus[element.key] = undefined;
        if (element.value) {
          if (element.key === 'ruleSyncAuthors') {
            systemConfig[element.key] = element.value
              ? element.value.split(',')
              : [];
          } else {
            systemConfig[element.key] = element.value;
          }
          systemConfigValidStatus[element.key] =
            element.validStatus === 1 ? 'success' : 'error';
        }
      });
    });
    await listAuthor().then((res) => {
      authorList.value = res.data;
      authorList.value.push('ALL');
    });
  };
  const onAuthorChange = (value) => {
    if (value) {
      if (value[value.length - 1] === 'ALL') {
        systemConfig.ruleSyncAuthors = ['ALL'];
      } else {
        const authors = [] as string[];
        value.forEach((element: string) => {
          if (element !== 'ALL') {
            authors.push(element);
          }
        });
        systemConfig.ruleSyncAuthors = authors;
      }
    }
  };
  const save = async () => {
    setLoading(true);
    const list: SystemConfig[] = [];
    let index = 0;
    Object.keys(systemConfig).forEach((data) => {
      list[index] = {
        id: systemConfigId[data as keyof typeof systemConfigId],
        key: data,
        value: systemConfig[data as keyof typeof systemConfig],
        validStatus: 1,
      };
      if (list[index].key === 'ruleSyncAuthors') {
        list[index].value = list[index].value
          ? list[index].value.map(String).join(',')
          : '';
      }
      index += 1;
    });
    await updateSystemConfig(list)
      .then(() => {
        Message.success(t('system.config.save.success'));
        reset();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  reset();
</script>

<style>
  .container {
    padding: 0 20px 40px 20px;
  }
  .form-card {
    margin-bottom: 20px;
    border: none;
  }
  .form-card:hover {
    box-shadow: 0 0 20px var(--color-fill-4);
  }
  .form-card .form-item {
    margin-left: -10px;
  }
  .actions {
    position: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 0 10px 0;
    background: var(--color-bg-2);
    text-align: center;
  }
  .actions button {
    margin: 10px;
  }
  .form-card .arco-form-item.arco-form-item-error {
    margin-bottom: 20px;
  }
</style>
