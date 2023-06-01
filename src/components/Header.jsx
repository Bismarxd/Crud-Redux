import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav className="bg-violet-700 text-white flex justify-between items-center  p-16">
      <div className="mx-auto">
        <h1 className="text-8xl font-black text-purple-200">
          <Link to={'/'} className="">CRUD - REDUX</Link>
        </h1>
      </div>

      <Link to={"/productos/nuevo"} className="text-6xl inline-block bg-blue-900 text-white font-extrabold py-5 px-4 rounded-md opacity-80 hover:no-underline hover:opacity-100">Agregar Producto &#43;</Link>
    </nav>
  )
}

export default Header