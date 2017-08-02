[
    {"name": "type_ident", "type": "text", "label": "Tipo de identificacion"},
    {"name": "number_ident", "type": "text", "label": "Identificacion"},
    {"name": "firstName", "type": "text", "label": "Nombres"},
    {"name": "lastName", "type": "text", "label": "Apellidos"},
    {
        "name": "sex",
        "type": "radio",
        "label": "Sexo",
        "options": [{"label": "Masculino", "value": "Masculino"}, {"label": "Femenino", "value": "Femenino"}]
    },
    {"name": "country", "type": "text", "label": "Pais"},
    {"name": "province", "type": "text", "label": "Departamento"},
    {"name": "city", "type": "text", "label": "Ciudad"},
    {"name": "email", "type": "email", "label": "Correo electronico"},
    {"name": "repeat-email", "type": "email", "label": "Repetir correo electronico"},
    {"name": "phone", "type": "email", "label": "Telefono", "deleteable": true},
    {
        "name": "ocupation",
        "type": "select",
        "label": "Ocupacion",
        "options": [{"label": "Seleccione una ocupacion", "value": ""}, {"label": "Doctor", "value": "Doctor"}],
        "other": true,
        "deleteable": true
    },
    {
        "name": "pay",
        "type": "select",
        "label": "Forma de pago",
        "options": [{"label": "Invitado", "value": "Invitado"}, {"label": "Efectivo", "value": "Evectivo"}],
        "other": true
    }
]