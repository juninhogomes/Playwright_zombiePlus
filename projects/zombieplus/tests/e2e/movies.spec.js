import { test, expect } from '../support/index.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json')


// Essa página precisa estar na área admin do site.
test('Deve cadastrar um novo filme', async ({page}) => {
    const movie = data.guerra_mundial_z

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    //await moviesPage.create('Nome do Filme', 'Sinopse', 'Warner', '1989')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.getByRole('button', {name: 'Cadastrar'}).click()

    let mensagemSucesso = 'Cadastro realizado com sucesso!'
    await expect(page.toast.containText(mensagemSucesso))

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

})