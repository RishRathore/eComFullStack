export const calculateStockPercent = (stock, percent) => {
  return stock * (percent / 100);
};

export const getTotalPrice = (rate, stock, buyQuantity) => {
  let price = rate * buyQuantity; // 8000
  let total = 0;
  let discount = 0;
  const tenPercentStock = calculateStockPercent(stock, 10);
  const fiftyPercentStock = calculateStockPercent(stock, 50);
  const nintyPercentStock = calculateStockPercent(stock, 90);

  if (tenPercentStock < buyQuantity < fiftyPercentStock) {
    total = price - (price * 5) / 100;
    discount = 5;
    return { total, discount };
  }
  if (fiftyPercentStock < buyQuantity < nintyPercentStock) {
    total = price - (price * 10) / 100;
    discount = 10;
    return { total, discount };
  }
  if (buyQuantity > nintyPercentStock) {
    total = price - (price * 20) / 100;
    discount = 20;
    return { total, discount };
  }
};
