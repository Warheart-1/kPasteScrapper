const puppeteer = require('puppeteer');

async function sendPassword (password) {
    try {
        const URL = "https://kpaste.infomaniak.com/new";
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        await page.goto(URL, { waitUntil: 'networkidle2' });
        const textarea = await page.$('#new_paste_textarea');
        await textarea.type(password);
        const submit = await page.$('#new_paste_submit_button');
        await submit.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        const url = await page.evaluate(() => {
            return window.location.href;
        });
        await browser.close();
        return url;
    } catch (error) {
        console.error(error);
        await browser.close();
        return null;
    }
}

module.exports = sendPassword;