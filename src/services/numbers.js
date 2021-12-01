import { BigNumber, utils } from 'ethers';
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

function formatRounded(bigNumber, digits = 18) {
  if (!bigNumber || !BigNumber.isBigNumber(bigNumber)) {
    throw new Error('not a BigNumber');
  }
  const digitsCopy = Math.floor(digits);
  if (digitsCopy < 0 || digitsCopy > 18) {
    throw new Error('digits out of range');
  }
  const mathBn = math.bignumber(utils.formatEther(bigNumber));
  return math.format(mathBn.round(digitsCopy), {
    notation: 'fixed',
    precision: digitsCopy,
  });
}

function checkValidNumberString(str) {
  try {
    parseFloatToBigNumber(str);
    return true;
  } catch (err) {
    return false;
  }
}

function parseFloatToBigNumber(str) {
  const mathBn = math.bignumber(str);
  return utils.parseEther(math.round(mathBn, 18).toString());
}

export {
  math,
  ZERO,
  ONE,
  TEN,
  FIXED_POINT,
  THOUSAND,
  MIN_SHOW_STAKE,
  formatRounded,
  checkValidNumberString,
  parseFloatToBigNumber,
};
