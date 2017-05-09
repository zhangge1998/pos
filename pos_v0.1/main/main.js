'use strict';
function printReceipt(inputs) {
  var cartItemCounts = buildGoodsCount(inputs);
  var cartItemTotals = buildSubtotal(cartItemCounts);
  var totals = buildTotal(cartItemTotals);
  printReceiptText(totals);
}

function buildGoodsCount(inputs) {
  var cartItemCounts = [];
  for (var i = 0; i < inputs.length; i++) {
    findItemStatus(inputs[i], cartItemCounts);
  }
  return cartItemCounts;
}

function findItemStatus(item, cartItemCounts) {
  for (var j = 0; j < cartItemCounts.length; j++) {
    if (item.barcode === cartItemCounts[j].item.barcode) {
      cartItemCounts[j].count += 1;
      return;
    }
  }
  cartItemCounts.push({item: item, count: 1});
}

function buildSubtotal(cartItemCounts) {
  var cartItemTotals = [];
  for (var i = 0; i < cartItemCounts.length; i++) {
    var temp = cartItemCounts[i];
    var subtotal = temp.item.price * temp.count;
    cartItemTotals.push({cartItem: cartItemCounts[i], subtotal: subtotal});
  }
  return cartItemTotals;
}

function buildTotal(cartItemTotals) {
  var totals = {};
  var total = 0;
  for (var i = 0; i < cartItemTotals.length; i++) {
    total += cartItemTotals[i].subtotal;
  }
  totals.receiptitem = cartItemTotals;
  totals.total = total;
  return totals;
}

function printReceiptText(totals) {
  var s = '***<没钱赚商店>收据***';
  for (var k = 0; k < totals.receiptitem.length; k++) {
    var a = totals.receiptitem[k];
    s += '\n' + '名称：' + a.cartItem.item.name + '，' + '数量：' + a.cartItem.count + a.cartItem.item.unit + '，' + '单价：' + a.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + a.subtotal.toFixed(2) + '(元)';
  }
  s += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(s);
}
