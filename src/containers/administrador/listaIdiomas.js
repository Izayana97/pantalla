import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../components/Navbar.css'
import NavbarAdmin from './navbarAdmin';

const ListaIdiomas = () => {

  const [idiomas, setIdiomas] = useState([])

  useEffect(() => {
    obtenerIdiomas();
  }, [])

  const obtenerIdiomas = async () => {
    const res = await axios.get('http://localhost:4000/idioma');
    const data = await res.data;
    setIdiomas(data);
  }

  const eliminarIdiomas = async (id) => {
    const res = await axios.delete('http://localhost:4000/idioma/' + id);
    const data = await res.data;

    if (data) {
      obtenerIdiomas();
    }
  }
  const crearidioma = () => {
    window.location.href = '/crear-idioma';
  }
  const paginaPrincipal = () => {
    window.location.href = '/admin';
  }

  return (<>
    <NavbarAdmin>
    </NavbarAdmin><br></br>
    <div class="btn-group btn-left" role="group" aria-label="Basic outlined example">
      <button onClick={paginaPrincipal} type="button" class="btn btn-outline-primary">Pagina Principal</button>
    </div>
    <br></br><br></br>
    <div>
      <h4>Listado de Cursos</h4>
    </div><br></br>
    <div class="divtabla">
      <table class="table .table-bordered tablahistorial">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">totalEstudiante</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            idiomas.map(item => {
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.precio}</td>
                  <td>{item.totalEstudiante}</td>
                  <td>
                    <button onClick={() => eliminarIdiomas(item.id)} type="button" class="btn btn-link">Eliminar</button>
                  </td>
                </tr>
              )
            })}

        </tbody>
      </table>
    </div>
    <br></br>
    <div>
      <button onClick={crearidioma} type="button" class="btn btn-primary">Agregar</button>
    </div>
  </>)
}

export default ListaIdiomas;