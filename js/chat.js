(function(){
    let widget = document.getElementById('chatBiblicoWidget');
    let abrir = document.getElementById('chatBiblicoAbrir');
    let minimizar = document.getElementById('chatBiblicoMinimizar');
    let mensagens = document.getElementById('chatBiblicoMensagens');
    let input = document.getElementById('chatBiblicoInput');
    let btn = document.getElementById('chatBiblicoBtn');
    let sessao_id = null, processando = false;

    if (!widget || !abrir || !minimizar || !mensagens || !input || !btn) {
        console.error('Elementos do widget de chat não encontrados.');
        return;
    }

    abrir.onclick = () => { abrir.style.display="none"; widget.style.display="flex"; input.focus(); }
    minimizar.onclick = () => { widget.style.display="none"; abrir.style.display="block"; }

    function addMsg(msg, tipo='bot') {
        let div = document.createElement('div');
        div.style.margin = '9px 0';
        div.style.whiteSpace = 'pre-line';
        if (tipo==='user') div.style.textAlign='right';
        div.innerHTML = msg;
        mensagens.appendChild(div);
        mensagens.scrollTop = mensagens.scrollHeight;
    }

    async function enviarPergunta() {
        let pergunta = input.value.trim();
        if (!pergunta || processando) return;
        addMsg("<b>Você:</b> " + pergunta, 'user');
        input.value = ""; btn.disabled = true; processando = true;
        addMsg("⏳...", 'bot');

        try {
            const resp = await fetch('/api/chat/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({pergunta: pergunta, sessao_id: sessao_id})
            });
            const data = await resp.json();
            if (mensagens.lastChild) mensagens.lastChild.remove();
            addMsg("<b>Bot:</b> " + (data.resposta || data.erro || 'Erro ao processar a resposta.'));
            sessao_id = data.sessao_id || sessao_id;
        } catch(e) {
            if (mensagens.lastChild) mensagens.lastChild.remove();
            addMsg("<b>Bot:</b> Erro de conexão. Verifique se o servidor está online e tente novamente.");
        } finally {
            btn.disabled = false; processando = false;
        }
    }

    btn.onclick = enviarPergunta;
    input.addEventListener('keypress', function(e){
        if (e.key==='Enter') btn.onclick();
    });
})(); 