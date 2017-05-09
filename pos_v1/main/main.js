'use strict';

function printReceipt(inputs) {
  var allItems = loadAllItems();
  var cartItemCounts = buildCounts(allItems, inputs);
  var cartItemStatus = buildItemStatus(cartItemCounts);
  var totals = buildTotalAndDiscount(cartItemStatus);
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
    if (allItems.barcode === inputs[i].substring(0, 10))
      count += elementCount(inputs[i]);
  }
  return count;
}

function elementCount(item) {
  if (item.length === 10)
    return 1;
  else {
    var cCount = item.split("-");
    return parseFloat(cCount[1]);
  }
}

function buildItemStatus(cartItemCounts) {
  var cartItemStatus = [];
  var promotions = loadPromotions();
  for (var i = 0; i < cartItemCounts.length; i++) {
    var temp = cartItemCounts[i];
    if (cartItemCounts[i].count > 0) {
      if (isPromote(cartItemCounts[i], promotions)) {
        var subtotal = temp.item.price * (temp.count - 1);
        cartItemStatus.push({cartItem: cartItemCounts[i], subtotal: subtotal, itemDiscount: temp.item.price});
      }
      else {
        var subtotal1 = temp.item.price * temp.count;
        cartItemStatus.push({cartItem: cartItemCounts[i], subtotal: subtotal1, itemDiscount: 0});
      }
    }
  }
  return cartItemStatus;
}

function isPromote(cartItemCounts, promotions) {
  for (var i = 0; i < promotions[0].barcodes.length; i++) {
    if (cartItemCounts.item.barcode === promotions[0].barcodes[i] && cartItemCounts.count % 2 != 0) {
      return 1;
    }
  }
}

function buildTotalAndDiscount(cartItemStatus) {
  var total = 0;
  var discount = 0;
  for (var i = 0; i < cartItemStatus.length; i++) {
    total += cartItemStatus[i].subtotal;
    discount += cartItemStatus[i].itemDiscount;
  }
  return {receiptItem: cartItemStatus, total: total, discount: discount};
}

function printReceiptText(totals) {
  var string = '***<没钱赚商店>收据***';
  for (var k = 0; k < totals.receiptItem.length; k++) {
    var object = totals.receiptItem[k];
    string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '节省：' + totals.discount.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
}

