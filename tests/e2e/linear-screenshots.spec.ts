import { test, expect } from '@playwright/test';

test.describe('Linear.app Screenshots', () => {
  test('capture landing page', async ({ page }) => {
    await page.goto('https://linear.app');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'tests/__screenshots__/linear-landing-page.png',
      fullPage: true 
    });
  });

  test('capture login page', async ({ page }) => {
    await page.goto('https://linear.app/login');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'tests/__screenshots__/linear-login-page.png',
      fullPage: true 
    });
  });

  test('capture signup page', async ({ page }) => {
    await page.goto('https://linear.app/signup');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'tests/__screenshots__/linear-signup-page.png',
      fullPage: true 
    });
  });

  test('capture pricing page', async ({ page }) => {
    await page.goto('https://linear.app/pricing');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot
    await page.screenshot({ 
      path: 'tests/__screenshots__/linear-pricing-page.png',
      fullPage: true 
    });
  });
});