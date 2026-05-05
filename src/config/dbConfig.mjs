//Configuración de la base de datos y conexión a MongoDB

import { setServers } from 'node:dns/promises';

setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from 'mongoose';

export async function mongoDbCon(){
    try {
        await mongoose.connect('mongodb+srv://grupo-29:grupo-29@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log(`Conexión exitosa!`);
    } catch (error) {
        console.log(`${error} - Fallo en la conexión`);
    };
};

/* 
    Centralizar la configuración a MongoDB en dbConfig.mjs permite tener un único punto de congiguración, lo que facilita el mantenimiento y asegura que cualquier cambio en la configuración se realice en un solo lugar, mejorando la modularidad y reusabilidad del codigo
*/
