import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    lng: "uz",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["translation", "home", "profile", "shop", "product", "product-d", "brand-d", "banner-d", "category-d"],
    supportedLngs: ["en", "ru", "uz"],
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
