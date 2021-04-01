
let puppeteer = require("puppeteer");

let gtab;
let browserWillBeLaunchpromisses=puppeteer.launch(
    {
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    }
)

browserWillBeLaunchpromisses.then(function (browserInstance){
    let new_pagePromiss=browserInstance.newPage();
    return new_pagePromiss;
}).then(function (newPage){
    console.log("new page is opened");
    let go_to_new_page_Promiss=newPage.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gtab=newPage;
    return go_to_new_page_Promiss;
}).then(function (){
    let type_emailPromiss=gtab.type("#input-1","nohaxi7445@kindbest.com",{delay:200});
    return type_emailPromiss;
}).then(function (){
    let type_passPromiss=gtab.type("#input-2","dummy_pass",{delay:200});
    return type_passPromiss;
}).then(function(){
    let loginBtnClickPromiss=gtab.click("button[data-analytics='LoginPassword']");
    let interview_kit_selector=gtab.waitForSelector(".card-content h3[title='Interview Preparation Kit']",{visible:true});
    let combinedPromise=Promise.all([loginBtnClickPromiss,
    gtab.waitForNavigation({waitUntil:"networkidle0"}),interview_kit_selector]);
    return combinedPromise;

}).then(function (){
    let interview_prep_Clickpromis=gtab.click(".card-content h3[title='Interview Preparation Kit']");
    let worm_up_selector=gtab.waitForSelector("a[data-attr1='warmup']",{visible:true});
    let combined_promisse=Promise.all([interview_prep_Clickpromis,
        gtab.waitForNavigation({waitUntil:"networkidle0"}),worm_up_selector]);
    return combined_promisse;

}).then(function (){
    let worm_up_clickPromiss=gtab.click("a[data-attr1='warmup']");
    let sockElelments=gtab.waitForSelector("a[data-attr1='sock-merchant']",{visible:true});
    let combined_promisse=Promise.all([worm_up_clickPromiss,
        gtab.waitForNavigation({waitUntil:"networkidle0"}),sockElelments]);
    return combined_promisse;
}).then(function (){
    let clickPromiss=gtab.click("a[data-attr1='sock-merchant']");
    return clickPromiss;
    
}).catch(function (err){
    console.log(err);
})