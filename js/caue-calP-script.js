document.getElementById('caue-form1').addEventListener('submit', function(event){
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    const inversion = document.getElementById('inversion');
    const vida = document.getElementById('vida');
    const tasa = document.getElementById('tasa');
    const vida_u = document.getElementById('vida_u');


    let isValid = true;

    // Reset warnings
    document.getElementById('warning-inversion').innerText = '';
    document.getElementById('warning-vida').innerText = '';
    document.getElementById('warning-tasa').innerText = '';
    document.getElementById('warning-vida_u').innerText = '';

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

    if (!vida_u.checkValidity()) {
        document.getElementById('warning-vida_u').innerText = 'Por favor, ingrese la tasa de descuento.';
        isValid = false;
    }

    if (isValid) {
        //
        const tasa_decimal = parseFloat(tasa.value) / 100;
        let resultado = 0;

        if(vida_u.value > 1){
            const aux = parseFloat(vida_u.value) - 1;
            const precio_futuro = parseFloat(inversion.value) / Math.pow(1 + tasa_decimal, vida.value*aux);

            resultado += precio_futuro + parseFloat(inversion.value);
        }else{
            resultado = parseFloat(inversion.value);
        }
        
        

        document.getElementById('resultado-caue').textContent = resultado.toFixed(2);
        
        document.getElementById('titulo-resultado').textContent = "El resultado de precio es:";
        
        window.location.href = "caue-calA.html?inversion=" + resultado.toFixed(2)+ "&vida=" + vida.value*vida_u.value + "&tasa=" + tasa.value;

    }
});

function volver() {
    window.location.href = "./caue.html";
}