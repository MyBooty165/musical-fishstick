document.addEventListener('DOMContentLoaded', function() {
    ver();
});

function ver() {
    const addgms = new Map();

    fetch('/json/g.json')
    .then(response => response.json())
    .then(data => {
        const gameContainer = document.getElementById('game-container');
        
        data.forEach(game => {
            if (game.tags && game.tags.length > 0) {
                game.tags.forEach(tag => {
                    const categoryDiv = document.querySelector(`#${tag}`);
                    if (categoryDiv) {
                        if (!addgms.has(tag) || addgms.get(tag).size < 20) {
                            if (!addgms.has(tag) || !addgms.get(tag).has(game.title)) {
                                const gameButton = document.createElement('div');
                                gameButton.classList.add('game-btn');
                                gameButton.innerHTML = `
                                    <a href="${game.directory}" class="game-button">
                                        <p class="game-title">${game.title}</p>
                                        ${game.proxy ? '<p class="proxy-banner">Proxy</p>' : ''}
                                        <img class="game-img" src="${game.img}" alt="${game.title}">
                                        <div class="underline"></div>
                                    </a>
                                `;
                                gameContainer.appendChild(gameButton);
                                categoryDiv.appendChild(gameButton);
                                
                                if (!addgms.has(tag)) {
                                    addgms.set(tag, new Set());
                                }
                                addgms.get(tag).add(game.title);
                            }
                        }
                    }
                });
            }
        });
    })
    .catch(error => {
        console.error('404:', error);
    });
}
