const jwt = require('jsonwebtoken')
const generarJWT = (uid = '') => {

    
    console.log("UID:" + uid)
    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '24h' // 24 hours
    });
    console.log("Token:" + token)
    return token;
}

const validarJWT = (token) => {

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}

const decodeJWT = (token = '') => {

    try {
        const { uid } = jwt.decode(token, process.env.SECRETORPRIVATEKEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}


module.exports = {
    generarJWT,
    validarJWT,
    decodeJWT
}