<template>
  <a-modal :tmdb="props.tmdb" @before-ok="handleBeforeOk">
    <a-form
      ref="tmdbRef"
      class="tmdb-form"
      :model="tmdb"
      :label-col-props="{ span: 3 }"
      :wrapper-col-props="{ span: 20 }"
    >
      <a-form-item
        field="tvdbId"
        :label="t('tmdb.form.tvdbId')"
        :rules="[
          {
            required: true,
            message: $t('tmdb.form.tvdbId.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-number
          v-model="tmdb.tvdbId"
          :data="props.tvdbIdList"
          allow-clear
          :placeholder="$t('tmdb.form.tvdbId.placeholder')"
        />
      </a-form-item>
      <a-form-item field="tmdbId" :label="t('tmdb.form.tmdbId')">
        <a-input-number
          v-model="tmdb.tmdbId"
          allow-clear
          :placeholder="$t('tmdb.form.tmdbId.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="language"
        :label="$t('tmdb.form.language')"
        :rules="[
          {
            required: true,
            message: $t('tmdb.form.language.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-select
          v-model="tmdb.language"
          :placeholder="$t('tmdb.form.language.placeholder')"
          :options="LANGUAGE_LIST"
          allow-search
        >
        </a-select>
      </a-form-item>
      <a-form-item
        field="title"
        :label="t('tmdb.form.title')"
        :rules="[
          {
            required: true,
            message: $t('tmdb.form.title.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="tmdb.title"
          allow-clear
          :placeholder="$t('tmdb.form.title.placeholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, PropType, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import cloneDeep from 'lodash/cloneDeep';
  import LANGUAGE_LIST from '@/components/constants';

  const tmdbRef = ref<FormInstance>();
  const { t } = useI18n();
  const tmdb = ref();
  const props = defineProps({
    tvdbIdList: {
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tmdb: {
      type: String,
      default: () => {
        return '';
      },
    },
  });
  const emit = defineEmits(['save']);
  const handleBeforeOk = async (done: (closed: boolean) => void) => {
    const res = await tmdbRef.value?.validate();
    if (!res) {
      if (
        await new Promise((resolve) => {
          emit('save', tmdb.value, (val: boolean) => {
            resolve(val);
          });
        })
      ) {
        done(true);
      }
    }
    done(false);
  };
  watch(
    () => props.data,
    (val) => {
      tmdb.value = cloneDeep(val);
    },
    { immediate: true, deep: true }
  );
</script>

<style>
  .tmdb-form .arco-form-item.arco-form-item-error {
    margin-bottom: 0;
  }
  .tmdb-form textarea {
    font-size: xx-small;
  }
  .arco-modal {
    width: 1000px !important;
  }
</style>
