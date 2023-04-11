const errorVerificar = () => {
    return `<div style="font-family: Georgia, Times, "Times New Roman", serif;">
                <h3 style="border-bottom: 0.3rem solid #AE8C44; color:#A1011B; padding-bottom: 1rem; width:fit-content;">
                    Error de verificación de cuenta
                </h3>
                <p>Inténtelo de nuevo más tarde.</p>
            </div>`;
}

const exitoVerificar = () => {
    return `<div style="font-family: Georgia, Times, "Times New Roman", serif;">
                <h3 style="border-bottom: 0.3rem solid #AE8C44; color:#00102A; padding-bottom: 1rem; width:fit-content;">
                    Cuenta verificada con éxito
                </h3>
                <p>Ya puedes iniciar sesión con tu cuenta.</p>
            </div>`;
}

module.exports = {
    errorVerificar,
    exitoVerificar
}