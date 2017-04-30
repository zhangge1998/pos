'use strict';

function printReceipt(inputs) {
  var sum=0,a_sum;
  var s='***<没钱赚商店>收据***';
  for(var i=0;i<inputs.length;i++)
  {
    a_sum=inputs[i].count*inputs[i].price;
    sum+=a_sum;
    s+='\n'+'名称：'+inputs[i].name+'，'+'数量：'+inputs[i].count+inputs[i].unit+'，'+'单价：'+
      inputs[i].price+'.00(元)'+'，'+'小计：'+a_sum+'.00(元)';
  }
  s+='\n'+'----------------------'+'\n'+'总计：'+sum+'.00(元)'+'\n'+'**********************';
  console.log(s);
}

