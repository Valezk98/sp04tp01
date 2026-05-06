import { validationResult } from "express-validator";

function errorDeValidacion(req, res, next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render('ERROR400', { title: 'Error' })
    }

    next()
}

export default errorDeValidacion;