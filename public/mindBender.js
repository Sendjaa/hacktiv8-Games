  document.addEventListener('DOMContentLoaded', () => {
            const gameBoard = document.getElementById('game-board');
            const startButton = document.getElementById('start-button');
            const scoreElement = document.getElementById('score');
            const buttons = document.querySelectorAll('.game-button');

            let sequence = [];
            let playerSequence = [];
            let score = 0;
            let isPlayerTurn = false;

            // Fungsi untuk memulai permainan
            function startGame() {
                resetGame();
                startButton.disabled = true;
                startButton.textContent = 'Mulai Game...';
                nextRound();
            }

            // Fungsi untuk memulai putaran baru
            function nextRound() {
                isPlayerTurn = false;
                playerSequence = [];
                score++;
                scoreElement.textContent = score - 1;

                // Tambahkan warna baru ke urutan
                const randomColor = buttons[Math.floor(Math.random() * buttons.length)].dataset.color;
                sequence.push(randomColor);

                playSequence();
            }

            // Fungsi untuk memainkan urutan warna
            function playSequence() {
                let i = 0;
                const interval = setInterval(() => {
                    const color = sequence[i];
                    animateButton(color);
                    i++;
                    if (i >= sequence.length) {
                        clearInterval(interval);
                        isPlayerTurn = true;
                    }
                }, 800);
            }

            // Fungsi untuk menganimasikan tombol yang menyala
            function animateButton(color) {
                const button = document.getElementById(color);
                button.classList.add('active');
                button.style.setProperty('--button-color', getButtonColor(color));

                setTimeout(() => {
                    button.classList.remove('active');
                }, 400);
            }
            
            // Mengambil warna tombol dari CSS
            function getButtonColor(color) {
                switch(color) {
                    case 'green': return '#238636';
                    case 'red': return '#f85149';
                    case 'yellow': return '#fdd835';
                    case 'blue': return '#4f9afb';
                    default: return '#c9d1d9';
                }
            }

            // Fungsi untuk menangani klik pemain
            function handlePlayerClick(event) {
                if (!isPlayerTurn) return;

                const clickedColor = event.target.dataset.color;
                playerSequence.push(clickedColor);

                // Animasikan klik pemain
                animateButton(clickedColor);

                // Periksa apakah kliknya benar
                if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
                    // Kalah
                    endGame();
                } else if (playerSequence.length === sequence.length) {
                    // Menang di putaran ini
                    isPlayerTurn = false;
                    setTimeout(nextRound, 1000);
                }
            }

            // Fungsi untuk mengakhiri game
            function endGame() {
                isPlayerTurn = false;
                alert(`Game Berakhir! Skor terbaikmu adalah ${score - 1}.`);
                resetGame();
            }

            // Fungsi untuk mereset game ke kondisi awal
            function resetGame() {
                sequence = [];
                playerSequence = [];
                score = 0;
                scoreElement.textContent = 0;
                startButton.disabled = false;
                startButton.textContent = 'Mulai Game';
            }

            // Tambahkan event listener
            startButton.addEventListener('click', startGame);
            buttons.forEach(button => {
                button.addEventListener('click', handlePlayerClick);
            });
        });