
const { calculateTotal, applyCoupon } =
  require('../../src/utils/cart');

const items = [
  { price: 500, quantity: 2 },
  { price: 200, quantity: 1 }
];

describe('calculateTotal', () => {
  it('returns 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('adds price * quantity', () => {
    expect(calculateTotal(items)).toBe(1200);
  });
});

describe('applyCoupon', () => {
  test('invalid coupon throws', () => {
    expect(() => applyCoupon(1000, 'FAKE'))
      .toThrow('Invalid coupon');
  });
});

