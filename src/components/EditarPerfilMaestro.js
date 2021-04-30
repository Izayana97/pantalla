import React, { useState, useEffect } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useParams } from 'react-router-dom'
import { SidebarData2 } from './SidebarData2'
import '../css/perfilEstudiante.css'
import { IconContext } from 'react-icons'
import { MDBDropdown, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu } from "mdbreact";
import axios from 'axios';
import Swal from 'sweetalert2';


const EditarPerfilMaestro = () => {

  let { Id } = JSON.parse(localStorage.getItem('maestro'));


  const [maestro, setMaestro] = useState(
    {

      id: '',
      nombreCompleto: '',
      numeroIdentidad: '',
      direccion: '',
      edad: '',
      numeroTelefono: '',
      Correos: [0]
    }
  );

  const { nombreCompleto, direccion, edad, numeroTelefono, id, Correos } = maestro;
  const { email } = Correos[0];

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login-maestro';
  }

  const logoutt = () => {
    window.location.href = '/perfil-maestro';
  }


  //const {id} = useParams();

  const getUser = async () => {
    let { Id } = JSON.parse(localStorage.getItem('maestro'));

    const res = await axios.get('https://safe-headland-67493.herokuapp.com/maestro/' + Id);
    const data = await res.data;

    setMaestro(data.Persona);
    console.log(data);

  }

  const handleInputChange = (e) => {
    setMaestro({
      ...maestro,
      [e.target.name]: e.target.value
    });
  }

  const handleInputChangeImage = async (e) => {

    let formData = new FormData();

    formData.append('foto', e.target.files[0]);

    const res = await axios.put('https://safe-headland-67493.herokuapp.com/maestro/' + Id + '/subir', formData);
    const body = await res.data;

    console.log(body);

  }

  const editarMaestro = async () => {
    let { Id } = JSON.parse(localStorage.getItem('maestro'));

    const resp1 = await axios.put('https://safe-headland-67493.herokuapp.com/persona/' + id, maestro);
    const data1 = await resp1.data;

    //const resp = await axios.put('http://localhost:4000/estudiante/' + Id, user);
    //const data = await resp.data;

    console.log(data1);
    Swal.fire({
      title: " ",
      text: "Cambios Guardados con exito",
      icon: "success",
      button: "Ok"
    });
    window.location.href = '/mostrar-perfilm';
  }

  const handleSubmitImage = async (e) => {
    const formData = new FormData();
    formData.append('foto', e.target.files[0]);
    try {
      const resp = await fetch(`https://safe-headland-67493.herokuapp.com/idioma/archivo/` + id, {
        method: 'PUT',
        body: formData,
      });
      const body = await resp.json();

      console.log(body)
      //getArchivos();
      Swal.fire({
        title: " ",
        text: "Archivo subido con exito",
        icon: "success",
        button: "Aceptar"
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  if (JSON.parse(localStorage.getItem('maestro'))) {
    const sizeRule = { minHeight: '41rem' }
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="imgEdit2">
            <div className="navbar">
              <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <Link to="/perfil-prueba" className="linkInicio">Inicio
                  </Link>
              <div className="margen"></div>
              <MDBDropdown>
                <MDBDropdownToggle caret color="ins" className="color">
                  {nombreCompleto}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem><li onClick={logoutt} className="tamanio">Volver Perfil</li></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><li onClick={logout} className="tamanio">Cerrar Sesion</li></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </div>


            <div className="col-lg-12 mx-auto p-3 py-md-5">
              <main>
                <div className="container-fluid">
                  <h1 className="mt-4 perfilColor">Editar Perfil</h1>
                  <div className="row justify-content-md-center row1">
                    <div className="col-lg-12">
                      <div className="card col-md-16 my-4">
                        <div className="card-body">
                          <h4 className="font-weight-extrabold my-4 card-title">Informacion Personal</h4>
                          <div className="row">
                            <div className="col-6">
                              <img src={`https://safe-headland-67493.herokuapp.com/maestro/${Id}/obtenerFoto`} className="imagenPerfil"></img>
                              <div className="actualizar2">
                                <label id="exampleInputEmail1">Actualizar foto</label>
                                <input type="file" class="form-control"
                                  className="bordeInput1 largo1" onChange={handleInputChangeImage}></input>
                              </div>
                            </div>
                            <div className="col-6 align-self-center">
                              <div className="form=group hola22">
                                <div className="left1">
                                  <label id="exampleInputEmail1">Nombre Completo &nbsp; &nbsp; &nbsp;</label>
                                  <input value={nombreCompleto} type="text" name="nombreCompleto"
                                    placeholder="nombre" id="exampleInputEmail1"
                                    className="bordeInput1 largo2" onChange={handleInputChange}></input>
                                </div>
                                <div className="espacio24"></div>
                                <div className="left1">
                                  <label>Correo{' '}Electronico &nbsp; &nbsp; &nbsp;</label>
                                  <input value={maestro.Correos[0].email} className="bordeInput largo2"
                                    type="text" name="email"
                                    onChange={handleInputChange}
                                  ></input>
                                </div>
                                <div className="espacio24"></div>
                                <div className="left1">
                                  <label>Direccion &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                                  <input value={direccion} type="text" name="direccion"
                                    className="bordeInput1 largo2" onChange={handleInputChange}></input>
                                </div>
                                <div className="espacio24"></div>
                                <div className="left1">
                                  <label>Numero Telefonico &nbsp; &nbsp;</label>
                                  <input value={numeroTelefono} type="text" name="numeroTelefono"
                                    className="bordeInput1 largo2" onChange={handleInputChange}></input>
                                </div>
                                <div className="col-md-4 offset-md-2 d-none">
                                  <label>Edad</label>
                                  <input value={edad} className="bordeInput largo2"
                                    type="text" name="edad"
                                    onChange={handleInputChange}
                                  ></input>
                                </div>

                                <div className="col-md-4 offset-md-2 d-none" >
                                  <label>Nombre de Usuario</label>
                                  <input className="bordeInput largo2"
                                    type="text" name="nombreUsuario"
                                    onChange={handleInputChange}
                                  ></input>
                                </div>

                                <div className="espacio8"></div>
                                <div className="espacio24"></div>
                                <button type="button" class="btn btn-outline-secondary" onClick={editarMaestro}>Guardar Cambios</button>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>


            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData2.map((item, index) => {
                  return (
                    <li Key={index} className={item.cName} >
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </IconContext.Provider>

      </>

    );
  } else {
    window.location.href = '/'
  }


}

export default EditarPerfilMaestro;
