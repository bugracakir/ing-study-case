import { expect } from "@wdio/globals";

describe('Employee Search Test', () => {

  before(async () => {
    await browser.url('http://localhost:5173/');
  });
  
  it('Should search employee', async () => {
    const employeeSearch = await $('app-root').shadow$('employee-list').shadow$('.employee-search');

    await employeeSearch.addValue("Default2")

    const firstEmployee = await $('app-root').shadow$('employee-list').shadow$('tbody').$('tr:first-child');
    
    await expect(firstEmployee).toHaveAttribute('data-first-name', "Default2");

  });
});
