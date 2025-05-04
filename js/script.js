document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos que tienen la clase 'video-trigger' (los botones)
    const videoTriggers = document.querySelectorAll('.video-trigger');
    // Selecciona el contenedor principal del modal de vídeo
    const videoPlayerContainer = document.getElementById('video-player-container');
    // Selecciona el div donde se insertará el iframe del vídeo
    const videoPlayer = document.getElementById('video-player');
    // Selecciona el botón para cerrar el modal
    const closeVideoButton = document.getElementById('close-video');

    // Verifica si los elementos del modal existen en la página actual antes de añadir listeners
    // Esto evita errores en páginas como glosario.html que no tienen el modal
    if (videoPlayerContainer && videoPlayer && closeVideoButton) {

        // Añade un 'escuchador' de eventos a cada botón encontrado
        videoTriggers.forEach(button => {
            button.addEventListener('click', () => {
                // Obtiene el valor del atributo 'data-video-id' del botón clickeado
                const videoId = button.getAttribute('data-video-id');

                // Verifica si se encontró un videoId y no es un placeholder
                if (videoId && !videoId.startsWith('ID_VIDEO_')) {
                    // Crea un elemento iframe
                    const iframe = document.createElement('iframe');
                    // Establece la URL del vídeo de YouTube, añadiendo parámetros para autoplay y no mostrar relacionados
                    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`); // Added modestbranding=1
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'); // Added web-share
                    iframe.setAttribute('allowfullscreen', '');
                    iframe.setAttribute('title', 'Reproductor de vídeo de YouTube'); // Added title for accessibility

                    // Limpia cualquier contenido previo del reproductor (por si había otro vídeo)
                    videoPlayer.innerHTML = '';
                    // Añade el nuevo iframe al div 'video-player'
                    videoPlayer.appendChild(iframe);

                    // Muestra el contenedor del modal quitando la clase 'hidden'
                    videoPlayerContainer.classList.remove('hidden');
                    // Opcional: Enfocar el botón de cerrar para mejorar accesibilidad
                    closeVideoButton.focus();

                } else if (videoId && videoId.startsWith('ID_VIDEO_')) {
                     // Si es un placeholder, podrías mostrar un mensaje o simplemente no hacer nada
                     console.warn('Aún no se ha asignado un ID de vídeo real para este botón:', button.textContent);
                     // Opcional: alert('Vídeo aún no disponible.');
                } else {
                    // Si no se encuentra un videoId válido, muestra un error en la consola del navegador
                    console.error('Video ID no encontrado o inválido para este botón:', button.textContent);
                }
            });
        });

        // Función para cerrar el modal de vídeo
        const closeVideo = () => {
            // Oculta el contenedor del modal añadiendo la clase 'hidden'
            videoPlayerContainer.classList.add('hidden');
            // Detiene la reproducción del vídeo limpiando el contenido del reproductor
            // Establecer src='' es más efectivo para detener la reproducción en todos los navegadores
            const iframe = videoPlayer.querySelector('iframe');
            if (iframe) {
                iframe.setAttribute('src', ''); // Detiene la carga/reproducción
            }
            videoPlayer.innerHTML = ''; // Limpia el contenido
        };

        // Añade un 'escuchador' de eventos al botón de cerrar
        closeVideoButton.addEventListener('click', closeVideo);

        // Añade un 'escuchador' de eventos al contenedor del modal (fondo oscuro)
        videoPlayerContainer.addEventListener('click', (event) => {
            // Si el clic ocurrió directamente sobre el fondo oscuro (y no sobre el vídeo o el botón de cerrar)
            if (event.target === videoPlayerContainer) {
                // Cierra el vídeo
                closeVideo();
            }
        });

        // Opcional: Escuchar la tecla 'Escape' para cerrar el modal
        document.addEventListener('keydown', (event) => {
            // Si la tecla presionada es 'Escape' y el modal NO está oculto
            if (event.key === 'Escape' && !videoPlayerContainer.classList.contains('hidden')) {
                closeVideo();
            }
        });

    } else {
        // Si los elementos del modal no existen, simplemente no hacemos nada con ellos.
        // Podemos añadir un log si queremos saber en qué páginas no se carga el modal.
        // console.log("Modal de vídeo no encontrado en esta página. No se añadirán listeners.");
    }
});
