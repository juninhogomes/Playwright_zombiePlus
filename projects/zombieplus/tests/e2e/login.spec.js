import { test } from '../support'; // Já lê o index.js que tem todos os POM na pasta
//import { expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.login.visit()
})

// Caminho Feliz
test('Deve logar como administrador', async ({ page }) => {

    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
    })

// Caminhos tristes
test('Não deve logar com senha incorreta', async ({ page }) => {

    await page.login.submit('admin@zombieplus.com', '12345')

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
})

test('E-mail obrigatório não preenchido', async ({page}) => {


    await page.login.submit('', 'pwd123')
    await page.alert.HaveText('Campo obrigatório')

})

test('Senha obrigatório não preenchida', async ({ page }) => {

    await page.login.submit('admin@zombieplus.com', '')
    await page.alert.HaveText('Campo obrigatório')
})


test('E-mail e senha não preenchidos', async ({ page }) => {
    await page.login.submit('','')
    await page.alert.HaveText(['Campo obrigatório','Campo obrigatório'])
})

test('E-mail incorreto', async ({ page }) => {
    await page.login.submit('admin.zombieplus.com', 'pwd123')
    await page.alert.HaveText('Email incorreto')
})