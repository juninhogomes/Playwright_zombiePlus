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

// Caminho Feliz
test('Deve logar como administrador', async ({ page }) => {

    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

// Caminhos tristes
test('Não deve logar com senha incorreta', async ({ page }) => {

    await loginPage.submit('admin@zombieplus.com', '12345')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await toast.HaveText(message)
})

test('E-mail obrigatório não preenchido', async ({page}) => {


    await loginPage.submit('', 'pwd123')
    await alert.HaveText('Campo obrigatório')

})

test('Senha obrigatório não preenchida', async ({ page }) => {

    await loginPage.submit('admin@zombieplus.com', '')
    await alert.HaveText('Campo obrigatório')
})


test('E-mail e senha não preenchidos', async ({ page }) => {
    await loginPage.submit('','')
    await alert.HaveText(['Campo obrigatório','Campo obrigatório'])
})

test('E-mail incorreto', async ({ page }) => {
    await loginPage.submit('admin.zombieplus.com', 'pwd123')
    await alert.HaveText('Email incorreto')
})