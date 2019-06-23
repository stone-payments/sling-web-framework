import * as iconFns from './icons/index.js';
import * as brandsFns from './brands/index.js';
import { toFlatEntries } from '@stone-payments/emd-helpers';

const IconSvgController = renderer => Object
  .entries(iconFns)
  .map(([key, fn]) => [key, fn(renderer)])
  .reduce(toFlatEntries, {});

const BrandSvgController = renderer => Object
  .entries(brandsFns)
  .map(([key, fn]) => [key, fn(renderer)])
  .reduce(toFlatEntries, {});

export {
  IconSvgController,
  BrandSvgController
};
