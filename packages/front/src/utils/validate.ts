import { filterNumber } from "./general";


export function validateCpf(cpf: string): boolean {

  if (!cpf) {
    return false;
  }
  const currentCpf = filterNumber(cpf);

  if (currentCpf === null) {
    return false;
  }
  if (currentCpf.length !== 11) {
    return false;
  }
  if (
    currentCpf === '00000000000' ||
    currentCpf === '11111111111' ||
    currentCpf === '22222222222' ||
    currentCpf === '33333333333' ||
    currentCpf === '44444444444' ||
    currentCpf === '55555555555' ||
    currentCpf === '66666666666' ||
    currentCpf === '77777777777' ||
    currentCpf === '88888888888' ||
    currentCpf === '99999999999'
  ) {
    return false;
  }
  let numero = 0;
  let caracter = '';
  const numeros = '0123456789';
  let j = 10;
  let somatorio = 0;
  let resto = 0;
  let digito1 = 0;
  let digito2 = 0;
  let cpfAux = '';
  cpfAux = currentCpf.substring(0, 9);
  for (let i = 0; i < 9; i += 1) {
    caracter = cpfAux.charAt(i);
    if (numeros.search(caracter) === -1) {
      return false;
    }
    numero = Number(caracter);
    somatorio += numero * j;
    j -= 1;
  }
  resto = somatorio % 11;
  digito1 = 11 - resto;
  if (digito1 > 9) {
    digito1 = 0;
  }
  j = 11;
  somatorio = 0;
  cpfAux += digito1;
  for (let i = 0; i < 10; i += 1) {
    caracter = cpfAux.charAt(i);
    numero = Number(caracter);
    somatorio += numero * j;
    j -= 1;
  }
  resto = somatorio % 11;
  digito2 = 11 - resto;
  if (digito2 > 9) {
    digito2 = 0;
  }
  cpfAux += digito2;
  if (currentCpf !== cpfAux) {
    return false;
  }

  return true;
}

export function validateCnpj(cnpj: string): boolean {

  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '') {
      return false;
  }
  if (cnpj.length !== 14) {
      return false;
  }
  // Elimina CNPJs invalidos conhecidos
  if (cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999")
      return false;
  // Valida DVs
  let tamanho = cnpj.length - 2,
      numeros = cnpj.substring(0, tamanho),
      digitos = cnpj.substring(tamanho),
      soma = 0,
      pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
          pos = 9;
      }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== Number(digitos.charAt(0))) {
      return false;
  }
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
          pos = 9;
      }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== Number(digitos.charAt(1))) {
      return false;
  }
  return true;
}
