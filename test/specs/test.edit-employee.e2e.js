import { expect } from "@wdio/globals";
import { generateRandomId } from "../../docs/utils.js";

describe('Employee Edit Test', () => {

  before(async () => {
    await browser.url('http://localhost:5173/');
  });
  
  it('Should employee edit form be visible', async () => {
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const pagination = await $('app-root').shadow$('employee-list').shadow$('.pagination');
    const lastPaginationButton = await $(pagination).$('button:last-child');

    await employeesTable.waitForExist();
    await lastPaginationButton.click();

    const lastEmployee = await $('app-root').shadow$('employee-list').shadow$('tbody').$('tr:last-child');
    const employeeId = await $(lastEmployee).getAttribute('data-id');
    const employeeFirstName = await $(lastEmployee).getAttribute('data-first-name');

    browser.employeeId = employeeId;
    browser.employeeFirstName = employeeFirstName;

    const editEmployeeButton = await $(lastEmployee).$('.edit-employee');

    await editEmployeeButton.click();

    const editEmployeeForm = await $('app-root').shadow$('edit-employee');
    const employeeFirstNameInput = await $(editEmployeeForm).$('.employee-first-name');

    await editEmployeeForm.waitForExist();
    await expect(editEmployeeForm).toBeDisplayed();
    await expect(employeeFirstNameInput).toHaveValue(employeeFirstName);
  });


  it('Should employee name changed to random value', async () => {
    const employeeFirstNameInput = await $('app-root').shadow$('edit-employee').$('.employee-first-name');

    browser.newFirstName = "Employee " + generateRandomId();
    await $(employeeFirstNameInput).setValue(browser.newFirstName);

    const saveChangesButton = await $('app-root').shadow$('edit-employee').$('.btn-save-changes');

    await $(saveChangesButton).click();

    const confirmEditButton = await $('app-root').shadow$('edit-employee').shadow$('edit-modal').$('.confirm-edit-button');
    await confirmEditButton.click();

    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');

    await employeesTable.waitForExist();
    await expect(employeesTable).toBeDisplayed();
  });

  it('Should employee name be correct with the changed name', async () => {
    const employeesTable = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    const pagination = await $('app-root').shadow$('employee-list').shadow$('.pagination');
    const lastPaginationButton = await $(pagination).$('button:last-child');

    await employeesTable.waitForExist();
    await lastPaginationButton.click();
    
    const lastEmployee = await $('app-root').shadow$('employee-list').shadow$('tbody').$('tr:last-child');

    await expect(lastEmployee).toHaveAttribute('data-id', browser.employeeId);
    await expect(lastEmployee).toHaveAttribute('data-first-name', browser.newFirstName);
  });
});
