// Esta función valida los datos del formulario
function validarFormulario(event) {
    event.preventDefault(); 

    var nombre = document.getElementById('nombre').value;
    var calle = document.getElementById('calle').value;
    var numero = document.getElementById('numero').value;
    var localidad = document.getElementById('localidad').value;
    var pizzas = document.getElementsByClassName('pizza');
    var cantidades = document.getElementsByClassName('cantidad');

    // Validación de la localidad
    if (localidad === '') {
        alert('Por favor, completa el campo de localidad.');
        return;
    }

    // Validación del nombre y apellido
    var letras = /^[A-Za-z ]+$/;
    if (!nombre.match(letras)) {
        alert('Por favor, ingresa un nombre y apellido válidos (solo se admiten caracteres alfabéticos).');
        return;
    }

    // Validación de la calle
    if (calle === '') {
        alert('Por favor, completa el campo de calle.');
        return;
    }

    // Validación del número
    if (numero === '') {
        alert('Por favor, completa el campo de número.');
        return;
    }

    // Validación de al menos una pizza seleccionada
    var seleccionadas = 0;
    for (var i = 0; i < pizzas.length; i++) {
        if (pizzas[i].value !== "") {
            seleccionadas++;
        }
    }
    if (seleccionadas === 0) {
        alert('Por favor, selecciona al menos una pizza.');
        return;
    }

    // Validación de las cantidades
    for (var i = 0; i < cantidades.length; i++) {
        if (cantidades[i].value === '') {
            alert('Por favor, ingresa la cantidad deseada para cada pizza seleccionada.');
            return;
        }
    }

    mostrarDetallePedido(nombre, calle, numero, localidad);
    mostrarBotones();
}

/// Esta función muestra los botones cuando aparece el detalle del pedido
function mostrarBotones() {
    var detallePedido = document.getElementById("detalle-pedido");

    // Verificar si los botones ya se agregaron previamente
    if (detallePedido.querySelector("#btn-confirmar") === null) {
        var botonConfirmar = document.createElement("button");
        botonConfirmar.id = "btn-confirmar";
        botonConfirmar.innerText = "Confirmar Pedido";
        botonConfirmar.type = "button";

        // Agregar evento al botón "Confirmar Pedido"
        botonConfirmar.addEventListener("click", function() {
            // Obtener el nombre ingresado en el formulario
            var nombre = document.getElementById("nombre").value;

            // Restablecer el formulario
            document.getElementById("formulario-pedido").reset();
            // Eliminar los botones del detalle del pedido
            detallePedido.innerHTML = "";

            // Mostrar alerta personalizado con el nombre
            alert("Muchas gracias " + nombre + ", tu pedido ya quedó confirmado y lo enviaremos a tu domicilio.");
        });

        var botonCancelar = document.createElement("button");
        botonCancelar.id = "btn-cancelar";
        botonCancelar.innerText = "Cancelar";
        botonCancelar.type = "button";

        botonCancelar.addEventListener("click", function() {
            // Restablecer el formulario
            document.getElementById("formulario-pedido").reset();
            // Eliminar los botones del detalle del pedido
            detallePedido.innerHTML = "";
        });

        detallePedido.appendChild(botonConfirmar);
        detallePedido.appendChild(botonCancelar);
    }
}

// Esta función muestra los detalles del pedido
function mostrarDetallePedido(nombre, calle, numero, localidad) {
    var pizzas = document.getElementsByClassName('pizza');
    var cantidades = document.getElementsByClassName('cantidad');

    var detalleHTML = "<p>Este es el detalle del pedido para: " + nombre + ":</p>";
    detalleHTML += "<p>" + calcularUnidadesTotales(cantidades) + " " + (calcularUnidadesTotales(cantidades) === 1 ? "pizza" : "pizzas") + ":</p>";
    detalleHTML += "<ul>";

    var productos = [];
    var valorTotal = 0;

    for (var i = 0; i < pizzas.length; i++) {
        if (pizzas[i].value !== "") {
            var pizza = pizzas[i].value;
            var cantidad = parseInt(cantidades[i].value);

            if (!isNaN(cantidad)) {
                productos.push(cantidad + "x " + pizza);
                valorTotal += calcularValorPizza(pizza) * cantidad;
            }
        }
    }

    detalleHTML += productos.map(function (producto) {
        return "<li>" + producto + "</li>";
    }).join("");

    detalleHTML += "</ul>";
    detalleHTML += "<p>Valor total: $" + valorTotal + "</p>";
    detalleHTML += "<p>Pedido para ser entregado en: " + calle + " " + numero + " (" + localidad + ")</p>";


    var contenedorDetalle = document.getElementById('detalle-pedido');
    contenedorDetalle.innerHTML = detalleHTML;
}

// Esta función calcula las unidades de Pizzas
function calcularUnidadesTotales(cantidades) {
    var unidadesTotales = 0;

    for (var i = 0; i < cantidades.length; i++) {
        var cantidad = parseInt(cantidades[i].value);

        if (!isNaN(cantidad)) {
            unidadesTotales += cantidad;
        }
    }

    return unidadesTotales;
}

// Está función calcula el valor del pedido
function calcularValorPizza(pizza) {
    switch (pizza) {
        case "Quattro Stagioni":
            return 2100;
        case "Margherita":
            return 1900;
        case "Marinara":
            return 1750;
        default:
            return 0;
    }
}

// Esta función permite agregar pizzas adicionales al pedido
function agregarPizza() {
    var contenedor = document.getElementById('contenedor-pizzas');

    var div = document.createElement('div');

    var labelPizza = document.createElement('label');
    labelPizza.setAttribute('for', 'pizza');
    labelPizza.textContent = 'Pizza:';

    var selectPizza = document.createElement('select');
    selectPizza.setAttribute('class', 'pizza');
    selectPizza.setAttribute('name', 'pizza');
    selectPizza.setAttribute('required', true);

    var optionDefault = document.createElement('option');
    optionDefault.setAttribute('value', '');
    optionDefault.setAttribute('disabled', true);
    optionDefault.setAttribute('selected', true);
    optionDefault.textContent = 'Seleccione una pizza';

    var optionStagioni = document.createElement('option');
    optionStagioni.setAttribute('value', 'Quattro Stagioni');
    optionStagioni.textContent = 'Pizza Quattro Stagioni - $2.100';

    var optionMargherita = document.createElement('option');
    optionMargherita.setAttribute('value', 'Margherita');
    optionMargherita.textContent = 'Pizza Margherita - $1.900';

    var optionMarinara = document.createElement('option');
    optionMarinara.setAttribute('value', 'Marinara');
    optionMarinara.textContent = 'Pizza Marinara - $1.750';

    selectPizza.appendChild(optionDefault);
    selectPizza.appendChild(optionStagioni);
    selectPizza.appendChild(optionMargherita);
    selectPizza.appendChild(optionMarinara);

    var labelCantidad = document.createElement('label');
    labelCantidad.setAttribute('for', 'cantidad');
    labelCantidad.textContent = 'Cantidad:';

    var inputCantidad = document.createElement('input');
    inputCantidad.setAttribute('type', 'number');
    inputCantidad.setAttribute('class', 'cantidad');
    inputCantidad.setAttribute('name', 'cantidad');
    inputCantidad.setAttribute('min', '1');
    inputCantidad.setAttribute('required', true);

    div.appendChild(labelPizza);
    div.appendChild(selectPizza);
    div.appendChild(labelCantidad);
    div.appendChild(inputCantidad);

    contenedor.appendChild(div);
}