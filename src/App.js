import Modal from 'react-modal';
import React, { useState } from 'react';

function App() {

  const [registerDetails, setRegisterDetails] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [order, setOrder] = useState({});
  const [modalisOpen, setModalIsOpen] = useState(false);
  const getOrder = (event) => {

    event.preventDefault();
    if (inputSearch == "") {
      return;
    }
    console.log(inputSearch);

    fetch(`http://localhost:8080/orders/${inputSearch}/details`)
      .then(response => response.json())
      .then(result => {
        setRegisterDetails(result);
      })

    fetch(`http://localhost:8080/orders/${inputSearch}`)
      .then(response => response.json())
      .then(result => {
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
            <button variant="primary" onClick={() => setModalIsOpen(true)}>
              Nuevo detalle
            </button>

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

      <Modal isOpen={modalisOpen}>
        <h2>REGISTRO DE DETALLE</h2>
        <p>Body del modal</p>
        <div>
          <form>
            <div class="mb-3">
              <label for="cliente" class="form-label">Clientes</label>
              <select class="form-select" aria-label="Clientes">
                <option selected>Seleccioanr clientes</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="detalle" class="form-label">Detalle de la orden</label>
              <input type="text" class="form-control" id="detalle" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3 ">
              <label class="form-label" for="cantidad">Cantidad</label>
              <input type="text" class="form-control" id="cantidad" />
            </div>
            <div class="mb-3">
              <label for="precio" class="form-label">Precio</label>
              <input type="text" class="form-control" id="precio" />
            </div>
            <div class="mb-3">
              <label for="total" class="form-label">Total</label>
              <input type="text" class="form-control" id="total" />
            </div>
            
            <button onClick={() => setModalIsOpen(false)} class="btn btn-primary">Cerrar</button>
          </form>
        </div>
      </Modal>
    </div>

  );
}

export default App;
