import { test as base, expect as playwrightExpect } from '@playwright/test';
import { ClassLoginPage } from '../pages/ClassLoginPage';
import { ClassLandingPage } from '../pages/ClassLandingPage';
import { Toast, Alert } from '../pages/Components.js';
import { MoviesPage } from '../pages/MoviesPage.js';


const test = base.extend({
    page: async ({page}, use) => {
        page.login = new ClassLoginPage(page),
        page.landing = new ClassLandingPage(page),
        page.toast = new Toast(page),
        page.alert = new Alert(page),
        page.movies = new MoviesPage(page)

        await use(page)}
})

export {test}
export const expect = playwrightExpect;