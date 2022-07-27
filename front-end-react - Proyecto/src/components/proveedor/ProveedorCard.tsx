import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import IProveedorModelo from "../../models/Proveedor";
import ProveedorService from "../../services/ProveedorService";



export const ProveedorCard = () => {
  const { id }= useParams();

  const [Proveedor, setProveedor] = useState<IProveedorModelo>();

  useEffect(() => {
    if (id)
      getProveedor(id);
  }, [id]);


  const getProveedor = (id: any) => {
    ProveedorService.retrieve(id)
      .then((response: any) => {
        setProveedor(response.data); 
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

    return (
      <div>
      { 
        Proveedor ? (
        <div>          
          <h2>{Proveedor.nombre}</h2>
          <h2>{Proveedor.telefono}</h2>
          <p>{Proveedor.direccion}</p>
          <h2>{Proveedor.tipo}</h2>
          <br />
			<div className="btn-group" role="group">								
                <Link to={"/categorias/proveedores"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
				<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
			</div>
        </div>

        ) : 
        ( 
          <h1>No hay proveedores</h1>
        )
      }
      </div>
    );
}