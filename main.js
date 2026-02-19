$(document).ready(function() {
    // REVELO EL SITIO CON SUAVIDAD
    $('body').css('opacity', '0').fadeTo(1200, 1);

    // GESTIONO EL ENVÍO DEL FORMULARIO CORTO
    $('#contactForm').on('submit', async function(e) {
        e.preventDefault();

        const $btn = $(this).find('button');
        const originalText = $btn.text();
        
        // Datos del formulario
        const n_data = $('#nombre').val().trim();
        const t_data = $('#telefono').val().trim();

        $btn.text("PROCESANDO...").prop('disabled', true);

        try {
            const configResponse = await fetch('config.json');
            const cfg = await configResponse.json();
            const secret_k = cfg.p1 + cfg.p2 + cfg.p3;
            const target = atob(cfg.cid);
            const msg_body = `*Contacto WebDR*\n\n*Nombre:* ${n_data}\n*Teléfono:* ${t_data}`;
            const gateway = `https://api.telegram.org/bot${secret_k}/sendMessage`;
            const response = await fetch(gateway, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: target,
                    text: msg_body,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                $btn.text("¡SOLICITUD ENVIADA!").css('background-color', '#28a745');
                $('#contactForm')[0].reset();
                
                setTimeout(() => {
                    $btn.text(originalText).css('background-color', '').prop('disabled', false);
                }, 3000);
            } else {
                throw new Error("No se ha podido enviar el mensaje.");
            }

        } catch (error) {
            console.error(error);
            alert("Error al procesar el envío. Inténtalo de nuevo.");
            $btn.text(originalText).prop('disabled', false);
        }
    });

    // SCROLL SUAVE PARA LOS ENLACES
    $('.nav-link, .btn-contacto').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // MODALES PARA TRATAMIENTOS
    $('.service-card').on('click', async function() {
        const tratamientoId = $(this).data('id'); // Obtiene bbglow, microblading, etc.
        
        try {
            // Cargamos el archivo JSON
            const response = await fetch('modals.json');
            const datos = await response.json();
            
            // Seleccionamos el tratamiento específico
            const info = datos[tratamientoId];

            if (info) {
                // Inyectamos el contenido en el modal
                $('#modalTitulo').text(info.titulo);
                $('#modalDescripcion').text(info.descripcion);
                $('#imgAntes').attr('src', info.antes);
                $('#imgDespues').attr('src', info.despues);

                // Abrimos el modal (usando el objeto de Bootstrap)
                const myModal = new bootstrap.Modal(document.getElementById('treatmentModal'));
                myModal.show();
            }
        } catch (error) {
            console.error("Error cargando la información del tratamiento:", error);
        }
    });
});