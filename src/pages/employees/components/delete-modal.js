import { html, css } from "lit";
import { MobxLitElement } from "@adobe/lit-mobx";
import { employeeStore } from "../../../stores/employeeStore.js";
import i18next from '../../../i18n.js';

class DeleteModal extends MobxLitElement {
  static styles = css`
    .modal-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    }

    .modal-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }

    .modal-actions {
      margin-top: 16px;
      display: flex;
      justify-content: space-around;
    }

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .proceed {
      background-color: #f44336;
      color: white;
    }

    .cancel {
      background-color: #ddd;
      color: black;
    }

    button:hover {
      opacity: 0.9;
    }

    @media only screen and (max-width: 640px) {
      .modal-content {
        width: 75%
      }
    }
  `;

  constructor() {
    super();
  }

  closeModal() {
    employeeStore.closeDeleteModal();
  }

  confirmDelete() {
    employeeStore.finalizeDeleteEmployee();
    employeeStore.closeDeleteModal();
  }

  render() {
    return html`
      <div
        class="modal-overlay"
        style="display: ${employeeStore.isDeleteModalOpen ? "block" : "none"};"
      >
        <div class="modal-content">
          <h3>${i18next.t("infoTexts.areYouSure")}</h3>
          <p>
            ${i18next.t("infoTexts.willBeDeleted", {
              name: employeeStore.employee.firstName,
              lastName: employeeStore.employee.lastName,
            })}
          </p>
          <div class="modal-actions">
            <button class="proceed confirm-delete-button" @click="${this.confirmDelete}">
              ${i18next.t("buttons.deleteEmployee")}
            </button>
            <button class="cancel cancel-delete-button" @click="${this.closeModal}">
              ${i18next.t("buttons.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("delete-modal", DeleteModal);
