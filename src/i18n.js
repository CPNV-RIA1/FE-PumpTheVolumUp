let enTranslations;
let frTranslations;

fetch("/assets/locales/en.json")
  .then((response) => response.json())
  .then((data) => {
    enTranslations = data;
    fetch("/assets/locales/fr.json")
      .then((response) => response.json())
      .then((data) => {
        frTranslations = data;
        initializeI18n();
      });
  });

function initializeI18n() {
  if (!enTranslations || !frTranslations) {
    return;
  }

  const userLang = navigator.language || "en";
  const supportedLang = ["en", "fr"];
  const lng = supportedLang.includes(userLang) ? userLang : "en";

  i18next.init({
    lng: lng,
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
  });
}
