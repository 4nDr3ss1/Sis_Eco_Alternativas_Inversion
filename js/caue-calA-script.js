document.addEventListener('DOMContentLoaded', function() {
    var parametros = new URLSearchParams(window.location.search);
    var inversion1 = parametros.get('inversion');
    var vida1 = parametros.get('vida');
    var tasa1 = parametros.get('tasa');

    if (inversion1) document.getElementById('inversion').value = parseFloat(inversion1).toFixed(2);
    if (vida1) document.getElementById('vida').value = parseFloat(vida1).toFixed(0);
    if (tasa1) document.getElementById('tasa').value = parseFloat(tasa1).toFixed(0);

    let chart;
    let esVerdadero = false;

    document.getElementById('caue-form2').addEventListener('submit', function(event) {
        event.preventDefault();

        const inversion = document.getElementById('inversion');
        const vida = document.getElementById('vida');
        const tasa = document.getElementById('tasa');
        const costo = document.getElementById('costo');

        let isValid = true;

        document.getElementById('warning-inversion').innerText = '';
        document.getElementById('warning-vida').innerText = '';
        document.getElementById('warning-tasa').innerText = '';
        document.getElementById('warning-costo').innerText = '';

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
        if (!costo.checkValidity()) {
            document.getElementById('warning-costo').innerText = 'Por favor, ingrese el costo anual.';
            isValid = false;
        }

        if (isValid) {
            esVerdadero = true;
            actualizarGrafica();
            esVerdadero = false;

            document.getElementById('titulo-resultado').style.display = 'block';
            document.getElementById('resultado-caue').style.display = 'block';
        }
    });

    function actualizarGrafica() {
        const inversion = parseFloat(document.getElementById('inversion').value);
        const vida = parseInt(document.getElementById('vida').value);
        const tasa = parseFloat(document.getElementById('tasa').value);
        const costo = parseFloat(document.getElementById('costo').value);

        const tasa_decimal = tasa / 100;
        const factor_recuperacion_capital = (tasa_decimal * Math.pow(1 + tasa_decimal, vida)) / (Math.pow(1 + tasa_decimal, vida) - 1);
        const caue = (inversion * factor_recuperacion_capital) + costo;

        crearGrafica(inversion, vida, costo);

        if (esVerdadero) {
            document.getElementById('resultado-caue').textContent = caue.toFixed(2);
            document.getElementById('titulo-resultado').textContent = "El resultado de CAUE es:";
        } else {
            document.getElementById('resultado-caue').textContent = "";
            document.getElementById('titulo-resultado').textContent = "";
        }
    }

    function crearGrafica(inversion, vida, costo) {
        const ctx = document.getElementById('vaueChart').getContext('2d');
        const labels = Array.from({ length: vida + 1 }, (_, i) => i);
        const data = labels.map((year, index) => index === 0 ? -inversion : -costo);

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
                    borderColor: 'rgba(0, 81, 135, 0.5)',
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

    document.getElementById('inversion').addEventListener('input', actualizarGrafica);
    document.getElementById('vida').addEventListener('input', actualizarGrafica);
    document.getElementById('tasa').addEventListener('input', actualizarGrafica);
    document.getElementById('costo').addEventListener('input', actualizarGrafica);

    // Inicializa la gráfica vacía
    crearGrafica(0, 0, 0);
});

function volver() {
    window.location.href = "./caue.html";
}