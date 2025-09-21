class MiljoQuizGame {
    constructor() {
        this.boardSize = 100;
        this.boardWidth = 10;
        this.boardHeight = 10;
        this.playerPosition = 1;
        this.aiPosition = 1;
        this.currentPlayer = 'human';
        this.selectedOpponent = null;
        this.usedQuestions = new Set();
        this.gameBoard = document.getElementById('gameBoard');
        this.rollDiceBtn = document.getElementById('rollDice');
        this.playerDiceResult = document.getElementById('playerDiceResult');
        this.aiDiceResult = document.getElementById('aiDiceResult');
        this.questionModal = document.getElementById('questionModal');
        this.gameMessage = document.getElementById('gameMessage');
        this.gameStarted = false;
        
        // Stiger: fra (nederste rute) til (øverste rute) - fra ChatGPT brettet
        this.ladders = [
            {from: 4, to: 38, name: 'Første stige'},
            {from: 14, to: 68, name: 'Lang stige'},
            {from: 19, to: 60, name: 'Middels stige'},
            {from: 30, to: 52, name: 'Kort stige'},
            {from: 45, to: 75, name: 'Høy stige'},
            {from: 58, to: 82, name: 'Siste stige'}
        ];
        
        // Slanger: fra (hode/øverste) til (hale/nederste) - fra ChatGPT brettet
        this.snakes = [
            {from: 33, to: 9, name: 'Første slange'},
            {from: 54, to: 46, name: 'Kort slange'},
            {from: 80, to: 42, name: 'Lang slange'},
            {from: 88, to: 67, name: 'Middels slange'},
            {from: 95, to: 76, name: 'Stor slange'},
            {from: 98, to: 25, name: 'Siste slange'}
        ];
        
        this.questions = [
            {
                question: "Hvor mye av verdens søppel består av plast?",
                answers: ["10%", "25%", "40%", "55%"],
                correct: 0,
                explanation: "Omtrent 10% av alt søppel består av plast, men det tar hundrevis av år å brytes ned."
            },
            {
                question: "Hva er den største kilden til CO2-utslipp globalt?",
                answers: ["Transport", "Energiproduksjon", "Industri", "Landbruk"],
                correct: 1,
                explanation: "Energiproduksjon, hovedsakelig fra fossile brennstoffer, står for omtrent 25% av globale utslipp."
            },
            {
                question: "Hvor mange liter vann trengs for å produsere 1 kg storfekjøtt?",
                answers: ["500 liter", "2000 liter", "8000 liter", "15000 liter"],
                correct: 3,
                explanation: "Det trengs omtrent 15000 liter vann for å produsere 1 kg storfekjøtt."
            },
            {
                question: "Hvilken type energi produserer mest strøm i Norge?",
                answers: ["Vannkraft", "Vindkraft", "Solkraft", "Atomkraft"],
                correct: 0,
                explanation: "Norge produserer over 95% av sin elektrisitet fra vannkraft."
            },
            {
                question: "Hvor lang tid tar det for en plastflaske å brytes ned naturlig?",
                answers: ["10 år", "50 år", "200 år", "450 år"],
                correct: 3,
                explanation: "En plastflaske kan ta opptil 450 år å brytes ned helt naturlig."
            },
            {
                question: "Hva er den mest effektive måten å redusere personlig karbonavtrykk?",
                answers: ["Spise mindre kjøtt", "Fly mindre", "Bruke mindre strøm", "Resirkulere mer"],
                correct: 1,
                explanation: "Å redusere flyreiser har størst effekt på personlig karbonavtrykk."
            },
            {
                question: "Hvor mye av jordens ferskvann er tilgjengelig for menneskelig bruk?",
                answers: ["30%", "10%", "3%", "1%"],
                correct: 3,
                explanation: "Bare omtrent 1% av jordens ferskvann er tilgjengelig for menneskelig bruk."
            },
            {
                question: "Hvilket land produserer mest fornybar energi per innbygger?",
                answers: ["Norge", "Island", "Danmark", "Sverige"],
                correct: 1,
                explanation: "Island produserer mest fornybar energi per innbygger, hovedsakelig fra geotermisk energi."
            },
            {
                question: "Hvor mye energi kan man spare ved å senke romtemperaturen med 1 grad?",
                answers: ["2%", "5%", "7%", "10%"],
                correct: 2,
                explanation: "Man kan spare omtrent 7% energi ved å senke romtemperaturen med bare 1 grad."
            },
            {
                question: "Hva er den vanligste årsaken til skogbrann?",
                answers: ["Lyn", "Menneskelig aktivitet", "Spontan antennelse", "Vulkaner"],
                correct: 1,
                explanation: "Over 80% av skogbranner skyldes menneskelig aktivitet."
            },
            {
                question: "Hvor mange tonn CO2 slipper en gjennomsnittsnordmann ut per år?",
                answers: ["5 tonn", "8 tonn", "12 tonn", "16 tonn"],
                correct: 2,
                explanation: "En gjennomsnittsnordmann slipper ut omtrent 12 tonn CO2 per år."
            },
            {
                question: "Hvilket materiale er best for miljøet som handlepose?",
                answers: ["Plast", "Papir", "Bomull", "Gjenbrukbar pose"],
                correct: 3,
                explanation: "Gjenbrukbare poser er best for miljøet når de brukes mange ganger."
            },
            {
                question: "Hvor mye av verdens elektrisitet kommer fra fornybare kilder?",
                answers: ["15%", "25%", "35%", "45%"],
                correct: 1,
                explanation: "Omtrent 25% av verdens elektrisitet kommer fra fornybare energikilder."
            },
            {
                question: "Hva er den største trusselen mot biologisk mangfold?",
                answers: ["Klimaendringer", "Forurensning", "Habitatødeleggelse", "Invasive arter"],
                correct: 2,
                explanation: "Habitatødeleggelse er den største trusselen mot biologisk mangfold globalt."
            },
            {
                question: "Hvor mye av verdens mat kastes hvert år?",
                answers: ["15%", "25%", "33%", "40%"],
                correct: 2,
                explanation: "Omtrent en tredjedel av all mat som produseres kastes hvert år."
            },
            {
                question: "Hvilken sektor bruker mest vann globalt?",
                answers: ["Husholdninger", "Industri", "Landbruk", "Energiproduksjon"],
                correct: 2,
                explanation: "Landbruk bruker omtrent 70% av verdens ferskvann."
            },
            {
                question: "Hvor mye av jordens overflate er dekket av skog?",
                answers: ["20%", "31%", "45%", "52%"],
                correct: 1,
                explanation: "Omtrent 31% av jordens landområder er dekket av skog."
            },
            {
                question: "Hvilket land har størst CO2-utslipp per innbygger?",
                answers: ["USA", "Kina", "Qatar", "Australia"],
                correct: 2,
                explanation: "Qatar har høyest CO2-utslipp per innbygger, hovedsakelig fra olje- og gassindustrien."
            },
            {
                question: "Hvor lang tid tar det for en aluminiumsboks å brytes ned?",
                answers: ["50 år", "100 år", "200 år", "500 år"],
                correct: 3,
                explanation: "En aluminiumsboks kan ta 200-500 år å brytes ned naturlig."
            },
            {
                question: "Hva er hovedårsaken til avskoging i Amazonas?",
                answers: ["Tømmer", "Storfe-ranching", "Soyadyrking", "Byutvikling"],
                correct: 1,
                explanation: "Storfe-ranching er den største driveren for avskoging i Amazonas."
            },
            {
                question: "Hvor mye energi sparer en LED-pære sammenlignet med en glødelampe?",
                answers: ["50%", "70%", "80%", "90%"],
                correct: 3,
                explanation: "LED-pærer bruker omtrent 90% mindre energi enn tradisjonelle glødelamper."
            },
            {
                question: "Hvilket materiale kan resirkuleres uendelig mange ganger?",
                answers: ["Papir", "Plast", "Glass", "Tekstiler"],
                correct: 2,
                explanation: "Glass kan resirkuleres uendelig mange ganger uten kvalitetstap."
            },
            {
                question: "Hvor mange grader har global temperatur økt siden førindustriell tid?",
                answers: ["0.5°C", "1.1°C", "2.0°C", "3.2°C"],
                correct: 1,
                explanation: "Global temperatur har økt med omtrent 1.1°C siden førindustriell tid."
            },
            {
                question: "Hvilket transportmiddel produserer mest CO2 per kilometer per person?",
                answers: ["Fly", "Bil", "Buss", "Tog"],
                correct: 0,
                explanation: "Fly produserer mest CO2 per kilometer per person, spesielt på korte distanser."
            },
            {
                question: "Hvor mye av verdens oksygen produseres av havet?",
                answers: ["30%", "50%", "70%", "90%"],
                correct: 2,
                explanation: "Havet produserer omtrent 70% av verdens oksygen gjennom planteplankton."
            },
            {
                question: "Hva er den mest miljøvennlige måten å varme opp hjemmet på?",
                answers: ["Olje", "Gass", "Varmepumpe", "Ved"],
                correct: 2,
                explanation: "Varmepumper er mest energieffektive og miljøvennlige for oppvarming."
            },
            {
                question: "Hvor mange plastflasker kastes hvert minutt på verdensbasis?",
                answers: ["50,000", "500,000", "1 million", "2 millioner"],
                correct: 2,
                explanation: "Over 1 million plastflasker kastes hvert minutt på verdensbasis."
            },
            {
                question: "Hvilket land har verdens største regnskog?",
                answers: ["Brasil", "Indonesia", "Kongo", "Peru"],
                correct: 0,
                explanation: "Brasil har verdens største regnskog med Amazonas-regnskogen."
            },
            {
                question: "Hvor mye CO2 kan ett tre absorbere i løpet av sin levetid?",
                answers: ["100 kg", "500 kg", "1 tonn", "2 tonn"],
                correct: 2,
                explanation: "Et gjennomsnittlig tre kan absorbere omtrent 1 tonn CO2 i løpet av sin levetid."
            },
            {
                question: "Hva bruker mest energi i et typisk hjem?",
                answers: ["Oppvarming", "Varmtvann", "Belysning", "Elektronikk"],
                correct: 0,
                explanation: "Oppvarming står for omtrent 60-70% av energibruken i norske hjem."
            },
            {
                question: "Hvor mange dyrearter dør ut hver dag på grunn av menneskelig aktivitet?",
                answers: ["10", "50", "150", "300"],
                correct: 2,
                explanation: "Forskere anslår at 100-150 arter dør ut hver dag på grunn av menneskelig påvirkning."
            },
            {
                question: "Hvilket fiskeri er mest bærekraftig?",
                answers: ["Trålfiske", "Snurrevad", "Krokfiske", "Kastenot"],
                correct: 2,
                explanation: "Krokfiske er mest selektivt og skåner havbunnen og andre arter."
            },
            {
                question: "Hvor mye av Norges strøm kommer fra fornybare kilder?",
                answers: ["85%", "95%", "98%", "100%"],
                correct: 2,
                explanation: "Omtrent 98% av Norges strømproduksjon kommer fra fornybare kilder."
            },
            {
                question: "Hva skjer med elektronikk-avfall i Norge?",
                answers: ["Kastes", "Eksporteres", "Resirkuleres", "Brennes"],
                correct: 2,
                explanation: "Norge har god ordning for innsamling og resirkulering av elektronikk-avfall."
            },
            {
                question: "Hvilken måte å tørke klær på er mest miljøvennlig?",
                answers: ["Tørketrommel", "Lufttørking", "Varmevifte", "Radiator"],
                correct: 1,
                explanation: "Lufttørking bruker ingen energi og er derfor mest miljøvennlig."
            },
            {
                question: "Hvor mange prosent av verdens korn brukes til dyrefôr?",
                answers: ["20%", "35%", "50%", "65%"],
                correct: 2,
                explanation: "Omtrent 50% av verdens kornproduksjon brukes til dyrefôr."
            },
            {
                question: "Hva er den største kilden til mikroplast i havet?",
                answers: ["Plastposer", "Billdekk", "Kosmetikk", "Tekstiler"],
                correct: 3,
                explanation: "Syntetiske tekstiler slipper mikroplast ved vask og er en hovedkilde til forurensning."
            },
            {
                question: "Hva er den mest miljøvennlige måten å transportere gods over lange avstander?",
                answers: ["Fly", "Lastebil", "Tog", "Skip"],
                correct: 3,
                explanation: "Skip er den mest energieffektive måten å transportere gods over lange avstander."
            },
            {
                question: "Hvor mye av jordens is finnes i Antarktis?",
                answers: ["50%", "70%", "85%", "90%"],
                correct: 3,
                explanation: "Antarktis inneholder omtrent 90% av jordens ferskvann i form av is."
            },
            {
                question: "Hvilket land er verdens største produsent av solenergi?",
                answers: ["Tyskland", "USA", "Kina", "Japan"],
                correct: 2,
                explanation: "Kina er verdens største produsent av solenergi."
            },
            {
                question: "Hvor mange arter dør ut daglig på grunn av menneskelig aktivitet?",
                answers: ["10-50", "100-200", "150-300", "1000+"],
                correct: 2,
                explanation: "Forskere estimerer at 100-200 arter dør ut daglig på grunn av menneskelig påvirkning."
            },
            {
                question: "Hva er hovedkilden til metan-utslipp?",
                answers: ["Biltrafikk", "Husdyr", "Industri", "Søppelfyllinger"],
                correct: 1,
                explanation: "Husdyr, spesielt storfe, er en av de største kildene til metan-utslipp."
            },
            {
                question: "Hvor stor del av havet er beskyttet av marine verneområder?",
                answers: ["2%", "8%", "15%", "25%"],
                correct: 1,
                explanation: "Kun omtrent 8% av verdenshavene er beskyttet av marine verneområder."
            }
        ];
        
        this.questionSquares = [7, 13, 19, 23, 28, 35, 41, 47, 54, 61, 63, 69, 77, 82, 89, 93, 97];
        
        this.opponents = {
            emma: {
                name: "Øko-Emma",
                icon: "🌱",
                accuracy: 0.85,
                correctComments: [
                    "Selvfølgelig! Det lærte jeg på universitetet!",
                    "Åpenbart! Jeg leser miljørapporter til frokost!",
                    "Dette er jo miljøvitenskap 101!",
                    "Bingo! Min masteroppgave handlet om dette!"
                ],
                wrongComments: [
                    "Hmm, det var overraskende...",
                    "Jeg må visst oppdatere forskningsnotatet mitt",
                    "Det der står ikke i mine fagbøker...",
                    "Kanskje jeg burde lese mer enn bare vitenskapelige artikler?"
                ]
            },
            geir: {
                name: "Grønne-Geir",
                icon: "🌿",
                accuracy: 0.60,
                correctComments: [
                    "Yes! Det lærte jeg på NRK!",
                    "Jeg visste det! Netflix-dokumentarer funker!",
                    "Riktig! Takk Greenpeace-nyhetsbrevet!",
                    "Boom! Miljøpodcaster for seieren!"
                ],
                wrongComments: [
                    "Oi... det står ikke på Instagram...",
                    "Hmm, kanskje jeg burde lese mer enn bare overskrifter",
                    "Det der kom ikke opp på TikTok miljøtips",
                    "Åh nei, jeg trodde jeg hadde kontroll!"
                ]
            },
            simen: {
                name: "Slappe-Simen",
                icon: "💨",
                accuracy: 0.25,
                correctComments: [
                    "Eh... flaks!",
                    "Wow, jeg gjettet riktig!",
                    "Hæ? Var det riktig?",
                    "Tilfeldig klikk FTW!"
                ],
                wrongComments: [
                    "Miljø er kjedelig anyway...",
                    "Kan vi bestille pizza i stedet?",
                    "Hvem bryr seg om klima? *burp*",
                    "Er det ikke noen som kan fikse det for meg?",
                    "Miljø... det er bare en mote, right?"
                ]
            }
        };
        
        // Audio kontekst for lydeffekter
        this.audioContext = null;
        
        // SVG brett konfigurasjon
        this.CHECKER_FACTOR = 1.5; // Fargestyrke som ønsket
        this.SNAKE_INSET = 0.28;
        
        this.init();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API ikke støttet');
        }
    }
    
    playLadderSound() {
        if (!this.audioContext) return;
        
        // Stigende tonerekke
        const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00]; // C-D-E-F-G
        let time = this.audioContext.currentTime;
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, time + index * 0.15);
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, time + index * 0.15);
            gainNode.gain.linearRampToValueAtTime(0.3, time + index * 0.15 + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, time + index * 0.15 + 0.15);
            
            oscillator.start(time + index * 0.15);
            oscillator.stop(time + index * 0.15 + 0.15);
        });
    }
    
    playSnakeSound() {
        if (!this.audioContext) return;
        
        // Glidende lyd nedover
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const time = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(400, time);
        oscillator.frequency.exponentialRampToValueAtTime(100, time + 1);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.4, time + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, time + 1);
        
        oscillator.start(time);
        oscillator.stop(time + 1);
    }
    
    playVictoryFanfare() {
        if (!this.audioContext) return;
        
        // Triumferende fanfare-melodi: C-E-G-C (høyere)
        const fanfareMelody = [
            {freq: 261.63, start: 0, duration: 0.3},     // C
            {freq: 329.63, start: 0.3, duration: 0.3},   // E
            {freq: 392.00, start: 0.6, duration: 0.3},   // G
            {freq: 523.25, start: 0.9, duration: 0.6},   // C (høyere)
            // Ekstra akkorder for fylde
            {freq: 329.63, start: 0.9, duration: 0.6},   // E
            {freq: 392.00, start: 0.9, duration: 0.6},   // G
        ];
        
        const time = this.audioContext.currentTime;
        
        fanfareMelody.forEach(note => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, time + note.start);
            oscillator.type = 'triangle';
            
            const startTime = time + note.start;
            const endTime = startTime + note.duration;
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0.3, endTime - 0.1);
            gainNode.gain.linearRampToValueAtTime(0, endTime);
            
            oscillator.start(startTime);
            oscillator.stop(endTime);
        });
    }
    
    // --- SVG Brett Funksjoner ---
    numToRowCol(n) {
        const idx = n - 1;
        const rowFromBottom = Math.floor(idx / 10);
        const pos = idx % 10;
        const row = 9 - rowFromBottom;
        const col = (rowFromBottom % 2 === 0) ? pos : (9 - pos);
        return { row: row, col: col };
    }
    
    cellCenter(n) {
        const rc = this.numToRowCol(n);
        return { x: rc.col * 100 + 50, y: rc.row * 100 + 50 };
    }
    
    ensureGradients() {
        const NS = 'http://www.w3.org/2000/svg';
        const svg = document.getElementById('gameBoard');
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS(NS, 'defs');
            svg.insertBefore(defs, svg.firstChild);
        }
        if (!document.getElementById('bambooGrad')) {
            const lg = document.createElementNS(NS, 'linearGradient');
            lg.id = 'bambooGrad';
            lg.setAttribute('x1', '0');
            lg.setAttribute('y1', '0');
            lg.setAttribute('x2', '0');
            lg.setAttribute('y2', '1');
            const s1 = document.createElementNS(NS, 'stop');
            s1.setAttribute('offset', '0%');
            s1.setAttribute('stop-color', '#a88452');
            const s2 = document.createElementNS(NS, 'stop');
            s2.setAttribute('offset', '100%');
            s2.setAttribute('stop-color', '#8d6e4a');
            lg.appendChild(s1);
            lg.appendChild(s2);
            defs.appendChild(lg);
        }
    }
    
    init() {
        this.setupOpponentSelection();
        this.hideGameElements();
    }
    
    setupOpponentSelection() {
        const opponentBtns = document.querySelectorAll('.opponent-btn');
        opponentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                opponentBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                
                const opponentKey = btn.dataset.opponent;
                this.selectedOpponent = this.opponents[opponentKey];
                
                setTimeout(() => {
                    this.startGame();
                }, 1000);
            });
        });
    }
    
    hideGameElements() {
        document.querySelector('.game-board').style.display = 'none';
        document.querySelector('.game-controls').style.display = 'none';
    }
    
    showGameElements() {
        document.querySelector('.game-board').style.display = 'block';
        document.querySelector('.game-controls').style.display = 'grid';
        document.querySelector('.opponent-selection').classList.add('hidden');
    }
    
    startGame() {
        this.showGameElements();
        this.gameStarted = true;
        this.initAudio();
        
        document.getElementById('aiName').textContent = `${this.selectedOpponent.icon} ${this.selectedOpponent.name}`;
        
        this.createBoard();
        this.updateDisplay();
        this.rollDiceBtn.addEventListener('click', () => this.rollDice());
        
        this.showMessage(`Spillet starter! Du spiller mot ${this.selectedOpponent.name}!`, 'success');
        setTimeout(() => {
            this.hideMessage();
        }, 4000);
    }
    
    createBoard() {
        this.ensureGradients();
        this.drawChecker();
        this.drawGrid();
        this.drawNumbers();
        this.drawLadders();
        this.drawSnakes();
        this.drawPlayers();
    }
    
    drawChecker() {
        const NS = 'http://www.w3.org/2000/svg';
        const g = document.getElementById('checker');
        g.innerHTML = '';
        
        const factor = this.CHECKER_FACTOR;
        const lightHex = '#f7f2e1', darkHex = '#e7f0dd';
        const lightTarget = '#ebdfbe', darkTarget = '#cfe3bb';
        const baseLight = 0.46, baseDark = 0.40;
        const lightOpacity = Math.min(0.85, baseLight * factor);
        const darkOpacity = Math.min(0.80, baseDark * factor);
        
        function hexToRgb(hex) {
            if (hex.charAt(0) === '#') hex = hex.slice(1);
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16)
            };
        }
        
        function blendHex(a, b, t) {
            const A = hexToRgb(a), B = hexToRgb(b);
            const r = Math.round(A.r + (B.r - A.r) * t);
            const g = Math.round(A.g + (B.g - A.g) * t);
            const bl = Math.round(A.b + (B.b - A.b) * t);
            return `rgb(${r},${g},${bl})`;
        }
        
        const t = Math.max(0, Math.min(1, (factor - 1) / 0.6));
        
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const rect = document.createElementNS(NS, 'rect');
                rect.setAttribute('x', String(c * 100));
                rect.setAttribute('y', String(r * 100));
                rect.setAttribute('width', '100');
                rect.setAttribute('height', '100');
                
                const isLight = ((r + c) % 2 === 0);
                const base = isLight ? lightHex : darkHex;
                const target = isLight ? lightTarget : darkTarget;
                const fillCol = blendHex(base, target, t);
                
                rect.setAttribute('fill', fillCol);
                rect.setAttribute('fill-opacity', (isLight ? lightOpacity : darkOpacity).toFixed(3));
                g.appendChild(rect);
            }
        }
    }
    
    drawGrid() {
        const NS = 'http://www.w3.org/2000/svg';
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        
        for (let i = 0; i <= 10; i++) {
            const x = i * 100;
            const v = document.createElementNS(NS, 'line');
            v.setAttribute('x1', String(x));
            v.setAttribute('y1', '0');
            v.setAttribute('x2', String(x));
            v.setAttribute('y2', '1000');
            grid.appendChild(v);
        }
        
        for (let j = 0; j <= 10; j++) {
            const y = j * 100;
            const h = document.createElementNS(NS, 'line');
            h.setAttribute('x1', '0');
            h.setAttribute('y1', String(y));
            h.setAttribute('x2', '1000');
            h.setAttribute('y2', String(y));
            grid.appendChild(h);
        }
    }
    
    drawNumbers() {
        const NS = 'http://www.w3.org/2000/svg';
        const nums = document.getElementById('numbers');
        nums.innerHTML = '';
        
        for (let n = 1; n <= 100; n++) {
            const rc = this.numToRowCol(n);
            const t = document.createElementNS(NS, 'text');
            t.setAttribute('x', String(rc.col * 100 + 8));
            t.setAttribute('y', String(rc.row * 100 + 14));
            t.textContent = String(n);
            
            // Marker spørsmålsruter med oransje tall
            if (this.questionSquares.includes(n)) {
                t.setAttribute('fill', '#FF9800');
                t.setAttribute('font-weight', 'bold');
            }
            
            nums.appendChild(t);
            
            // Legg til spørsmålstegn på spørsmålsruter
            if (this.questionSquares.includes(n)) {
                const questionMark = document.createElementNS(NS, 'text');
                questionMark.setAttribute('x', String(rc.col * 100 + 50)); // Sentrert horisontalt
                questionMark.setAttribute('y', String(rc.row * 100 + 60)); // Sentrert vertikalt
                questionMark.setAttribute('font-size', '48'); // Større
                questionMark.setAttribute('font-weight', 'bold');
                questionMark.setAttribute('fill', '#FF9800');
                questionMark.setAttribute('text-anchor', 'middle');
                questionMark.setAttribute('dominant-baseline', 'middle');
                questionMark.textContent = '❓';
                questionMark.setAttribute('opacity', '0.9'); // Litt mer synlig
                nums.appendChild(questionMark);
            }
        }
    }
    
    drawLadders() {
        const NS = 'http://www.w3.org/2000/svg';
        const g = document.getElementById('ladders');
        g.innerHTML = '';
        
        const railWidth = 14, rungWidth = 8, ladderHalf = 18, rungs = 7;
        
        for (let k = 0; k < this.ladders.length; k++) {
            const ladder = this.ladders[k];
            const from = ladder.from, to = ladder.to;
            const a = this.cellCenter(from), b = this.cellCenter(to);
            const dx = b.x - a.x, dy = b.y - a.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const ux = dx / len, uy = dy / len;
            const px = -uy, py = ux;
            
            const leftA = {x: a.x + px * ladderHalf, y: a.y + py * ladderHalf};
            const leftB = {x: b.x + px * ladderHalf, y: b.y + py * ladderHalf};
            const rightA = {x: a.x - px * ladderHalf, y: a.y - py * ladderHalf};
            const rightB = {x: b.x - px * ladderHalf, y: b.y - py * ladderHalf};
            
            // Venstre rail
            const railL = document.createElementNS(NS, 'line');
            railL.setAttribute('x1', String(leftA.x));
            railL.setAttribute('y1', String(leftA.y));
            railL.setAttribute('x2', String(leftB.x));
            railL.setAttribute('y2', String(leftB.y));
            railL.setAttribute('stroke', 'url(#bambooGrad)');
            railL.setAttribute('stroke-width', String(railWidth));
            railL.setAttribute('stroke-linecap', 'round');
            
            // Høyre rail
            const railR = document.createElementNS(NS, 'line');
            railR.setAttribute('x1', String(rightA.x));
            railR.setAttribute('y1', String(rightA.y));
            railR.setAttribute('x2', String(rightB.x));
            railR.setAttribute('y2', String(rightB.y));
            railR.setAttribute('stroke', 'url(#bambooGrad)');
            railR.setAttribute('stroke-width', String(railWidth));
            railR.setAttribute('stroke-linecap', 'round');
            
            g.appendChild(railL);
            g.appendChild(railR);
            
            // Trinn
            for (let i = 1; i < rungs; i++) {
                const t = i / rungs;
                const cx = a.x + dx * t, cy = a.y + dy * t;
                const x1 = cx + px * (ladderHalf - 2), y1 = cy + py * (ladderHalf - 2);
                const x2 = cx - px * (ladderHalf - 2), y2 = cy - py * (ladderHalf - 2);
                
                const rung = document.createElementNS(NS, 'line');
                rung.setAttribute('x1', String(x1));
                rung.setAttribute('y1', String(y1));
                rung.setAttribute('x2', String(x2));
                rung.setAttribute('y2', String(y2));
                rung.setAttribute('stroke', '#b79259');
                rung.setAttribute('stroke-width', String(rungWidth));
                rung.setAttribute('stroke-linecap', 'round');
                g.appendChild(rung);
            }
        }
    }
    
    drawSnakes() {
        const NS = 'http://www.w3.org/2000/svg';
        const g = document.getElementById('snakes');
        g.innerHTML = '';
        
        const CELL = 100;
        const inset = this.SNAKE_INSET;
        const snakeColors = ['#2f5d31', '#a34710', '#c2a500', '#5a6a4d', '#1a1a1a', '#2c6e49'];
        
        for (let s = 0; s < this.snakes.length; s++) {
            const snake = this.snakes[s];
            const headCell = snake.from, tailCell = snake.to;
            
            // Beregn hode og hale posisjoner
            const headTL = this.cellTopLeft(headCell);
            const tailTL = this.cellTopLeft(tailCell);
            const headPos = {x: headTL.x + CELL * inset, y: headTL.y + CELL * inset};
            const tailPos = {x: tailTL.x + CELL * (1 - inset), y: tailTL.y + CELL * (1 - inset)};
            
            const dx = tailPos.x - headPos.x, dy = tailPos.y - headPos.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const ux = dx / len, uy = dy / len;
            const px = -uy, py = ux;
            const amp = 40 + (s % 3) * 10;
            
            // Bezier kurve punkter
            const p0 = headPos;
            const p1 = {x: headPos.x + ux * (len * 0.33) + px * (+amp), y: headPos.y + uy * (len * 0.33) + py * (+amp)};
            const p2 = {x: headPos.x + ux * (len * 0.66) + px * (-amp), y: headPos.y + uy * (len * 0.66) + py * (-amp)};
            const p3 = tailPos;
            
            const d = `M ${p0.x},${p0.y} C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
            
            // Slangekropp
            const body = document.createElementNS(NS, 'path');
            const bodyColor = snakeColors[s % snakeColors.length];
            const bodyWidth = (22 - (s % 3) * 3);
            body.setAttribute('d', d);
            body.setAttribute('fill', 'none');
            body.setAttribute('stroke', bodyColor);
            body.setAttribute('stroke-width', String(bodyWidth));
            body.setAttribute('stroke-linecap', 'round');
            body.setAttribute('stroke-linejoin', 'round');
            body.setAttribute('opacity', '0.96');
            g.appendChild(body);
            
            // Slange mage
            const belly = document.createElementNS(NS, 'path');
            belly.setAttribute('d', d);
            belly.setAttribute('fill', 'none');
            belly.setAttribute('stroke', '#e7e3c9');
            belly.setAttribute('stroke-width', String(Math.max(6, bodyWidth * 0.45)));
            belly.setAttribute('stroke-linecap', 'round');
            belly.setAttribute('stroke-linejoin', 'round');
            belly.setAttribute('opacity', '0.35');
            g.appendChild(belly);
            
            // Slange hode
            const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
            const head = document.createElementNS(NS, 'ellipse');
            head.setAttribute('cx', String(headPos.x));
            head.setAttribute('cy', String(headPos.y));
            head.setAttribute('rx', String(16 + (s % 3) * 2));
            head.setAttribute('ry', String(12 + (s % 3) * 2));
            head.setAttribute('fill', bodyColor);
            head.setAttribute('transform', `rotate(${angleDeg},${headPos.x},${headPos.y})`);
            g.appendChild(head);
            
            // Slange hale
            const tail = document.createElementNS(NS, 'polygon');
            const tipX = tailPos.x, tipY = tailPos.y;
            const baseLX = tailPos.x + px * 8, baseLY = tailPos.y + py * 8;
            const baseRX = tailPos.x - px * 8, baseRY = tailPos.y - py * 8;
            const pts = `${tipX},${tipY} ${baseLX},${baseLY} ${baseRX},${baseRY}`;
            tail.setAttribute('points', pts);
            tail.setAttribute('fill', bodyColor);
            g.appendChild(tail);
        }
    }
    
    cellTopLeft(n) {
        const rc = this.numToRowCol(n);
        return { x: rc.col * 100, y: rc.row * 100 };
    }
    
    drawPlayers() {
        const NS = 'http://www.w3.org/2000/svg';
        const g = document.getElementById('players');
        
        // Fjern kun gamle brikker hvis de ikke eksisterer
        let playerCircle = document.getElementById('player-piece');
        let playerText = document.getElementById('player-text');
        let aiCircle = document.getElementById('ai-piece');
        let aiText = document.getElementById('ai-text');
        
        // Spillerens brikke
        if (this.playerPosition >= 1) {
            const playerPos = this.cellCenter(this.playerPosition);
            
            if (!playerCircle) {
                playerCircle = document.createElementNS(NS, 'circle');
                playerCircle.setAttribute('r', '20');
                playerCircle.setAttribute('fill', '#4CAF50');
                playerCircle.setAttribute('stroke', '#2E7D32');
                playerCircle.setAttribute('stroke-width', '3');
                playerCircle.setAttribute('id', 'player-piece');
                g.appendChild(playerCircle);
                
                playerText = document.createElementNS(NS, 'text');
                playerText.setAttribute('text-anchor', 'middle');
                playerText.setAttribute('fill', 'white');
                playerText.setAttribute('font-size', '24');
                playerText.setAttribute('font-weight', 'bold');
                playerText.setAttribute('id', 'player-text');
                playerText.textContent = '🎯';
                g.appendChild(playerText);
            }
            
            playerCircle.setAttribute('cx', String(playerPos.x - 15));
            playerCircle.setAttribute('cy', String(playerPos.y));
            playerText.setAttribute('x', String(playerPos.x - 15));
            playerText.setAttribute('y', String(playerPos.y + 6));
        }
        
        // AI-ens brikke
        if (this.aiPosition >= 1 && this.selectedOpponent) {
            const aiPos = this.cellCenter(this.aiPosition);
            
            if (!aiCircle) {
                aiCircle = document.createElementNS(NS, 'circle');
                aiCircle.setAttribute('r', '20');
                aiCircle.setAttribute('fill', '#2196F3');
                aiCircle.setAttribute('stroke', '#1976D2');
                aiCircle.setAttribute('stroke-width', '3');
                aiCircle.setAttribute('id', 'ai-piece');
                g.appendChild(aiCircle);
                
                aiText = document.createElementNS(NS, 'text');
                aiText.setAttribute('text-anchor', 'middle');
                aiText.setAttribute('fill', 'white');
                aiText.setAttribute('font-size', '24');
                aiText.setAttribute('font-weight', 'bold');
                aiText.setAttribute('id', 'ai-text');
                aiText.textContent = this.selectedOpponent.icon;
                g.appendChild(aiText);
            }
            
            aiCircle.setAttribute('cx', String(aiPos.x + 15));
            aiCircle.setAttribute('cy', String(aiPos.y));
            aiText.setAttribute('x', String(aiPos.x + 15));
            aiText.setAttribute('y', String(aiPos.y + 6));
            aiText.textContent = this.selectedOpponent.icon;
        }
    }
    
    animatePlayerMove(player, fromPosition, toPosition, callback) {
        const piece = player === 'human' ? 
            document.getElementById('player-piece') : 
            document.getElementById('ai-piece');
        const text = player === 'human' ? 
            document.getElementById('player-text') : 
            document.getElementById('ai-text');
            
        if (!piece || !text) {
            if (callback) callback();
            return;
        }
        
        const fromPos = this.cellCenter(fromPosition);
        const toPos = this.cellCenter(toPosition);
        const offsetX = player === 'human' ? -15 : 15;
        
        const startX = fromPos.x + offsetX;
        const startY = fromPos.y;
        const endX = toPos.x + offsetX;
        const endY = toPos.y;
        
        const duration = 800; // millisekunder
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startX + (endX - startX) * easeProgress;
            const currentY = startY + (endY - startY) * easeProgress;
            
            piece.setAttribute('cx', String(currentX));
            piece.setAttribute('cy', String(currentY));
            text.setAttribute('x', String(currentX));
            text.setAttribute('y', String(currentY + 6));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (callback) callback();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    rollDice() {
        if (this.currentPlayer === 'human') {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            this.playerDiceResult.textContent = `Du kastet: ${diceValue}`;
            this.rollDiceBtn.disabled = true;
            
            setTimeout(() => {
                this.movePlayer(diceValue, 'human');
            }, 1000);
        }
    }
    
    aiTurn() {
        this.aiDiceResult.textContent = 'Kaster terning...';
        document.getElementById('aiStatus').textContent = 'Kaster terning...';
        
        setTimeout(() => {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            this.aiDiceResult.textContent = `Kastet: ${diceValue}`;
            
            setTimeout(() => {
                this.movePlayer(diceValue, 'ai');
            }, 1000);
        }, 1500);
    }
    
    movePlayer(steps, player) {
        const oldPosition = player === 'human' ? this.playerPosition : this.aiPosition;
        
        if (player === 'human') {
            this.playerPosition += steps;
            
            if (this.playerPosition > this.boardSize) {
                this.playerPosition = this.boardSize;
                this.playVictoryFanfare();
                this.showMessage('🎉 GRATULERER! DU VANT SPILLET! 🎉', 'success');
                this.rollDiceBtn.disabled = true;
                return;
            }
        } else {
            this.aiPosition += steps;
            
            if (this.aiPosition > this.boardSize) {
                this.aiPosition = this.boardSize;
                this.playVictoryFanfare();
                this.showMessage(`🏆 ${this.selectedOpponent.name} vant! Prøv igjen! 🏆`, 'error');
                this.rollDiceBtn.disabled = true;
                return;
            }
        }
        
        const newPosition = player === 'human' ? this.playerPosition : this.aiPosition;
        
        // Animer bevegelsen
        this.animatePlayerMove(player, oldPosition, newPosition, () => {
            // Etter animasjon, sjekk for spesielle felt
            this.checkSpecialSquares(player, newPosition, steps);
        });
    }
    
    checkSpecialSquares(player, currentPosition, steps) {
        // Sjekk for stiger først
        const ladder = this.ladders.find(l => l.from === currentPosition);
        if (ladder) {
            setTimeout(() => {
                const message = player === 'human' ? 
                    `Flott! Du fant en stige! Klatre opp til felt ${ladder.to}! 🪜` :
                    `${this.selectedOpponent.name} fant en stige til felt ${ladder.to}! 🪜`;
                this.showMessage(message, 'success');
                
                setTimeout(() => {
                    const oldPos = player === 'human' ? this.playerPosition : this.aiPosition;
                    if (player === 'human') {
                        this.playerPosition = ladder.to;
                    } else {
                        this.aiPosition = ladder.to;
                    }
                    
                    // Spill lyd og animer samtidig
                    this.playLadderSound();
                    this.animatePlayerMove(player, oldPos, ladder.to, () => {
                        this.hideMessage();
                        this.checkForNextAction(player);
                    });
                }, 1000); // Redusert til 1 sekund
            }, 500);
            return;
        }
        
        // Sjekk for slanger
        const snake = this.snakes.find(s => s.from === currentPosition);
        if (snake) {
            setTimeout(() => {
                const message = player === 'human' ? 
                    `Oi! Du traff et slangehode! Gli ned til felt ${snake.to}! 🐍` :
                    `${this.selectedOpponent.name} traff en slange ned til felt ${snake.to}! 🐍`;
                this.showMessage(message, 'error');
                
                setTimeout(() => {
                    const oldPos = player === 'human' ? this.playerPosition : this.aiPosition;
                    if (player === 'human') {
                        this.playerPosition = snake.to;
                    } else {
                        this.aiPosition = snake.to;
                    }
                    
                    // Spill lyd og animer samtidig
                    this.playSnakeSound();
                    this.animatePlayerMove(player, oldPos, snake.to, () => {
                        this.hideMessage();
                        this.checkForNextAction(player);
                    });
                }, 1000); // Redusert til 1 sekund
            }, 500);
            return;
        }
        
        // Sjekk for spørsmål
        if (this.questionSquares.includes(currentPosition)) {
            setTimeout(() => {
                this.showQuestion(player);
            }, 500);
        } else {
            // Sjekk for ekstra kast ved sekser
            if (steps === 6) {
                const message = player === 'human' ? 
                    'Sekser! Du får kaste en gang til! 🎲' :
                    `${this.selectedOpponent.name} kastet sekser og får kaste igjen! 🎲`;
                this.showMessage(message, 'success');
                
                setTimeout(() => {
                    this.hideMessage();
                    if (player === 'human') {
                        this.rollDiceBtn.disabled = false;
                    } else {
                        this.aiTurn();
                    }
                }, 4000);
            } else {
                this.endTurn();
            }
        }
    }
    
    checkForNextAction(player) {
        const currentPosition = player === 'human' ? this.playerPosition : this.aiPosition;
        
        // Sjekk om spilleren landet på et spørsmålsfelt etter stige/slange
        if (this.questionSquares.includes(currentPosition)) {
            setTimeout(() => {
                this.showQuestion(player);
            }, 500);
        } else {
            this.endTurn();
        }
    }
    
    endTurn() {
        this.currentPlayer = this.currentPlayer === 'human' ? 'ai' : 'human';
        
        if (this.currentPlayer === 'human') {
            document.getElementById('currentTurn').textContent = 'Din tur!';
            document.getElementById('aiStatus').textContent = 'Venter...';
            this.rollDiceBtn.disabled = false;
        } else {
            document.getElementById('currentTurn').textContent = 'Venter...';
            this.aiTurn();
        }
    }
    
    
    showQuestion(player) {
        const availableQuestions = this.questions.filter((_, index) => !this.usedQuestions.has(index));
        
        if (availableQuestions.length === 0) {
            this.showMessage('Alle spørsmål er brukt opp! 🌟', 'success');
            setTimeout(() => {
                this.hideMessage();
                this.endTurn();
            }, 2000);
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
        const originalIndex = this.questions.indexOf(question);
        this.usedQuestions.add(originalIndex);
        
        if (player === 'human') {
            // Vis spørsmål til menneskelig spiller
            document.getElementById('questionText').textContent = question.question;
            
            const answerButtons = document.getElementById('answerButtons');
            answerButtons.innerHTML = '';
            
            question.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'answer-button';
                button.textContent = answer;
                button.addEventListener('click', () => this.handleAnswer(index, question, player));
                answerButtons.appendChild(button);
            });
            
            this.questionModal.classList.remove('hidden');
        } else {
            // AI svarer automatisk
            this.handleAIAnswer(question);
        }
    }
    
    handleAIAnswer(question) {
        document.getElementById('aiStatus').textContent = 'Tenker...';
        
        // Vis spørsmålet til spilleren
        this.showMessage(`${this.selectedOpponent.name} får spørsmål: "${question.question}"`, 'success');
        
        setTimeout(() => {
            const isCorrect = Math.random() < this.selectedOpponent.accuracy;
            const aiAnswer = isCorrect ? question.correct : 
                Math.floor(Math.random() * question.answers.length);
            
            const selectedAnswerText = question.answers[aiAnswer];
            const correctAnswerText = question.answers[question.correct];
            
            const comments = isCorrect ? 
                this.selectedOpponent.correctComments : 
                this.selectedOpponent.wrongComments;
            
            const comment = comments[Math.floor(Math.random() * comments.length)];
            
            // Vis AI-ens svar
            const answerMessage = `${this.selectedOpponent.name} svarte: "${selectedAnswerText}"${isCorrect ? ' ✅' : ' ❌'}`;
            this.showMessage(answerMessage, isCorrect ? 'success' : 'error');
            
            setTimeout(() => {
                // Vis kommentar og forklaring
                const explanationMessage = `"${comment}"\n\n${question.explanation}`;
                alert(explanationMessage);
                
                document.getElementById('aiStatus').textContent = isCorrect ? 'Svarte riktig! 🎉' : 'Svarte feil 😞';
                
                setTimeout(() => {
                    this.hideMessage();
                    if (isCorrect) {
                        // AI får ekstra kast
                        this.showMessage(`${this.selectedOpponent.name} får kaste en gang til! 🎲`, 'success');
                        setTimeout(() => {
                            this.hideMessage();
                            this.aiTurn();
                        }, 4000);
                    } else {
                        this.endTurn();
                    }
                }, 1000);
            }, 5000); // Økt fra 3000 til 5000ms
        }, 3000);
    }
    
    handleAnswer(selectedIndex, question, player) {
        const buttons = document.querySelectorAll('.answer-button');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                button.classList.add('incorrect');
            }
        });
        
        const isCorrect = selectedIndex === question.correct;
        
        setTimeout(() => {
            const resultText = isCorrect ? 
                'Riktig svar! Du får kaste en gang til! 🎲' : 
                'Feil svar!';
            
            alert(`${resultText}\n\n${question.explanation}`);
            this.questionModal.classList.add('hidden');
            this.updateDisplay();
            
            if (isCorrect) {
                // Ekstra kast for riktig svar
                this.rollDiceBtn.disabled = false;
                this.showMessage('Du får kaste en gang til for riktig svar! 🎲', 'success');
                setTimeout(() => {
                    this.hideMessage();
                }, 4000);
            } else {
                this.endTurn();
            }
        }, 1500);
    }
    
    updateDisplay() {
        document.getElementById('playerPosition').textContent = this.playerPosition;
        document.getElementById('aiPosition').textContent = this.aiPosition;
        this.drawPlayers(); // Oppdater også spillerposisjonene på brettet
    }
    
    showMessage(message, type) {
        this.gameMessage.textContent = message;
        this.gameMessage.className = `game-message ${type}`;
        this.gameMessage.classList.remove('hidden');
    }
    
    hideMessage() {
        this.gameMessage.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MiljoQuizGame();
});