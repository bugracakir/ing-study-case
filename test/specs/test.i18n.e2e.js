import { expect } from "@wdio/globals";

describe('Change Language Test', () => {
  before(async () => {
    await browser.url('http://localhost:5173/');
  });

  it('Check if the default language flag is set to UK/US flag and language is English', async () => {
    const langueFlagImage = await $('app-root').shadow$('.language-logo');
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const firstHeaderOfTable = $(employeesTable).$('thead tr th:first-child');

    await employeesTable.waitForExist();
    await expect(langueFlagImage).toHaveAttribute('src', '../docs/assets/turkey.png');
    await expect(firstHeaderOfTable).toHaveText("First Name");
  });

  it('Click the language change button then find check if the language changed to Turkish', async () => {
    const langueFlagImage = await $('app-root').shadow$('.language-logo');
    const languageSelectionLink = await $('app-root').shadow$('.language-selection');
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const firstHeaderOfTable = $(employeesTable).$('thead tr th:first-child');

    await languageSelectionLink.click();
    await expect(langueFlagImage).toHaveAttribute('src', '../docs/assets/us_uk.svg');
    await expect(firstHeaderOfTable).toHaveText("Ad");
  });

  it('Click the language change button then find check if the language changed to English', async () => {
    const langueFlagImage = await $('app-root').shadow$('.language-logo');
    const languageSelectionLink = await $('app-root').shadow$('.language-selection');
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const firstHeaderOfTable = $(employeesTable).$('thead tr th:first-child');

    await languageSelectionLink.click();
    await expect(langueFlagImage).toHaveAttribute('src', '../docs/assets/turkey.png');
    await expect(firstHeaderOfTable).toHaveText("First Name");
  });

});
