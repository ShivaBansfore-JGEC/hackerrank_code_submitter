let puppeteer=require("puppeteer");
let { codes } = require("./code");
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
    let interview_prep_Clickpromis=waitAndClick(".card-content h3[title='Interview Preparation Kit']");
    return interview_prep_Clickpromis; 

}).then(function (){
    let worm_up_clickPromiss=waitAndClick("a[data-attr1='warmup']");
    return worm_up_clickPromiss;
}).then(function (){
    return gtab.url();
}).then(function (url){
    console.log(url);
    let question_obj=codes[0];
    questionSolver(url,question_obj.soln,question_obj.qName);

})
.catch(function (err){
    console.log(err);
})

function waitAndClick(Selector){
    return new Promise(function (resolve,reject){
        let selectorWaitPromise=gtab.waitForSelector(Selector,{visible:true});
        selectorWaitPromise.then(function (){
            let clickPomise=gtab.click(Selector);
            return clickPomise;
        }).then( function(){
            resolve();
        }).catch(function(){
            reject(err);
        })
    })
}


function questionSolver(modulepageUrl, code, questionName) {
    return new Promise(function (resolve, reject) {
        // page visit 
        let reachedPageUrlPromise = gtab.goto(modulepageUrl);

        reachedPageUrlPromise.then(function () {
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
                
                let pageClickPromise = 
                gtab.evaluate(browserconsolerunFn, questionName);
                return pageClickPromise;
            }).then(function (){
                //clicking in the checkbox for custom input where we will paste our code
                let inputcheckBoxpromiss=waitAndClick(".custom-checkbox.inline");
                return inputcheckBoxpromiss;
            }).then(function (){
                //finding the custominput area and typing our code in that area
                let codeTypepromiss=gtab.type(".custominput",code);
                return codeTypepromiss;
            }).then(function(){
                //now press cntr btn and hold it 
                let cntrlHoldPromiss=gtab.keyboard.down("Control");
                return cntrlHoldPromiss;

            }).then(function (){
                //now press a control is already pressed ctrl+a to selllect all code from custom input area
                let press_a_promiss=gtab.keyboard.press("a");
                return press_a_promiss;

            }).then(function(){
                //after cntr+a now cut the code press x 
                let cutPromiss=gtab.keyboard.press("x");
                return cutPromiss;
            }).then(function (){
                // now clicked on the editor to paste the code
                let editorWillBeClickedPromise=gtab.click(".monaco-editor.no-user-select.vs");
                return editorWillBeClickedPromise;
            }).then(function (){
                //now press ctrl+a to select all code from editor to remove and paste our own code
                let press_a_promiss=gtab.keyboard.press("a");
                return press_a_promiss;
            }).then(function (){
                //now paste the code to editor press ctrl+v
                let pastePromiss=gtab.keyboard.press("v");
                return pastePromiss;
            }).then(function (){
                //now leave the control button
                let cntrlLeavePromiss=gtab.keyboard.up("Control",{delay:100});
                return cntrlLeavePromiss;
            }).then(function (){
                //finally press the submit button to submit code
                setTimeout(function(){
                },5000);
                let clickSubmitBtn=gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                return clickSubmitBtn;
            }).then(function(){
                resolve();
            }).catch(function (){
                reject(err);
            })
    })
}
