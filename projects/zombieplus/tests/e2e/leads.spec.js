import { test, expect } from '@playwright/test';
import { ClassLandingPage } from '../pages/ClassLandingPage';
import { Toast, Alert } from '../pages/Components';
import { faker } from '@faker-js/faker';

let landingPage;
let toast
let alert


test.beforeEach(async ({ page }) => {
  landingPage = new ClassLandingPage(page);
  toast = new Toast(page)
  alert = new Alert(page)
  await landingPage.visit(); // Acessar a página
  await landingPage.openLeadModal(); // Abrir o modal de entrar na fila de espera
})


// Caminho Feliz
test('Deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()


  // Preencher o formulário - submitLeadForm
  await landingPage.submitLeadForm(leadName, leadEmail)

  const mensagem = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  // ToastHaveText é usado para verificar se o toast de sucesso aparece
  await toast.containText(mensagem);

});


// Caminhos tristes

test('Não cadastrar lead repetido', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  //Cadastro certo, mensagem certa
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()

  //Cadastra duplicado, mensagem de erro
  await page.reload() // Atualiza a página após o cadastro. Também poderia utilizar o page.goto() para recarregar a página
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  let mensagem = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.containText(mensagem)
})

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {

  // Preencher nome certo e e-mail incorreto
  await landingPage.submitLeadForm('Nathanael', 'nathanael.email.com')

  //Receber erro de preenchimento
  await alert.HaveText('Email incorreto')

});

// Caminhos tristes - sem preenchimento
test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  // Não preencher nome
  await landingPage.submitLeadForm('', 'nathanael@email.com')

  // Erro de campo obrigatório
  await alert.HaveText('Campo obrigatório')

});

test('Não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {

  // Não preencher nome
  await landingPage.submitLeadForm('Nathanael', '')

  // Erro de campo obrigatório
  await alert.HaveText('Campo obrigatório')

});

test('Não deve cadastrar sem os campos preenchidos', async ({ page }) => {

  // Não preencher nome
  await landingPage.submitLeadForm('', '')

  // Erro de campo obrigatório
  await alert.HaveText(['Campo obrigatório', 'Campo obrigatório'])

});
