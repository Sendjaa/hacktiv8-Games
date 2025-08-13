 const resultArea = document.getElementById('result-area');
        const resultText = document.getElementById('result-text');
        const playerChoiceEl = document.getElementById('player-choice');
        const computerChoiceEl = document.getElementById('computer-choice');
        const playerScoreEl = document.getElementById('player-score');
        const computerScoreEl = document.getElementById('computer-score');

        // Pilihan yang mungkin
        const choices = ['Batu', 'Kertas', 'Gunting'];

        // Skor
        let playerScore = 0;
        let computerScore = 0;

        /**
         * @function playGame
         * @description Logika utama game Batu, Gunting, Kertas
         * @param {string} playerSelection - Pilihan pemain (Batu, Kertas, atau Gunting)
         */
        function playGame(playerSelection) {
            // Pilihan komputer secara acak
            const computerSelection = choices[Math.floor(Math.random() * choices.length)];

            // Menampilkan pilihan di UI
            playerChoiceEl.textContent = `Kamu: ${playerSelection}`;
            computerChoiceEl.textContent = `Komputer: ${computerSelection}`;
            
            // Menentukan pemenang
            const winner = getWinner(playerSelection, computerSelection);

            // Memperbarui UI berdasarkan hasil
            updateUI(winner);
        }

        /**
         * @function getWinner
         * @description Menentukan pemenang dari pilihan pemain dan komputer.
         * @param {string} player - Pilihan pemain.
         * @param {string} computer - Pilihan komputer.
         * @returns {string} 'win', 'lose', atau 'draw'.
         */
        function getWinner(player, computer) {
            if (player === computer) {
                return 'draw';
            }
            if (
                (player === 'Batu' && computer === 'Gunting') ||
                (player === 'Kertas' && computer === 'Batu') ||
                (player === 'Gunting' && computer === 'Kertas')
            ) {
                return 'win';
            } else {
                return 'lose';
            }
        }
        
        /**
         * @function updateUI
         * @description Memperbarui tampilan UI (skor, pesan, dan warna)
         * @param {string} winner - Hasil permainan
         */
        function updateUI(winner) {
            // Hapus semua kelas hasil sebelumnya
            resultArea.classList.remove('win', 'lose', 'draw');
            
            if (winner === 'win') {
                playerScore++;
                resultText.textContent = 'Kamu Menang!';
                resultArea.classList.add('win');
            } else if (winner === 'lose') {
                computerScore++;
                resultText.textContent = 'Kamu Kalah!';
                resultArea.classList.add('lose');
            } else {
                resultText.textContent = 'Seri!';
                resultArea.classList.add('draw');
            }
            
            // Perbarui skor di UI
            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;
        }