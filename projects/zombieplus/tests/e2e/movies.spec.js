import { test, expect } from '../support';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json')


// Essa página precisa estar na área admin do site.
test('Deve cadastrar um novo filme', async ({page}) => {
    const movie = data.guerra_mundial_z
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)


    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')


    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.getByRole('button', {name: 'Cadastrar'}).click()
    let mensagemSucesso = 'Cadastro realizado com sucesso!'
    await expect(page.toast.containText(mensagemSucesso))

})


test('Campos obrigatórios não preenchidos', async({page}) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.getByRole('button', {name: 'Cadastrar'}).click()
    const alert = page.locator('span[class$=alert]')
    await expect(alert)

})