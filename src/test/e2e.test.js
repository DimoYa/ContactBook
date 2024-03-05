const { test, expect } = require('@playwright/test');
const baseUrl = 'https://contactbook-ts7f.onrender.com';

test('Add contact with correct data', async ({ page }) => {

    await page.goto(`${baseUrl}/contacts/create`);

    await page.waitForSelector('//table[@class="contact-entry form"]');

    await page.fill('//*[@id="firstName"]', 'John');
    await page.fill('//*[@id="lastName"]', 'Doe');
    await page.fill('//*[@id="email"]', 'john.doe@example.com');
    await page.fill('//*[@id="phone"]', '1234567890');
    await page.fill('//*[@id="comments"]', 'This is a test comment.');

    await page.click('//button[@type="submit"]');

    await page.waitForURL(`${baseUrl}/contacts`);

    expect(page.url()).toBe(`${baseUrl}/contacts`);
});