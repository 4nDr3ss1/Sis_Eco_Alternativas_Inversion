// vaue-script.js

let chart;
let esVerdadero = false;

document.getElementById('vaue-form').addEventListener('submit', function(event){
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    const inversion = document.getElementById('inversion');
    const vida = document.getElementById('vida');
    const tasa = document.getElementById('tasa');
    const beneficios = document.getElementById('beneficios');


    let isValid = true;

    document.getElementById('warning-inversion').innerText = '';
    document.getElementById('warning-vida').innerText = '';
    document.getElementById('warning-tasa').innerText = '';
    document.getElementById('warning-beneficios').innerText = '';


    if (!inversion.checkValidity()) {
        document.getElementById('warning-inversion').innerText = 'Por favor, ingrese la inversión inicial.';
        isValid = false;
    }
    if (!vida.checkValidity()) {
        document.getElementById('warning-vida').innerText = 'Por favor, ingrese la vida útil.';
        isValid = false;
    }
    if (!tasa.checkValidity()) {
        document.getElementById('warning-tasa').innerText = 'Por favor, ingrese la tasa de descuento.';
        isValid = false;
    }

    if (!beneficios.checkValidity()) {
        document.getElementById('warning-benefici').innerText = 'Por favor, ingrese la tasa de descuento.';
        isValid = false;
    }

    if(isValid) {
        esVerdadero = true;
        actualizarGrafica()
        esVerdadero = false;
    }
});

function actualizarGrafica() {
    const inversion = parseFloat(document.getElementById('inversion').value);
    const vida = parseInt(document.getElementById('vida').value);
    const tasa = parseFloat(document.getElementById('tasa').value);
    const beneficios = parseFloat(document.getElementById('beneficios').value);


    // Reset warnings

        const tasa_decimal = tasa / 100;
        const factor_recuperacion_capital = (tasa_decimal * Math.pow(1 + tasa_decimal, vida)) / (Math.pow(1 + tasa_decimal, vida) - 1);
        const vaue = beneficios - (inversion * factor_recuperacion_capital);

        // Crear gráfica
        crearGrafica(inversion, vida, beneficios);

        // Actualizar el resultado y el título
        if(esVerdadero == true){
            document.getElementById('resultado-vaue').textContent = vaue.toFixed(2);
            document.getElementById('titulo-resultado').textContent = "El resultado de VAUE es:";
        }else{
            document.getElementById('resultado-vaue').textContent = "";
            document.getElementById('titulo-resultado').textContent = "";
        }
   
}

function volver() {
    window.location.href = "../index.html";
}

function crearGrafica(inversion, vida, beneficios) {
    const ctx = document.getElementById('vaueChart').getContext('2d');
    const labels = Array.from({ length: vida + 1 }, (_, i) => i);
    const data = labels.map((year, index) => index === 0 ? -inversion : beneficios);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Flujo de caja',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (USD)'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa la gráfica vacía
    crearGrafica(0, 0, 0);
    // Agregar listeners a los inputs para actualizar la gráfica en tiempo real
    document.getElementById('inversion').addEventListener('input', actualizarGrafica);
    document.getElementById('vida').addEventListener('input', actualizarGrafica);
    document.getElementById('tasa').addEventListener('input', actualizarGrafica);
    document.getElementById('beneficios').addEventListener('input', actualizarGrafica);
});
