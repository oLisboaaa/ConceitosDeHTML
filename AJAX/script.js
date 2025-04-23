document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#menu a');
    const conteudoDiv = document.getElementById('conteudo');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const conteudo = this.getAttribute('data-conteudo');
            carregarConteudo(conteudo);
        });
    });
    
    function carregarConteudo(conteudo) {
        conteudoDiv.innerHTML = '<p class="loading">Carregando conteúdo...</p>';
        
        fetch(`${conteudo}.html`)
            .then(response => {
                if (!response.ok) throw new Error('Conteúdo não encontrado');
                return response.text();
            })
            .then(html => {
                conteudoDiv.innerHTML = html;
            })
            .catch(error => {
                conteudoDiv.innerHTML = `<p class="error">Erro ao carregar o conteúdo: ${error.message}</p>`;
            });
    }
    
    if (links.length > 0) links[0].click();
});