const formatOrder = (arrParam) => {
  let formatedOrder = "";
  let totalPrice = 0;

  for (let i = 0; i < arrParam.length; i++) {
    formatedOrder = formatedOrder + arrParam[i].quantity + "x" + arrParam[i].product + " ";
    totalPrice += parseInt(arrParam[i].price);
  }

  return { formatedOrder, totalPrice };
};

module.exports = { formatOrder };
