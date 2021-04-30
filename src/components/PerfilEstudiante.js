import React, { useState, useEffect } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import '../css/Navbar.css';
import {
  MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCardText,
  MDBDropdown, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu
} from "mdbreact";
import axios from 'axios'
import academia from '../img/academia.png';

const PerfilPrueba = () => {

  const [user, setUser] = useState(
    {
      id: '',
      fechaRegistro: '',
      nombreUsuario: '',
      createdAt: '',
      updatedAt: '',
      PersonaId: '',
      Persona: {
        id: '',
        nombreCompleto: '',
        numeroIdentidad: '',
        direccion: '',
        edad: '',
        numeroTelefono: '',
        createdAt: '',
        updatedAt: '',
        Correos: [0]
      }
    });

  const { nombreUsuario, Persona, id } = user;
  const { nombreCompleto, Correos } = Persona;
  const { email } = Correos[0];

  useEffect(() => {
    getUser();
  }, []);


  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }
  const logoutt = () => {

    window.location.href = '/mostrar-perfil';
  }


  const getUser = async () => {
    let { Id } = JSON.parse(localStorage.getItem('user'));

    const res = await axios.get('https://safe-headland-67493.herokuapp.com/estudiante/' + Id);
    const data = await res.data;

    setUser(data);
    console.log(data);
    console.log(user);
  }

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  if (JSON.parse(localStorage.getItem('user'))) {
    const sizeRule = { minHeight: '41rem' }

    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="navbar">
            <Link to="#" className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <Link to="/perfil-prueba" className="linkInicio">Inicio
              </Link>
            <div className="margen"></div>
            <MDBDropdown>
              <MDBDropdownToggle caret color="black" className="color">
                {nombreUsuario}
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem><li onClick={logoutt} className="tamanio">Editar Perfil</li></MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem><li onClick={logout} className="tamanio">Cerrar Sesion</li></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <MDBContainer className="mt-5 text-center" className="container3">
            <MDBRow className="centro">
              <MDBCol>
                <MDBJumbotron className="p-0 ali">
                  <h2>Bienvenido {Persona.nombreCompleto}</h2>
                  <div >
                    <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.6435-9/119155930_105906004594881_8628277898457014955_n.png?_nc_cat=110&ccb=1-3&_nc_sid=973b4a&_nc_ohc=1rEQOjm6qHAAX9r3NYP&_nc_ht=scontent-mia3-2.xx&oh=3d71d8eb0f3e695f973bcfa00ef6b453&oe=60A9FEE9" className="img-fluid"></img>
                  </div>
                  <MDBCardBody>
                    <MDBCardTitle className="h3"> INICIO ESTUDIANTE </MDBCardTitle>
                    <MDBCardText className="h3">
                      Querido Estudiante es un placer que seas parte de Nuestra Familia, aqui encontraras todo lo necesario para recibir tus clases.
                    </MDBCardText>
                    <MDBBtn href="/cursos" className="cin btn3">
                      Matricula </MDBBtn>
                  </MDBCardBody>
                </MDBJumbotron>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div >
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName} >
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
    )
  } else {
    window.location.href = '/';
  }
}

export default PerfilPrueba;