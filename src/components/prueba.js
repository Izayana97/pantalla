import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/registro.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";




const Prueba = () => {
    const [estudiante, setEstudiante] = useState({
        nombreCompleto: '',
        numeroIdentidad: '',
        direccion: '',
        edad: '',
        numeroTelefono: '',
        email: '',
        fechaRegistro: '',
        password: '',
        nombreUsuario: '',

    });

    const { nombreCompleto, numeroIdentidad, direccion, edad, numeroTelefono, email, fechaRegistro,
        password, codigoSeguridad, nombreUsuario } = estudiante;

    const handleInputChange = (e) => {
        //console.log(e.target.name + ' : ' + e.target.value);

        setEstudiante({
            ...estudiante,
            [e.target.name]: e.target.value
        });
    }

    const registrar = async () => {

        console.log(estudiante);

        const resp = await axios.post('https://safe-headland-67493.herokuapp.com/estudiante', estudiante);
        const data = await resp.data;

        console.log(resp);
        //alert('Bienvenido ');
        Swal.fire(
            'Felicidades!',
            'Registrado con exito!',
            'success'
        )
        window.location.href = '/login';
    }

    let schema = yup.object().shape({
        nombreCompleto: yup.string().required("campo obligatorio"),
        nombreUsuario: yup.string().required("campo obligatorio"),
        numeroIdentidad: yup.number().positive().integer().required(),
        fechaRegistro: yup.date().required(),
        numeroTelefono: yup.number().positive().integer().required(),
        direccion: yup.string().required("campo obligatorio"),
        edad: yup.number().positive('Solo numeros positivos').integer().required(),
        email: yup.string().email("correo invalido").required("campo obligatorio"),
        password: yup.string().required("campo obligatorio").min(6, "minimo 6 caracteres").max(15, "Menos de 15 caracteres"),
        codigoSeguridad: yup.string("Facil de Recordar").required("Campo Obligatorio")
    });

    const { register, errors } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="divisionRegistro">
            <div className="imgRegistro"></div>
            <div className="formularioRegistro" >
                <h2 className="letraRegistro">Registro </h2>
                <h5 className="llenarRegistro">Llene todos los campos</h5>

                <div className="posicionRegistro">
                    <label>Nombre Completo</label>
                    <input value={nombreCompleto} className="bordeInput1"
                        type="text" placeholder="Escriba su nombre"
                        name="nombreCompleto" ref={register}
                        onChange={handleInputChange}
                    ></input>
                    <p className="text-danger"> {errors.nombreCompleto?.message} </p>
                </div>

                <div className="posicionRegistro">
                    <label>Nombre Usuario</label>
                    <input value={nombreUsuario} className="bordeInput1"
                        type="text" placeholder="Escriba su nombre de usuario"
                        name="nombreUsuario" ref={register}
                        onChange={handleInputChange}
                    ></input>
                    <p className="text-danger"> {errors.nombreUsuario?.message} </p>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label>Numero de Identidad</label>
                        <input value={numeroIdentidad} className="bordeInput"
                            type="text" placeholder="Escriba su numero de identidad"
                            name="numeroIdentidad" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger"> {errors.numeroIdentidad?.message}</p>
                    </div>

                    <div className="col-md-4 offset-md-3">
                        <label>Fecha de Registro</label>
                        <input value={fechaRegistro} className="bordeInput"
                            type="date" placeholder="Escriba fecha de Registro"
                            name="fechaRegistro" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger">{errors.fechaRegistro?.message}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Telefono</label>
                        <input value={numeroTelefono} className="bordeInput"
                            type="text" placeholder="Escriba telefono"
                            name="numeroTelefono" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger">{errors.numeroTelefono?.message}</p>
                    </div>

                    <div className="col-md-4 offset-md-3">
                        <label>Direccion</label>
                        <input value={direccion} className="bordeInput"
                            type="text" placeholder="Escriba su direccion"
                            name="direccion" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger">{errors.direccion?.message} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Edad</label>
                        <input value={edad} className="bordeInput"
                            type="number" placeholder="Escriba su edad"
                            name="edad" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger"> {errors.edad?.message} </p>
                    </div>

                    <div className="col-md-4 offset-md-3">
                        <label>Codigo de Seguridad</label>
                        <input value={codigoSeguridad} className="bordeInput"
                            type="password" placeholder="Escriba un codigo de seguridad"
                            name="codigoSeguridad" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger"> {errors.codigoSeguridad?.message} </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label>Correo Electronico</label>
                        <input value={email} className="bordeInput"
                            type="email" placeholder="Escriba su email"
                            name="email" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger"> {errors.email?.message} </p>
                    </div>

                    <div className="col-md-4 offset-md-3">
                        <label>Contraseña</label>
                        <input value={password} className="bordeInput"
                            type="password" placeholder="Escriba su contraseña"
                            name="password" ref={register}
                            onChange={handleInputChange}
                        ></input>
                        <p className="text-danger">{errors.password?.message}  </p>
                    </div>
                </div>
                <div className="espacio8"></div>
                <button className="botonRegistro" type="button" onClick={registrar}>Registrar</button>
                <div className="espacio11"></div>
                <p className="forgot-password text-center par">
                    ¿Ya estás registrado<a href="./login">inicia sesión?</a>
                </p>
                <p className="text-danger"></p>
                <div className="espacio"></div>
            </div>
        </div>
    );
}
export default Prueba;

