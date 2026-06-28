import { expect } from "@playwright/test"


export class Login {
    constructor(page) {
        this.page = page
    }


    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const LoginForm = this.page.locator('.login-form')
        await expect(LoginForm).toBeVisible()
    }

    async do(email, password, username) {
        this.visit()
        this.submit(email, password)
        this.isLoggedIn(username)
    }

    async submit(email, password) {
        await this.page.getByRole('textbox', { name: 'E-mail' }).fill(email)
        await this.page.getByRole('textbox', { name: 'Senha' }).fill(password)
        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

    
    async isLoggedIn(username) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
        //await this.page.locator('.logged-user')
        //await expect(this.page).toHaveURL(/.*admin/)
    }


}