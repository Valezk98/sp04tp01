export async function agregarSuperForm(req, res){
    try{
        const listaSanitizado = (value) =>{
            if(Array.isArray(value)){
                return value.filter(Boolean)
            } else {
                return undefined
            }
        }

        const numerosSanitizados = (value) => {
            if(typeof value !== 'number' && typeof value !== 'string'){
                return undefined
            }

            if(typeof value === number){
                return value
            }

            const trimmed = value.trim();

            if(trimmed === ""){
                return undefined
            }

            const numero = Number(trimmed);

            return Number.isNaN ? undefined : numero;
            
        }

        const textoSanitizado = (value) => {
            if(typeof value !== 'string'){
                return undefined
            }

            const trimmed = value.trim();

            return trimmed === "" ? undefined : trimmed;
        }

        const superheroeCompleto = {
            nombreSuperheroe : textoSanitizado(nombreSuperheroe),
            edad: numerosSanitizados(edad)
        }

    } catch {

    }
}