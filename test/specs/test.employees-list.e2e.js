import { expect } from "@wdio/globals";

describe('EmployeeList Component', () => {
  before(async () => {
    await browser.url('http://localhost:5173/');
  });
  
  it('should render the table view by default', async () => {
    const table = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    expect(await table.isDisplayed())
  });

  it('should toggle to list view', async () => {
    const toggleButton = await $('app-root').shadow$('employee-list').shadow$('.view-toggle-button');
    const listView = await $('app-root').shadow$('employee-list').shadow$('.list-item');
    const table = await $('app-root').shadow$('employee-list').shadow$('.employees-table');

    await toggleButton.click();
    await listView.waitForExist();

    await expect(listView).toBeDisplayed();
    await expect(table).not.toExist();
  });


  it('should toggle to back to table view', async () => {
    const toggleButton = await $('app-root').shadow$('employee-list').shadow$('.view-toggle-button');
    const listView = await $('app-root').shadow$('employee-list').shadow$('.list-item');
    const table = await $('app-root').shadow$('employee-list').shadow$('.employees-table');

    await toggleButton.click();
    await table.waitForExist();

    await expect(table).toBeDisplayed();
    await expect(listView).not.toExist();
  });
});
