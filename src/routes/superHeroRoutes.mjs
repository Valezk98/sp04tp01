import { crearSuperheroeController, obtenerMayoresDe30Cotroller, obtenerPorIdController, obtenerSuperHeroesController, obtenerPorAtributoController, actualizarSuperheroePorIDController, borrarSuperheroePorIDController, borrarSuperheroePorNombreController, agregarSuperheroeDashboardController, editarSuperheroeDashboardController, eliminarSuperheroeDashboardController } from "../controllers/superheroesController.mjs";

import validaciones, { stringConvertido } from "../validator/validation.mjs";
import { obtenerSuperheroesPorId } from "../services/superheroesService.mjs";
import errorDeValidacion from "../validator/validationErrors.mjs";

import express from "express";

const router = express.Router();


//Rutas

router.get('/heroes', obtenerSuperHeroesController);

router.get('/superheroes/mayoresDe30', obtenerMayoresDe30Cotroller);

router.get('/superheroes/:atributo/:valor', obtenerPorAtributoController);

router.get('/superheroes/:id', obtenerPorIdController);

router.post('/superheroes/crear', ...validaciones(), errorDeValidacion, crearSuperheroeController);

router.put('/superheroes/actualizarPorId/:id', actualizarSuperheroePorIDController);

router.delete('/superheroes/borrarsuperheroeporid/:id', borrarSuperheroePorIDController);

router.delete('/superheroes/borrarsuperheroepornombre/:nombreSuperheroe', borrarSuperheroePorNombreController)

//get para la pagina del formulario, post para enviarlo
router.get('/heroes/agregar-superheroe', (req, res) => {
    res.status(200).render('addSuperhero', { superheroe: null, title: "Agregar superheroe" });
});

router.post('/heroes/agregado', stringConvertido, ...validaciones(), errorDeValidacion, agregarSuperheroeDashboardController)

//get para el formulario para editar y post para enviarlo actualizado
router.get('/heroes/:id/editar-superheroe', async (req, res) => {
    try {
        const { id } = req.params;
        
        const superheroe = await obtenerSuperheroesPorId(id);

        if (!superheroe) {
            return res.status(404).render('editSuperhero', { superheroe: null, error: 'Superhéroe no encontrado' });
        }

        res.render('editSuperhero', { superheroe, title: "Edita un superheroe" }); 
    } catch (error) {
        res.status(500).render('editSuperhero', { superheroe: null, error: 'Error interno del servidor' });
    }
})

router.post('/heroes/:id/editado', stringConvertido, ...validaciones(), errorDeValidacion, editarSuperheroeDashboardController)

//Eliminar
router.get('/heroes/:id/eliminar-superheroe', async (req, res)=>{
    try {
        const { id } = req.params

    const superheroe = await obtenerSuperheroesPorId(id)

    if(!superheroe){
        return res.status(404).render('dashboard', { superheroe : null, error: 'Superheroe no encontrado' })
    }

    res.render('dashboard', { superheroe })
    } catch (error) {
        res.status(500).render('dashboard', { superheroe: null, error: 'Error interno del servidor'})
    }
})

router.get('/heroes/:id/eliminado', eliminarSuperheroeDashboardController)

router.get('/', (req, res)=>{
    res.render('landing', { title: 'Bienvenido a SuperheroDB', layout: false });
})

router.get('/heroes/info', (req, res)=>{
    res.render('info', {title: "Sobre mi"})
})

export default router;