import { expect } from "@playwright/test"
import { create } from "node:domain"
import { title } from "node:process"

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year) {

        // É possível encontrar o link dessa página buscando pelo Xpath (a[href$ = "registrar"])
        // Utilizei o metodo getByRole achando o nth e clicando nele.
        // O método .nth(index) é um encadeamento que seleciona o elemento de uma determinada posição dentro do conjunto encontrado. (peguei a posição no --ui do test)
        await this.page.getByRole('link').nth(5).click()
        
        // Para achar um campo pelo Role, segue a regra: tag do elemento + { texto do campo }
        //await this.page.getByRole('textbox', { name: 'Titulo do filme' }).fill(title)
        // O Locator acha pelo ID #
        // await this.page.locator('#title').fill(title) 

        await this.page.getByLabel('Titulo do filme').fill(title)

        // Para achar um campo pelo Role, segue a regra: tag do elemento + { texto do campo }
        await this.page.getByRole('textbox', { name: 'Sinopse' }).fill(overview)


        // Clicar na lista de páginas e selecionar uma.
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: company}).click()

        //await this.page.locator('#select_year > .react-select__control > .react-select__value-container').click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()
    }
}