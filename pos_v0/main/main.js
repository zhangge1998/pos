'use strict';
let printReceipt=(inputs)=>{
  let itemTotals = buildSubtotal(inputs);
  let totals = buildTotal(itemTotals);
  let string = printReceiptText(totals);
  console.log(string);
};

let buildSubtotal=(inputs)=> {
  let itemTotals = [];
  for (let i of inputs) {
    let subtotal = i.price * i.count;
    itemTotals.push({item: i, subtotal: subtotal});
  }
  return itemTotals;
};

let buildTotal=(itemTotals)=> {
  let total = 0;
  for (let j of itemTotals) {
    total += j.subtotal;
  }
  return {receiptItem: itemTotals, total: total};
};

let printReceiptText=(totals)=> {
  let  string= '***<没钱赚商店>收据***';
  for (let k of totals.receiptItem) {
    let object = k;
    string += '\n' + '名称：' + object.item.name + '，' + '数量：' + object.item.count + object.item.unit + '，' + '单价：' + object.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
};
