import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import MyTableBuscador from './../../components/TableBuscador/TableBuscador';
import MyNavbar from './../../components/Navbar';
import MyCodigo from './../../components/Codigo';

let menuNav = 
[
    {
        name: "Menú", 
        rute: "/menu"
    }
];

let headTable = [
    {
        dataField: 'codigo',
        text: 'Código'
    },
    {
        dataField: 'nombre',
        text: 'Nombre'
    },
    {
        dataField: 'cantidad',
        text: 'Cantidad'
    },
    {
        dataField: 'unidad_medida',
        text: 'Unidad de Medida'
    },
    {
        dataField: 'timestamp',
        text: 'Fecha'
    },
    {
        text: ' Estado ',
        formatter: (cell, row) => aviso_stock(row.cantidad, row.critico)
    },
    {
        text: 'Código',
        formatter: (cell, row) => codigo(row.id, row.nombre)
    }
];

let aviso_stock = (cantidad, critico) => {
    if (cantidad > (critico + 4)) {
        return (
        <Alert variant='success'>Stock Ok</Alert>
        )
    }
    else if (cantidad > (critico + 2) && cantidad <= (critico + 4)){
        return (
        <Alert variant='warning'>Stock casi bajo</Alert>
        )
    }
    else if (cantidad <= (critico + 2)){
        return (
        <Alert variant='danger'>¡Stock Bajo!</Alert>
        )
    }
    };
    
let codigo = (id, nombre) => {
    let items = {
        id: id,
        nombre: nombre
    }
    return (
        <MyCodigo items={items}/>
    );
};

const ResultadosBusqueda = ({match}) => {
    const [itemsBuscador, setItemsBuscador] = useState([]);

    useEffect(() =>{
        let params = match.params;
        axios.get(`http://127.0.0.1:5000/item/buscador/${params.nombre}`)
        .then(res => {
          setItemsBuscador(res.data)
        })
    },[])
    
    return(
        <div className="Menu">
            <MyNavbar menuArr={menuNav}/>
            <Container style={{marginTop: "150px"}}>
                <MyTableBuscador headArr={headTable} bodyitem={itemsBuscador}/>
            </Container>
        </div>
    )
}

export default ResultadosBusqueda;