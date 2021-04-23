
let puppeteer=require("puppeteer");
let fs=require("fs");
let links=["https://www.amazon.in/","https://www.flipkart.com/","https://paytmmall.com/"];
let product_name=process.argv[2];
(async function (){

    try{
        //creating a browser lauch promise
        let browserInstance= await puppeteer.launch({
            headless:false, // headless is false coz we can see the activities of browser
            defaultViewport:null, //viewpoet is null coz bydefault viewport is 800 x 600
            args:["--start-maximized"] //to maximize the browser window
        })

        let amazonProArr=await amazonListOfProduct(links[0],product_name,browserInstance);
        console.table(amazonProArr);

        let flipkartProdArr=await FlipkartListOfProduct(links[1],product_name,browserInstance);
        console.table(flipkartProdArr);

        let patmMallProdArr=await PaytMallListOfProduct(links[2],product_name,browserInstance);
        console.table(patmMallProdArr);

    }catch(err){
        console.log(err);
    }
})();


async function waitAndClick(Selector,newTab){
    await newTab.waitForSelector(Selector,{visible:true});
    let clickPomise=newTab.click(Selector);
    return clickPomise;
   
}


async function amazonListOfProduct(url,product_name,browserInstance){
    let newTab=await browserInstance.newPage();
    await newTab.goto(url,{waitUntil: 'load'});
    //type producnt name in searchbar 
    await newTab.type("#twotabsearchtextbox",product_name,{delay:200});
    //click the search btn
    await  waitAndClick("#nav-search-submit-button",newTab);
    await newTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal",{visible:true});
    await newTab.waitForSelector(".a-price-whole",{visible:true});

    function consoleFn(productNameSelector,PriceSelector){
        let prodNameArr=document.querySelectorAll(productNameSelector);
        let prodPriceArr=document.querySelectorAll(PriceSelector);
        let details=[];
        let cnt=0;
        for(let i=0;i<prodNameArr.length;i++){
            if(cnt>=5){
                break;
            }
            if(prodNameArr[i]!=null && prodPriceArr[i]!=null){
                let product_name=prodNameArr[i].innerText;
                let product_price=prodPriceArr[i].innerText;
                details.push({
                    "Product Name":product_name,
                    "Product Price":product_price
                });
                cnt++;
            }
        }
        return details;

    }

    let detailsArr=newTab.evaluate(consoleFn,".a-size-medium.a-color-base.a-text-normal",".a-price-whole")
    return detailsArr;
}

async function FlipkartListOfProduct(url,product_name,browserInstance){
    let newTab=await browserInstance.newPage();
    await newTab.goto(url,{waitUntil: 'load'});
    await waitAndClick("._2KpZ6l._2doB4z",newTab);
    await newTab.type("._3704LK",product_name);
    await waitAndClick("button[type='submit']",newTab);

    await newTab.waitForSelector("._4rR01T",{visible:true});
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});

    function consoleFn(productNameSelector,PriceSelector){
        let prodNameArr=document.querySelectorAll(productNameSelector);
        let prodPriceArr=document.querySelectorAll(PriceSelector);
        let details=[];
        let cnt=0;
        for(let i=0;i<prodNameArr.length;i++){
            if(cnt>=5){
                break;
            }
            if(prodNameArr[i]!=null && prodPriceArr[i]!=null){
                let product_name=prodNameArr[i].innerText;
                let product_price=prodPriceArr[i].innerText;
                details.push({
                    "Product Name":product_name,
                    "Product Price":product_price
                });
                cnt++;
            }
        }
        return details;

    }

    let detailsArr=await newTab.evaluate(consoleFn,"._4rR01T","._30jeq3._1_WHN1");
    return detailsArr;

}

async function PaytMallListOfProduct(url,product_name,browserInstance){
    let newTab=await browserInstance.newPage();
    await newTab.goto(url,{waitUntil: 'load'});
    await newTab.type("#searchInput",product_name,{delay:200});
    await newTab.keyboard.press("Enter");

    await newTab.waitForSelector(".UGUy",{visible:true});
    await newTab.waitForSelector("._1kMS",{visible:true});


    function consoleFn(productNameSelector,PriceSelector){
        let prodNameArr=document.querySelectorAll(productNameSelector);
        let prodPriceArr=document.querySelectorAll(PriceSelector);
        let details=[];
        let cnt=0;
        for(let i=0;i<prodNameArr.length;i++){
            if(cnt>=5){
                break;
            }
            if(prodNameArr[i]!=null && prodPriceArr[i]!=null){
                let product_name=prodNameArr[i].innerText;
                let product_price=prodPriceArr[i].innerText;
                details.push({
                    "Product Name":product_name,
                    "Product Price":product_price
                });
                cnt++;
            }
        }
        return details;

    }

    let detailsArr=await newTab.evaluate(consoleFn,".UGUy","._1kMS");
    return detailsArr;
}
