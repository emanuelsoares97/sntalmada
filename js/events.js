document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('event-cards')) {
    fetch('assets/events.json')
      .then(res => res.json())
      .then(eventos => {
        // Ordenar por data decrescente (mais recente primeiro)
        eventos.sort((a, b) => {
          const [da, ma, ya] = a.data.split('/').map(Number);
          const [db, mb, yb] = b.data.split('/').map(Number);
          const dateA = new Date(ya, ma - 1, da);
          const dateB = new Date(yb, mb - 1, db);
          return dateB - dateA;
        });
        const container = document.getElementById('event-cards');
        container.innerHTML = '';
        eventos.forEach(ev => {
          const card = document.createElement('div');
          card.className = 'event-card card';
          card.innerHTML = `
            <h2>${ev.titulo}</h2>
            <img src="${ev.imagem}" alt="${ev.titulo}" class="event-img">
            <div class="event-meta">
              <span class="event-date">${ev.data}</span>
              <span class="event-day">${ev.dia}</span>
              ${ev.hora ? `<span class="event-time">${ev.hora}</span>` : ''}
            </div>
            <p>${ev.descricao}</p>
          `;
          container.appendChild(card);
        });
      });
  }
}); 