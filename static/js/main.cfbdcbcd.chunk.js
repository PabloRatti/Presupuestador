(this.webpackJsonpgenerator=this.webpackJsonpgenerator||[]).push([[0],{25:function(t,e,n){},26:function(t,e,n){},30:function(t,e,n){"use strict";n.r(e);var a,i=n(1),s=n.n(i),r=n(9),o=n.n(r),l=(n(25),n(26),n(10)),c=n(11),d=n(12),h=n(2),u=n(18),m=n(17),b=n(13),j=n(6),g=(n(27),n(0)),x=function(t){Object(u.a)(n,t);var e=Object(m.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).state={array1:[],cliente:"",item:"",unidades:"",valor:"",totalUnidades:0,totalPresupuesto:0,items:[]},a.pdfGenerateor=a.pdfGenerateor.bind(Object(h.a)(a)),a.agregarItem=a.agregarItem.bind(Object(h.a)(a)),a.controlarPosicionTotal=a.controlarPosicionTotal.bind(Object(h.a)(a)),a.deleteItem=a.deleteItem.bind(Object(h.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){}},{key:"deleteItem",value:function(t){alert(t.target.value)}},{key:"pdfGenerateor",value:function(){var t=new j.jsPDF("landscape"),e=70,n=new Date,a=[],i=0,s=new Image;s.src="logo.jfif";var r=n.getDate()+"/"+(n.getMonth()+1)+"/"+n.getFullYear();t.text(20,20,"Mauro Canet : 2234-261271"),t.text(20,30,"Presupuesto dirigido a : "+this.state.cliente),t.text(250,20,r),t.text(250,30,"Mar del plata"),t.autoTable({html:"#my-table"}),t.addImage(s,"jfif",140,10,60,35),this.state.items.map((function(t){var n=[t.nombre,t.unidades,t.valor];return a.push(n),i+=t.unidades*t.valor,e+=8,null})),t.autoTable({startY:50,head:[["Item","Cantidad","Valor"]],body:[].concat(a)}),this.controlarPosicionTotal(t,i,e),t.save("Presupuesto"+this.state.cliente+".pdf")}},{key:"controlarPosicionTotal",value:function(t,e,n){if(this.state.items.length<17&&t.text(20,n,"Total : $"+e),17===this.state.items.length&&(console.log("In condition 2"),t.text(20,n-8,"Total : $"+e)),18===this.state.items.length&&(console.log("In condition 2"),t.text(20,n-12,"Total : $"+e)),this.state.items.length>=19){console.log("In condition 1");var a=this.state.items.length-12;t.setPage(2),t.text(20,7*a,"Total : $"+e)}}},{key:"agregarItem",value:function(){if(this.state.item){var t={nombre:this.state.item,unidades:this.state.unidades,valor:this.state.valor},e=parseInt(this.state.totalUnidades)+parseInt(t.unidades),n=parseFloat(this.state.totalPresupuesto)+parseFloat(t.valor)*parseInt(t.unidades);this.setState((function(a){return{items:a.items.concat(t),totalPresupuesto:n,totalUnidades:e,item:"",valor:"",unidades:""}}))}}},{key:"render",value:function(){var t=this;return Object(g.jsxs)(p,{children:[Object(g.jsx)("img",{className:"img",src:"logo.jfif",alt:"logo"}),Object(g.jsxs)("div",{className:"container",children:[Object(g.jsx)("h1",{className:"label",children:"Cotizador"}),Object(g.jsx)("table",{className:"dataTable",children:Object(g.jsxs)("tbody",{children:[Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Cliente : "}),Object(g.jsx)("th",{children:Object(g.jsx)("input",{type:"text",value:this.state.cliente,onChange:function(e){t.setState({cliente:e.target.value})}})})]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Item : "}),Object(g.jsx)("th",{children:Object(g.jsx)("input",{type:"text",value:this.state.item,onChange:function(e){t.setState({item:e.target.value})}})})]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Unidades : "}),Object(g.jsx)("th",{children:Object(g.jsx)("input",{type:"number",value:this.state.unidades,onChange:function(e){t.setState({unidades:e.target.value})}})})]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Valor : "}),Object(g.jsx)("th",{children:Object(g.jsx)("input",{type:"number",value:this.state.valor,onChange:function(e){t.setState({valor:e.target.value})}})})]})]})}),Object(g.jsx)("button",{className:"addButton",onClick:this.agregarItem,children:"Agregar"})]}),Object(g.jsxs)("table",{id:"customers",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{className:"itemName",children:"Item"}),Object(g.jsx)("th",{children:"Cantidad"}),Object(g.jsx)("th",{children:"Valor"})]})}),Object(g.jsxs)("tbody",{children:[this.state.items.map((function(e){return Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{className:"itemName",onClick:t.deleteItem,value:e.nombre,children:e.nombre}),Object(g.jsx)("td",{children:e.unidades}),Object(g.jsxs)("td",{children:["$",e.valor]})]})})),Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{className:"totales",children:"Totales : "}),Object(g.jsx)("td",{className:"totales",children:this.state.totalUnidades}),Object(g.jsxs)("td",{className:"precioTotal",children:["$",this.state.totalPresupuesto]})]})]})]}),Object(g.jsx)("button",{className:"printPdf",onClick:this.pdfGenerateor,children:"Descargar PDF"})]})}}]),n}(s.a.Component),p=b.a.div(a||(a=Object(l.a)(["\n    text-align: center;\n    \n   \n    min-height: 40rem;\n    min-width: 100%;\n    max-width: 10rem;\n    border-radius: 3rem;\n   button{\n    background-color: #4CAF50;\n   }\n    .img{\n        width: 100%;\n        height: 18rem;\n        position:relative;\n        \n    }\n    .totales{\n        font-weight: bold;\n    }\n    .precioTotal{\n        color: green;\n        font-weight: bold;\n    }\n   \n    .label{\n        color:white;        \n    }\n    .input{\n        border-radius:2rem;\n        \n    }\n    table{\n        width: 100%;\n    }\n   \n      tbody{\n          width:100%;\n       \n      }\n      \n     \n      .itemName{\n          overflow: hidden;\n          border: 1px solid #dddddd;\n          text-align: center;\n          padding: 8px;\n          max-width: 10rem;\n         \n      }\n      .addButton{\n          margin-top: 2rem;\n          margin-bottom: 2rem;\n          border: 2px solid black;\n          border-radius: 2rem;\n          height:3rem;\n          width: 50%;\n      }\n\n      .printPdf{\n        margin-top: 2rem;\n        margin-bottom: 2rem;\n        border: 2px solid black;\n        border-radius: 2rem;\n        height:3rem;\n        width: 50%;\n      }\n\n      #customers {\n        font-family: Arial, Helvetica, sans-serif;\n        border-collapse: collapse;\n        width: 100%;\n      }\n      \n      #customers td, #customers th {\n        border: 1px solid #ddd;\n        padding: 8px;\n        \n      }\n      \n    \n      \n      #customers tr:hover {background-color: #ddd;}\n      \n      #customers th {\n        padding-top: 12px;\n        padding-bottom: 12px;\n        text-align: left;\n        background-color: black;\n        color: white;\n      }\n\n      @media (min-width: 48em) {\n      \n        .img{\n            width: 40%;          \n            position:relative;\n            \n        }\n        .dataTable{\n            max-width:25rem;\n         \n            margin: 0 auto;\n        }\n     \n    "])));var O=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)("header",{className:"App-header",children:Object(g.jsx)(x,{})})})},v=function(t){t&&t instanceof Function&&n.e(6).then(n.bind(null,403)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,s=e.getLCP,r=e.getTTFB;n(t),a(t),i(t),s(t),r(t)}))};o.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(O,{})}),document.getElementById("root")),v()}},[[30,1,3]]]);
//# sourceMappingURL=main.cfbdcbcd.chunk.js.map