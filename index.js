const fs = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;    
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{
    //res.end("hello from the server");
    //const pathname = req.url;
    const { query,pathname } = url.parse(req.url,true);

    //Overview Page
    if(pathname==='/'||pathname==='/overview')
    {
        res.writeHead(200,{'Content-type':'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)) 
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        res.end(output);
    }
    
    //Product Page
    else if(pathname=='/product')
    {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }
    //Api
    else if(pathname=='/api')
    {
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);  
    }
    //Not Found
    else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header': 'hridoy'
        });
        res.end('<h1>Page Not Found</h1>');
    }
    
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request from port:8000');
});

// /////////callback function////////
// function math(num1,num2,result)
// {
//     result(num1,num2);
// }
// math(5,5,(n1,n2)=>{
//     let sum = n1+n2;
//     console.log(sum);
// });
// math(10,10,(num1,num2)=>{
//     let mul = num1 * num2;
//     console.log(mul);
// });



// /////////foreach/////////
// var arr = [1,2,3,4,5];
// var sum = 0;
// arr.forEach(function(value,index,arr){
//     console.log(value,index,arr);
//     sum += value;
    
// });
// console.log(sum);

// /////////my own build foreach////////

// function myForEach(arr,cb)
// {
//     for(var i = 0; i<arr.length; i++)
//     {
//         cb(arr[i]); 
//         //sum1 = sum1 + arr[i]; this is hapening here
//     }
// }

// var sum1= 0;
// myForEach(arr,function(value){
//     sum1 += value;
//     console.log(sum1);
// });
// console.log(sum1);


// /////////array.map/////////
// var sqt = arr.map(function(value){
//     return value*value;
// });
// console.log(sqt);

// //my own map function
// function myMap(arr,cb)
// {
//     var newArr = [];
//     for(var i = 0; i<arr.length; i++)
//     {
//         var temp = cb(arr[i]);
//         newArr.push(temp);
//     }
//     return newArr;
// }
// var sqt2 = myMap(arr,function(value){
//     return value*value;
// })
// console.log(sqt2);