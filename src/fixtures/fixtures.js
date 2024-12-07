require("dotenv").config();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const username = ADMIN_USERNAME;
export const password = ADMIN_PASSWORD;
export const userFullName = "Konečná Hana";
export const invalidPassword = "123456789";

export const ApplicationTexts = {
  loginPage: {
    title: "Přihlášení - Czechitas",
    loginButtonLabel: "Přihlásit",
  },
  registrationPage: {
    title: "Registrace - Czechitas",
    registrationButtonLabel: "Zaregistrovat",
  },
};