import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';

import MyTable from '../../components/Table';
import MyNavbar from '../../components/Navbar';
import MyForm from '../../components/FormIngresarRetirar';

let menuNavMod = [
  {
    name:"Menú",
    rute: "/menu"
  },
];
let headTable = [
  {
    dataField: 'area',
    text: 'Área'
  },
  {
    dataField: 'categoria',
    text: 'Categoría'
  },
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
    text: 'Und.'
  },
  {
    dataField: 'critico',
    text: 'Stock Crítico'
  },
  {
    dataField: 'timestamp',
    text: 'Fecha'
  },
  {
    text: ' alerta ',
    formatter: (cell, row) => aviso_stock(row.cantidad, row.critico),
  }
];

let aviso_stock = (cantidad, critico) => {
  if (cantidad > (critico + 2)) {
    return (
      <Alert variant='success'>Stock Ok</Alert>
    )
  }
  else if (cantidad > critico && cantidad <= (critico + 2)){
    return (
      <Alert variant='warning'>Stock casi bajo</Alert>
    )
  }
  else if (cantidad <= critico){
    return (
      <Alert variant='danger'>¡Stock Bajo!</Alert>
    )
  }
};

const RetirarItem = () => {

  const [items, setItems] = useState([]);

  const handleRetirarItems = (data) => {
    axios.get('https://control-inventarios-usurban.herokuapp.com/item/todo')
    .then(res => {
      setItems(res.data)
    })
  };

  useEffect(()=>{
    axios.get(`https://control-inventarios-usurban.herokuapp.com/item/todo`)
    .then(res => {
      setItems(res.data);
    })
  },[])

  return (
      <>
        <MyNavbar menuArr={menuNavMod}> </MyNavbar>
        <Container style={{marginTop: "150px"}}>
          <h4>Retirar Productos</h4>
          <MyForm handleRetirarItems={handleRetirarItems} items_id={items} ></MyForm>
          <MyTable headArr={headTable} bodyArrItems={items}></MyTable>
        </Container>
      </>
  );
};

export default RetirarItem;