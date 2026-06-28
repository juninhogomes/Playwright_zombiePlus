import { expect } from "@playwright/test"
import { create } from "node:domain"
import { title } from "node:process"

export class Movies {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        // É possível encontrar o link dessa página buscando pelo Xpath (a[href$ = "registrar"])
        // O manual do PW não recomenda esse caminho, mas nesse caso era a melhor opção
        await this.page.locator('a[href$="register"]').click();
    }

    async create(title, overview, company, release_year) {

        await this.goForm()

        // Para achar um campo pelo Role, segue a regra: tag do elemento + { texto do campo }
        //await this.page.getByRole('textbox', { name: 'Titulo do filme' }).fill(title)
        // O Locator acha pelo ID #
        // await this.page.locator('#title').fill(title) 

        await this.page.getByLabel('Titulo do filme').fill(title)

        // Para achar um campo pelo Role, segue a regra: tag do elemento + { texto do campo }
        await this.page.getByRole('textbox', { name: 'Sinopse' }).fill(overview)


        // Clicar na lista de páginas e selecionar uma.
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()

        //await this.page.locator('#select_year > .react-select__control > .react-select__value-container').click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
    }
}