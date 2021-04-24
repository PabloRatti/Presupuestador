import React from 'react';
import styled from 'styled-components';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: [],
            cliente: '',
            item: '',
            unidades: '',
            valor: '',
            totalUnidades: 0,
            totalPresupuesto: 0,
            items: []
        }
        this.pdfGenerateor = this.pdfGenerateor.bind(this);
        this.agregarItem = this.agregarItem.bind(this);
        this.controlarPosicionTotal = this.controlarPosicionTotal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {

        let aux = [...this.state.items];
        for (let i = 0; i < 3; i++) {
            aux.push({
                nombre: 'Item' + i,
                unidades: 100,
                valor: 155000
            });
        }
        this.setState({ items: [...aux] });

    }

    deleteItem(event) {
        alert(event.target.value);
    }

    pdfGenerateor() {

        var doc = new jsPDF('landscape');
        var positionYTotal = 70;
        var today = new Date();
        let newBody = [];
        let montoTotal = 0;
        var img = new Image()
        img.src = 'logo.jfif'
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        doc.text(20, 20, 'Mauro Canet : 2234-261271');
        doc.text(20, 30, 'Presupuesto dirigido a : ' + this.state.cliente);
        doc.text(250, 20, date);
        doc.text(250, 30, 'Mar del plata');
        doc.autoTable({ html: '#my-table' })
        doc.addImage(img, 'jfif', 140, 10, 60, 35)
        this.state.items.map((item) => {

            let itemTabla = [item.nombre, item.unidades, item.valor];
            newBody.push(itemTabla);
            montoTotal = montoTotal + (item.unidades * item.valor);
            positionYTotal += 8;

            return null;
        });

        // Or use javascript directly:
        doc.autoTable({

            startY: 50,
            head: [['Item', 'Cantidad', 'Valor']],
            body: [...newBody]//[['David', 'david@example.com', 'Sweden'],['Castille', 'castille@example.com', 'Spain'],],
        })

        this.controlarPosicionTotal(doc, montoTotal, positionYTotal);


        doc.save('Presupuesto' + this.state.cliente + '.pdf');
    }

    controlarPosicionTotal(doc, montoTotal, positionYTotal) {
        if (this.state.items.length < 17) {
            doc.text(20, positionYTotal, 'Total : $' + montoTotal);
        }
        if (this.state.items.length === 17) {
            console.log('In condition 2');
            doc.text(20, positionYTotal - 8, 'Total : $' + montoTotal);
        }
        if (this.state.items.length === 18) {
            console.log('In condition 2');
            doc.text(20, positionYTotal - 12, 'Total : $' + montoTotal);
        }

        if (this.state.items.length >= 19) {
            console.log('In condition 1');
            let rowsInSecondPage = this.state.items.length - 12;
            doc.setPage(2);
            doc.text(20, rowsInSecondPage * 7, 'Total : $' + montoTotal);
        }


    }

    agregarItem() {
        if (this.state.item) {
            let item = {
                nombre: this.state.item,
                unidades: this.state.unidades,
                valor: this.state.valor
            }
            let totalUnidades = parseInt(this.state.totalUnidades) + parseInt(item.unidades);
            let totalPresupuesto = parseFloat(this.state.totalPresupuesto) + (parseFloat(item.valor) * parseInt(item.unidades));
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(item),
                    totalPresupuesto: totalPresupuesto,
                    totalUnidades: totalUnidades

                };
            });
        }

        /*                  item: '',
                            valor: '',
                            unidades: '' */

    }

    render() {
        return (
            <MyForm>
                <img className="img" src="logo.jfif" alt="logo" />
                <div className="container">

                    <h1 className="label">Presupuestador</h1>
                    <table className="dataTable">
                        <tbody>
                            <tr>
                                <th>Cliente : </th>
                                <th><input type="text" value={this.state.cliente} onChange={(event) => { this.setState({ cliente: event.target.value }) }} ></input></th>
                            </tr>
                            <tr>
                                <th>Item : </th>
                                <th><input type="text" value={this.state.item} onChange={(event) => { this.setState({ item: event.target.value }) }} ></input></th>
                            </tr>
                            <tr>
                                <th>Unidades : </th>
                                <th><input type="number" value={this.state.unidades} onChange={(event) => { this.setState({ unidades: event.target.value }) }} ></input></th>
                            </tr>
                            <tr>
                                <th>Valor : </th>
                                <th><input type="number" value={this.state.valor} onChange={(event) => { this.setState({ valor: event.target.value }) }} ></input></th>
                            </tr>
                        </tbody>
                    </table>

                    <button className="addButton" onClick={this.agregarItem}>Agregar</button>
                </div>

                <table id="customers">
                    <thead>
                        <tr>
                            <th className="itemName">Item</th>
                            <th >Cantidad</th>
                            <th >Valor</th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.state.items.map((item) => {
                            return (
                                <tr >
                                    <td className="itemName" onClick={this.deleteItem} value={item.nombre}>{item.nombre}</td>
                                    <td >{item.unidades}</td>
                                    <td >${item.valor}</td>
                                </tr>
                            )
                        })}

                        <tr>
                            <td className="totales">Totales : </td>
                            <td className="totales">{this.state.totalUnidades}</td>
                            <td className="precioTotal">${this.state.totalPresupuesto}</td>
                        </tr>
                    </tbody>



                </table>

                <button className="printPdf" onClick={this.pdfGenerateor} >Descargar PDF</button>
            </MyForm>
        );
    }
}

const MyForm = styled.div`
    text-align: center;
    
   
    min-height: 40rem;
    min-width: 100%;
    max-width: 10rem;
    border-radius: 3rem;
   button{
    background-color: #4CAF50;
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
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
          max-width: 10rem;
         
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
        text-align: left;
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











