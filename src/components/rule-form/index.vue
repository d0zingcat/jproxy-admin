<template>
  <a-modal :title="props.title" @before-ok="handleBeforeOk">
    <a-form
      ref="ruleRef"
      class="rule-form"
      :model="rule"
      :label-col-props="{ span: 3 }"
      :wrapper-col-props="{ span: 20 }"
    >
      <a-form-item
        field="token"
        :label="t('rule.form.token')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.token.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-auto-complete
          v-model="rule.token"
          :data="props.tokenList"
          allow-clear
          :placeholder="$t('rule.form.token.placeholder')"
          @change="onTokenChange"
        />
      </a-form-item>
      <a-form-item
        field="priority"
        :label="t('rule.form.priority')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.priority.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-number
          v-model="rule.priority"
          :min="0"
          :max="999999"
          :placeholder="$t('rule.form.priority.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="regex"
        :label="t('rule.form.regex')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.regex.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="rule.regex"
          allow-clear
          :placeholder="$t('rule.form.regex.placeholder')"
          @change="onRuleChange"
        />
      </a-form-item>
      <a-form-item field="replacement" :label="t('rule.form.replacement')">
        <a-input
          v-model="rule.replacement"
          allow-clear
          :placeholder="$t('rule.form.replacement.placeholder')"
          @change="onRuleChange"
        />
      </a-form-item>
      <a-form-item
        field="offset"
        :label="t('rule.form.offset')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.offset.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input-number
          v-model="rule.offset"
          :disabled="disableOffset"
          :min="-999999"
          :max="999999"
          :placeholder="$t('rule.form.offset.placeholder')"
          @change="onRuleChange"
        />
      </a-form-item>
      <a-form-item
        field="example"
        :label="t('rule.form.example')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.example.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-textarea
          v-model="rule.example"
          :auto-size="{
            minRows: 2,
            maxRows: 5,
          }"
          allow-clear
          :placeholder="$t('rule.form.example.placeholder')"
          @change="onRuleChange"
        />
      </a-form-item>
      <a-form-item field="result" :label="t('rule.form.result')">
        <a-textarea
          v-model="rule.result"
          :auto-size="{
            minRows: 1,
            maxRows: 5,
          }"
          readonly
        />
      </a-form-item>
      <a-form-item
        field="remark"
        :label="t('rule.form.remark')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.remark.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="rule.remark"
          allow-clear
          :placeholder="$t('rule.form.remark.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="author"
        :label="t('rule.form.author')"
        :rules="[
          {
            required: true,
            message: $t('rule.form.author.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="rule.author"
          allow-clear
          :placeholder="$t('rule.form.author.placeholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, PropType, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { testRule } from '@/api/rule';
  import cloneDeep from 'lodash/cloneDeep';

  const ruleRef = ref<FormInstance>();
  const { t } = useI18n();
  const rule = ref();
  const props = defineProps({
    tokenList: {
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
    title: {
      type: String,
      default: () => {
        return '';
      },
    },
  });
  const emit = defineEmits(['save']);
  const handleBeforeOk = async (done: (closed: boolean) => void) => {
    const res = await ruleRef.value?.validate();
    if (!res) {
      if (
        await new Promise((resolve) => {
          emit('save', rule.value, (val: boolean) => {
            resolve(val);
          });
        })
      ) {
        done(true);
      }
    }
    done(false);
  };
  const disableOffset = ref(true);
  const onTokenChange = (value: string) => {
    if (value === 'season' || value === 'episode') {
      disableOffset.value = false;
    } else {
      rule.value.offset = 0;
      disableOffset.value = true;
    }
  };
  const onRuleChange = () => {
    if (rule.value.replacement) {
      if (
        !rule.value.remark &&
        rule.value.token &&
        rule.value.token !== 'season' &&
        rule.value.token !== 'episode' &&
        rule.value.replacement.indexOf('$') === -1
      ) {
        rule.value.remark = rule.value.replacement
          .replaceAll(/(\[|\])/g, '')
          .trim();
      }
      if (rule.value.regex && rule.value.example) {
        testRule({
          regex: rule.value.regex,
          replacement: rule.value.replacement,
          example: rule.value.example,
          offset: rule.value.offset,
        }).then((res) => {
          rule.value.result = res.data;
        });
      }
    }
  };
  watch(
    () => props.data,
    (val) => {
      rule.value = cloneDeep(val);
      onRuleChange();
    },
    { immediate: true, deep: true }
  );
</script>

<style>
  .rule-form .arco-form-item.arco-form-item-error {
    margin-bottom: 0;
  }
  .rule-form textarea {
    font-size: xx-small;
  }
  .arco-modal {
    width: 1000px !important;
  }
</style>
