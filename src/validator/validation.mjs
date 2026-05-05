import { body } from "express-validator";


function validaciones(){
    return [
        body("nombreSuperheroe").notEmpty().withMessage('Ingrese un nombre de superheroe.').isLength({ min: 3, max: 60}).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres.').trim(),
        body("nombreReal").notEmpty().withMessage('Ingrese el nombre real del superheroe.').isLength({ min: 3, max: 60}).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres.').trim(),
        body("edad").notEmpty().withMessage('Ingrese la edad del superheroe.').isNumeric().withMessage('La edad deberia ser un numero').isInt({min : 0}).withMessage('No se admiten numeros negativos.').trim(),
        body("poderes").isArray({min : 1}),
        body("poderes.*").isString().isLength({min: 3, max: 60}).trim()
    ]
}

 const coversorStringArray = (value) => {
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }


    if (typeof value !== "string") {
        return value;
    }

    const trimmed = value.trim();

    if (!trimmed) {
        return [];
    }

    return trimmed.split(",").map((string) => string.trim()).filter(Boolean);
};

const stringConvertido = (req, res, next) => {
    req.body.poderes = coversorStringArray(req.body.poderes);
    req.body.aliados = coversorStringArray(req.body.aliados);
    req.body.enemigos = coversorStringArray(req.body.enemigos);

    next();
};


export default validaciones;

export { stringConvertido };