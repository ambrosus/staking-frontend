import { BigNumber } from 'ethers';
import { all, create } from 'mathjs';

const ZERO = BigNumber.from(0);
const ONE = BigNumber.from(1);
const TEN = BigNumber.from(10);
const FIXED_POINT = TEN.pow(18);
const MIN_SHOW_STAKE = FIXED_POINT.div(100);
const THOUSAND = FIXED_POINT.mul(1000);

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

export { math, ZERO, ONE, TEN, FIXED_POINT, THOUSAND, MIN_SHOW_STAKE };
