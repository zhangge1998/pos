'use strict';

let printReceipt=(inputs)=> {
  let allItems = loadAllItems();
  let cartItemCounts = buildCounts(allItems, inputs);
  let cartItemTotals = buildSubtotal(cartItemCounts);
  let totals = buildTotal(cartItemTotals);
  let string = printReceiptText(totals);
  console.log(string);
};

let buildCounts=(allItems, inputs)=> {
  let cartItemCounts = [];
  for (let item of allItems) {
    var count = isExit(item, inputs);
    cartItemCounts.push({item: item, count: count});
  }
  return cartItemCounts;
};

let isExit=(allItems, inputs)=> {
  let count = 0;
  for (let i of inputs) {
    if (allItems.barcode === i)
      count++;
  }
  return count;
};

let buildSubtotal=(cartItemCounts)=> {
  let cartItemTotals = [];
  for (let i of cartItemCounts) {
    if (i.count > 0) {
      var subtotal = i.item.price * i.count;
      cartItemTotals.push({cartItem: i, subtotal: subtotal});
    }
  }
  return cartItemTotals;
};

let  buildTotal=(cartItemTotals)=> {
  let total = 0;
  for (let i of cartItemTotals) {
    total += i.subtotal;
  }
  return {receiptItem: cartItemTotals, total: total};
};

let  printReceiptText=(totals)=> {
  let string = '***<没钱赚商店>收据***';
  for (let object of totals.receiptItem) {
    string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
};
