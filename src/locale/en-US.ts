import localeLogin from '@/views/login/locale/en-US';

import localeSystemConfig from '@/views/system/config/locale/en-US';
import localeSystemUser from '@/views/system/user/locale/en-US';
import localeSystemCache from '@/views/system/cache/locale/en-US';

import localeSonarrTitle from '@/views/sonarr/title/locale/en-US';
import localeTmdbTitle from '@/views/tmdb/title/locale/en-US';
import localeSonarrRule from '@/views/sonarr/rule/locale/en-US';
import localeSonarrExample from '@/views/sonarr/example/locale/en-US';

import localeRadarrTitle from '@/views/radarr/title/locale/en-US';
import localeRadarrRule from '@/views/radarr/rule/locale/en-US';
import localeRadarrExample from '@/views/radarr/example/locale/en-US';

import localeRuleForm from '@/components/rule-form/locale/en-US';
import localeTmdbForm from '@/components/tmdb-form/locale/en-US';
import localeExampleForm from '@/components/example-form/locale/en-US';

import localeException404 from '@/views/exception/404/locale/en-US';

export default {
  'menu.system': 'System',
  'menu.system.config': 'Configure',
  'menu.system.user': 'User',
  'menu.system.cache': 'Cache',
  'menu.sonarr': 'Sonarr',
  'menu.sonarr.title': 'Series Title',
  'menu.sonarr.rule': 'Series Rule',
  'menu.sonarr.tmdb': 'T M D B',
  'menu.sonarr.example': 'Series Example',
  'menu.radarr': 'Radarr',
  'menu.radarr.title': 'Movie Title',
  'menu.radarr.rule': 'Movie Rule',
  'menu.radarr.example': 'Movie Example',

  'navbar.user': 'User',
  'navbar.logout': 'Logout',
  'navbar.logout.success': 'Logout success',
  'navbar.dark': 'Dark',
  'navbar.light': 'Light',
  'navbar.language': 'Language',
  'navbar.language.switch': 'Switch to English',
  'navbar.issue': 'Bug Report',
  'navbar.github': 'Source Code',

  'settings.copySettings': 'Copy Settings',
  'settings.close': 'Close',

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
