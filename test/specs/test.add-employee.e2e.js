import { expect } from "@wdio/globals";

describe('Employee Add Test', () => {
  before(async () => {
    await browser.url('http://localhost:5173/');
  });

  it('navigate to add employee', async () => {
    const navigateButtonAddEployee = await $('app-root').shadow$('.nav-add-employee');
    await navigateButtonAddEployee.click();

    const addEmployeeForm = await $('app-root').shadow$('add-employee').shadow$('.add-employee-form');
    await addEmployeeForm.waitForExist();

    await expect(addEmployeeForm).toBeDisplayed();
  });

  it('should add employee', async () => {
    const addEmployeeForm = await $('app-root').shadow$('add-employee').shadow$('.add-employee-form');
    await addEmployeeForm.waitForExist();

    const addEmployeeName = await $('app-root').shadow$('add-employee').shadow$('.add-employee-name');
    const addEmployeeLastName = await $('app-root').shadow$('add-employee').shadow$('.add-employee-last-name');
    const addEmployeeEmpDate = await $('app-root').shadow$('add-employee').shadow$('.add-employee-emp-date');
    const addEmployeeBirthDate = await $('app-root').shadow$('add-employee').shadow$('.add-employee-birth-date');
    const addEmployeePhone = await $('app-root').shadow$('add-employee').shadow$('.add-employee-phone');
    const addEmployeeEmail = await $('app-root').shadow$('add-employee').shadow$('.add-employee-email');
    const addEmployeeDepartment = await $('app-root').shadow$('add-employee').shadow$('.add-employee-department');
    const addEmployeePosition = await $('app-root').shadow$('add-employee').shadow$('.add-employee-position');

    const addEmployeeSubmitButton = await $('app-root').shadow$('add-employee').shadow$('.add-employee-submit-button');

    await addEmployeeName.addValue("Test")
    await addEmployeeLastName.addValue("User")
    await addEmployeeEmpDate.addValue("2000-10-10")
    await addEmployeeBirthDate.addValue("2000-11-11")
    await addEmployeePhone.addValue("9053251945621")
    await addEmployeeEmail.addValue("testuser@email.com")
    await addEmployeeDepartment.selectByIndex("1")
    await addEmployeePosition.selectByIndex("1")

    await addEmployeeSubmitButton.click();

    const table = await $('app-root').shadow$('employee-list').shadow$('.employees-table');
    await expect(table).toBeDisplayed();

    const pagination = await $('app-root').shadow$('employee-list').shadow$('.pagination');
    const lastPaginationButton = await $(pagination).$('button:last-child');
    await lastPaginationButton.click();

    const lastEmployee = await $('app-root').shadow$('employee-list').shadow$('tbody').$('tr:last-child');
    
    await expect(lastEmployee).toHaveAttribute('data-first-name', "Test");
  });
});
