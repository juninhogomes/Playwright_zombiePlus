import { test, expect } from '@playwright/test';
import { ClassLoginPage } from '../pages/ClassLoginPage';
import { Toast, Alert } from '../pages/Components.js';
import { MoviesPage } from '../pages/MoviesPage.js';
import { executeSQL } from '../support/database.js';

const data = require('../support/fixtures/movies.json')

let loginPage
let toast
let alert
let moviesPage

test.beforeEach(async ({page}) => {
    loginPage = new ClassLoginPage(page)
    toast = new Toast(page)
    alert = new Alert(page)
    moviesPage = new MoviesPage(page)
    await loginPage.visit()
})



// Essa página precisa estar na área admin do site.
test('Deve cadastrar um novo filme', async ({page}) => {
    const movie = data.guerra_mundial_z

    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    //await moviesPage.create('Nome do Filme', 'Sinopse', 'Warner', '1989')

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.getByRole('button', {name: 'Cadastrar'}).click()

    let mensagemSucesso = 'Cadastro realizado com sucesso!'
    await expect(toast.containText(mensagemSucesso))

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    
})

