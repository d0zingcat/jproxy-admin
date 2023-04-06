<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.user']" />
    <div class="system-user-div">
      <a-form
        ref="systemUserRef"
        :model="systemUser"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 16 }"
        class="system-user-form"
        @submit="handleSubmit"
      >
        <a-form-item
          field="username"
          :label="$t('system.user.username')"
          :rules="[
            {
              required: true,
              minLength: 6,
              message: $t('system.user.username.error'),
            },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="systemUser.username"
            :placeholder="$t('system.user.username.placeholder')"
          />
        </a-form-item>
        <a-form-item
          field="password1"
          :label="$t('system.user.password1')"
          :rules="[
            {
              minLength: 8,
              message: $t('system.user.password1.error'),
            },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="systemUser.password1"
            type="password"
            :placeholder="$t('system.user.password1.placeholder')"
          />
        </a-form-item>
        <a-form-item
          field="password2"
          :label="$t('system.user.password2')"
          :rules="[
            {
              validator: passwordMatchCheck,
              message: $t('system.user.password2.error'),
            },
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="systemUser.password2"
            type="password"
            :placeholder="$t('system.user.password2.placeholder')"
          />
        </a-form-item>
        <div class="system-user-action">
          <a-button type="secondary" @click="reset">
            {{ $t('system.user.reset') }}
          </a-button>
          <a-button html-type="submit" type="primary" :loading="loading">
            {{ $t('system.user.save') }}
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { updateSystemUser, SystemUser } from '@/api/system';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import useUser from '@/hooks/user';
  import { md5 } from '@/utils/crypto';

  const { logout } = useUser();
  const systemUserRef = ref<FormInstance>();
  const { t } = useI18n();
  const { loading, setLoading } = useLoading();
  const systemUser = reactive({
    username: useUserStore().$state.username,
    password1: '',
    password2: '',
  });
  const reset = () => {
    systemUser.username = useUserStore().$state.username;
    systemUser.password1 = '';
    systemUser.password2 = '';
  };
  const passwordMatchCheck = (
    value: string | undefined,
    callback: (error?: string) => void
  ) => {
    if ((systemUser.password1 || value) && value !== systemUser.password1) {
      callback(t('system.user.password2.error'));
    } else {
      callback();
    }
  };
  const handleSubmit = async ({ values, errors }) => {
    if (!errors) {
      if (
        values.username === useUserStore().$state.username &&
        !values.password1
      ) {
        return;
      }
      setLoading(true);
      const user = {
        username: systemUser.username,
        password: systemUser.password2 ? md5(systemUser.password2) : '',
      };
      await updateSystemUser(user as unknown as SystemUser)
        .then(() => {
          Message.success(t('system.user.save.success'));
          localStorage.setItem('login-config', '');
          setTimeout(() => {
            logout();
          }, 1500);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    height: calc(100% - 60px);
    :deep(.system-user-div) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: var(--color-bg-2);
    }
  }
  .system-user-form {
    width: 600px;
    padding: 60px;
    border: 1px solid var(--color-neutral-3);
    box-shadow: 0 0 20px var(--color-fill-1);
  }
  .system-user-action {
    position: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    text-align: center;
  }
  .system-user-action button {
    margin: 10px;
  }
</style>
