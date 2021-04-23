let puppeteer=require("puppeteer");
let { codes } = require("./code");

let fs=require("fs");

(async function (){

    try{
        //creating a browser lauch promise
        let browserInstance= await puppeteer.launch({
            headless:false, // headless is false coz we can see the activities of browser
            defaultViewport:null, //viewpoet is null coz bydefault viewport is 800 x 600
            args:["--start-maximized"] //to maximize the browser window
        })

        //creating a new tab
        let newTab=await browserInstance.newPage();

        await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login",{waitUntil: 'load'});
        await newTab.type("#input-1","nohaxi7445@kindbest.com",{delay:200});
        await newTab.type("#input-2","dummy_pass",{delay:200});
        await newTab.click("button[data-analytics='LoginPassword']");
        await waitAndClick(".card-content h3[title='Interview Preparation Kit']",newTab);
        await waitAndClick("a[data-attr1='warmup']",newTab);
        let url=newTab.url();
        console.log(url);

        for(let i=0;i<codes.length;i++){
                await questionSolver(url,codes[i].soln,codes[i].qName,newTab);
        }

    }catch(err){
        console.log(err);
    }
})();

async function waitAndClick(Selector,newTab){
        await newTab.waitForSelector(Selector,{visible:true});
        let clickPomise=newTab.click(Selector);
        return clickPomise;
       
}



async function questionSolver(modulepageUrl, code, questionName,gtab) {
    try {
     // page visit 
     await gtab.goto(modulepageUrl,{waitUntil: 'load'});

     //  page h4 -> mathcing h4 -> click
     // function will exceute inside the browser
     function browserconsolerunFn(questionName) {
         let allH4Elem = document.querySelectorAll("h4");
         let textArr = [];
         for (let i = 0; i < allH4Elem.length; i++) {
             let myQuestion = allH4Elem[i]
             .innerText.split("\n")[0];
             textArr.push(myQuestion);
         }
         let idx = textArr.indexOf(questionName);
         // console.log(idx);
         allH4Elem[idx].click();
     }
     //evaluate fucnction run the function in browser console
     await gtab.evaluate(browserconsolerunFn, questionName);
     
     //clicking in the checkbox for custom input where we will paste our code
     await waitAndClick(".hr-monaco-editor-with-input .checkbox-input",gtab);
 
     //finding the custominput area and typing our code in that area
     await gtab.type(".custominput",code);

 
     //now press cntr btn and hold it 
     await gtab.keyboard.down("Control");

     //now press a control is already pressed ctrl+a to selllect all code from custom input area
     await gtab.keyboard.press("a");

     //after cntr+a now cut the code press x 
     await gtab.keyboard.press("x");
     

     // now clicked on the editor to paste the code
     await gtab.click(".monaco-editor.no-user-select.vs");

 
     //now press ctrl+a to select all code from editor to remove and paste our own code
     await gtab.keyboard.press("a");
 
     //now paste the code to editor press ctrl+v
     await gtab.keyboard.press("v");
    //now leave the control button
    await  gtab.keyboard.up("Control",{delay:100});
    setTimeout(function(){
        
    })
    return gtab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    
 
    } catch (err) {
        console.log(err);
    }
       
}