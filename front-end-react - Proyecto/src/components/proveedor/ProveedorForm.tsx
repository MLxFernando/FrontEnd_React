import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProveedorModelo from "../../models/Proveedor";
import ProveedorService from "../../services/ProveedorService";

export const ProveedorForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    const initialProveedorModelo : IProveedorModelo = {
        id: null,
        nombre: "",
        telefono: 1334567,
        direccion: "",
        tipo: ""
    };

    const [proveedor, setProveedor] = useState<IProveedorModelo>(initialProveedorModelo);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProveedor({ ...proveedor, [name]: value });
    };

    const saveProveedor = () => {        
      if(proveedor.id !== null)
      {
        ProveedorService.update(proveedor)
        .then((response: any) => {
          navigate("/categorias/proveedores");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
			ProveedorService.create(proveedor)
          .then((response: any) => {    
            navigate("/proveedores/create");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

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
			<div className="submit-form">				
				<div>
					{ proveedor.id !== null ? (<h1>Actualizando el proveedor {proveedor.nombre}</h1>) : (<h1>Registro de nuevo proveedor</h1>) }            
					<div className="form-group">
					    <label htmlFor="nombre">Nombre</label>
                        <input
                        type="text"
                        placeholder="Ingrese el nombre del proveedor"
                        className="form-control"
                        id="nombre"
                        required
                        value={proveedor.nombre}
                        onChange={handleInputChange}
                        name="nombre"
                        />
						<label htmlFor="telefono">Teléfono</label>
                        <input						
                        type="number"
                        className="form-control"
                        placeholder="Ingrese el telefono del proveedor"
                        id="telefono"
                        required
                        value={proveedor.telefono}
                        onChange={handleInputChange}
                        name="telefono"
                        />
						<label htmlFor="direccion">Dirección</label>
                        <input						
                        type="text"
                        className="form-control"
                        placeholder="Ingrese la dirección del proveedor"
                        id="direccion"
                        required
                        value={proveedor.direccion}
                        onChange={handleInputChange}
                        name="direccion"
                        />
                        <label htmlFor="tipo">Tipo de Proveedor</label>
                        <input						
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el tipo de proveedor"
                        id="tipo"
                        required
                        value={proveedor.tipo}
                        onChange={handleInputChange}
                        name="tipo"
                        />
						
						<br />
				<div className="btn-group" role="group">								
                <Link to={"/categorias/proveedores"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
					<button type="button" onClick={saveProveedor} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}