
Input:
    * Link of Hackerrank website

Output:
    It will copy a code from your system and 
    paste it to the question of hackerrank automatically
    it should also handle login automatically.


Installation:
    * npm i puppeteer

Approach:
    lunch chrome tab using puppeteer and create a instance of browser
    find the selector of html elements for typing email and pass for login 
    after successful login find selector for interview_kit and clik
    the you will reach a warm-up challenges and find selector and click in warm up challenges.
    Then find the selector for each question and click and after that find the selector for
    editor and cut and paste the code by funtion provide by puppeteer

https://user-images.githubusercontent.com/51274153/118363801-bbd4f000-b5b3-11eb-8ca6-8fa9c5432a75.mp4



