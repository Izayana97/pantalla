import React, { useState, useEffect } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom'
import { SidebarData2 } from './SidebarData2'
import '../css/perfilEstudiante.css'
import { IconContext } from 'react-icons'
import { MDBDropdown, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu } from "mdbreact";
import axios from 'axios';

const MostrarPerfilMaestro = () => {
    const [maestro, setMaestro] = useState(
        {
            id: '',
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
        }
    );

    const { nombreUsuario, Persona, id } = maestro;
    const { nombreCompleto, numeroIdentidad, direccion, edad, numeroTelefono, Correos } = Persona;
    const { email } = Correos[0];

    useEffect(() => {
        getUser();
        console.log(Correos)
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login-maestro';
    }

    const logoutt = () => {

        window.location.href = '/perfil-maestro';
    }

    const editar = () => {
        let { Id } = JSON.parse(localStorage.getItem('maestro'));
        window.location.href = '/editarMaestro/' + Id;
    }


    const getUser = async () => {
        let { Id } = JSON.parse(localStorage.getItem('maestro'));

        const res = await axios.get('https://safe-headland-67493.herokuapp.com/maestro/' + Id);
        const data = await res.data;

        setMaestro(data);
        console.log(data);
        console.log(maestro);

    }

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    if (JSON.parse(localStorage.getItem('maestro'))) {
        const sizeRule = { minHeight: '41rem' }
        return (
            <>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className="imgPerfilfondo2">
                        <div className="navbar">
                            <Link to="#" className='menu-bars'>
                                <FaIcons.FaBars onClick={showSidebar} />
                            </Link>
                            <Link to="/perfil-maestro" className="linkInicio">Inicio
                      </Link>
                            <div className="margen"></div>
                            <MDBDropdown>
                                <MDBDropdownToggle caret color="ins" className="color">
                                    {nombreUsuario}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu basic>
                                    <MDBDropdownItem><li onClick={editar} className="tamanio">Editar Perfil</li></MDBDropdownItem>
                                    <MDBDropdownItem divider />
                                    <MDBDropdownItem><li onClick={logout} className="tamanio">Cerrar Sesion</li></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </div>

                        <div class="col-lg-12 mx-auto p-3 py-md-5">
                            <main>
                                <div className="container-fluid">
                                    <h1 className="mt-4 perfilColor">Perfil</h1>
                                    <div className="row justify-content-md-center">
                                        <div className="col-lg-12 offset-md-1 derecha2">
                                            <div className="card col-md-12 my-4" style={sizeRule}>
                                                <div className="card-body">
                                                    <h4 className="font-weight-extrabold my-4 card-title">Información Personal</h4>
                                                    <p className="parCentro">
                                                        <div class="row justify-content-end">
                                                            <div class="col-6">
                                                                <img src={`https://safe-headland-67493.herokuapp.com/maestro/${id}/obtenerFoto`} className="imagenPerfil"></img>
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item">Usuario: {nombreUsuario}</li>
                                                                    <li className="list-group-item">Correo Electronico: {maestro.Persona.Correos[0].email}</li>
                                                                </ul>
                                                            </div>

                                                            <div class="col-6 align-self-center">
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item">Nombre Completo: {nombreCompleto}</li>
                                                                    <li className="list-group-item">Numero Identidad: {numeroIdentidad}</li>
                                                                    <li className="list-group-item">Direccion: {direccion}</li>
                                                                    <li className="list-group-item">Edad: {edad}</li>
                                                                    <li className="list-group-item">Numero de Telefono: {numeroTelefono}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </p>
                                                    <button type="button" class="btn btn-success btn-lg" onClick={editar} >Editar</button>
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
export default MostrarPerfilMaestro;
