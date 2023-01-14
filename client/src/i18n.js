import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// const option = {
//   order: ["navigator", "htmlTag", "path", "subdomail"],
//   checkWhitelist: true,
// };

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["translation", "home", "profile", "shop", "product"],
    supportedLngs: ["en", "ru", "uz"],
    // detection: option,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
