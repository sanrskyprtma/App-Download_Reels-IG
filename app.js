const fs = require("fs");
const puppeteer = require("puppeteer");

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const inputURL = "https://www.instagram.com/reel/C6x19IHPTNg/?igsh=YWl1MXRxdmIzcTAy"; // Ganti dengan URL yang sesuai

    await page.goto(inputURL);
    await page.waitForSelector("video");

    const videoUrl = await page.evaluate(() => {
        const video = document.querySelector("video");
        return video.src;
    });

    const response = await page.goto(videoUrl);
    const buffer = await response.buffer();

    fs.writeFileSync("output/video.mp4", buffer);

    console.log("The video has been downloaded");

    await browser.close();
}

main();
