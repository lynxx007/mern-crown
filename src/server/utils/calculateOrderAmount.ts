const calculateOrderAmount = (
  items: Array<{
    price: number;
    quantity: number;
  }>
) => {
  const amount = items.reduce((acc: number, item) => {
    return acc + Math.round(item.price * item.quantity * 100);
  }, 0);
  return amount;
};

export default calculateOrderAmount;
