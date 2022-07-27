import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import IProveedorModelo from "../../models/Proveedor";
import ProveedorService from "../../services/ProveedorService";

export const ProveedorList = () => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [proveedores, setProveedores] = useState<Array<IProveedorModelo>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listProveedores(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listProveedores(numberPage, itemsPerPage);
    };

    //Función que llama al Service para listar los datos desde la Web API
    const listProveedores = (page: number, size: number) => {
       ProveedorService.list(page, size)
         .then((response: any) => {
           setProveedores(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      ProveedorService.count().then((response: any) =>{
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        setItemsPerPage(5)
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });
    }

    const removeProveedor = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar el proveedor?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
                ProveedorService.remove(id)
                .then((response: any) => {
                  listProveedores(0,itemsPerPage);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
                });      

            }
          });        
     };
   
    return ( 
        <div className='list row'>
            <h1>Hay {itemsCount} Proveedores</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Dirección</th>
                            <th>Tipo</th>
                            <th>
                              <Link to={"/categorias/{id}/proveedores/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { proveedores && proveedores.map((Proveedor, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{Proveedor.nombre}</td>
                                <td>{Proveedor.telefono}</td>
                                <td>{Proveedor.direccion}</td>
                                <td>{Proveedor.tipo}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/categorias/:id/proveedores/retrieve/" + Proveedor.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/categorias/:id/proveedores/update/" + Proveedor.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={() => removeProveedor(Proveedor.id!)}>
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
                  nextLabel="siguiente >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< anterior"
                  
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-link"}
                  previousClassName={"page-link"}
                  previousLinkClassName={"page-item"}
                  nextClassName={"page-link"}
                  nextLinkClassName={"page-item"}
                  disabledClassName={"disabled"}
                  activeClassName={"page-item active"}
                  activeLinkClassName={"page-link"}
                
                  />

            </div>            
        </div>
     );
}