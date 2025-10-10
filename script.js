const randomDescriptions = [
    "Tapping Left-corner of the screen moves the theme button. Left handed users should enjoy too.",
    "My projects aim to respect User's Privacy at all time.",
    "Poems came into existence in every timeline once they heard your name echoed through the very fabric of reality.",
    "The @ symbol in email addresses was chosen by Ray Tomlinson in 1971 to separate user from host.",
    "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
    "A day on Venus is longer than its year - it takes 243 Earth days to rotate once but only 225 to orbit the sun.",
    "The first computer bug was an actual moth found in the Harvard Mark II computer in 1947.",
    "Bananas are berries, but strawberries aren't.",
    "The inventor of the microwave oven discovered the technology when a chocolate bar melted in his pocket near radar equipment.",
    "The Japanese art of kintsugi repairs broken pottery with gold, treating breakage as part of the object's history.",
    "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid.",
    "In ancient Rome, purple dye was so expensive that its use was restricted to only the highest officials.",
    "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
    "The dot over the letter 'i' is called a tittle.",
    "A group of flamingos is called a 'flamboyance'.",
    "The electric chair was invented by a dentist.",
    "Scotland has 421 words for 'snow' in its lexicon.",
    "The total weight of all ants on Earth is about equal to the total weight of all humans.",
    "Octopuses have three hearts, nine brains, and blue blood.",
    "Some say if you toggle the theme enough times, you might discover something... unexpected.",
    "Quick clicks bring hidden tricks, but only if you're fast enough.",
    "The most interesting things often require patience and persistence to uncover.",
    "There are more possible iterations of a game of chess than atoms in the known universe.",
    "A jiffy is an actual unit of time: 1/100th of a second.",
    "The shortest war in history was between Britain and Zanzibar in 1896, lasting only 38 minutes.",
    "Cows don't have upper front teeth.",
    "It is impossible for most people to lick their own elbow.",
    "The average person walks the equivalent of three times around the world in their lifetime.",
    "Butterflies taste with their feet.",
    "In the silent hum of wires, a million thoughts take flight, woven through the vast expanse of digital light.",
    "Where algorithms dance and data streams align, a boundless realm of knowledge, forever intertwined.",
    "From humble clicks to grand design, the web connects us, spanning space and time.",
    "Like whispered secrets on a global breeze, ideas traverse the net with effortless ease.",
    "A digital tapestry, where every thread holds a tale, in the endless loom of cyberspace, we prevail."
];

const hubArchiveSecrets = [
    "This archive is a testament to sleepless nights and countless cups of coffee.",
    "Every project here started with a single thought: 'What if?'",
	"Pressing the theme button 6 times summons me and my thoughts. While another 3, will send me away.",
    "Behind these links are stories of bugs, breakthroughs, and the joy of creation.",
	"Why? Because sometimes it only takes one yes for a million breakthrough.",
	"Must have been the wind.",
	"My Wife is alwaus in the vicinity of my thoughts.",
	"Elxi? That sounds like a great name for my next cat.",
	"I added fun facts for one out of two people will leave this place with a new knowledge.",
	"6-3-3 each of its own actions.",
	"Left-handed Users aren't missing out, tapping left corner even moves the theme button.",
    "A digital garden, where ideas are planted and allowed to grow. Welcome."
];

const catFrames = [
    String.raw`____________________________________
___ /\__ ,-,________________________
___/       .______,-.[ I miss ] ____
___(  ●  ●)______/ /.______________
___\ =      ×/-,_( (___ [ My ...]_
___/                 \`_____________
___|       Xsu.      _ \____________
___\   \    ,    /     |____________
___ | |  |   - _ \__  /_____________
____( (_ /\`~ (___ ,-/'______________
____________________________________`,
    String.raw`____________________________________
___ /\__ ,-,________________________
___/       ._____,-.[ I miss ] ____
___(  ●  ●)_____\`) |.______________
___\ =      ×/-,_|  \___ [ My wife.]_
___/                 \`_____________
___|       Xsu.      _ \____________
___\   \    ,    /     |____________
___ | |  |   - _ \__  /_____________
____( (_ /\`~ (___ ,-/'______________
____________________________________`,
    String.raw`____________________________________
___ /\__ ,-,________________________
___/       .____,-.[ I miss ] ____
___(  ●  ●)_____\`) \.______________
___\ =      ×/-,__\ \___ [ My wife.]_
___/                 \`_____________
___|       Xsu.      _ \____________
___\   \    ,    /     |____________
___ | |  |   - _ \__  /_____________
____( (_ /\`~ (___ ,-/'______________
____________________________________`
];

document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let lastClickTime = 0;
    let clickTimeout;
    let actionTimeout;
    let isCatVisible = false;
    let isColorfulMode = false;

    const textElement = document.getElementById('description-text');
    const randomIndex = Math.floor(Math.random() * randomDescriptions.length);
    const textToType = randomDescriptions[randomIndex];
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 40);
        } else {
            textElement.classList.remove('typing');
            document.querySelector('.description-box').style.height = 'auto';
        }
    }

    if (!sessionStorage.getItem('hasTyped')) {
        textElement.classList.add('typing');
        typeWriter();
        sessionStorage.setItem('hasTyped', 'true');
    } else {
        textElement.textContent = textToType;
        document.querySelector('.description-box').style.height = 'auto';
    }

    const fonts = [
        "'Monospace', monospace, monospace",
        "'Courier New', Courier, monospace",
        "'Times New Roman', Times, serif",
        "'Trebuchet MS', sans-serif",
        "Georgia, serif"
    ];
    let currentFont = 0;

    document.querySelector('.description-box').addEventListener('click', function() {
        currentFont = (currentFont + 1) % fonts.length;
        document.getElementById('description-text').style.fontFamily = fonts[currentFont];
    });

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const gridItem = button.closest('.grid-item');
            const description = gridItem.querySelector('.item-description');

            if (!window.matchMedia("(min-width: 769px)").matches) {
                if (description.classList.toggle('expanded')) {
                    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                    gridItem.style.borderColor = randomColor;
                } else {
                    gridItem.style.borderColor = '';
                }
            } else {
                const isNowExpanded = description.classList.toggle('expanded');
                if (isNowExpanded) {
                    gridItem.style.borderColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                    gridItem.classList.remove('is-expanded');
                } else {
                    gridItem.style.borderColor = '';
                }
            }
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeToggleContainer = document.getElementById('themeToggleContainer');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    let currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');

    function updateThemeToggleSymbol() {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<img src="/docs/assets/G2V.png" alt="Sun symbol" style="width: 80px; height: 80px;">';                     
        } else {
            themeToggle.innerHTML = '☾';
        }
    }

    function applyTheme() {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeToggleSymbol();
        localStorage.setItem('theme', currentTheme);
    }

    applyTheme();

    function handleClickAction() {
        if (clickCount === 3) {
            revertToNormal();
            isCatVisible = false;
            isColorfulMode = false;
        } else if (clickCount === 6) {
            showCatAnimation();
            isCatVisible = true;
            isColorfulMode = false;
        } else if (clickCount === 9) {
            if (isCatVisible) {
                if (isColorfulMode) {
                    const catContainer = document.getElementById('cat-container');
                    if (catContainer) {
                        catContainer.classList.remove('colorful-text');
                    }
                    isColorfulMode = false;
                } else {
                    activateColorfulMode();
                    isColorfulMode = true;
                }
            }
        }
        clickCount = 0;
    }

    themeToggle.addEventListener('click', () => {
        const now = Date.now();
        
        if (now - lastClickTime > 2000) {
            clickCount = 0;
        }
        
        lastClickTime = now;
        clickCount++;
        
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        
        clickTimeout = setTimeout(() => {
            handleClickAction();
        }, 2000);
        
        if (actionTimeout) {
            clearTimeout(actionTimeout);
        }
        
        actionTimeout = setTimeout(() => {
            handleClickAction();
        }, 2000);
        
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme();
    });

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme();
        }
    });

    if (window.matchMedia("(min-width: 769px)").matches) {
        document.querySelectorAll('.grid-item').forEach(item => {
            const description = item.querySelector('.item-description');

            item.addEventListener('mouseenter', () => {
                if (!description.classList.contains('expanded')) {
                    item.classList.add('is-expanded');
                    item.style.borderColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                }
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('is-expanded');
                if (!description.classList.contains('expanded')) {
                    item.style.borderColor = '';
                }
            });
        });
    }

    let buttonPosition = 'right';
    themeToggleContainer.classList.add('right-pos');

    const leftCornerBtn = document.getElementById('leftCornerBtn');
    const rightCornerBtn = document.getElementById('rightCornerBtn');

    function animateToggle(targetDirection) {
        themeToggleContainer.classList.remove('animate-out-right', 'animate-out-left', 'animate-in-left', 'animate-in-right');
        themeToggle.classList.remove('animate-spin-out-right', 'animate-spin-out-left', 'animate-spin-in-left', 'animate-spin-in-right');

        if (targetDirection === 'left') {
            themeToggleContainer.classList.add('animate-out-right');
            themeToggle.classList.add('animate-spin-out-right');

            const handleOutAnimationEnd = () => {
                themeToggleContainer.classList.remove('animate-out-right', 'right-pos');
                themeToggle.classList.remove('animate-spin-out-right');
                themeToggleContainer.classList.add('left-pos');
                themeToggleContainer.classList.add('animate-in-left');
                themeToggle.classList.add('animate-spin-in-left');
                buttonPosition = 'left';
                themeToggleContainer.removeEventListener('animationend', handleOutAnimationEnd);
            };
            themeToggleContainer.addEventListener('animationend', handleOutAnimationEnd, { once: true });

            const handleInAnimationEnd = () => {
                themeToggleContainer.classList.remove('animate-in-left');
                themeToggle.classList.remove('animate-spin-in-left');
                themeToggleContainer.removeEventListener('animationend', handleInAnimationEnd);
            };
            themeToggleContainer.addEventListener('animationend', handleInAnimationEnd, { once: true });

        } else if (targetDirection === 'right') {
            themeToggleContainer.classList.add('animate-out-left');
            themeToggle.classList.add('animate-spin-out-left');

            const handleOutAnimationEnd = () => {
                themeToggleContainer.classList.remove('animate-out-left', 'left-pos');
                themeToggle.classList.remove('animate-spin-out-left');
                themeToggleContainer.classList.add('right-pos');
                themeToggleContainer.classList.add('animate-in-right');
                themeToggle.classList.add('animate-spin-in-right');
                buttonPosition = 'right';
                themeToggleContainer.removeEventListener('animationend', handleOutAnimationEnd);
            };
            themeToggleContainer.addEventListener('animationend', handleOutAnimationEnd, { once: true });

            const handleInAnimationEnd = () => {
                themeToggleContainer.classList.remove('animate-in-right');
                themeToggle.classList.remove('animate-spin-in-right');
                themeToggleContainer.removeEventListener('animationend', handleInAnimationEnd);
            };
            themeToggleContainer.addEventListener('animationend', handleInAnimationEnd, { once: true });
        }
    }

    leftCornerBtn.addEventListener('click', () => {
        if (buttonPosition === 'right') {
            animateToggle('left');
        }
    });

    rightCornerBtn.addEventListener('click', () => {
        if (buttonPosition === 'left') {
            animateToggle('right');
        }
    });

    function showCatAnimation() {
        const asciiBanner = document.querySelector('.ascii-banner');
        const asciiArt = document.querySelector('.ascii-art');
        asciiArt.style.display = 'none';
        const catContainer = document.createElement('div');
        catContainer.className = 'cat-frame';
        catContainer.id = 'cat-container';
        asciiBanner.appendChild(catContainer);
        let currentFrame = 0;
        const catInterval = setInterval(() => {
            document.getElementById('cat-container').textContent = catFrames[currentFrame];
            currentFrame = (currentFrame + 1) % catFrames.length;
        }, 300);
        catContainer.dataset.intervalId = catInterval;
    }
    
    function activateColorfulMode() {
        const catContainer = document.getElementById('cat-container');
        if (catContainer) {
            catContainer.classList.add('colorful-text');
        }
    }
    
    function revertToNormal() {
        const asciiBanner = document.querySelector('.ascii-banner');
        const asciiArt = document.querySelector('.ascii-art');
        const catContainer = document.getElementById('cat-container');
        if (catContainer) {
            clearInterval(catContainer.dataset.intervalId);
            catContainer.classList.remove('colorful-text');
            asciiBanner.removeChild(catContainer);
        }
        asciiArt.style.display = 'block';
    }

    function showMiniPanel(contentHTML) {
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        document.body.appendChild(overlay);

        const panel = document.createElement('div');
        panel.className = 'mobile-mini-panel';
        panel.innerHTML = contentHTML;
        document.body.appendChild(panel);

        overlay.addEventListener('click', hideMiniPanel);
        
        setTimeout(() => {
            overlay.classList.add('visible');
            panel.classList.add('visible');
        }, 10);
    }

    function hideMiniPanel() {
        const overlay = document.querySelector('.panel-overlay');
        const panel = document.querySelector('.mobile-mini-panel');

        if (overlay && panel) {
            overlay.classList.remove('visible');
            panel.classList.remove('visible');

            setTimeout(() => {
                overlay.remove();
                panel.remove();
            }, 300);
        }
    }

    document.querySelector('.secondary-description-box').addEventListener('click', () => {
		const randomIndex = Math.floor(Math.random() * hubArchiveSecrets.length);
		const secretMessage = hubArchiveSecrets[randomIndex];
		showMiniPanel(`<p>${secretMessage}</p>`);
    });

    document.querySelectorAll('.item-header').forEach(header => {
        header.addEventListener('click', (e) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') { 
                    const gridItem = header.closest('.grid-item');
                    const description = gridItem.querySelector('.item-description p').innerHTML;
                    showMiniPanel(`<p>${description}</p>`);
                }
            }
        });
    });
});
