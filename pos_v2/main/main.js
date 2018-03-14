'use strict';

let printReceipt = (inputs)=> {
    let allItems = Item.all();
    let cartItemCounts = buildCounts(allItems, inputs);
    let cartItemStatus = buildItemStatus(cartItemCounts);
    let totals = buildTotalAndDiscount(cartItemStatus);
    let string = printReceiptText(totals);
    console.log(string);
};

let buildCounts = (allItems, inputs)=> {
    let cartItemCounts = [];
    for (let i of allItems) {
        let count = isExit(i, inputs);
        cartItemCounts.push({item: i, count: count});
    }
    return cartItemCounts;
};

let isExit = (allItems, inputs)=> {
    let count = 0;
    for (let i of inputs) {
        if (allItems.barcode === i.substring(0, 10))
            count += elementCount(i);
    }
    return count;
};

let elementCount = (item)=> {
    if (item.length === 10)
        return 1;
    else {
        let cCount = item.split("-");
        return parseFloat(cCount[1]);
    }
};

let buildItemStatus = (cartItemCounts)=> {
    let cartItemStatus = [];
    let promotions = Promotion.all();
    for (let i of cartItemCounts) {
        if (i.count > 0) {
            if (isPromote(i, promotions)) {
                let subtotal = i.item.price * (i.count - 1);
                cartItemStatus.push({cartItem: i, subtotal: subtotal, itemDiscount: i.item.price});
            }
            else {
                let subtotal1 = i.item.price * i.count;
                cartItemStatus.push({cartItem: i, subtotal: subtotal1, itemDiscount: 0});
            }
        }
    }
    return cartItemStatus;
};

let isPromote = (cartItemCounts, promotions)=> {
    for (let i of promotions[0].barcodes) {
        if (cartItemCounts.item.barcode === i && cartItemCounts.count % 2 != 0) {
            return 1;
        }
    }
};

let buildTotalAndDiscount = (cartItemStatus)=> {
    let total = 0;
    let discount = 0;
    for (let i of cartItemStatus) {
        total += i.subtotal;
        discount += i.itemDiscount;
    }
    return {receiptItem: cartItemStatus, total: total, discount: discount};
};

let date = () => {
    let dateDigitToString = (num)=> {
        return num < 10 ? `0${num}` : num;
    };
    let currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
    return formattedDateString;
};
let printReceiptText = (totals)=> {
    let string = '***<没钱赚商店>收据***' + '\n' + '打印时间：' + date() + '\n' + '----------------------';
    for (let object of totals.receiptItem) {
        string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
    }
    string += '\n' + '----------------------' + '\n' + '总计：' + totals.total.toFixed(2) + '(元)' + '\n' + '节省：' + totals.discount.toFixed(2) + '(元)' + '\n' + '**********************';
    return string;
};


