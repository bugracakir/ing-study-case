import { html, css } from "lit";
import { MobxLitElement } from "@adobe/lit-mobx";
import { employeeStore } from "../../../stores/employeeStore.js";
import { globalStore } from "../../../stores/globalStore.js";
import { Router } from "@vaadin/router";

class AddEmployee extends MobxLitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }

    form {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
    }

    input,
    select {
      padding: 8px;
      font-size: 14px;
      margin-top: 4px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 10px 16px;
      background-color: #ff6101;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .add-employee-header{
      color: #ff6101;
      text-align: center;
      padding-bottom: 10px
    }
  `;


constructor() {
  super();
  employeeStore.resetForm()
}

  handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    employeeStore.submitForm();
  }

  render() {
    const { employee } = employeeStore;

    const { t, language } = globalStore;

    return html`
      <h1 class="add-employee-header">${t("pageHeaders.addEmployee")}</h1>
      <form @submit="${this.handleSubmit}" class="lang-${language} add-employee-form">
        <label>
          ${t("tableHeaders.firstName")}
          <input
            class="add-employee-name"
            type="text"
            .value="${employee.firstName}"
            @input="${(e) =>
              employeeStore.updateField("firstName", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.lastName")}
          <input
            class="add-employee-last-name"
            type="text"
            .value="${employee.lastName}"
            @input="${(e) =>
              employeeStore.updateField("lastName", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.dateOfEmployment")}
          <input
            class="add-employee-emp-date"
            type="date"
            .value="${employee.dateOfEmployment}"
            @input="${(e) =>
              employeeStore.updateField(
                "dateOfEmployment",
                e.target.value
              )}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.dateOfBirth")}
          <input
           class="add-employee-birth-date"
            type="date"
            .value="${employee.dateOfBirth}"
            @input="${(e) =>
              employeeStore.updateField("dateOfBirth", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.phone")}
          <input
            class="add-employee-phone"
            type="tel"
            pattern="[0-9]+"
            minlength="9"
            maxlength="14"
            .value="${employee.phone}"
            @input="${(e) =>
              employeeStore.updateField("phone", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.email")}
          <input
            class="add-employee-email"
            type="email"
            .value="${employee.email}"
            @input="${(e) =>
              employeeStore.updateField("email", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.department")}
          <select
            class="add-employee-department"
            .value="${employee.department}"
            @change="${(e) =>
              employeeStore.updateField("department", e.target.value)}"
            required
          >
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
        </label>
        <label>
          ${t("tableHeaders.position")}
          <select
            class="add-employee-position"
            .value="${employee.position}"
            @change="${(e) =>
              employeeStore.updateField("position", e.target.value)}"
            required
          >
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <button type="submit" class="add-employee-submit-button"> ${t("buttons.addEmployee")}</button>
      </form>
    `;
  }
}

customElements.define("add-employee", AddEmployee);
