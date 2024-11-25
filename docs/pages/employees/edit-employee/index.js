import { html, css } from "lit";
import { MobxLitElement } from "@adobe/lit-mobx";
import { employeeStore } from "../../../stores/employeeStore.js";
import { globalStore } from "../../../stores/globalStore.js";
import { Router } from "@vaadin/router";
import '../components/edit-modal.js';

class EditEmployee extends MobxLitElement {
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

    .edit-employee-header{
      color: #ff6101;
      text-align: center;
      padding-bottom: 10px
    }
  `;

  constructor() {
    super();
    const { employee } = employeeStore;

    if (employee.firstName === "") {
      Router.go("/");
    }
  }

  handleUpdateField(field, value) {
    this.employee[field] = value;
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    employeeStore.isEditModalOpen = true;
  }

  render() {
    const { employee } = employeeStore;

    const { t, language } = globalStore;

    return html`
      <edit-modal></edit-modal>
      <h1 class="edit-employee-header">${t("pageHeaders.editEmployee")}</h1>
      <form @submit="${this.handleSubmit}" class="lang-${language}">
        <label>
          ${t("tableHeaders.firstName")}
          <input
            type="text"
            class="employee-first-name"
            .value="${employee.firstName}"
            @input="${(e) =>
              employeeStore.updateField("firstName", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.lastName")}
          <input
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
            type="tel"
            .value="${employee.phone}"
            @input="${(e) =>
              employeeStore.updateField("phone", e.target.value)}"
            required
          />
        </label>
        <label>
          ${t("tableHeaders.email")}
          <input
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
        <button type="submit" class="btn-save-changes">${t("buttons.saveChanges")}</button>
      </form>
    `;
  }
}

customElements.define("edit-employee", EditEmployee);
