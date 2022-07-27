import { Link } from 'react-router-dom';
import logo from '../logo.svg';

type AppProps = {
    title : string;
    description: string;
  }

export const Home = (props: AppProps) => {
    return (
        <div className="px-4 py-5 my-5 text-center">
          <img src={logo} className="d-block mx-auto mb-4" height="300" alt="logo"/>
          <h1 className='display-5 fw-bold'>{props.title}</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead mb-4'>
              {props.description}
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to={'/categorias'}> <button type="button" className="btn btn-primary btn-lg px-4 gap-3"> Iniciar</button></Link>
              <button type="button" className="btn btn-secondary btn-lg px-4">Salir</button>
            </div>
          </div>
        </div>
      );
}