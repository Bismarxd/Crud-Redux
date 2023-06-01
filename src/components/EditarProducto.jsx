import { useState,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { editarProductoAction } from "../actions/productoActions";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //Nuevpo state de producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio : ''
    })

    //Producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    
    //llenar el state
    useEffect(() => {
        setProducto(productoeditar)
    },[productoeditar])

    //llenar los dtps del formulario
    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio} = producto;

    const handleSubmitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));

        navigate('/')
    }
  return (
    <div className="flex flex-row justify-center mt-8">
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
        <div className="bg-gradient-to-r from-violet-500 to-violet-700 rounded-t-lg px-16 pt-8 pb-6">
            <div>
                <h2 className="text-center text-7xl font-serif text-white font-extrabold">
                    Editar Producto
                </h2>

                <form 
                    action=""
                    onSubmit={handleSubmitEditarProducto}
                >
                    <div className="form-group m-4">
                        <label htmlFor="nombre" className="text-4xl text-white">Nombre del Producto</label>
                        <input 
                            type="text"
                            className="form-control p-3 py-4 mt-2 text-gray-950"
                            placeholder="Nombre del Producto" 
                            name="nombre"
                            value={nombre}
                            onChange={onChangeFormulario}
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
                            onChange={onChangeFormulario}
                        />
                    </div>
                        
                    <button
                        type="submit"
                        className="btn btn-primary font-semibold text-3xl uppercase bg-blue-900 w-100 mt-3 p-4 border-none rounded-lg"
                    >Guardar Cambios</button>
                    
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditarProducto