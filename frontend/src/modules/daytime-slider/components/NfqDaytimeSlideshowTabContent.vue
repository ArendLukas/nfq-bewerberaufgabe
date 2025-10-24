<script setup lang="ts">
import type { PropType } from 'vue'
import type { DaytimeSlideshowTabData } from '../interfaces/daytimeSlideshowTabData.interface'

defineProps({
  tabData: {
    type: Object as PropType<DaytimeSlideshowTabData>,
    required: true,
  },
  selectedTab: {
    type: Object as PropType<DaytimeSlideshowTabData>,
    required: true,
  },
})
</script>

<template>
  <div class="daytime-slideshow-tab-content">
    <img :src="tabData.imageUrl" class="daytime-slideshow-tab-content__image" alt="" loading="lazy" />
    <div
      class="daytime-slideshow-tab-content__text-container"
      :class="'daytime-slideshow-tab-content__text-container--' + tabData.id"
      :tabindex="tabData.id === selectedTab.id ? 0 : -1"
    >
      <h4 class="daytime-slideshow-tab-content__heading">{{ tabData.timeString }} Uhr</h4>
      <p class="daytime-slideshow-tab-content__description">{{ tabData.description }}</p>
      <h5 class="daytime-slideshow-tab-content__savings-heading">Eingesparte Energie:</h5>
      <p class="daytime-slideshow-tab-content__savings-line">{{ tabData.energySavings }} kW</p>
      <p class="daytime-slideshow-tab-content__savings-line">{{ tabData.moneySavings }} €</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@styles/mixins/main-content-width.scss' as main-content-width-mixin;

$mobileBreakpoint: 60rem;

.daytime-slideshow-tab-content {
  @include main-content-width-mixin.main-content-width;
  gap: var(--spacing-l);
  display: flex;
  flex-shrink: 0;

  &__image {
    object-fit: cover;
    height: 25rem;
    min-width: 0;
    width: 70%;

    @media only screen and (max-width: $mobileBreakpoint) {
      display: none;
    }
  }

  &__text-container {
    display: flex;
    width: 30%;
    min-width: 16rem;
    height: 25rem;
    flex-direction: column;
    padding: var(--spacing-xl);

    &:focus {
      outline-width: 6px;
      outline-offset: -6px;
      outline-style: solid;
    }

    &--night-tab-content {
      background-color: hsl(5, 80%, 5%);

      * {
        color: hsl(0, 0%, 85%);
      }
    }

    &--morning-tab-content,
    &--evening-tab-content {
      background-color: hsl(5, 80%, 30%);

      * {
        color: hsl(0, 0%, 95%);
      }
    }

    &--midday-tab-content {
      background-color: hsl(5, 80%, 93%);
    }

    @media only screen and (max-width: $mobileBreakpoint) {
      width: 100%;
    }
  }

  &__heading {
    font-size: var(--font-size-xxl);
    margin-bottom: var(--spacing-l);
  }

  &__description {
    margin-bottom: var(--spacing-xxl);
  }

  &__savings-heading {
    margin-top: auto;
    margin-bottom: var(--spacing-s);
    font-weight: normal;
    font-size: var(--font-size-m);
  }

  &__savings-line {
    font-weight: bold;
    font-size: var(--font-size-xl);
  }
}
</style>
