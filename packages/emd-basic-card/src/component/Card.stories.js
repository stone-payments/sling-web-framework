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

const template = `
  <div :style="{ fontSize: fontSize + 'px', maxWidth: '600px' }">
    <emd-card
      :noscroll.prop="!useScroll"
      :expandedbody.prop="expandedBody"
      :style="{ '--emd-card-header-background': headerBackground, '--emd-card-footer-background': footerBackground, '--emd-card-body-background': bodyBackground, height: fixedHeight || 'auto' }"
    >
      <h4
        v-if="showHeader"
        slot="header"
        :style="{ fontSize: '1.5em', color: headerColor || 'inherit' }"
      >
        {{ headerText }}
      </h4>
      <svg
        v-if="showHeaderExtra"
        slot="header-extra"
        style="{ height: '1.5em' }"
        xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
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
      showHeader: {
        default: boolean('Show header', true)
      },
      showHeaderExtra: {
        default: boolean('Show header extra', true)
      },
      showFooter: {
        default: boolean('Show footer', true)
      },
      expandedBody: {
        default: boolean('Expanded body', true)
      }
    },
    template
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
        default: boolean('Expanded body', true)
      }
    },
    template
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
        default: boolean('Expanded body', true)
      },
      useScroll: {
        default: boolean('Scroll enabled', true)
      },
      fixedHeight: {
        default: '21em'
      }
    },
    template
  }), {
    notes: { markdown: readMe }
  });
