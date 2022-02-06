const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const calculateTotal = () => {
  const $subTotal = $("div.count-price.subtotal p");
  const $totalEach = $("div.col-total p");
  const $tax = $("div.count-price.tax p");
  const $total = $("div.count-price.total p");
  let subTotal = 0;
  let tax = 0;
  let total = 0;
  $totalEach.each(function () {
    const eachTotal = parseFloat($(this).text().split("$").join(""));
    subTotal += eachTotal;
  });
  tax = Math.round(subTotal * 0.05 * 100) / 100;
  total = tax + subTotal;
  $subTotal.text(`$${subTotal.toFixed(2)}`).trigger("change");
  $tax.text(`$${tax.toFixed(2)}`).trigger("change");
  $total.text(`$${total.toFixed(2)}`).trigger("change");
  const totalDetails = { tax, subTotal, total };
  localStorage.setItem("totalDetails", JSON.stringify(totalDetails));
};

const formatPhone = (number) => {
  const format = `(${number.substring(0, 3)}) ${number.substring(
    3,
    6
  )}-${number.substring(6)}`;

  return format;
};
