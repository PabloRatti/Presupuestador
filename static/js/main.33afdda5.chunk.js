(this.webpackJsonpgenerator=this.webpackJsonpgenerator||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a,s=n(1),r=n.n(s),o=n(10),i=n.n(o),l=(n(26),n(27),n(11)),d=n(8),c=n(12),h=n(13),u=n(2),b=n(19),m=n(18),j=n(14),g=n(6),p=(n(28),n.p+"static/media/logoCanet.e1f22584.png"),x=n(0),O=function(e){Object(b.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={array1:[],cliente:"",item:"",unidades:"",valor:"",totalUnidades:0,totalPresupuesto:0,items:[]},a.pdfGenerateor=a.pdfGenerateor.bind(Object(u.a)(a)),a.agregarItem=a.agregarItem.bind(Object(u.a)(a)),a.controlarPosicionFooter=a.controlarPosicionFooter.bind(Object(u.a)(a)),a.deleteItem=a.deleteItem.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){}},{key:"deleteItem",value:function(e){e.preventDefault();var t=e.target.itemName.value;console.log("In delete : "+t);for(var n,a=Object(d.a)(this.state.items),s=0;s<a.length;s++)console.log("checking item"),console.log(a[s].nombre),a[s].nombre===t&&(console.log("Item found!"),n=s);console.log("Deleting index : "+n),a.splice(n,1),console.log(a),this.setState({items:Object(d.a)(a)})}},{key:"pdfGenerateor",value:function(){var e=new g.jsPDF("landscape"),t=70,n=new Date,a=[],s=0,r=new Image;r.src=p;var o=n.getDate()+"/"+(n.getMonth()+1)+"/"+n.getFullYear();e.text(20,20,"Mauro Canet realizaciones : 2234-261271"),e.text(20,30,"E-mail : mcrealizaciones@gmail.com"),e.text(20,40,"Presupuesto dirigido a : "+this.state.cliente),e.text(250,20,o),e.text(250,30,"Mar del plata"),e.autoTable({html:"#my-table"}),e.addImage(r,"png",160,10,60,35),this.state.items.map((function(e){var n=[e.nombre,e.unidades,e.valor];return a.push(n),s+=e.unidades*e.valor,t+=8,null})),e.autoTable({headerStyles:{fontStyle:"bold",textColor:20,fillColor:[255,248,83]},startY:50,head:[["Item","Cantidad","Valor"]],body:[].concat(a)}),this.controlarPosicionFooter(e,s,t),e.save("Presupuesto "+this.state.cliente+".pdf")}},{key:"controlarPosicionFooter",value:function(e,t,n){var a=this.state.items.length-12;this.state.items.length<17&&(e.text(20,n,"Total : $"+t),e.text(20,n+10,"Presupuesto v\xe1lido por 7 d\xedas, para la realizaci\xf3n del trabajo es necesaria una se\xf1a del 50% del presupuesto.")),17===this.state.items.length&&(console.log("In condition 2"),e.text(20,n-8,"Total : $"+t),e.text(20,n+2,"Presupuesto v\xe1lido por 7 d\xedas, para la realizaci\xf3n del trabajo es necesaria una se\xf1a del 50% del presupuesto.")),18===this.state.items.length&&(console.log("In condition 2"),e.text(20,n-12,"Total : $"+t),e.addPage(),e.setPage(2),e.text(20,a+2,"Presupuesto v\xe1lido por 7 d\xedas, para la realizaci\xf3n del trabajo es necesaria una se\xf1a del 50% del presupuesto.")),this.state.items.length>=19&&(console.log("In condition 1"),e.setPage(2),e.text(20,7*a,"Total : $"+t),e.text(20,7*a+10,"Presupuesto v\xe1lido por 7 d\xedas, para la realizaci\xf3n del trabajo es necesaria una se\xf1a del 50% del presupuesto."))}},{key:"agregarItem",value:function(){if(this.state.item){var e={nombre:this.state.item,unidades:this.state.unidades,valor:this.state.valor},t=parseInt(this.state.totalUnidades)+parseInt(e.unidades),n=parseFloat(this.state.totalPresupuesto)+parseFloat(e.valor)*parseInt(e.unidades);this.setState((function(a){return{items:a.items.concat(e),totalPresupuesto:n,totalUnidades:t,item:"",valor:"",unidades:""}}))}}},{key:"render",value:function(){var e=this;return Object(x.jsxs)(v,{children:[Object(x.jsx)("img",{className:"img",src:p,alt:"logo"}),Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("h1",{className:"label",children:"Cotizador"}),Object(x.jsx)("table",{className:"dataTable",children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Cliente : "}),Object(x.jsx)("th",{children:Object(x.jsx)("input",{type:"text",value:this.state.cliente,onChange:function(t){e.setState({cliente:t.target.value})}})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Item : "}),Object(x.jsx)("th",{children:Object(x.jsx)("input",{type:"text",value:this.state.item,onChange:function(t){e.setState({item:t.target.value})}})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Unidades : "}),Object(x.jsx)("th",{children:Object(x.jsx)("input",{type:"number",value:this.state.unidades,onChange:function(t){e.setState({unidades:t.target.value})}})})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Valor : "}),Object(x.jsx)("th",{children:Object(x.jsx)("input",{type:"number",value:this.state.valor,onChange:function(t){e.setState({valor:t.target.value})}})})]})]})}),Object(x.jsx)("button",{className:"addButton",onClick:this.agregarItem,children:"Agregar"})]}),Object(x.jsxs)("table",{id:"customers",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{className:"itemName",children:"Item"}),Object(x.jsx)("th",{children:"Cantidad"}),Object(x.jsx)("th",{children:"Valor"})]})}),Object(x.jsxs)("tbody",{children:[this.state.items.map((function(t){return Object(x.jsxs)("tr",{className:"row",children:[Object(x.jsx)("td",{className:"itemName",children:Object(x.jsxs)("form",{onSubmit:e.deleteItem,children:[" ",Object(x.jsx)("button",{className:"deleteButton",type:"submit",children:t.nombre}),Object(x.jsx)("input",{hidden:"true",name:"itemName",value:t.nombre})]})}),Object(x.jsx)("td",{children:t.unidades}),Object(x.jsxs)("td",{children:["$",t.valor]})]})})),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{className:"totales",children:"Totales : "}),Object(x.jsx)("td",{className:"totales",children:this.state.totalUnidades}),Object(x.jsxs)("td",{className:"precioTotal",children:["$",this.state.totalPresupuesto]})]})]})]}),Object(x.jsx)("button",{className:"printPdf",onClick:this.pdfGenerateor,children:"Descargar PDF"})]})}}]),n}(r.a.Component),v=j.a.div(a||(a=Object(l.a)(["\n    text-align: center;\n    \n   \n    min-height: 40rem;\n    min-width: 100%;\n    max-width: 10rem;\n    border-radius: 3rem;\n.row{\n    font-weight:bold;\n}\n    .inputName{\n        text-align: center;\n        font-size: calc(8px + 2vmin);\n        background-color: #7398b6;\n        border: 0px solid #7398b6;\n    }\n   button{\n    background-color: rgb(255,249,80);\n    \n   }\n   .deleteButton{\n       width: 100%;\n       height:100%;\n       background-color: #7398b6;\n       border-color: #7398b6;\n       padding: 0;\n       border: none;\n       background: none;\n       font-weight:bold;\n   }\n    .img{\n        width: 100%;\n        height: 18rem;\n        position:relative;\n        \n    }\n    .totales{\n        font-weight: bold;\n    }\n    .precioTotal{\n        color: green;\n        font-weight: bold;\n    }\n   \n    .label{\n        color:white;        \n    }\n    .input{\n        border-radius:2rem;\n        \n    }\n    table{\n        width: 100%;\n    }\n   \n      tbody{\n          width:100%;\n       \n      }\n      \n     \n      .itemName{\n          overflow: hidden;\n          border: 1px solid #dddddd;\n          text-align: center;\n          padding: 8px;\n          max-width: 10rem;\n          font-weight:bold;\n         \n      }\n      .addButton{\n          margin-top: 2rem;\n          margin-bottom: 2rem;\n          border: 2px solid black;\n          border-radius: 2rem;\n          height:3rem;\n          width: 50%;\n      }\n\n      .printPdf{\n        margin-top: 2rem;\n        margin-bottom: 2rem;\n        border: 2px solid black;\n        border-radius: 2rem;\n        height:3rem;\n        width: 50%;\n      }\n\n      #customers {\n        font-family: Arial, Helvetica, sans-serif;\n        border-collapse: collapse;\n        width: 100%;\n      }\n      \n      #customers td, #customers th {\n        border: 1px solid #ddd;\n        padding: 8px;\n        \n      }\n      \n    \n      \n      #customers tr:hover {background-color: #ddd;}\n      \n      #customers th {\n        padding-top: 12px;\n        padding-bottom: 12px;\n        text-align: center;\n        background-color: black;\n        color: white;\n      }\n\n      @media (min-width: 48em) {\n      \n        .img{\n            width: 40%;          \n            position:relative;\n            \n        }\n        .dataTable{\n            max-width:25rem;\n         \n            margin: 0 auto;\n        }\n     \n    "])));var f=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)("header",{className:"App-header",children:Object(x.jsx)(O,{})})})},w=function(e){e&&e instanceof Function&&n.e(6).then(n.bind(null,404)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),s(e),r(e),o(e)}))};i.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(f,{})}),document.getElementById("root")),w()}},[[31,1,3]]]);
//# sourceMappingURL=main.33afdda5.chunk.js.map