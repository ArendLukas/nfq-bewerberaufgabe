<script setup lang="ts">
import NfqEveningIcon from '@/modules/icons/components/NfqEveningIcon.vue'
import NfqMiddayIcon from '@/modules/icons/components/NfqMiddayIcon.vue'
import NfqMorningIcon from '@/modules/icons/components/NfqMorningIcon.vue'
import NfqNightIcon from '@/modules/icons/components/NfqNightIcon.vue'
import type { DaytimeSlideshowTabData } from '../interfaces/daytimeSlideshowTabData.interface'
import NfqDaytimeSlideshowTabContent from './NfqDaytimeSlideshowTabContent.vue'
import { ref, watch } from 'vue'
import NfqDaytimeSlideshowTabPanel from './NfqDaytimeSlideshowTabPanel.vue'
import NightImageUrl from '@/assets/images/Nachts.webp'
import EveningImageUrl from '@/assets/images/Abends.webp'
import MorningImageUrl from '@/assets/images/Morgens.webp'
import MiddayImageUrl from '@/assets/images/Mittags.webp'

const tabs: Array<DaytimeSlideshowTabData> = [
  {
    id: 'night-tab-content',
    iconComponent: NfqNightIcon,
    ariaLabel: 'Nachts',
    labelId: 'night-tab',
    imageUrl: NightImageUrl,
    timeString: '05:30',
    description:
      'Während Sie noch schlafen übernimmt SmartEnergy die Aktivierung der Heizkörper und der Warmwassererhitzung damit es kuschelig warm ist, wenn Sie in zwei Stunden aufstehen müssen.',
    energySavings: 10.05,
    moneySavings: 100.05,
  },
  {
    id: 'morning-tab-content',
    iconComponent: NfqMorningIcon,
    ariaLabel: 'Morgens',
    labelId: 'morning-tab',
    imageUrl: MorningImageUrl,
    timeString: '07:30',
    description:
      'Zeitgesteuert geht das Licht in Ihrem Schlafzimmer und dem Bad an, während in der Küche bereits der Wasserkocher das Wasser für Ihren Lieblingstee erhitzt. Es ist jetzt für Sie Zeit, aufzustehen.',
    energySavings: 12.05,
    moneySavings: 120.05,
  },
  {
    id: 'midday-tab-content',
    iconComponent: NfqMiddayIcon,
    ariaLabel: 'Mittags',
    labelId: 'midday-tab',
    imageUrl: MiddayImageUrl,
    timeString: '11:45',
    description:
      'Über die App lassen Sie in Ihrem Zuhause die Jalousien herunter, damit sich die Wohnung nicht so aufheizt und Ihre hitzeempfindlichen Pflanzen eingehen.',
    energySavings: 14.05,
    moneySavings: 140.05,
  },
  {
    id: 'evening-tab-content',
    iconComponent: NfqEveningIcon,
    ariaLabel: 'Abends',
    labelId: 'evening-tab',
    imageUrl: EveningImageUrl,
    timeString: '18:14',
    description:
      'Die App erkennt, dass Sie sich auf dem Heimweg Ihrer Wohnung nähern. Zuhause aktiviert sich die Soundanlage und die Beleuchtung und begrüßt Sie mit dem passenden Ambiente für den Feierabend.',
    energySavings: 16.05,
    moneySavings: 160.05,
  },
]

const selectedTab = ref<DaytimeSlideshowTabData>(tabs[0] as DaytimeSlideshowTabData)

const titleId = 'slideshow-title'

watch(selectedTab, (newSelectedTab) => {
  document.getElementById(newSelectedTab.id)?.scrollIntoView()
})
</script>

<template>
  <h3 :id="titleId" class="daytime-slideshow__title">Die SmartEnergy erleichtert Ihren Alltag.</h3>
  <p class="daytime-slideshow__teaser">
    Erleben Sie, wie Sie mit E.ON SmartEnergy Ihr zuhause optimieren und individualisieren können.
    Lassen Sie sich von den unzähligen technischen Möglichkeiten begeistern, unkompliziert und
    effizient Energie zu sparen.
  </p>

  <NfqDaytimeSlideshowTabPanel v-model="selectedTab" :tabs="tabs" :label-id="titleId" />
  <div class="daytime-slideshow__tab-content">
    <div class="daytime-slideshow__tab-content-container">
      <NfqDaytimeSlideshowTabContent
        v-for="tab in tabs"
        :key="tab.labelId"
        :id="tab.id"
        :selected-tab="selectedTab"
        :tab-data="tab"
        :aria-labelledby="tab.labelId"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@styles/mixins/main-content-width.scss' as main-content-width-mixin;

.daytime-slideshow {
  &__title {
    @include main-content-width-mixin.main-content-width;
    color: var(--color-primary);
    font-size: var(--font-size-xxl);
    margin-bottom: var(--spacing-l);
  }

  &__teaser {
    @include main-content-width-mixin.main-content-width;
    margin-bottom: var(--spacing-s);
  }

  &__tab-content {
    @include main-content-width-mixin.main-content-width;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__tab-content-container {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
}
</style>
