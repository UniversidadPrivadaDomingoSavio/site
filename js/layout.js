document.addEventListener("DOMContentLoaded", () => {
    
    // Inyectar el Header
    fetch('partials/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Error de red al cargar el header');
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Inyectar el Footer
    fetch('partials/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Error de red al cargar el footer');
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el footer:', error));
});