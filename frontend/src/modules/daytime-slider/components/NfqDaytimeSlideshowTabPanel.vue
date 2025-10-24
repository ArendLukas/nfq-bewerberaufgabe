<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import type { DaytimeSlideshowTabData } from '../interfaces/daytimeSlideshowTabData.interface'
import NfqArrowBackIcon from '@/modules/icons/components/NfqArrowBackIcon.vue'
import NfqArrowForwardIcon from '@/modules/icons/components/NfqArrowForwardIcon.vue'

const props = defineProps({
  labelId: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array as PropType<Array<DaytimeSlideshowTabData>>,
    required: true,
  },
})

const selectedTab = defineModel<DaytimeSlideshowTabData>({ required: true })

const rangeInputValue = ref<number>(0)

function handleTabButtonClicked(tab: DaytimeSlideshowTabData) {
  selectedTab.value = tab
}

function getTabIndexForTab(tabToCheck: DaytimeSlideshowTabData) {
  return props.tabs.findIndex((tab) => tab.id === tabToCheck.id)
}

function selectNext() {
  selectedTab.value =
    props.tabs[getTabIndexForTab(selectedTab.value) + 1] ??
    (props.tabs[0] as DaytimeSlideshowTabData)
}

function selectPrevious() {
  selectedTab.value =
    props.tabs[getTabIndexForTab(selectedTab.value) - 1] ??
    (props.tabs[props.tabs.length - 1] as DaytimeSlideshowTabData)
}

watch(rangeInputValue, (newRangeInputValue) => {
  selectedTab.value = props.tabs[newRangeInputValue] as DaytimeSlideshowTabData
})

watch(selectedTab, (newSelectedTab) => {
  rangeInputValue.value = getTabIndexForTab(newSelectedTab)
  const tabButton = document.querySelector<HTMLButtonElement>(
    '[aria-controls=' + newSelectedTab.id + ']',
  )
  tabButton?.focus()
  tabButton?.scrollIntoView()
})
</script>

<template>
  <div class="daytime-slideshow-tab-panel__wrapper">
    <button class="daytime-slideshow-tab-panel__mobile-navigation-button" @click="selectPrevious">
      <NfqArrowBackIcon />
    </button>
    <div class="daytime-slideshow-tab-panel__list-wrapper">
      <ul role="tablist" :aria-labelledby="labelId" class="daytime-slideshow-tab-panel">
        <li v-for="tab in tabs" :key="tab.id" role="presentation">
          <button
            class="daytime-slideshow-tab-panel__button"
            :class="{ 'daytime-slideshow-tab-panel__button--selected': tab.id === selectedTab.id }"
            :aria-label="tab.ariaLabel"
            role="tab"
            :aria-controls="tab.id"
            :tabindex="tab.id === selectedTab.id ? 0 : -1"
            :aria-selected="tab.id === selectedTab.id"
            @click="handleTabButtonClicked(tab)"
            @keyup.right="selectNext"
            @keyup.left="selectPrevious"
          >
            <component
              :is="tab.iconComponent"
              class="daytime-slideshow-tab-panel__button-icon"
              :class="{
                'daytime-slideshow-tab-panel__button-icon--selected': tab.id === selectedTab.id,
              }"
            />
          </button>
        </li>
      </ul>
    </div>
    <button class="daytime-slideshow-tab-panel__mobile-navigation-button" @click="selectNext">
      <NfqArrowForwardIcon />
    </button>
  </div>

  <div class="daytime-slideshow-tab-panel__range-input-wrapper">
    <div class="daytime-slideshow-tab-panel__range-input-side"></div>
    <input
      class="daytime-slideshow-tab-panel__range-input"
      type="range"
      min="0"
      max="3"
      step="1"
      tabindex="-1"
      v-model="rangeInputValue"
      aria-hidden="true"
    />
    <div class="daytime-slideshow-tab-panel__range-input-side"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@styles/mixins/main-content-width.scss' as main-content-width-mixin;

$mobileBreakpoint: 40rem;

.daytime-slideshow-tab-panel {
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 100%;

  @media only screen and (max-width: $mobileBreakpoint) {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;

    li {
      flex-shrink: 0;
      width: 100%;
    }
  }

  &__wrapper {
    display: flex;
    @include main-content-width-mixin.main-content-width;
    justify-content: space-between;

    @media only screen and (max-width: $mobileBreakpoint) {
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }

  &__list-wrapper {
    display: flex;
    @include main-content-width-mixin.main-content-width;
    justify-content: space-between;

    @media only screen and (max-width: $mobileBreakpoint) {
      justify-content: center;
      align-items: center;
    }
  }

  &__button-icon {
    transition: fill 150ms;
    &:hover {
      fill: hsl(5, 80%, 30%);
    }

    &--selected {
      fill: var(--color-primary);

      &:hover {
        fill: var(--color-primary);
      }
    }
  }

  &__button {
    width: 100px;
    height: 100px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    @media only screen and (max-width: $mobileBreakpoint) {
      width: 100%;
      pointer-events: none;
    }
  }

  &__range-input-wrapper {
    display: grid;
    grid-template-columns: 1fr calc(70% - 90px) 1fr;
    gap: 0;

    @media only screen and (max-width: $mobileBreakpoint) {
      display: none;
    }
  }

  &__range-input-side {
    background: rgb(248, 248, 248);
    height: 10px;
  }

  &__range-input {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    height: 10px;
    width: 100%;
    background: rgb(248, 248, 248);
    outline: none;
    margin-bottom: var(--spacing-xl);

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 10px;
      height: 30px;
      background: var(--color-primary);
      cursor: pointer;
    }
  }

  &__mobile-navigation-button {
    fill: var(--color-text-primary);
    width: 2rem;
    height: 100px;
    background: none;
    border: none;
    display: none;

    @media only screen and (max-width: $mobileBreakpoint) {
      display: inline;
    }
  }
}
</style>
