document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show notification
                showNotification(`Navigasi ke ${this.textContent.trim()}`);
                
                // Switch sections
                const section = this.getAttribute('data-section');
                showSection(section);
            });
        });

        // Section switching functionality
        function showSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }

        // Card interactions
        function playGame() {
            showNotification('🎮 Memulai game...');
        }

        function showAchievements() {
            showNotification('🏆 Membuka achievements...');
        }

        function showFriends() {
            showNotification('👥 Membuka daftar teman...');
        }

        function openStore() {
            showNotification('🛒 Membuka store...');
        }

        // Games page functionality
        function playSpecificGame(gameName) {
            showNotification(`🎮 Memulai ${gameName}...`);
            window.location.href = gameName;
        }

        // Notification system
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Dynamic stats update
        function updateStats() {
            const statValues = document.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const currentValue = parseInt(stat.textContent);
                const increment = Math.floor(Math.random() * 5) + 1;
                stat.textContent = currentValue + increment;
            });
        }

        // Update progress bars animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }

        // Initialize animations on load
        window.addEventListener('load', () => {
            animateProgressBars();
            showNotification('🎉 Selamat datang di Hacktiv8 Game Dashboard!');
        });

        // Auto-update stats every 30 seconds
        setInterval(updateStats, 30000);

        // Add hover effects for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Filter functionality for games
        document.addEventListener('DOMContentLoaded', function() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            const gameCards = document.querySelectorAll('.game-card');

            // Filter by category
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Update active tab
                    filterTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.getAttribute('data-category');
                    
                    gameCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        });