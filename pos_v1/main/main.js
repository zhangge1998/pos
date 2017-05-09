'use strict';
function printReceipt(inputs) {
  var sum=0,a_sum;
  var a_free=0;
  var s='***<没钱赚商店>收据***';
  var All_Item=loadAllItems();
  var c=loadPromotions();
  for(var i=0;i<All_Item.length;i++)
  {
    var temp=All_Item[i];
    temp.count=0;
    for(var j=0;j<inputs.length;j++)
    {
      if(temp.barcode==inputs[j].substring(0,10))
      {
        if(inputs[j].length==10)
        temp.count+=1;
        else
          temp.count+=parseFloat(inputs[j].substring(11));
      }
    }
    if(temp.count!=0)
    {
      for(var k=0;k<c[0].barcodes.length;k++)
      {
        if (temp.barcode == c[0].barcodes[k]) {
          a_sum=(temp.count-parseInt(temp.count/3))*temp.price;
          a_free=a_free+(temp.count/3)*temp.price;
        }
        else
          a_sum = temp.count* temp.price;
      }
      //a_sum = temp.count* temp.price;
      sum += a_sum;
      s += '\n' + '名称：' + temp.name + '，' + '数量：' + temp.count + temp.unit + '，' + '单价：' +
        temp.price + '(元)' + '，' + '小计：' + a_sum + '(元)';
    }
  }
  s+='\n'+'----------------------'+'\n'+'总计：'+sum+'(元)'+'\n'+'节省：'+a_free+'（元）'+'\n'+'**********************';
  console.log(s);
}
