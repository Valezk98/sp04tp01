

export function renderizarSuperheroes(superheroes){
    return {
        Nombre: superheroes.nombreSuperheroe,
        "Nombre Real": superheroes.nombreReal,
        Edad: superheroes.edad,
        "Planeta de Origen": superheroes.planetaOrigen,
        Poderes: superheroes.poderes,
        Aliados: superheroes.aliados,
        Enemigo: superheroes.enemigos
    }
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map((superheroe) => renderizarSuperheroes(superheroe))
}