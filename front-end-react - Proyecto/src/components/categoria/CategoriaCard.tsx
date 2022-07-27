import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import ICategoriaModelo from "../../models/Categoria";
import CategoriaService from "../../services/CategoriaServices";


export const CategoriaCard = () => {
  const { id }= useParams();

  const [Categoria, setCategoria] = useState<ICategoriaModelo>();

  useEffect(() => {
    if (id)
      getCategoria(id);
  }, [id]);


  const getCategoria = (id:any) => {
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
      <div>
      { 
        Categoria ? (
          <div>          
          <h2>{Categoria.nombre}</h2>
          <p>{Categoria.descripcion}</p>
          <h2>{Categoria.tipo}</h2>
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/categorias"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay una categoria todavia</h1>
        )
      }
      </div>
    );
}