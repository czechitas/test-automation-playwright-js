export function jdiNaRegistraci(page) {
    return page.goto('/registrace')
}

export function jmenoAPrijmeni(page) {
    return page.getByLabel("Jméno a příjmení")
}

export function emailPole(page) {
    return page.getByLabel("Email")
}

export function hesloPole(page) {
    return page.getByLabel("Heslo")
}

export function kontrolaHeslaPole(page) {
    return page.getByLabel("Kontrola hesla")
}

export function tlacitkoZaregistrovat(page) {
    return page.getByRole("button", { name: "Zaregistrovat" })
}

export function prihlasen(page) {
    return page.getByRole("button", { name: "Iv Jindrová" })
}