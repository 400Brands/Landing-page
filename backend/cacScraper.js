const puppeteer = require("puppeteer");

async function searchCAC(brandName) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://search.cac.gov.ng/home", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector("input", { timeout: 30000 });

    const inputs = await page.$$eval("input", (inputs) =>
      inputs.map((i) => ({
        name: i.getAttribute("name"),
        formControl: i.getAttribute("formcontrolname"),
        placeholder: i.getAttribute("placeholder"),
        type: i.getAttribute("type"),
      }))
    );

    console.log("🧪 Found Inputs:", inputs);

    const inputSelector = 'input[formcontrolname="searchTerm"]';
    const hasSearchField = await page.$(inputSelector);
    if (!hasSearchField) {
      console.log("❌ Input field not found");
      await page.screenshot({ path: "missing-search-field.png" });
      return [];
    }

    await page.type(inputSelector, brandName, { delay: 100 });
    await page.click('button[type="submit"]');

    await page.waitForSelector("table tbody tr", { timeout: 15000 });

    const results = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tbody tr");
      return Array.from(rows).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          name: cells[0]?.innerText.trim() || "",
          rcNumber: cells[1]?.innerText.trim() || "",
          type: cells[2]?.innerText.trim() || "",
          status: cells[3]?.innerText.trim() || "",
        };
      });
    });

    await page.screenshot({ path: "final-results.png" });
    const html = await page.content();
    require("fs").writeFileSync("debug-cac-page.html", html);

    return results;
  } catch (error) {
    console.error("❌ Scraping error:", error);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}


module.exports = { searchCAC };
