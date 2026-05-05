//Esto define el modelo de datos de superheroes utilizando Mongoose, estableciendo la estructura y las reglas de validación para los documentos que serán almacenados en MongoDB

import mongoose from 'mongoose';

//1 - Crear el esquema

const superHeroSchema = new mongoose.Schema(
    {
        nombreSuperheroe: {type: String, required: true},
        nombreReal: {type: String, required: true},
        edad: { type: Number, min: 0},
        planetaOrigen: {type: String, default: 'Desconocido'},
        debilidad: {type: String, default: 'Desconocida'},
        poderes: [String],
        aliados: [String],
        enemigos: [String],
        creador: String,
        createdAt: {type: Date, default: Date.now}
    }
)

//2 - Crear el model y pasarle el nombre del modelo, el schema y el nombre de la colección como parametros

const superHeroModel = mongoose.model('Superheroes', superHeroSchema, 'Grupo-29');

//3 - Exportar la constante con el modelo

export default superHeroModel
/* 
    Definir el modelo de datos asegura que cada documento de la colección de superheroes siga una estructura consistente, lo que permite tener un control de calidad sobre los datos.

    Mongoose facilita la validación y la gestión de los datos, garantizando que cada documento cumpla con los requisitos del esquema como la obligatoriedad de ciertos campos y los tipos de datos
*/

