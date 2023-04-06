<template>
  <a-modal :title="t('example.form.title')" @before-ok="handleBeforeOk">
    <a-form
      ref="exampleRef"
      class="example-form"
      :model="example"
      :label-col-props="{ span: 3 }"
      :wrapper-col-props="{ span: 20 }"
    >
      <a-form-item
        field="originalText"
        :label="t('example.form.originalText')"
        :rules="[
          {
            required: true,
            message: $t('example.form.originalText.error'),
          },
        ]"
        :validate-trigger="['change', 'input']"
      >
        <a-textarea
          v-model="example.originalText"
          :auto-size="{
            minRows: 10,
            maxRows: 15,
          }"
          allow-clear
          :placeholder="$t('example.form.originalText.placeholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  const exampleRef = ref<FormInstance>();
  const { t } = useI18n();
  const example = ref({
    originalText: '',
  });
  const emit = defineEmits(['save']);
  const handleBeforeOk = async (done: (closed: boolean) => void) => {
    const res = await exampleRef.value?.validate();
    if (!res) {
      if (
        await new Promise((resolve) => {
          emit('save', example.value, (val: boolean) => {
            resolve(val);
          });
        })
      ) {
        done(true);
      }
    }
    done(false);
  };
</script>

<style>
  .example-form .arco-form-item.arco-form-item-error {
    margin-bottom: 0;
  }
  .example-form textarea {
    font-size: xx-small;
  }
  .arco-modal {
    width: 1000px !important;
  }
</style>
