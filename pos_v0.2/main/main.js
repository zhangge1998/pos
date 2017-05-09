'use strict';

function printReceipt(inputs) {
  var allItems = loadAllItems();
  var cartItemCounts = buildCounts(allItems, inputs);
  var cartItemTotals = buildSubtotal(cartItemCounts);
  var totals = buildTotal(cartItemTotals);
  var string = printReceiptText(totals);
  console.log(string);
}

function buildCounts(allItems, inputs) {
  var cartItemCounts = [];
  for (var i = 0; i < allItems.length; i++) {
    var count = isExit(allItems[i], inputs);
    cartItemCounts.push({item: allItems[i], count: count});
  }
  return cartItemCounts;
}

function isExit(allItems, inputs) {
  var count = 0;
  for (var i = 0; i < inputs.length; i++) {
    if (allItems.barcode === inputs[i])
      count++;
  }
  return count;
}

function buildSubtotal(cartItemCounts) {
  var cartItemTotals = [];
  for (var i = 0; i < cartItemCounts.length; i++) {
    if (cartItemCounts[i].count > 0) {
      var temp = cartItemCounts[i];
      var subtotal = temp.item.price * temp.count;
      cartItemTotals.push({cartItem: cartItemCounts[i], subtotal: subtotal});
    }
  }
  return cartItemTotals;
}

function buildTotal(cartItemTotals) {
  var total = 0;
  for (var i = 0; i < cartItemTotals.length; i++) {
    total += cartItemTotals[i].subtotal;
  }
  return {receiptItem: cartItemTotals, total: total};
}

function printReceiptText(totals) {
  var string = '***<没钱赚商店>收据***';
  for (var k = 0; k < totals.receiptItem.length; k++) {
    var object = totals.receiptItem[k];
    string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
}
