const { test, expect } = require('@playwright/test');

const baseUrl = 'https://staging-website.privilee.ae'; // Main URL
const mapUrl = 'https://staging-website.privilee.ae/map'; // Map URL

// Helper function to fill payment details
async function fillPaymentDetails(page, email, partnerEmail) {
    await page.fill('input[type="email"]', email, { timeout: 5000 });
    await page.fill('label:has-text("Partner email address") + input', partnerEmail, { timeout: 5000 });

    const cardIframe = await page.locator('iframe[title="Iframe for card number"]');
    await cardIframe.contentFrame().locator('input[aria-label="Card number"][type="text"][inputmode="numeric"]').fill('5555555555554444', { timeout: 5000 });

    const expiryIframe = await page.locator('iframe[title="Iframe for expiry date"]');
    await expiryIframe.contentFrame().locator('input[aria-label="Expiry date"]').fill('12/29', { timeout: 5000 });

    const cvvIframe = await page.locator('iframe[title="Iframe for security code"]');
    await cvvIframe.contentFrame().locator('input[aria-label="Security code"]').fill('123', { timeout: 5000 });
}

// Helper function for navigation and selection (takes a URL)
async function navigateAndSelectJoinNow(page, url) {
    await page.goto(url);  // Navigate to the provided URL
    await page.getByRole('link', { name: 'Join now' }).first().click({ timeout: 5000 });
    await page.click("span:has-text('Adults')", { timeout: 5000 });
}

// Test suite description
test.describe('Privilee Testcases', () => {

    test('should load homepage successfully @privilee', async ({ page }) => {
        await page.goto(mapUrl, { waitUntil: 'domcontentloaded' });
        const title = await page.title();
        expect(title).toBe('Privilee - Membership Benefits & Venues');
        console.log('Test 1: Homepage loaded successfully.');
    });

    test('should perform a search and display results @privilee', async ({ page }) => {
        await page.goto(mapUrl);
        await page.fill('input[placeholder=\'Search for venue\']', 'Anantara The Palm Dubai Resort');
        await page.click('div span:has-text("Anantara The Palm Dubai Resort")');
        await page.fill('input[name="first_name"]', 'firdose feriyal');
        await page.fill('input[name="email"]', 'ff@gmail.com');
        await page.fill('input[name="mobile"]', '12585858');
        await page.click('button[type="submit"]');
        console.log('Test 2: Search functionality verified.');
    });

    test('Verify "Join Now!" Button @privilee', async ({ page }) => {
        await page.goto(baseUrl);
        await page.getByRole('link', { name: 'Join now' }).first().click({ timeout: 5000 });
        await page.click("span:has-text('Adults')", { timeout: 5000 });
        console.log('Test 3: Join now button is clickable');
    });

    test('Try completing the payment by selecting the option of "Pay Now" @privilee', async ({ page }) => {
        await navigateAndSelectJoinNow(page, baseUrl);
        await page.click("span:has-text('Pay now')", { timeout: 5000 });
        await fillPaymentDetails(page, 'ff@gmail.com', 'pp@gmail.com');
        await page.click("button:has-text('Pay AED')", { timeout: 5000 });
        console.log('Test 4: Pay Now scenario completed');
    });

    test('Try completing the payment by selecting the option of "Pay Later" @privilee', async ({ page }) => {
        await navigateAndSelectJoinNow(page, baseUrl);
        await page.click("span:has-text('Pay later')", { timeout: 5000 });
        await fillPaymentDetails(page, 'ff@gmail.com', 'pp@gmail.com');
        await page.click("button:has-text('Pay AED')", { timeout: 5000 });
        console.log('Test 5: Pay Later scenario completed');
    });

    test('Try completing the payment by selecting the option of "Pay Monthly" @privilee', async ({ page }) => {
        await navigateAndSelectJoinNow(page, baseUrl);
        await page.click("span:has-text('Pay monthly')", { timeout: 5000 });
        await fillPaymentDetails(page, 'ff@gmail.com', 'pp@gmail.com');
        await page.click("button:has-text('Pay AED')", { timeout: 5000 });
        console.log('Test 6: Pay Monthly scenario completed');
    });
});
