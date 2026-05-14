(function(){
    // ----- ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ (сердечки + звёздочки) -----
    const container = document.querySelector('.floating-container');
    if(!container) return;

    const HEART_SYMBOLS = ['💛', '❤️', '🧡', '✨']; // сердечки и искра
    const STAR_SYMBOLS = ['⭐', '🌟', '❄️', '✦', '✧'];

    function createFloatingItem() {
        const isHeart = Math.random() > 0.6; // 40% звёзды, 60% сердечки/тёплые символы
        let symbol, className;
        if(isHeart) {
            symbol = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
            className = 'heart';
        } else {
            symbol = STAR_SYMBOLS[Math.floor(Math.random() * STAR_SYMBOLS.length)];
            className = 'star';
        }

        const div = document.createElement('div');
        div.classList.add('float-item', className);
        div.textContent = symbol;
        
        // случайный размер (rem)
        const size = 0.8 + Math.random() * 1.2;
        div.style.fontSize = `${size}rem`;
        div.style.left = `${Math.random() * 100}%`;
        div.style.animationDuration = `${6 + Math.random() * 12}s`;
        div.style.animationDelay = `${Math.random() * 5}s`;
        div.style.opacity = 0.4 + Math.random() * 0.5;
        
        container.appendChild(div);
        
        // удалить после окончания анимации
        div.addEventListener('animationend', () => {
            if(div.parentNode) div.remove();
        });
    }

    // создаём 25–30 элементов, и добавляем новые постепенно
    for(let i = 0; i < 28; i++) {
        setTimeout(() => createFloatingItem(), i * 300);
    }
    setInterval(() => {
        if(container.children.length < 40) createFloatingItem();
    }, 2500);

    // ----- ПЛЕЕР (Undertale style, нет автозапуска)-----
    const audio = document.getElementById('bgm');
    const playBtn = document.getElementById('playPauseBtn');
    
    if(audio && playBtn) {
        let isPlaying = false;
        
        playBtn.addEventListener('click', () => {
            if(isPlaying) {
                audio.pause();
                playBtn.textContent = '▶ PLAY';
                isPlaying = false;
            } else {
                // Обработка ошибки, если файл не загружен
                audio.play().then(() => {
                    playBtn.textContent = '⏸ пауза';
                    isPlaying = true;
                }).catch(err => {
                    console.warn("Аудио не воспроизводится:", err);
                    playBtn.textContent = '⚠️ NO FILE';
                    setTimeout(() => {
                        if(!isPlaying) playBtn.textContent = '▶ PLAY';
                    }, 1200);
                });
            }
        });
        
        // если аудио закончилось и зациклено? У нас стоит loop, но на всякий случай:
        audio.addEventListener('ended', () => {
            if(isPlaying) {
                audio.play().catch(e=>console.log);
            }
        });
    }

    // маленький фикс: при загрузке страницы убедимся, что музыка не стартует сама
    if(audio) audio.volume = 0.7;

    // добавим класс для поддержки "no-js" (для базовой читаемости)
    document.body.classList.remove('no-js');
})();