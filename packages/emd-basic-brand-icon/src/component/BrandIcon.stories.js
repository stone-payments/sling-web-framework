import { storiesOf } from '@storybook/vue';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';
import { idKeyMap } from '../constants/idKeyMap.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const iconEntries = Object
  .entries(idKeyMap)
  .filter(([key]) => Number(key) < 1000)
  .filter(([key]) => !['20', '24', '26'].includes(key))
  .sort((entryA, entryB) => entryA[1].localeCompare(entryB[1]));

function getCodeSample ([id, name], showId) {
  return showId
    ? `<emd-brand-icon
  iconid="${id}"
></emd-brand-icon>`
    : `<emd-brand-icon
  icon="${name}"
></emd-brand-icon>`;
}

const template = `
<div
  class="story"
  :style="{ fontSize: fontSize + 'px' }"
>
  <div class="icongrid">
    <div class="inner" v-for="iconEntry in iconEntries" :key="iconEntry[0]">
      <emd-brand-icon :icon="iconEntry[1]"></emd-brand-icon>
      <div v-if="showCodeSamples" class="inlinecodesample">
        <pre>{{ getCodeSample(iconEntry, showIdsInCodeSamples) }}</pre>
      </div>
    </div>
  </div>
</div>
`;

storiesOf('Brand Icon', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    data () {
      return {
        iconEntries
      };
    },
    props: {
      fontSize: {
        default: number('Font size (px)', 16, fontOptions)
      },
      showCodeSamples: {
        default: boolean('Show code samples', true)
      },
      showIdsInCodeSamples: {
        default: boolean('Show ids in code samples', false)
      }
    },
    methods: {
      getCodeSample
    },
    template
  }), {
    notes: { markdown: readMe }
  });
