import { test, expect } from '../support'; // Já lê o index.js que tem todos os POM na pasta
import { faker } from '@faker-js/faker';


test.beforeEach(async ({ page }) => {
  await page.landing.visit(); // Acessar a página
  await page.landing.openLeadModal(); // Abrir o modal de entrar na fila de espera
})


// Caminho Feliz
test('Deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()


  // Preencher o formulário - submitLeadForm
  await page.landing.submitLeadForm(leadName, leadEmail)

  const mensagem = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  // ToastHaveText é usado para verificar se o toast de sucesso aparece
  await page.toast.containText(mensagem);

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
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  let mensagem = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(mensagem)
})

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {

  // Preencher nome certo e e-mail incorreto
  await page.landing.submitLeadForm('Nathanael', 'nathanael.email.com')

  //Receber erro de preenchimento
  await page.alert.HaveText('Email incorreto')

});

// Caminhos tristes - sem preenchimento
test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  // Não preencher nome
  await page.landing.submitLeadForm('', 'nathanael@email.com')

  // Erro de campo obrigatório
  await page.alert.HaveText('Campo obrigatório')

});

test('Não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {

  // Não preencher nome
  await page.landing.submitLeadForm('Nathanael', '')

  // Erro de campo obrigatório
  await page.alert.HaveText('Campo obrigatório')

});

test('Não deve cadastrar sem os campos preenchidos', async ({ page }) => {

  // Não preencher nome
  await page.landing.submitLeadForm('', '')

  // Erro de campo obrigatório
  await page.alert.HaveText(['Campo obrigatório', 'Campo obrigatório'])

});
