import Swal from "sweetalert2";
import http from "../http-common";
import ICategoriaData from "../models/Categoria";

const create = async (data: ICategoriaData) => {    
  try {
    const response = await http.post<ICategoriaData>("/categorias", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'La categoria ha sido creado correctamente',
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
    return http.get<ICategoriaData>(`/categorias/${id}`);
};

const update = async (data: ICategoriaData) => {
  try {    
    const response = await http.put<ICategoriaData>(`/categorias/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'La categoria fué actualizada correctamente',
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
      const response = await  http.delete<string>(`/categorias/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'La categoria ha sido eliminada',
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
  const urlRequest : string = "/categorias/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<ICategoriaData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/categorias/count");
  return response.data;
};

const CategoriaService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default CategoriaService;