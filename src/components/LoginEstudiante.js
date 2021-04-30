import React, { useState } from 'react';
import axios from "axios";
import "../css/LoginPrueba.css";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const LoginPrueba = () => {

    const [user, setUser] = useState({
        nombreUsuario: '',
        password: '',

    });

    //const [loginStatus, setLoginStatus] = useState("");

    const { nombreUsuario, password } = user;

    const handleInputChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSutmit = async (e) => {
        e.preventDefault();
        console.log(user);

        const res = await axios.post('https://safe-headland-67493.herokuapp.com/estudiante/login', user);
        const data = await res.data;

        if (data.auth) {
            localStorage.setItem('user', JSON.stringify(data));
            Swal.fire({
                text: 'Bienvenido  ' + nombreUsuario,
                icon: "success",
                buttons: "Aceptar",
            }).then(respuesta => {
                if (respuesta) {
                    window.location.href = '/perfil-estudiante';
                }

            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectas!'
            })
        }

    }

    /*const validar = () => {
        axios.get("http://localhost:4000/estudiante", {
          nombreUsuario: nombreUsuario,
          password: password
        }).then((response) => {
          if (response.data.status) {
            alert('Bienvenido '+ nombreUsuario)
            window.location({href: '/perfil-prueba'});
          }
          else{
              alert('usuario o contraseña inconrrecta')
            }
        })
    
    };*/

    return (
        <div className="flex1">
            <div className="imgSignUp"></div>
            <form className="formSignUp">
                <div className="form-group titulo">
                    <h3 className="letraH">Inicio Estudiante</h3>
                    <div className="espacio9"></div>
                </div>

                <div className="posicionLogin">
                    <label>Nombre Usuario</label>
                    <input type="text" className="form-control"
                        onChange={handleInputChange} value={nombreUsuario}
                        name="nombreUsuario" placeholder="Ingrese usuario" />
                </div>
                <div className="espacio8"></div>
                <div className="posicionLogin">
                    <label >Contraseña</label>
                    <input type="password" name="password"
                        onChange={handleInputChange} value={password}
                        className="form-control" id="exampleInputPassword1"
                        placeholder="Contraseña" />
                </div>
                <div className="espacio8"></div>
                <button type="button" className="btn-login" onClick={handleSutmit}>Iniciar Sesion</button>

                <div className="posicionLogin">
                    <div className="final">
                        <p>No puedes iniciar sesion? <a href="/sign-up">Registrate</a></p>
                    </div>
                    <p className="margen2021"><Link to="/codigo-seguridad" className="forget">Olvidaste tu contraseña?</Link></p>
                    <p>Regresar a <a href="/">Inicio</a></p>
                </div>
                <div className="espacio7"></div>
            </form>
        </div>
    )
}

export default LoginPrueba;