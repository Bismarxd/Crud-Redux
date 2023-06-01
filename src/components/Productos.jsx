//REdux
import { useSelector, useDispatch } from "react-redux"
import { obtenerProductosAction } from "../actions/productoActions"
import { useEffect } from "react";
import Producto from "./Producto";


const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      
        //Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
        //eslint-disable-next-line

    }, [])

    //obtener el state
    const productos = useSelector(state => state.productos.productos)
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.leading)

  return (
    <>
        <h2 className="text-center my-5 text-5xl font-extrabold">Lista de Productos</h2>

            {error ? <p className="font-bold alert alert-danger">Hay un Error</p> : null}
            {cargando ? <p className="text-center">Cargando</p> : null}
        <div className="ml-20 mr-20">
        <table className="table table-striped">
                <thead className="bg-sky-950 table-dark ">
                    <tr className="text-4xl uppercase">
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>

                   
                </thead>
                <tbody>
                    {productos.length === 0 ? 'No hay Productos' : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
            
        
       
    </>

  )
}

export default Productos