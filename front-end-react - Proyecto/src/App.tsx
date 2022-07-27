import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { CategoriaList } from "./components/categoria/CategoriaList";
import { CategoriaForm } from "./components/categoria/CategoriaForm";
import { CategoriaCard } from "./components/categoria/CategoriaCard";
import { ProveedorList } from "./components/proveedor/ProveedorList";
import { ProveedorForm } from "./components/proveedor/ProveedorForm";
import { ProveedorCard } from "./components/proveedor/ProveedorCard";

const title = "Proyecto ";
const description = "Aplicación web usando React para la realización de Front End";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          Fernando Macas
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/categorias"} className="nav-link">
              Categorias
            </Link>
          </li>          
        </div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/categorias/proveedores"} className="nav-link">
              Proveedores
            </Link>
          </li>          
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />          
          <Route path="/categorias" element={<CategoriaList />} />          
          <Route path="/categorias/create" element={<CategoriaForm />} />    
          <Route path="/categorias/retrieve/:id" element={<CategoriaCard/>} />      
          <Route path="/categorias/update/:id" element={<CategoriaForm />} />    
                    
          <Route path="/categorias/proveedores" element={<ProveedorList />} />          
          <Route path="/categorias/:id/proveedores/create" element={<ProveedorForm />} />    
          <Route path="/categorias/:id/proveedores/retrieve/:id" element={<ProveedorCard/>} />      
          <Route path="/categorias/:id/proveedores/update/:id" element={<ProveedorForm />} />    
        
        </Routes>
        
      </div>
    </div>
  );
}
export default App;
