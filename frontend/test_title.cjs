const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/cms/posts');
  
  // Wait for input to be present
  await page.waitForSelector('input[placeholder="Post Title..."]');
  
  // Get initial value
  let initialValue = await page.$eval('input[placeholder="Post Title..."]', el => el.value);
  console.log("Initial Title:", initialValue);
  
  // Type into it
  await page.type('input[placeholder="Post Title..."]', ' Hello');
  
  // Get new value
  let newValue = await page.$eval('input[placeholder="Post Title..."]', el => el.value);
  console.log("New Title:", newValue);
  
  await browser.close();
})();
