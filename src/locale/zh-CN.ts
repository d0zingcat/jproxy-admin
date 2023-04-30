import localeLogin from '@/views/login/locale/zh-CN';

import localeSystemConfig from '@/views/system/config/locale/zh-CN';
import localeSystemUser from '@/views/system/user/locale/zh-CN';
import localeSystemCache from '@/views/system/cache/locale/zh-CN';

import localeSonarrTitle from '@/views/sonarr/title/locale/zh-CN';
import localeTmdbTitle from '@/views/tmdb/title/locale/zh-CN';
import localeSonarrRule from '@/views/sonarr/rule/locale/zh-CN';
import localeSonarrExample from '@/views/sonarr/example/locale/zh-CN';

import localeRadarrTitle from '@/views/radarr/title/locale/zh-CN';
import localeRadarrRule from '@/views/radarr/rule/locale/zh-CN';
import localeRadarrExample from '@/views/radarr/example/locale/zh-CN';

import localeRuleForm from '@/components/rule-form/locale/zh-CN';
import localeTmdbForm from '@/components/tmdb-form/locale/zh-CN';
import localeExampleForm from '@/components/example-form/locale/zh-CN';

import localeException404 from '@/views/exception/404/locale/zh-CN';

export default {
  'menu.system': '系统设置',
  'menu.system.config': '基础配置',
  'menu.system.user': '用户管理',
  'menu.system.cache': '缓存清理',
  'menu.sonarr': 'Sonarr',
  'menu.sonarr.title': '剧集标题',
  'menu.sonarr.rule': '剧集规则',
  'menu.sonarr.example': '剧集范例',
  'menu.sonarr.tmdb': 'T M D B',
  'menu.radarr': 'Radarr',
  'menu.radarr.title': '电影标题',
  'menu.radarr.rule': '电影规则',
  'menu.radarr.example': '电影范例',

  'navbar.user': '用户管理',
  'navbar.logout': '退出登陆',
  'navbar.logout.success': '退出登录成功',
  'navbar.dark': '暗黑模式',
  'navbar.light': '明亮模式',
  'navbar.language': '语言',
  'navbar.language.switch': '切换成中文',
  'navbar.issue': '问题反馈',
  'navbar.github': '项目源码',

  'settings.copySettings': '复制配置',
  'settings.close': '关闭',

  ...localeLogin,

  ...localeSystemConfig,
  ...localeSystemUser,
  ...localeSystemCache,

  ...localeSonarrTitle,
  ...localeTmdbTitle,
  ...localeSonarrRule,
  ...localeSonarrExample,

  ...localeRadarrTitle,
  ...localeRadarrRule,
  ...localeRadarrExample,

  ...localeRuleForm,
  ...localeTmdbForm,
  ...localeExampleForm,

  ...localeException404,
};
