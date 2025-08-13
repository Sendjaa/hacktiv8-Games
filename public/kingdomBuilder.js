 let gameState = {};

        // Definisi bangunan dengan biaya dan produksi
        const buildings = {
            house: { cost: { wood: 10 }, population_increase: 1, name: 'Rumah' },
            farm: { cost: { wood: 10 }, food_production: 2, name: 'Pertanian' },
            lumberjack: { cost: { wood: 10 }, wood_production: 2, name: 'Penebang Kayu' },
            market: { cost: { wood: 10 }, gold_production: 1, name: 'Pasar' }
        };

        // Elemen UI
        const uiElements = {
            gold: document.getElementById('gold'),
            food: document.getElementById('food'),
            wood: document.getElementById('wood'),
            population: document.getElementById('population'),
            messageLog: document.getElementById('message-log'),
            buildHouseBtn: document.getElementById('build-house'),
            buildFarmBtn: document.getElementById('build-farm'),
            buildLumberjackBtn: document.getElementById('build-lumberjack'),
            buildMarketBtn: document.getElementById('build-market'),
            gatherWoodBtn: document.getElementById('gather-wood'),
            gatherFoodBtn: document.getElementById('gather-food'),
            resetBtn: document.getElementById('reset-game'),
        };

        let gameInterval = null;

        // Fungsi untuk menginisialisasi atau mereset status game
        function initGame() {
            // Hapus interval yang sudah ada
            if (gameInterval) {
                clearInterval(gameInterval);
            }

            gameState = {
                gold: 10,
                food: 20,
                wood: 15,
                population: 2,
                buildings: {
                    house: 1,
                    farm: 0,
                    lumberjack: 0,
                    market: 0
                }
            };
            
            // Hapus log pesan
            uiElements.messageLog.innerHTML = '';
            addMessage('Game dimulai! Selamat datang di kerajaanmu.');
            
            // Mulai loop game
            gameInterval = setInterval(gameLoop, 2000); // Game berjalan setiap 2 detik
            updateUI();
        }

        // Fungsi untuk memperbarui UI dengan status game saat ini
        function updateUI() {
            uiElements.gold.textContent = gameState.gold;
            uiElements.food.textContent = gameState.food;
            uiElements.wood.textContent = gameState.wood;
            uiElements.population.textContent = gameState.population;
        }

        // Fungsi untuk menambahkan pesan ke log
        function addMessage(message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            uiElements.messageLog.appendChild(messageElement);
            // Gulir ke bagian bawah log
            uiElements.messageLog.scrollTop = uiElements.messageLog.scrollHeight;
        }

        // Loop utama game
        function gameLoop() {
            // Periksa kondisi game over
            if (gameState.food <= 0) {
                addMessage('Game Over! Kamu kehabisan makanan.');
                clearInterval(gameInterval);
                return;
            }

            // Konsumsi makanan
            gameState.food -= gameState.population;
            if (gameState.food < 0) {
                gameState.food = 0;
            }

            // Produksi dari bangunan
            gameState.wood += gameState.buildings.lumberjack * 2;
            gameState.food += gameState.buildings.farm * 2;
            gameState.gold += gameState.buildings.market * 1;
            
            addMessage(`Populasi memakan ${gameState.population} makanan. Produksi dari bangunan.`);
            updateUI();
        }

        // Fungsi untuk menangani pembangunan struktur baru
        function build(buildingType) {
            const building = buildings[buildingType];
            const cost = building.cost;
            let canBuild = true;

            // Periksa apakah pemain memiliki sumber daya yang cukup
            for (const resource in cost) {
                if (gameState[resource] < cost[resource]) {
                    canBuild = false;
                    addMessage(`Tidak bisa membangun ${building.name}. Butuh lebih banyak ${resource}.`);
                    return;
                }
            }

            if (canBuild) {
                // Kurangi biaya
                for (const resource in cost) {
                    gameState[resource] -= cost[resource];
                }

                // Tingkatkan populasi jika itu adalah rumah
                if (building.population_increase) {
                    gameState.population += building.population_increase;
                }
                
                // Tambahkan bangunan ke hitungan
                gameState.buildings[buildingType]++;

                addMessage(`Berhasil membangun ${building.name}.`);
                updateUI();
            }
        }

        // Event Listener untuk semua tombol
        uiElements.buildHouseBtn.addEventListener('click', () => build('house'));
        uiElements.buildFarmBtn.addEventListener('click', () => build('farm'));
        uiElements.buildLumberjackBtn.addEventListener('click', () => build('lumberjack'));
        uiElements.buildMarketBtn.addEventListener('click', () => build('market'));
        
        uiElements.gatherWoodBtn.addEventListener('click', () => {
            gameState.wood += 5;
            addMessage('Kamu memanen 5 kayu.');
            updateUI();
        });

        uiElements.gatherFoodBtn.addEventListener('click', () => {
            gameState.food += 5;
            addMessage('Kamu memanen 5 makanan.');
            updateUI();
        });

        uiElements.resetBtn.addEventListener('click', () => {
            initGame();
        });
        
        // Game dimulai saat halaman dimuat
        window.onload = initGame;