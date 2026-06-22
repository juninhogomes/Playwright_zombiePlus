import { test as base, expect} from '@playwright/test';
import { Login } from '../actions/Login.js';
import { Leads } from '../actions/Leads.js';
import { Toast, Alert } from '../actions/Components.js';
import { Movies } from '../actions/Movies.js';


const test = base.extend({
    page: async ({page}, use) => {
        page.login = new Login(page),
        page.leads = new Leads(page),
        page.toast = new Toast(page),
        page.alert = new Alert(page),
        page.movies = new Movies(page)

        await use(page)}
})

export {test, expect}
