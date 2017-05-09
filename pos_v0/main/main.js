'use strict';
function printReceipt(inputs) {
  var itemTotals = buildSubtotal(inputs);
  var totals = buildTotal(itemTotals);
  var string = printReceiptText(totals);
  console.log(string);
}

function buildSubtotal(inputs) {
  var itemTotals = [];
  for (var i = 0; i < inputs.length; i++) {
    var subtotal = inputs[i].price * inputs[i].count;
    itemTotals.push({item: inputs[i], subtotal: subtotal});
  }
  return itemTotals;
}

function buildTotal(itemTotals) {
  var total = 0;
  for (var j = 0; j < itemTotals.length; j++) {
    total += itemTotals[j].subtotal;
  }
  return {receiptItem: itemTotals, total: total};
}

function printReceiptText(totals) {
  var  string= '***<没钱赚商店>收据***';
  for (var k = 0; k < totals.receiptItem.length; k++) {
    var object = totals.receiptItem[k];
    string += '\n' + '名称：' + object.item.name + '，' + '数量：' + object.item.count + object.item.unit + '，' + '单价：' + object.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
}
