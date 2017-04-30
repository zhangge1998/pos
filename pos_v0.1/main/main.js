'use strict';

function printReceipt(inputs) {
  var sum=0,a_sum;
  var i=0;
  var s='***<没钱赚商店>收据***';
  //for(var i=0;i<inputs.length;i++)
  while(i<inputs.length)
  {
    var temp=inputs[i];
    temp.count=0;
    for(var j=i;j<inputs.length;j++)
    {
      if(temp.barcode==inputs[j].barcode)
      {
        temp.count++;
        i=j+1;
      }
    }
    a_sum=temp.count*temp.price;
    sum+=a_sum;
    s+='\n'+'名称：'+temp.name+'，'+'数量：'+temp.count+temp.unit+'，'+'单价：'+
      temp.price+'.00(元)'+'，'+'小计：'+a_sum+'.00(元)';
  }
  s+='\n'+'----------------------'+'\n'+'总计：'+sum+'.00(元)'+'\n'+'**********************';
  console.log(s);
}

