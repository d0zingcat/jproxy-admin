<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          src="@/assets/images/logo-128x128.png"
          style="width: 33px"
        />
        <a-typography-title
          :style="{
            margin: '0 0 0 10px',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '2px',
          }"
          :heading="5"
        >
          JProxy
        </a-typography-title>
        <a-link
          style="margin-top: 15px; font-size: 13px; color: var(--color-text-1)"
          href="https://github.com/LuckyPuppy514/jproxy/blob/main/changelog.md"
          target="_blank"
        >
          v{{ version }}
        </a-link>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="$t('navbar.github')">
          <a-button
            href="https://github.com/LuckyPuppy514/jproxy"
            target="_blank"
            class="nav-btn"
            type="outline"
            :shape="'circle'"
          >
            <icon-github />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('navbar.issue')">
          <a-button
            href="https://github.com/LuckyPuppy514/jproxy/issues/new/choose"
            target="_blank"
            class="nav-btn"
            type="outline"
            :shape="'circle'"
          >
            <icon-bug />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="$t('navbar.language')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :content="theme === 'light' ? $t('navbar.dark') : $t('navbar.light')"
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="hover">
          <a-avatar
            :size="30"
            :style="{
              marginRight: '8px',
              cursor: 'pointer',
              backgroundColor: '#3370ff',
            }"
          >
            <IconUser />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'systemUser' })">
                <icon-settings />
                <span>
                  {{ $t('navbar.user') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('navbar.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, inject } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { useAppStore } from '@/store';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';
  import useUser from '@/hooks/user';
  import Menu from '@/components/menu/index.vue';
  import { systemConfigVersion } from '@/api/system';

  const version = ref('3.0.0');
  systemConfigVersion().then((res) => {
    version.value = res.data;
  });
  const appStore = useAppStore();
  const { logout } = useUser();
  const { changeLocale, currentLocale } = useLocale();
  const locales = [...LOCALE_OPTIONS];
  const theme = computed(() => {
    return appStore.theme;
  });
  const topMenu = computed(() => appStore.topMenu && appStore.menu);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const triggerBtn = ref();
  const handleLogout = () => {
    logout();
  };
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
    .nav-btn:hover {
      color: rgb(var(--primary-5));
      background-color: transparent;
      border-color: rgb(var(--primary-5));
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
</style>
