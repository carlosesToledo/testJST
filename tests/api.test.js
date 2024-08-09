const { requestAPI, checkFormat, contentType, isInternationalDate, isBrazilianDate, searchPeople } = require('./apiStarWars')


test('1. Validar o formato da request (json válido) para a seguinte API', async () => {
    let url = 'https://swapi.dev/api/films/?format=json';
    const response = await requestAPI(url);
    const text = await response.text();

    let format = contentType(response)
    const isValid = checkFormat(text, format)

    expect(!isValid).toBe(false)
});


test('2. Validar retornos para URLs inválidas', async () => {
    let url = 'https://swapi.dev/api/people/?format=jsonx';
    const response = await requestAPI(url);
    expect(response.status).toBe(404)
});


test('3. Validar se o filme 10 existe e qual o tipo de retorno ao consultar', async () => {
    let url = 'https://swapi.dev/api/films/10/';
    const response = await requestAPI(url);

    let format = contentType(response);
    response.status !== 200 && console.log('TESTE 3: O FILME 10 NÃO EXISTE!')
    console.log(`TESTE 3: TIPO DE RETORNO: ${format}`);

    expect(response.status).not.toBe(200);

});

test('4. Validar se o filme 2 existe e qual o tipo de retorno ao consultar', async () => {
    let url = 'https://swapi.dev/api/films/2/';
    const response = await requestAPI(url)
    let format = contentType(response);

    console.log(`TESTE 4: TIPO DE RETORNO: ${format}`);
});


test('5. Validar o nome correto de um determinado episódio de filme', async () => {
    let url = 'https://swapi.dev/api/films/2/';
    const response = await requestAPI(url)
    const text = await response.text();

    let isValid = checkFormat(text, 'JSON')
    expect(isValid.title).toBe('The Empire Strikes Back')

});


test('6. Validar o ID do episódio e se o tipo do dado está correto', async () => {
    let url = 'https://swapi.dev/api/films/2/';
    const response = await requestAPI(url)
    const text = await response.text();

    let isValid = checkFormat(text, 'JSON')
    expect(isValid.episode_id).toBe(5)
});



test('7. Validar o formato de data válida (padrão americano) e validar se a data não é padrão Brasil', async () => {
    let url = 'https://swapi.dev/api/films/2/';
    const response = await requestAPI(url)
    const text = await response.text();

    let isValid = checkFormat(text, 'JSON');

    let date = isValid.release_date
    expect(isInternationalDate(date)).toBe(true)
    expect(isBrazilianDate(date)).not.toBe(true)

});


test('8. Validar o peso e a altura do “people” C-3PO', async () => {
    let url = 'https://swapi.dev/api/people/';
    let response = await requestAPI(url)
    const text = await response.text();

    let isValid = checkFormat(text, 'JSON');

    const persons = isValid.results;

    let people = searchPeople(persons, 'C-3P0')
    expect(people.height).toBe('172')
    expect(people.mass).toBe('77')


    people.films.forEach(async (film) => {
        console.log(`TESTE 8: FILME -> ${film}`)
        const response = await requestAPI(film)
    })
});





