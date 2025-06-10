import { test, expect } from '@playwright/test';

test('Upload de documento no ProcessoDetalhes', async ({ page }) => {
  // Navegar para a página do processo
  await page.goto('http://localhost:3000/processos/1');

  // Verificar se o botão de upload está visível
  const uploadButton = page.locator('text=Anexar Documento');
  await expect(uploadButton).toBeVisible();

  // Fazer upload de um arquivo
  const filePath = 'public/placeholder.svg';
  await page.setInputFiles('input[type="file"]', filePath);

  // Verificar se o arquivo foi adicionado à lista
  const uploadedFile = page.locator('text=placeholder.svg');
  await expect(uploadedFile).toBeVisible();
});
