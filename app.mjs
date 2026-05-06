import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoDbCon } from './src/config/dbConfig.mjs';
import router from './src/routes/superHeroRoutes.mjs';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

//configuracion de EJS como motor de vistas

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//config de layouts
app.set('layout','layout')
app.use(expressEjsLayouts);

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'src', 'views'));

//Middleware para parsear JSON
app.use(express.json());

//middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//Conexión
mongoDbCon();

//Router
app.use('/api', router)

//Para las rutas no encontradas

app.use((req, res) =>{
    res.status(404).render('ERROR404', { title: 'Error'})
})

//Iniciar el servidor

app.listen(PORT, ()=>{
    console.log(`Escuchando servidor en http://localhost:${PORT}/api/`);
});