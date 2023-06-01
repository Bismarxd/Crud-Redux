import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_EXITO, 
    AGREGAR_PRODUCTO_ERROR, 
    COMENZAR_DESCARGA_PRODUCTOS, 
    DESCARGA_PRODUCTOS_EXITO, 
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import Productos from "../components/Productos";

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //Insetar en la API
            await clienteAxios.post('/productos', producto)

            //Si todo sale bien actualizar el state
            dispatch(agregarProductoExito(producto))

            //Alerta
            Swal.fire(
                'Correcto',
                'El Producto se Agrego Correctamente',
                'success'

            )

        } catch (error) {
            console.log(error);
            //Si hay error cambia r el state
            dispatch(agregarProductoError(true));

            //Alerta de Error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo en Error'

        })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Si el producto se guarda en la base dedatos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Funcion que descargar los prouctos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            setTimeout(async()=> {
                const respuesta = await clienteAxios.get('/productos')
                dispatch(descargaProductosExitosa(respuesta.data))
            }, 1000)
            
            
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            //Si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'se elimino correctamente.',
                'success'
            )
            
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }

    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

//Colocar el producto en edicion
export function obtenerProductoEditar(producto) {
    return(dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//edita un registro en la api y el state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto))

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
           dispatch(editarProductoExito(producto));
            
        } catch (error) {
            
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})