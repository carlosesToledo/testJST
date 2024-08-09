async function requestAPI(url) {

  const response = await fetch(url);

  if (!response.ok) {
    return response
  }
  expect(response.status).toBe(200)

  return response;
}

//Valida qual o tipo de conteúdo pelo header
function contentType(content) {
  const contentType = content.headers.get('content-type');
  let data;
  if (contentType.includes('application/json')) {
    data = 'JSON'  // Retorno é JSON
  } else if (contentType.includes('text/')) {
    data = 'TEXT'  // Retorno é texto
  } else {
    data = 'BLOB' // Pode ser outro tipo, como blob (imagem, binário)
  }
  return data;
}

// Valida se é possível tranformar em um objeto corretamente. 
function checkFormat(value, typeFormat) {
  let data;

  if (typeFormat === 'JSON') { //Só tem a validação de JSON
    try {
      data = JSON.parse(value);
    } catch {
      return false
    }
    return data
  }
}

function isInternationalDate(date) {
  // Checa se o formato é YYYY-MM-DD e também se o ano, mês e dia são válidos
  const internationalDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return internationalDateRegex.test(date);
}

function isBrazilianDate(date) {
  // Checa se o formato é DD-MM-YYYY e também se o dia e o mês são válidos
  const brazilianDateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return brazilianDateRegex.test(date);
}

function searchPeople(persons, people) {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name = people) {
      return persons[i]
    }
  }
  return false
}

module.exports = {
  requestAPI,
  contentType,
  checkFormat,
  isInternationalDate,
  isBrazilianDate,
  searchPeople
};