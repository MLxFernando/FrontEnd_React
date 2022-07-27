import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ICategoriaModelo from "../../models/Categoria";
import CategoriaService from "../../services/CategoriaServices";

export const CategoriaForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    const initialCategoriaModelo : ICategoriaModelo = {
        id: null,
        nombre: "",
        descripcion: "",
        tipo: ""
    };

    const [categoria, setCategoria] = useState<ICategoriaModelo>(initialCategoriaModelo);
    
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const saveCategoria = () => {        
      if(categoria.id !== null)
      {
        CategoriaService.update(categoria)
        .then((response: any) => {
          navigate("/categorias");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
			  CategoriaService.create(categoria)
          .then((response: any) => {    
            navigate("/categorias");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

    useEffect(() => {
      if (id)
      getCategoria(id);
    }, [id]);


    const getCategoria = (id: any) => {
      CategoriaService.retrieve(id)
        .then((response: any) => {
          setCategoria(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
   };


		return ( 
			<div className="submit-form">				
					<div>
						{ categoria.id !== null ? (<h1>Actualiza la categoria {categoria.nombre}</h1>) : (<h1>Registro de nueva categoria</h1>) }            
						<div className="form-group">
						<label htmlFor="nombre">Nombre</label>
            <input
              type="text"
							placeholder="Ingrese el nombre de la categoria"
              className="form-control"
              id="nombre"
              required
              value={categoria.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
						<label htmlFor="descripcion">Descripción</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la descripción de la categoria"
              id="descripcion"
              required
              value={categoria.descripcion}
              onChange={handleInputChange}
              name="descripcion"
            />
						<label htmlFor="tipo">Tipo de Categoria</label>
            <input						
              type="text"
              className="form-control"
              placeholder="Ingrese el tipo de categoria"
              id="tipo"
              required
              value={categoria.tipo}
              onChange={handleInputChange}
              name="tipo"
            />
						
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/categorias"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveCategoria} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}