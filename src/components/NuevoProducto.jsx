import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

//Actions en Redux
import { crearNuevoProductoAction } from "../actions/productoActions"
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaAction";

const NuevoProducto = () => {

    let navigate = useNavigate()

    //state del componente
    const [nombre, setNombre] = useState('')
    const [precio   , setPrecio] = useState('')

    //utilizar usedispatch y te crea un funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //manda a llamar el action de producto action
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

    //cuando el usario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()

        //ValidarFormulario
        if (nombre.trim === '' || precio<=0) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: "bg-red-700 text-center border border-blue-400 text-white uppercase px-4 py-3 rounded relative" 
            }
            dispatch(mostrarAlerta(alerta))
            return;
        }

        //Si no hay errores
        dispatch(ocultarAlertaAction());

        //Crear el Nuevo Producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar
        navigate('/')
    }

  return (  
    <div className="flex flex-row justify-center mt-8">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
            <div className="bg-gradient-to-r from-violet-500 to-violet-700 rounded-t-lg px-16 pt-8 pb-6">
                <div>
                    <h2 className="text-center text-7xl font-serif text-white font-extrabold">
                        Crear Nuevo Producto
                    </h2>

                    {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                    <form 
                        onSubmit={submitNuevoProducto}
                        action="">

                        <div className="form-group m-4">
                            <label htmlFor="nombre" className="text-4xl text-white">Nombre del Producto</label>
                            <input 
                                type="text"
                                className="form-control p-3 py-4 mt-2 text-gray-950"
                                placeholder="Nombre del Producto" 
                                name="nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="form-group m-4">
                            <label htmlFor="precio" className="text-4xl text-white">Precio del Producto</label>
                            <input 
                                type="number"
                                className="form-control p-3 py-4 mt-2"
                                placeholder="Precio del Producto" 
                                name="precio"
                                value={precio}
                                onChange={e => setPrecio(Number(e.target.value))}
                            />
                        </div>
                            
                        <button
                            type="submit"
                            className="btn btn-primary font-semibold text-3xl uppercase bg-blue-900 w-100 mt-3 p-4 border-none rounded-lg"
                        >Agregar</button>
                        
                    </form>

                    {cargando ? <p>Cargando</p> : null}
                    {error ? <p className="alert alert-danger p-4 mt-11 text-3xl uppercase font-serif text-center">Hay un Error</p> : null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NuevoProducto