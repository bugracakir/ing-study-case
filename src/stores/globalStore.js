import { makeAutoObservable } from 'mobx';
import i18next from '../i18n.js';

class GlobalStore {
    language = i18next.language;

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage(lng) {
    this.language = lng
    i18next.changeLanguage(lng); // Change the current language
  }

  t(key, options) {
    return i18next.t(key, options); // Proxy for i18next translations
  }
  
}

export const globalStore = new GlobalStore();
