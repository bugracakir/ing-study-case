import { html, css } from "lit";
import { setupRouter } from "./router.js";
import { globalStore } from "./stores/globalStore.js";
import { MobxLitElement } from "@adobe/lit-mobx";

class AppRoot extends MobxLitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }

    header {
      background-color: #f4f4f4;
      padding: 16px;
      border-bottom: 1px solid #ddd;
    }

    .main-container {
      background-color: #f8f8f8;
      height: 100vh;
    }

    nav {
      display: flex;
      justify-content: space-between;
    }

    nav a {
      text-decoration: none;
      color: #ff6101;
      font-weight: bold;
    }

    nav a.active {
      font-weight: bold;
      color: orange;
    }

    #router-outlet {
      padding: 16px;
    }

    .logo {
      width: 100px; /* Adjust size as needed */
      height: auto;
      object-fit: contain;
    }

    .menu-items {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .language-logo {
      width: auto; /* Adjust size as needed */
      height: 25px;
    }

    .language-selection {
      cursor: pointer;
    }

    @media (max-width: 640px) {
      #router-outlet {
        padding: 8px;
      }
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector("#router-outlet");
    setupRouter(outlet);
  }

  render() {
    const { language } = globalStore;
    return html`
      <header>
        <nav>
          <img src="../docs/assets/ing.png" class="logo" />
          <div class="menu-items">
            <a href="/" class="nav-link">Employees</a>
            <a href="/add-employee" class="nav-add-employee">Add Employee</a>

            ${language === "tr"
              ? html`
                  <a
                    class="language-selection"
                    @click=${() => globalStore.setLanguage("en")}
                  >
                    <img src="../docs/assets/us_uk.svg" class="language-logo" />
                  </a>
                `
              : html`
                  <a
                    class="language-selection"
                    @click=${() => globalStore.setLanguage("tr")}
                  >
                    <img
                      src="../docs/assets/turkey.png"
                      class="language-logo"
                    />
                  </a>
                `}
          </div>
        </nav>
      </header>
      <div class="main-container" id="router-outlet"></div>
    `;
  }
}

customElements.define("app-root", AppRoot);
