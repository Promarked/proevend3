/**
 * Created by Acer Aspire on 20/08/2017.
 */
var preforms={
    person:{
        fields: [
            {name: "status", label: "Tipo de persona", options:["Inscrito", "Preinscrito"],type: "select", value:"Inscrito", valueLabel:"Inscrito", "required":true},

            {name: "typeNumber", label: "Tipo de identificacion", options:["Cedula de ciudadania", "Tarjeta de identidad", "Pasaporte"],type: "select", col: "2", "required":true},
            {name: "idNumber", label: "Numero de identificacion", type: "input", col: "2", "required":true},
            {name: "firstName", label: "Nombres", type: "input", col: "2", "required":true},
            {name: "lastName", label: "Apellidos", type: "input", col: "2", "required":true},
            {name: "email", label: "Correo electronico", type: "email", "required":true, message: "example@dominio.com"},
            {
                name: "lotation",
                label: "Lugar de residencia",
                message: "Ciudad, Provincia, Pais",
                type: "autocomplete",
                options: $$data.cities,
                searchMin: 3,
                required:true,
                strict:true
            },
            {name: "phone", label: "Telefono / Celular", type: "input", col:2},
            {name: "company", label: "Empresa", type: "input", col:2},
            {name: "ocupation", label: "Ocupacion", type: "input"},
            {
                name: "pay", label: "Forma de Pago", value: "Efecty", type: "select", required:true, options: [
                "Consignacion",
                "Efectivo en el evento",
                "Invitacion"
            ]
            },

        ],
        name:"person",
        title:"Agregar Persona",
        submit:" Guardar",
        cancel:"Cancelar",
        action:function (data) {
            $.notify("Agregar persona");
        }
    }
}