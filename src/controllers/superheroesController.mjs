import { crearSuperheroe, obtenerSuperheroes, obtenerSuperheroesMayoresDe30, obtenerSuperheroesPorId, obtenerSuperheroesPorAtributo, actualizarSuperheroePorID, borrarSuperheroePorID, borrarSuperheroePorNombre, agregarSuperheroeDashboardService, editarSuperheroeDashboardService, eliminarSuperheroeDashboardService } from "../services/superheroesService.mjs";
import { renderizarListaSuperheroes, renderizarSuperheroes } from "../views/responseView.mjs";


//###################################### TODOS LOS SUPERHEROES ###########################################


export async function obtenerSuperHeroesController(req,res){
    try {
        const superheroes = await obtenerSuperheroes()

        res.status(200).render('dashboard', { superheroes, title:"Lista de superheroes"});

    } catch (error) {
        res.status(500).send(
            {
                mensaje: 'Error al obtener los datos', 
                error: error.message
            })
    }
}


//###################################### MAYORES DE 30 ####################################################


export async function obtenerMayoresDe30Cotroller(req, res){
    try {
        const superheroesMas30 = await obtenerSuperheroesMayoresDe30()

        if(superheroesMas30.length === 0){
            res.status(404).send('No hay superheroes mayores de 30 en la lista');
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroesMas30)

        res.status(200).json(superheroesFormateados)

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener los datos', 
            error: error.message
        })
    }
}

//###################################### POR ID ####################################################

export async function obtenerPorIdController(req,res){
    try {
       const {id} = req.params;
       const superheroeID = await obtenerSuperheroesPorId(id);

       if(!superheroeID){
        res.status(404).send('No hay superheroes con ese ID');
        return;
       }

       const superheroesFormateados = renderizarSuperheroes(superheroeID)
       res.status(200).json(superheroesFormateados);

    } catch (error) {
        res.status(500).send(
            {
                mensaje: "Error al obtener los datos",
                error: error.message
            }
        )
    }
}

//###################################### CREAR UN SUPERHEROE ####################################################

export async function crearSuperheroeController(req, res){
    try {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        const superheroesFormateados = renderizarSuperheroes(nuevoSuperheroe);

        return res.status(201).json(superheroesFormateados);
        
    } catch (error) {
        res.status(500).send({
            mensaje: 'No se pudo crear',
            error: error.message
        })
        
    }
}

//###################################### POR ATRIBUTO #################################################

export async function obtenerPorAtributoController(req, res){
    try {
        const {atributo, valor} = req.params;

        const superheroesPorAtributo = await obtenerSuperheroesPorAtributo(atributo, valor)

        if(superheroesPorAtributo.length === 0){
            res.status(404).send('No se han encontrado superheroes con ese atributo')
            return;
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroesPorAtributo);
        res.status(200).json(superheroesFormateados)

    } catch (error) {
        res.status(500).send(
            {
                mensaje: "Error al obtener los datos"
            }
        )
    }

}

//###################################### Actualizar por ID #################################################

export async function actualizarSuperheroePorIDController(req, res){
    try {
        const id = req.params.id;
        const superheroeEditado = await actualizarSuperheroePorID(id, req.body);

        if(!superheroeEditado){
            res.status(404).json({
                mensaje: 'Error, no se encuentra el superheroe con esa id',
                error: error.message
            })
        }

        res.status(200).json(superheroeEditado)

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
} 


//###################################### Borrar por ID #################################################

export async function borrarSuperheroePorIDController(req, res){
    try {
        const id = req.params.id;

        const superheroeBorrado = await borrarSuperheroePorID(id, req.body)

        if(!superheroeBorrado){
            return res.status(404).json({
                mensaje: 'No se encontró el superheroe a borrar',
                error: error.message
            })}
            
        res.status(200).json(superheroeBorrado)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}

//###################################### Borrar por Nombre #################################################

export async function borrarSuperheroePorNombreController(req, res){
    try {
        const { nombreSuperheroe } = req.params;

        const superheroeBorrado = await borrarSuperheroePorNombre(nombreSuperheroe)

        if(!superheroeBorrado){
            return res.status(404).json({
                mensaje: 'Superheroe a borrar no encontrado'
            })
        }

        res.status(200).json(superheroeBorrado)
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
}

/*
    La capa de los controladores gestiona las solicitudes del cliente y llama a la capa de SERVICIOS para hacer las operaciones, asegura la organización del codigo al usar funciones especificas para cada endpoint
*/

//Dashboard


//Crear superheroe mediante formulario

export async function agregarSuperheroeDashboardController(req, res) {
    try {

        const listaSanitizada = (value) => {
            if (Array.isArray(value)){
                return value.filter(Boolean)
            } else {
                return undefined;
            }

        };

        const numeroSanitizado = (value)=> {

            if(typeof value !== "number" && typeof value !== "string"){
                return undefined
            }

            if(typeof value === "number"){
                return value
            }

            const trimmed = value.trim();

            if (trimmed === ""){
                return undefined
            }

            const numero = Number(trimmed);
            return Number.isNaN(numero) ? undefined : numero

        }

        const textoSanitizado = (value) =>{
            if(typeof value !== 'string'){
                return undefined;
            }

            const trimmed = value.trim();

            return trimmed === "" ? undefined : trimmed
        }

        const superheroeFinal = {
            nombreSuperheroe: textoSanitizado(req.body.nombreSuperheroe),
            nombreReal: textoSanitizado(req.body.nombreReal),
            edad: numeroSanitizado(req.body.edad),
            planetaOrigen: textoSanitizado(req.body.planetaOrigen),
            debilidad: textoSanitizado(req.body.debilidad),
            creador: textoSanitizado(req.body.creador),
            poderes: listaSanitizada(req.body.poderes),
            aliados: listaSanitizada(req.body.aliados),
            enemigos: listaSanitizada(req.body.enemigos),
        };

        // evitar que ls arrays den undefined si el usuario no envió el campo

        if (superheroeFinal.poderes === undefined)
        {
            delete superheroeFinal.poderes;
        };
        if (superheroeFinal.aliados === undefined)
        {
            delete superheroeFinal.aliados;
        };
        if (superheroeFinal.enemigos === undefined)
        {
            delete superheroeFinal.enemigos;
        };

        // aca se convierte la edad de string a numero
        if (typeof superheroeFinal.edad === "string" && superheroeFinal.edad.trim() !== "") {
            superheroeFinal.edad = Number(superheroeFinal.edad);
        };

        const superheroe = await agregarSuperheroeDashboardService(superheroeFinal)

        res.status(201).render('addSuperhero', {superheroe, title: "Agregado!"})

    } catch (error) {
        res.status(500).send({
            error: error.message,
            mensaje: 'Error interno del servidor'
        })
    }
}

//para actualizar
export async function editarSuperheroeDashboardController(req, res){
    try {
        const { id } = req.params;

        const listaSanitizada = (value) => {
            if (Array.isArray(value)){
                return value.filter(Boolean)
            } else {
                return undefined;
            }
        };

        const superheroeFinal = {
            nombreSuperheroe: req.body.nombreSuperheroe,
            nombreReal: req.body.nombreReal,
            edad: req.body.edad,
            planetaOrigen: req.body.planetaOrigen,
            debilidad: req.body.debilidad,
            creador: req.body.creador,
            poderes: listaSanitizada(req.body.poderes),
            aliados: listaSanitizada(req.body.aliados),
            enemigos: listaSanitizada(req.body.enemigos),
        };


        if (superheroeFinal.poderes === undefined)
        {
            delete superheroeFinal.poderes;
        };
        if (superheroeFinal.aliados === undefined)
        {
            delete superheroeFinal.aliados;
        };
        if (superheroeFinal.enemigos === undefined)
        {
            delete superheroeFinal.enemigos;
        };

        const superheroeEditado = await editarSuperheroeDashboardService(id, superheroeFinal)

        if(!superheroeEditado){
            return res.status(404).render('editSuperhero', { superheroe: null, error: 'No se encontró el superheroe a editar'})
        }

        res.status(200).render('editSuperhero', { superheroe: superheroeEditado, error: null })

    }catch (error) {
        res.status(500).render('editSuperhero', { superheroe: null, error: 'Error interno del servidor',})
    }
}

//Funcion para eliminar superheroe mediante su id (heroes/:id/eliminar-superheroe)

export async function eliminarSuperheroeDashboardController(req, res){
    try {
        const { id } = req.params;

        const superheroeBorrado = await eliminarSuperheroeDashboardService(id)

        if(!superheroeBorrado){
            return res.status(404).render('eliminado', { superheroes: await obtenerSuperheroes()})
        }

        res.status(200).render('eliminado', { superheroe: null, title: "Eliminado", layout: false })
    } catch (error) {
        res.status(500).render('dashboard', { superheroes: await obtenerSuperheroes(), error: 'Error interno del servidor'})
    }
}

