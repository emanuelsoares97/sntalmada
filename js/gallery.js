document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  fetch('assets/gallery.json')
    .then(res => res.json())
    .then(fotos => {
      grid.innerHTML = '';
      fotos.forEach(foto => {
        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;
        img.className = 'gallery-img';
        grid.appendChild(img);
      });
    });
}); 