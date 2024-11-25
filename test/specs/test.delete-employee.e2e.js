import { expect } from "@wdio/globals";

describe('Employee Delete Test', () => {

  before(async () => {
    await browser.url('http://localhost:5173/');
  });
  
  it('Should employee delete should remove item', async () => {
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const pagination = await $('app-root').shadow$('employee-list').shadow$('.pagination');
    const lastPaginationButton = await $(pagination).$('button:last-child');

    await employeesTable.waitForExist();
    await lastPaginationButton.click();

    const lastEmployee = await $('app-root').shadow$('employee-list').shadow$('tbody').$('tr:last-child');
    const employeeFirstName = await $(lastEmployee).getAttribute('data-first-name');

    browser.employeeFirstName = employeeFirstName;

    const deleteEmployeeButton = await $(lastEmployee).$('.delete-employee');
    await deleteEmployeeButton.click();

    const cancelDeleteButton = await $('app-root').shadow$('employee-list').shadow$('delete-modal').$('.cancel-delete-button');
    await cancelDeleteButton.click();

    await employeesTable.waitForExist();
    await expect(employeesTable).toBeDisplayed();

    await deleteEmployeeButton.click();

    const confirmDeleteButton = await $('app-root').shadow$('employee-list').shadow$('delete-modal').$('.confirm-delete-button');
    await confirmDeleteButton.click();

    await expect(lastEmployee).not.toHaveAttribute('data-first-name', browser.employeeFirstName);
  });
});
