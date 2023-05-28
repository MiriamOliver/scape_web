const { faker } = require('@faker-js/faker');

const factoriaUsuario = (datos) => {

    let user = {
        nombre : faker.internet.userName(),
        email : faker.internet.email(),
        password : 1234,
        avatar : '190a92b6-e2d3-42a9-8e4f-4f2e45ef36b0.jpg',
        verificado : datos.verificado,
        rol : datos.rol,
    }

    return user;
}

module.exports = {
    factoriaUsuario
}