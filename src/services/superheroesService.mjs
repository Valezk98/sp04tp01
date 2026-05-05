//La capa de servicio se encarga de la lógica del negocio, usa los metodos del repositorio para busca y filtrar los datos

import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperheroes(){
    return await SuperHeroRepository.obtenerTodos();
};

export async function obtenerSuperheroesPorId(id){
    return await SuperHeroRepository.obtenerPorId(id);
};

export async function obtenerSuperheroesPorAtributo(atributo, valor){
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
};

export async function obtenerSuperheroesMayoresDe30(){
    return await SuperHeroRepository.obtenerMayoresDe30();
};

export async function crearSuperheroe(nuevoSuperheroe){
    return await SuperHeroRepository.crearSuperheroe(nuevoSuperheroe);
};

export async function actualizarSuperheroePorID(id, superheroeActualizado){
    return await SuperHeroRepository.actualizarSuperheroePorID(id, superheroeActualizado);
};

export async function borrarSuperheroePorID(id, superheroeBorrado){
    return await SuperHeroRepository.borrarSuperheroePorID(id, superheroeBorrado);
};

export async function borrarSuperheroePorNombre(nombreSuperheroe){
    return await SuperHeroRepository.borrarSuperheroePorNombre(nombreSuperheroe)
}

export async function agregarSuperheroeDashboardService(superheroe){
    return await SuperHeroRepository.agregarSuperheroeDashboard(superheroe);
}

export async function editarSuperheroeDashboardService(id, superheroe){
    return await SuperHeroRepository.editarSuperheroeDashboard(id, superheroe)
}

export async function eliminarSuperheroeDashboardService(id, superheroeBorrado){
    return await SuperHeroRepository.eliminarSuperheroeDashboard(id, superheroeBorrado)
}