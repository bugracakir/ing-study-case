import { LitElement, html, css } from 'lit';

class NotFoundView extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 16px;
    }
  `;

  render() {
    return html`
      <h1>404 - Page Not Found</h1>
      <a href="/">Go Back to Home</a>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
