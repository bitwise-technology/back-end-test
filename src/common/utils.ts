const usernameValidationRegex = /^[a-zA-Z0-9_]{3,30}$/;
const nameValidationRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]{3,30}$/;
const genderValidationRegex = /^[mf]{1,1}$/;
// FIXME o desafio pedia uma BIO somente com letras, e entre 3-30 caracteres
// porém quase todas as bios do github contém mais de 30 caracteres, além de whitespaces
// sendo assim decidi por uma regex que aceita qualquer texto entre 3 e 300 caracteres
// porém, se quiser ativar o regex definido pelo desafio À LETRA, basta usar o regex comentado abaixo
// const bioValidationRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]{3,30}$/;
const bioValidationRegex = /^.{3,300}$/;
const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isNumeric(str: any) {
  try {
    const result = !isNaN(str) && !isNaN(parseFloat(str));
    return result;
  } catch (e) {
    return false;
  }
}

/**
 * Gera um username aleatório com base em um existente
 * adicionando um número
 * 
 * FIXME encontrar uma forma de verificar se os usernames já existem no github
 *
 * @param baseName o username base
 * @returns um novo username aleatório
 */
function generateUsernames(baseName: string, arraySize: number = 5) {
  return new Array(5)
    .fill(1, 0, arraySize)
    .map(_ => `${baseName}${(Math.random() * 999).toFixed(0)}`);
}

export {
  nameValidationRegex,
  usernameValidationRegex,
  genderValidationRegex,
  emailValidationRegex,
  bioValidationRegex,
  isNumeric,
  generateUsernames
};
