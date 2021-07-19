import { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'react-bulma-components';
import React from 'react';
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerDetails, setRegisterDetails] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [order, setOrder] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const getOrder = (event) => {
    event.preventDefault();
    if (inputSearch == "") {
      return;
    }
    console.log(inputSearch);
    fetch(`http://localhost:8080/orders/${inputSearch}/details`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setRegisterDetails(result);
      })
    fetch(`http://localhost:8080/orders/${inputSearch}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setOrder(result);
      })
  }
  return (
    <div className="container my-3">

      <h4 className="text-center">BUSQUEDA DE ORDEN</h4>
      <div className="row justify-content-between">
        <div className="col-md-7 d-flex justify-content-between">
          <form action="" onSubmit={getOrder}>
            <label>ID ORDEN:</label>
            <input id="searchOrder" type="text" placeholder="Buscar" value={inputSearch} onChange={e => setInputSearch(e.target.value)} />
            <button type="submit" >Buscar</button>
          </form>

        </div>
        <div className="col-md-2 justify-content-end">
          <div className="row">
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
           
            {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}

          </div>
        </div>
      </div>
      <div className="row my-3 justify-content-between">
        <div className="col-md-3">
          <p><strong>CLIENTE: </strong> {order.client} </p>
        </div>
        <div className="col-md-3">
          <p><strong>N° ORDEN: </strong> {order.number} </p>
        </div>
        <div className="col-md-3">
          <p><strong>TOTAL: </strong>${order.total} </p>
        </div>
      </div>
      <div className="row">
        <table className="table table-striped" id="tabla_inventarios">
          <thead>
            <tr>
              <th>N°</th>
              <th>Detalle</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>

          </thead>
          <tbody>
            {
              registerDetails.map(detail => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{detail.detail}</td>
                  <td>{detail.amount}</td>
                  <td>${detail.unitPrice}</td>
                  <td>${detail.totalDetail}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>


    </div>

  );
}

export default App;
