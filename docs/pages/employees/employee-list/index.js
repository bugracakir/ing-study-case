import { html, css } from "lit";
import { MobxLitElement } from "@adobe/lit-mobx";
import { employeeStore } from "../../../stores/employeeStore.js";
import { globalStore } from "../../../stores/globalStore.js";
import { formatDate } from "../../../utils.js";
import "../components/delete-modal.js";

class EmployeeList extends MobxLitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 16px;
      box-sizing: border-box;
    }

    header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    select {
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .table-container {
      background-color: #ffffff;
    }

    .action-selection {
      cursor: pointer;
    }

    .action-logo {
      width: auto; /* Adjust size as needed */
      height: 20px;
    }

    .subheader-container {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
    }

    .employee-search {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .view-logo {
      width: auto; /* Adjust size as needed */
      height: 25px;
    }
    .view-toggle {
      cursor: pointer;
    }
    /* Table Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 0.9rem;
    }

    th,
    td {
      border-bottom: 1px solid #dfdddd;
      border-top: 1px solid #dfdddd;
      padding: 8px;
      text-align: left;
    }

    tr:last-child td {
      border-bottom: none;
    }

    th {
      color: #ff6101;
      padding-top: 16px;
      padding-bottom: 16px;
      border-top: none;
    }

    /* Horizontal scrolling for small screens */
    .table-container {
      overflow-x: auto;
    }

    /* List View Styles */

    .list-item {
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
      background-color: #f9f9f9;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
    }

    .list-item div {
      flex: 1 1 100%;
      font-size: 0.9rem;
    }

    .list-item div strong {
      font-weight: bold;
    }

    /* Actions in List View */
    .list-item .actions {
      flex: 1 1 100%;
      text-align: right;
    }

    .list-item .actions span {
      cursor: pointer;
      margin-left: 10px;
      color: #ff6101;
    }

    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 16px;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .pagination button {
      padding: 8px 12px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .pagination button.active {
      background-color: #ff6101;
      color: white;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      table {
        font-size: 0.8rem;
      }

      th,
      td {
        padding: 6px;
      }

      header {
        flex-direction: column;
        gap: 8px;
      }

      .list-item {
        padding: 12px;
      }

      .list-item div {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 640px) {
      h2 {
        font-size: 1.2rem;
      }

      select {
        font-size: 0.9rem;
        padding: 6px;
      }

      .list-item {
        padding: 10px;
      }

      .list-item div {
        font-size: 0.8rem;
      }

      :host {
        padding: 8px;
      }
    }
  `;

  openDeleteModal(index) {
    this.selectedEmployee = employeeStore.employees[index];
    this.selectedEmployeeIndex = index;
    this.showDeleteModal = true;
  }

  handleDelete() {
    // Delete the employee from the store
    employeeStore.employees.splice(this.selectedEmployeeIndex, 1);

    // Reset modal state
    this.showDeleteModal = false;
    this.selectedEmployee = null;
  }

  render() {
    const { paginatedEmployees, selectedView, currentPage, totalPages } =
      employeeStore;

    const { t, language } = globalStore;

    return html`
      <delete-modal></delete-modal>

      <div class="subheader-container">
        <div class="search-container">
          <input
            class="employee-search"
            type="text"
            placeholder="Search employees..."
            @input="${(e) => employeeStore.searchField(e.target.value)}"
          />
        </div>

        <div class="view-toggle">
          ${selectedView === "table"
            ? html`
                <a
                  class="view-toggle-button"
                  @click="${() => employeeStore.toggleView()}"
                >
                  <img src="../docs/assets/list.png" class="view-logo" />
                </a>
              `
            : html`
                <a
                  class="view-toggle-button"
                  @click="${() => employeeStore.toggleView()}"
                >
                  <img src="../docs/assets/grid.png" class="view-logo" />
                </a>
              `}
        </div>
      </div>
      <div class="table-container lang-${language}">
        ${selectedView === "table"
          ? html`
              <table class="employees-table">
                <thead>
                  <tr>
                    <th>${t("tableHeaders.firstName")}</th>
                    <th>${t("tableHeaders.lastName")}</th>
                    <th>${t("tableHeaders.dateOfEmployment")}</th>
                    <th>${t("tableHeaders.dateOfBirth")}</th>
                    <th>${t("tableHeaders.phone")}</th>
                    <th>${t("tableHeaders.email")}</th>
                    <th>${t("tableHeaders.department")}</th>
                    <th>${t("tableHeaders.position")}</th>
                    <th>${t("tableHeaders.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${paginatedEmployees.map(
                    (employee) => html`
                      <tr
                        data-id="${employee.id}"
                        data-first-name="${employee.firstName}"
                      >
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${formatDate(employee.dateOfEmployment)}</td>
                        <td>${formatDate(employee.dateOfBirth)}</td>
                        <td>${employee.phone}</td>
                        <td>${employee.email}</td>
                        <td>${employee.department}</td>
                        <td>${employee.position}</td>
                        <td class="actions">
                          <a
                            class="action-selection edit-employee"
                            @click=${() =>
                              employeeStore.initiateEditEmployee(employee)}
                          >
                            <img
                              src="../../../../docs/assets/edit.png"
                              class="action-logo"
                            />
                          </a>
                          <a
                            class="action-selection delete-employee"
                            @click=${() =>
                              employeeStore.initiateDeleteEmployee(employee)}
                          >
                            <img
                              src="../../../../docs/assets/trash.png"
                              class="action-logo"
                            />
                          </a>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `
          : html`
              ${paginatedEmployees.map(
                (employee) => html`
                  <div class="list-item employees-list-item">
                    <div>
                      <strong>${t("tableHeaders.firstName")}</strong>
                      ${employee.firstName}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.lastName")}</strong>
                      ${employee.lastName}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.dateOfEmployment")}</strong>
                      ${formatDate(employee.dateOfEmployment)}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.dateOfBirth")}</strong>
                      ${formatDate(employee.dateOfBirth)}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.phone")}</strong>
                      ${employee.phone}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.email")}</strong>
                      ${employee.email}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.department")}</strong>
                      ${employee.department}
                    </div>
                    <div>
                      <strong>${t("tableHeaders.position")}</strong>
                      ${employee.position}
                    </div>
                    <div class="actions">
                      <a
                        class="action-selection"
                        @click=${() =>
                          employeeStore.initiateEditEmployee(employee)}
                      >
                        <img
                          src="../../../../docs/assets/edit.png"
                          class="action-logo"
                        />
                      </a>
                      <a
                        class="action-selection"
                        @click=${() =>
                          employeeStore.initiateDeleteEmployee(employee)}
                      >
                        <img
                          src="../../../../docs/assets/trash.png"
                          class="action-logo"
                        />
                      </a>
                    </div>
                  </div>
                `
              )}
            `}

        <div class="pagination">
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => html`
              <button
                class="${page === currentPage ? "active" : ""}"
                @click="${() => employeeStore.setPage(page)}"
              >
                ${page}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("employee-list", EmployeeList);
