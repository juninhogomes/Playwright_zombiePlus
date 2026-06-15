import { test, expect } from '@playwright/test';
import { ClassLoginPage } from '../pages/ClassLoginPage';
import { Toast, Alert } from '../pages/Components.js';
import { MoviesPage } from '../pages/MoviesPage.js';

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
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    await moviesPage.create('Nome do Filme', 'Sinopse', 'Warner', '1989')

})

