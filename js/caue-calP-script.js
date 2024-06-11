document.getElementById('caue-form1').addEventListener('submit', function(event){
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    const inversion = document.getElementById('inversion');
    const vida = document.getElementById('vida');
    const tasa = document.getElementById('tasa');

    let isValid = true;

    // Reset warnings
    document.getElementById('warning-inversion').innerText = '';
    document.getElementById('warning-vida').innerText = '';
    document.getElementById('warning-tasa').innerText = '';

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

    if (isValid) {
        //
        const tasa_decimal = parseFloat(tasa.value) / 100;
        const precio_futuro = parseFloat(inversion.value) / Math.pow(1 + tasa_decimal, parseFloat(vida.value));
        const resultado = precio_futuro + parseFloat(inversion.value);


        document.getElementById('resultado-caue').textContent = resultado.toFixed(2);
        
        document.getElementById('titulo-resultado').textContent = "El resultado de precio es:";
        
        window.location.href = "caue-calA.html?inversion=" + resultado.toFixed(2)+ "&vida=" + vida.value*2 + "&tasa=" + tasa.value;

    }
});

function volver() {
    window.location.href = "./caue.html";
}