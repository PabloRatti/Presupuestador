// Estilo clásico (el diseño original del cotizador).
import React from 'react';
import styled from 'styled-components';
import logo from '../logoCanet.png';
import PdfPreview from './PdfPreview';

export default function Form({ c }) {
    return (
            <MyForm>
                <img className="img" src={logo} alt="logo" />
                <div className="container">

                    <h1 className="label">Cotizador</h1>
                    <table className="dataTable">
                        <tbody>
                            <tr>
                                <th>Cliente : </th>
                                <th><input type="text" value={c.cliente} onChange={(event) => c.setCliente(event.target.value)} ></input></th>
                            </tr>
                            <tr>
                                <th>Item : </th>
                                <th><input type="text" value={c.item} onChange={(event) => c.setItem(event.target.value)} ></input></th>
                            </tr>
                            <tr>
                                <th>Unidades : </th>
                                <th><input type="number" value={c.unidades} onChange={(event) => c.setUnidades(event.target.value)} ></input></th>
                            </tr>
                            <tr>
                                <th>P.unitario : </th>
                                <th><input type="number" value={c.valor} onChange={(event) => c.setValor(event.target.value)} ></input></th>
                            </tr>
                            <tr>
                                <th>Mano de obra : </th>
                                <th><input type="number" value={c.manoDeObra} onChange={(event) => c.setManoDeObra(event.target.value)} ></input></th>
                            </tr>
                        </tbody>
                    </table>

                    <button className="addButton" onClick={c.agregarItem}>Agregar</button>
                </div>

                <table id="customers">
                    <thead>
                        <tr>
                            <th className="itemName">Item</th>
                            <th >Cantidad</th>
                            <th >P.unidad</th>
                            <th >Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>

                        {c.items.map((item, i) => {
                            return (

                                <tr className="row" key={i}>
                                    <td className="itemName">
                                        

                                        <button className="deleteButton" type="submit" onClick={() => c.eliminarItem(i)}>{item.nombre}
                                        </button>
                                        

                                    </td>
                                    <td >{item.unidades}</td>
                                    <td >${item.valor}</td>
                                    <td >${item.subtotal}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="totales">Totales : </td>
                            <td className="totales"></td>
                            <td className="totales"></td>
                            <td className="precioTotal">${c.totalMateriales}</td>

                        </tr>
                    </tbody>


                </table>

                <button className="printPdf" onClick={c.verPdf} >Ver PDF</button>
                <button className="printPdf" onClick={c.descargarPdf} >Descargar PDF</button>
                {c.pdfPreview && (
                    <PdfPreview data={c.pdfPreview} onClose={c.cerrarPdf} />
                )}
            </MyForm>
    );
}

const MyForm = styled.div`
    text-align: center;
    
   
    min-height: 40rem;
    min-width: 100%;
    max-width: 10rem;
    border-radius: 3rem;
.row{
    font-weight:bold;
}
    .inputName{
        text-align: center;
        font-size: calc(8px + 2vmin);
        background-color: #7398b6;
        border: 0px solid #7398b6;
    }
   button{
    background-color: rgb(255,249,80);
    
   }
   .deleteButton{
       width: 100%;
       height:100%;
       background-color: #7398b6;
       border-color: #7398b6;
       padding: 0;
       border: none;
       background: none;
       font-weight:bold;
   }
    .img{
        width: 100%;
        height: 18rem;
        position:relative;
        
    }
    .totales{
        font-weight: bold;
    }
    .precioTotal{
        color: green;
        font-weight: bold;
    }
   
    .label{
        color:white;        
    }
    .input{
        border-radius:2rem;
        
    }
    table{
        width: 100%;
    }
   
      tbody{
          width:100%;
       
      }
      
     
      .itemName{
          overflow: hidden;
          color: red;
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
          max-width: 10rem;
          font-weight:bold;
          
         
      }
      .addButton{
          margin-top: 2rem;
          margin-bottom: 2rem;
          border: 2px solid black;
          border-radius: 2rem;
          height:3rem;
          width: 50%;
      }

      .printPdf{
        margin-top: 2rem;
        margin-bottom: 2rem;
        border: 2px solid black;
        border-radius: 2rem;
        height:3rem;
        width: 50%;
      }

      #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      #customers td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
        
      }
      
    
      
      #customers tr:hover {background-color: #ddd;}
      
      #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: black;
        color: white;
      }

      @media (min-width: 48em) {
      
        .img{
            width: 40%;          
            position:relative;
            
        }
        .dataTable{
            max-width:25rem;
         
            margin: 0 auto;
        }
     
    `;
