document.addEventListener('DOMContentLoaded', () => {
            // Aset kartu menggunakan emoji
            const cardAssets = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🍍'];
            
            const gameBoard = document.getElementById('game-board');
            const movesElement = document.getElementById('moves');
            const resetButton = document.getElementById('reset-button');
            const messageBox = document.getElementById('message-box');
            const messageText = document.getElementById('message-text');
            const closeMessageButton = document.getElementById('close-message');

            let cards = [];
            let cardsFlipped = [];
            let matchedPairs = 0;
            let moves = 0;
            let isBoardLocked = false;

            // Fungsi untuk mengacak array
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            // Fungsi untuk membuat dan menampilkan kartu
            function createBoard() {
                // Duplikasi aset untuk membuat pasangan dan mengacaknya
                cards = [...cardAssets, ...cardAssets];
                shuffle(cards);

                gameBoard.innerHTML = '';
                cards.forEach((cardValue, index) => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.dataset.value = cardValue;
                    card.dataset.index = index;
                    
                    // Struktur internal kartu untuk efek flip 3D
                    card.innerHTML = `
                        <div class="card-inner">
                            <div class="card-face card-face-back"><i class="fas fa-heart"></i></div>
                            <div class="card-face card-face-front">${cardValue}</div>
                        </div>
                    `;
                    
                    card.addEventListener('click', flipCard);
                    gameBoard.appendChild(card);
                });
            }

            // Fungsi untuk menangani klik pada kartu
            function flipCard(event) {
                if (isBoardLocked) return;
                
                const clickedCard = event.currentTarget;
                
                // Mencegah klik pada kartu yang sudah terbuka atau yang sedang diperiksa
                if (clickedCard.classList.contains('flipped') || clickedCard === cardsFlipped[0]) {
                    return;
                }

                clickedCard.classList.add('flipped');
                cardsFlipped.push(clickedCard);
                
                // Jika dua kartu sudah terbuka, periksa apakah mereka cocok
                if (cardsFlipped.length === 2) {
                    isBoardLocked = true;
                    moves++;
                    movesElement.textContent = moves;
                    checkForMatch();
                }
            }

            // Fungsi untuk memeriksa pasangan kartu
            function checkForMatch() {
                const [firstCard, secondCard] = cardsFlipped;
                
                if (firstCard.dataset.value === secondCard.dataset.value) {
                    // Kartu cocok
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matchedPairs++;
                    cardsFlipped = [];
                    isBoardLocked = false;

                    // Periksa apakah game sudah selesai
                    if (matchedPairs === cardAssets.length) {
                        endGame();
                    }
                } else {
                    // Kartu tidak cocok, tutup kembali setelah jeda
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        cardsFlipped = [];
                        isBoardLocked = false;
                    }, 1000);
                }
            }
            
            // Fungsi untuk mengakhiri permainan
            function endGame() {
                setTimeout(() => {
                    messageText.textContent = `Kamu menang dalam ${moves} langkah!`;
                    messageBox.style.display = 'block';
                }, 500);
            }

            // Fungsi untuk mereset permainan
            function resetGame() {
                moves = 0;
                matchedPairs = 0;
                cardsFlipped = [];
                isBoardLocked = false;
                movesElement.textContent = moves;
                messageBox.style.display = 'none';
                createBoard();
            }

            // Event listener untuk tombol ulang
            resetButton.addEventListener('click', resetGame);
            closeMessageButton.addEventListener('click', resetGame);
            
            // Memulai game
            createBoard();
        });