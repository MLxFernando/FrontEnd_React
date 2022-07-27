import Swal from "sweetalert2"; 
import http from "../http-common";
import IProveedorData from "../models/Proveedor";

const create = async (data: IProveedorData) => {    
  try {
    const response = await http.post<IProveedorData>('/categorias/{idCategoria}/proveedores', data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El proveedor ha sido creado correctamente',
        confirmButtonText: 'Aceptar'    

      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
};

const retrieve = async (id: number) => {
    return http.get<IProveedorData>(`/categorias/${id}/proveedores/${id}`);
};

const update = async (data: IProveedorData) => {
  try {    
    const response = await http.put<IProveedorData>(`/categorias/${data.id}/proveedores/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El proveedor fué actualizado correctamente',
        confirmButtonText: 'Aceptar'    
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
    
};

const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/categorias/${id}/proveedores/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El proveedor ha sido eliminado',
          confirmButtonText: 'Aceptar'    
        });
      }
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    }

};


const list = (page: number, size: number, _sort? : string) => {
  const urlRequest : string = "/categorias/proveedores/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IProveedorData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/categorias/proveedores/count");
  return response.data;
};

const ProveedorService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default ProveedorService;