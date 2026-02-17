$(document).ready(function() {
    // REVELO EL SITIO CON SUAVIDAD
    $('body').css('opacity', '0').fadeTo(1200, 1);

    // GESTIONO EL ENVÍO DEL FORMULARIO CORTO
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const nombre = $('#nombre').val();
        
        // REEMPLAZO FORMULARIO POR MENSAJE DE ÉXITO
        $(this).fadeOut(400, function() {
            $(this).parent().html(`
                <h3 class="signature" style="font-size: 2.5rem;">Gracias, ${nombre}</h3>
                <p class="small">TE CONTACTAREMOS EN BREVE PARA TU CITA.</p>
            `).fadeIn();
        });
        
        console.log("LOG: CONTACTO RECIBIDO CORRECTAMENTE.");
    });

    // SCROLL SUAVE PARA LOS ENLACES
    $('.nav-link').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });
});