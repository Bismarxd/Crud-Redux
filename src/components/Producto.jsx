import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

//REDUX
import { useDispatch } from "react-redux"
import { borrarProductoAction, obtenerProductoEditar } from "../actions/productoActions"

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Confirmar sid esea eliminar
    const confirmarEliminarProducto = id => {
        //Preguntar al usuario
        Swal.fire({
            title: 'Esta seguro? ',
            text: "esta accion es irrecersible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch(borrarProductoAction(id))

                
            }
          })

        
    }

    //funcion que redirige de form programada
    const redireccionarEdicion = producto => {
      dispatch(obtenerProductoEditar(producto))
      navigate(`/productos/editar/${producto.id}`)
    }

  return (
    <tr>
    <td>{nombre}</td>
    <td><span className='font-bold'>Bs. {precio}</span></td>
    <td className=''>
        <button 
          type="button"
          className='bg-sky-950 text-white p-3 rounded-md hover:bg-slate-500 mr-2 hover:no-underline'
          onClick={() => redireccionarEdicion(producto)}

        >Editar</button>

        <button 
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
            onClick={() => confirmarEliminarProducto(id)}
        >Eliminar</button>
    </td>
  </tr>
  )
}

export default Producto