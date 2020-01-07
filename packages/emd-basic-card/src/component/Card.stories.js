import { storiesOf } from '@storybook/vue';
import { withKnobs, number, text, boolean, color } from '@storybook/addon-knobs';
import readMe from '../../README.md';
import '../index.js';

const fontOptions = {
  range: true,
  min: 12,
  max: 24,
  step: 1
};

const borderRadiusOptions = {
  range: true,
  min: 0,
  max: 24,
  step: 2
};

function getCodeSample () {
  let attrs = '';
  attrs += this.expandedBody ? ' expandedbody' : '';
  attrs += !this.useScroll ? ' noscroll' : '';

  const hasCustomStyle = this.borderRadius ||
    this.headerColor ||
    this.headerBackground ||
    this.bodyBackground ||
    this.footerColor ||
    this.footerBackground;

  const styles = hasCustomStyle ? `<style>
  emd-card {
    font-size: ${this.fontSize}px;
    border-radius: ${this.borderRadius}px;
    --emd-card-header-background: ${this.headerBackground};
    --emd-card-body-background: ${this.bodyBackground};
    --emd-card-footer-background: ${this.footerBackground};
  }

  emd-card h4,
  emd-card emd-icon {
    color: ${this.headerColor};
  }

  emd-card p {
    color: ${this.footerColor};
  }
</style>

` : '';

  let slots = '';

  slots += this.showHeader ? `
  <h4 slot="header">
    ${this.headerText}
  </h4>` : '';

  slots += this.showHeaderExtra ? `
  <emd-icon
    slot="header-extra"
    icon="close"
  ></emd-icon>` : '';

  slots += this.showFooter ? `
  <p slot="footer">
    ${this.footerText}
  </p>` : '';

  return `${styles}<emd-card${attrs}>${slots}
  <table>...</table>
</emd-card>
`;
}

const template = `
  <div class="story" :style="{ fontSize: fontSize + 'px' }">
    <div class="component">
      <emd-card
        :noscroll.prop="!useScroll"
        :expandedbody.prop="expandedBody"
        :style="{ borderRadius: borderRadius + 'px', '--emd-card-header-background': headerBackground, '--emd-card-footer-background': footerBackground, '--emd-card-body-background': bodyBackground, height: fixedHeight || 'auto' }"
      >
        <h4
          v-if="showHeader"
          slot="header"
          :style="{ fontSize: '1.5em', margin: 0, color: headerColor || 'inherit' }"
        >
          {{ headerText }}
        </h4>
        <svg
          v-if="showHeaderExtra"
          slot="header-extra"
          style="{ height: '1.5em' }"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18"
        >
          <path :style="{ fill: headerColor || 'inherit' }" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
        </svg>
        <p
          v-if="showFooter"
          slot="footer"
          :style="{ fontSize: '0.875em', margin: 'auto', color: footerColor || 'inherit' }"
        >
          <em>{{ footerText }}</em>
        </p>
        <table :style="{ width: '100%', borderCollapse: 'collapse' }">
          <tbody>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                January
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 35.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                February
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 38.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                March
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 42.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                April
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 40.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                May
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 54.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                June
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 51.700,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                July
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 46.200,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                August
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 43.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                September
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 45.900,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                October
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 51.700,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px', borderBottom: '1px solid #ddd' }">
                November
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0', borderBottom: '1px solid #ddd' }">
                R$ 53.000,00
              </td>
            </tr>
            <tr>
              <td :style="{ textAlign: 'left', padding: '0.75em 0 0.75em 20px' }">
                December
              </td>
              <td :style="{ textAlign: 'right', padding: '0.75em 20px 0.75em 0' }">
                R$ 51.000,00
              </td>
            </tr>
          </tbody>
        </table>
      </emd-card>
    </div>
    <div class="codesample">
      <pre>{{ codesample }}</pre>
    </div>
  </div>
`;

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      headerText: {
        default: text('Header text', '2019 Sales')
      },
      footerText: {
        default: text('Footer text', 'Last updated on 31/12/2019')
      },
      borderRadius: null,
      headerColor: null,
      headerBackground: null,
      bodyBackground: null,
      footerColor: null,
      footerBackground: null,
      showHeader: {
        default: boolean('Show header', true)
      },
      showHeaderExtra: {
        default: boolean('Show icon', true)
      },
      showFooter: {
        default: boolean('Show footer', true)
      },
      expandedBody: {
        default: boolean('Expand body', true)
      },
      useScroll: {
        default: true
      },
      fixedHeight: null
    },
    template,
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Custom Style', () => ({
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      headerText: {
        default: '2019 Sales'
      },
      footerText: {
        default: 'Last updated on 31/12/2019'
      },
      borderRadius: {
        default: number('Border radius', 10, borderRadiusOptions)
      },
      headerColor: {
        default: color('Header text color', '#fff')
      },
      headerBackground: {
        default: color(
          'Header background',
          '#088037'
        )
      },
      bodyBackground: {
        default: color(
          'Body background',
          '#DCFCD5'
        )
      },
      footerColor: {
        default: color('Footer text color', '#bbb')
      },
      footerBackground: {
        default: color(
          'Footer background',
          '#666'
        )
      },
      showHeader: {
        default: true
      },
      showHeaderExtra: {
        default: true
      },
      showFooter: {
        default: true
      },
      expandedBody: {
        default: boolean('Expand body', true)
      },
      useScroll: {
        default: true
      },
      fixedHeight: null
    },
    template,
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  })
  .add('With Scroll', () => ({
    props: {
      fontSize: {
        default: number('Font size', 16, fontOptions)
      },
      headerText: {
        default: '2019 Sales'
      },
      footerText: {
        default: 'Last updated on 31/12/2019'
      },
      borderRadius: null,
      headerColor: null,
      headerBackground: null,
      bodyBackground: null,
      footerColor: null,
      footerBackground: null,
      showHeader: {
        default: true
      },
      showHeaderExtra: {
        default: true
      },
      showFooter: {
        default: true
      },
      expandedBody: {
        default: boolean('Expand body', true)
      },
      useScroll: {
        default: boolean('Enable scroll', true)
      },
      fixedHeight: {
        default: '21em'
      }
    },
    template,
    computed: {
      codesample: getCodeSample
    }
  }), {
    notes: { markdown: readMe }
  });
