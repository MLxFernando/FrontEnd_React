import { FaPen, FaEye, FaTrash, FaPlus, FaFirstOrder } from "react-icons/fa";
import React, { useState, useEffect} from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom';
import CategoriaService from '../../services/CategoriaServices';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import ICategoriaModelo from "../../models/Categoria";


export const CategoriaList = () => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [categorias, setCategorias] = useState<Array<ICategoriaModelo>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch]= useState("");
    const [order, setOrder]=useState("ASC");

    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listCategorias(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listCategorias(numberPage, itemsPerPage);
    };


    //Función que llama al Service para listar los datos desde la Web API
    const listCategorias = (page: number, size: number) => {
       CategoriaService.list(page, size)
         .then((response: any) => {
           setCategorias(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      CategoriaService.count().then((response: any) =>{
        var itemsCount = response;
        setItemsCount(itemsCount);
        setItemsPerPage(5)
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });
    }

    const removeCategoria = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar la categoria?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
                CategoriaService.remove(id)
                .then((response: any) => {
                  listCategorias(0,itemsPerPage);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
                });      

            }
          });        
     };
     
    //Filtrado por busqueda
    const searcher = (event: any) => {
      setSearch(event.target.value)
      console.log(event.target.value)
    }
    let results=[];
    if(!search){
      results=categorias
    }else{
      results= categorias.filter((categoria)=>
        categoria.nombre.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    //ordenamiento
    const sorting = (col: any)=>{
      if(order === "ASC"){
        const sorter = [...categorias].sort((a,b)=>
          a.nombre.toLowerCase()> b.nombre.toLowerCase() ? 1:-1
        );
        setCategorias(sorter);
        setOrder("DSC");
      }
      if(order === "DSC"){
        const sorter = [...categorias].sort((a,b)=>
          a.nombre.toLowerCase()< b.nombre.toLowerCase() ? 1:-1
        );
        setCategorias(sorter);
        setOrder("ASC");
      }
    }

    return ( 
        <div className='list row'>
            <h1>Hay {itemsCount} Categorias</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>  
                              <input value={search} onChange={searcher} type="text" placeholder="Buscar" className="form-control"></input>
                            </th>
                            <th>
                              <button className="btn btn-success" onClick={() => sorting("nombre")}>
                                    <FaFirstOrder /> Ordenar
                              </button>
                            </th>
                      
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>
                              <Link to={"/categorias/create"} className="btn btn-success">
                                  <FaPlus /> Agregar Categoria
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias && results.map((Categoria, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{Categoria.nombre}</td>
                                <td>{Categoria.descripcion}</td>
                                <td>{Categoria.tipo}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/categorias/" + Categoria.id+"/proveedores"} className="btn btn-warning">
                                    <FaEye /> Ver Proveedores
                                  </Link>                                  
                                  <Link to={"/categorias/update/" + Categoria.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={() => removeCategoria(Categoria.id!)}>
                                    <FaTrash /> Eliminar
                                  </button>

                                </div>
                                    
                                </td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>

                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel="siguiente >>>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<<< anterior"
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-link"}
                  previousClassName={"page-link"}
                  previousLinkClassName={"page-item"}
                  nextClassName={"page-link"}
                  nextLinkClassName={"page-item"}
                  disabledClassName={"enabled"}
                  activeClassName={"page-item active"}
                  activeLinkClassName={"page-link"}
                  
                  />

            </div>            
        </div>
     );
}
