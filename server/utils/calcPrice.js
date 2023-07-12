const calcPrice = (price, discount = 0) => price - (discount * price) / 100;

module.exports = calcPrice;
