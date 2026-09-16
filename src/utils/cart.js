
function calculateTotal(items) {
  return items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
}

function applyCoupon(total, coupon) {
  if (coupon === 'SAVE10') return total * 0.9;
  if (coupon === 'SAVE20') return total * 0.8;
  throw new Error('Invalid coupon');
}

module.exports = { calculateTotal, applyCoupon };