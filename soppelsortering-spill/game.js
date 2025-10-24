// Game state
const gameState = {
    currentLevel: 1,
    score: 0,
    itemsOnBelt: [],
    maxItemsOnBelt: 15,  // Økt fra 10 til 15 for mer buffer
    itemsSpawnInterval: null,
    itemsMoveInterval: null,
    currentLevelItems: [],
    itemsSorted: 0,
    pointsNeededToComplete: 200,
    gameRunning: false,
    paused: false,
    valuableItemOnBelt: false,
    stopButtonActive: false,
    beltStopped: false
};

// Level configuration
const levelConfig = {
    1: {
        items: LEVEL_1_ITEMS,
        categories: ['matavfall', 'papir', 'plast', 'restavfall'],
        spawnInterval: 3500, // 3.5 sekunder
        pointsToComplete: 200,
        hasQuiz: false,
        hasFindError: false
    },
    2: {
        items: LEVEL_2_ITEMS,
        categories: ['matavfall', 'papir', 'plast', 'glass', 'restavfall'],
        spawnInterval: 2700, // 2.7 sekunder (enda raskere!)
        pointsToComplete: 300,
        hasQuiz: true,
        hasFindError: false
    },
    3: {
        items: LEVEL_3_ITEMS,
        categories: ['matavfall', 'papir', 'plast', 'glass', 'tekstil', 'farlig', 'restavfall'],
        spawnInterval: 2500, // 2.5 sekunder
        pointsToComplete: 400,
        hasQuiz: true,
        hasFindError: true
    }
};

// DOM elements
const screens = {
    start: document.getElementById('start-screen'),
    levelIntro: document.getElementById('level-intro-screen'),
    game: document.getElementById('game-screen'),
    quiz: document.getElementById('quiz-screen'),
    findError: document.getElementById('find-error-screen'),
    levelComplete: document.getElementById('level-complete-screen'),
    gameOver: document.getElementById('game-over-screen')
};

const elements = {
    conveyor: document.getElementById('conveyor-belt'),
    containers: document.getElementById('containers-area'),
    capacityFill: document.getElementById('capacity-fill'),
    capacityText: document.getElementById('capacity-text'),
    currentLevel: document.getElementById('current-level'),
    score: document.getElementById('score'),
    pauseOverlay: document.getElementById('pause-overlay'),
    stopButton: document.getElementById('stop-button')
};

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showScreen('start');
});

function setupEventListeners() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('start-level-button').addEventListener('click', startCurrentLevel);
    document.getElementById('pause-button').addEventListener('click', pauseGame);
    document.getElementById('resume-button').addEventListener('click', resumeGame);
    document.getElementById('quit-button').addEventListener('click', quitGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('menu-button').addEventListener('click', () => showScreen('start'));
    elements.stopButton.addEventListener('click', handleStopButton);
    // Note: next-level-button handler is set dynamically in showLevelComplete()
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function startGame() {
    gameState.currentLevel = 1;
    gameState.score = 0;
    gameState.itemsSorted = 0;
    updateUI();
    startLevel(1);
}

function startLevel(level) {
    gameState.currentLevel = level;

    // Show intro screen for level 2 and 3
    if (level > 1) {
        showLevelIntro(level);
    } else {
        startCurrentLevel();
    }
}

function showLevelIntro(level) {
    const config = levelConfig[level];
    const levelInfo = {
        2: {
            title: 'Nivå 2: Middels',
            description: 'Nå blir det mer utfordrende! Du må sortere i flere kategorier.',
            newCategories: ['Glass og Metall'],
            tip: 'Husk: Drikkekartonger går i papir, ikke plast!'
        },
        3: {
            title: 'Nivå 3: Avansert',
            description: 'Dette er toppnivået! Nå kommer de vanskeligste gjenstandene.',
            newCategories: ['Tekstiler', 'Farlig avfall'],
            tip: 'Pass på: Kvitteringer og drikkeglass går IKKE i papir og glass!'
        }
    };

    const info = levelInfo[level];

    document.getElementById('level-intro-title').textContent = info.title;
    document.getElementById('level-intro-subtitle').textContent = info.description;

    const infoDiv = document.getElementById('level-intro-info');
    infoDiv.innerHTML = `
        <h3>Nye kategorier:</h3>
        <p>${info.newCategories.join(', ')}</p>
        <h4>💡 Tips:</h4>
        <p>${info.tip}</p>
    `;

    const categoriesDiv = document.getElementById('level-intro-categories');
    categoriesDiv.innerHTML = '';
    config.categories.forEach(categoryId => {
        const category = WASTE_CATEGORIES[categoryId];
        const badge = document.createElement('div');
        badge.className = 'category-badge';
        badge.style.background = category.color;
        badge.textContent = `${category.icon} ${category.name}`;
        categoriesDiv.appendChild(badge);
    });

    showScreen('levelIntro');
}

function startCurrentLevel() {
    const level = gameState.currentLevel;

    gameState.itemsOnBelt = [];
    gameState.itemsSorted = 0;
    gameState.score = 0; // Nullstill poeng for hvert nivå
    gameState.gameRunning = true;
    gameState.paused = false;
    gameState.valuableItemOnBelt = false;
    gameState.stopButtonActive = false;
    gameState.beltStopped = false;
    showStopButton(); // Stoppknappen skal alltid være synlig!

    const config = levelConfig[level];
    gameState.currentLevelItems = [...config.items];
    gameState.pointsNeededToComplete = config.pointsToComplete;

    // Clear the conveyor belt
    elements.conveyor.innerHTML = '';
    updateCapacity();

    setupContainers(config.categories);
    updateUI();
    showScreen('game');

    // Make sure UI is updated after screen transition
    setTimeout(() => updateUI(), 100);

    // Start spawning items
    spawnItem();
    gameState.itemsSpawnInterval = setInterval(() => {
        if (!gameState.paused && gameState.gameRunning) {
            spawnItem();
        }
    }, config.spawnInterval);

    // Start moving items
    gameState.itemsMoveInterval = setInterval(() => {
        if (!gameState.paused && gameState.gameRunning) {
            moveItemsOnBelt();
        }
    }, 50); // Move items every 50ms for smooth animation
}

function setupContainers(categories) {
    elements.containers.innerHTML = '';

    categories.forEach(categoryId => {
        const category = WASTE_CATEGORIES[categoryId];
        const container = document.createElement('div');
        container.className = 'container';
        container.dataset.category = categoryId;
        container.style.borderColor = category.color;

        container.innerHTML = `
            <div class="icon">${category.icon}</div>
            <div class="label">${category.name}</div>
            <div class="description">${category.description}</div>
            <div class="counter">0</div>
        `;

        // Drag and drop events
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('dragleave', handleDragLeave);
        container.addEventListener('drop', handleDrop);

        elements.containers.appendChild(container);
    });
}

function moveItemsOnBelt() {
    const beltWidth = elements.conveyor.offsetWidth;
    const itemWidth = 80;
    const gap = 15;
    const padding = 20;
    const maxRightPosition = beltWidth - itemWidth - padding - 20;
    const minVisiblePosition = 100; // Gjenstander til venstre for dette er "i kø"

    // Tell hvor mange gjenstander som er i kø til venstre
    let itemsInQueue = 0;
    gameState.itemsOnBelt.forEach((item) => {
        const pos = parseInt(item.element.dataset.position || 0);
        if (pos < minVisiblePosition) {
            itemsInQueue++;
        }
    });

    // Øk hastigheten hvis det er gjenstander i kø
    const baseSpeed = 2;
    const speedMultiplier = itemsInQueue > 3 ? 2.5 : 1; // 2.5x hastighet hvis mer enn 3 i kø
    const moveSpeed = baseSpeed * speedMultiplier;

    gameState.itemsOnBelt.forEach((item, index) => {
        const element = item.element;
        if (!element || !element.parentElement) return;

        if (element.classList.contains('dragging')) return;

        let currentPos = parseInt(element.dataset.position || 0);
        currentPos += moveSpeed;

        let maxAllowed = maxRightPosition;

        if (index > 0) {
            const itemInFront = gameState.itemsOnBelt[index - 1];
            if (itemInFront && itemInFront.element) {
                const frontPosition = parseInt(itemInFront.element.dataset.position || 0);
                maxAllowed = Math.min(maxAllowed, frontPosition - itemWidth - gap);
            }
        }

        if (currentPos > maxAllowed) {
            currentPos = maxAllowed;
        }

        // Check if a valuable item has reached the end of the belt!
        if (item.valuable && currentPos >= maxRightPosition) {
            handleValuableItemReachedEnd(element, item.data.name);
            return;
        }

        element.dataset.position = currentPos;
        element.style.left = `${currentPos}px`;
    });
}

function spawnItem() {
    if (gameState.itemsOnBelt.length >= gameState.maxItemsOnBelt) {
        gameOver('Båndet ble for fullt!');
        return;
    }

    // Randomly spawn a valuable item (5% chance)
    let randomItem;
    let isValuable = false;

    if (!gameState.valuableItemOnBelt && Math.random() < 0.05) {
        randomItem = VALUABLE_ITEMS[Math.floor(Math.random() * VALUABLE_ITEMS.length)];
        isValuable = true;
        gameState.valuableItemOnBelt = true;
        gameState.stopButtonActive = true;
        // Knappen er alltid synlig, så vi trenger ikke å vise den
    } else {
        // Pick a random item from current level items
        randomItem = gameState.currentLevelItems[
            Math.floor(Math.random() * gameState.currentLevelItems.length)
        ];
    }

    const itemElement = createWasteItem(randomItem, isValuable);
    elements.conveyor.appendChild(itemElement);  // Add to DOM (position doesn't matter with absolute)
    gameState.itemsOnBelt.push({ element: itemElement, data: randomItem, valuable: isValuable });  // Add to END of array (newest = highest index)

    updateCapacity();
}

function createWasteItem(itemData, isValuable = false) {
    const item = document.createElement('div');
    item.className = 'waste-item';
    if (isValuable) {
        item.classList.add('valuable');
        item.dataset.valuable = 'true';
    }
    item.draggable = true;
    item.dataset.category = itemData.category || '';
    item.dataset.name = itemData.name;
    item.dataset.position = '20'; // Start at left side (padding position)

    item.innerHTML = `
        <div class="emoji">${itemData.emoji}</div>
        <div class="name">${itemData.name}</div>
    `;

    // Drag events for all items (including valuable ones)
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);

    // Set initial position
    item.style.left = '20px';

    return item;
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.dataTransfer.setData('category', e.target.dataset.category);
    e.dataTransfer.setData('name', e.target.dataset.name);
    e.dataTransfer.setData('valuable', e.target.dataset.valuable || 'false');

    // Create a visible drag image
    const dragImage = e.target.cloneNode(true);
    dragImage.style.position = 'fixed';
    dragImage.style.left = '-500px';
    dragImage.style.top = '0';
    dragImage.style.opacity = '1';
    dragImage.style.transform = 'none';
    dragImage.style.animation = 'none';
    dragImage.style.zIndex = '10000';
    dragImage.classList.remove('dragging');
    dragImage.style.width = '80px';
    dragImage.style.height = '80px';

    document.body.appendChild(dragImage);

    // Use the cloned element as drag image
    e.dataTransfer.setDragImage(dragImage, 40, 40);

    // Remove after drag starts
    setTimeout(() => {
        dragImage.remove();
    }, 100);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const container = e.currentTarget;
    container.classList.remove('drag-over');

    const draggedCategory = e.dataTransfer.getData('category');
    const draggedName = e.dataTransfer.getData('name');
    const isValuable = e.dataTransfer.getData('valuable') === 'true';
    const containerCategory = container.dataset.category;

    // Find the dragged element
    const draggedElement = document.querySelector('.waste-item.dragging');
    if (!draggedElement) return;

    // Check if it's a valuable item!
    if (isValuable) {
        // OH NO! You threw away something valuable!
        handleValuableItemThrownAway(draggedElement, draggedName);
        return;
    }

    if (draggedCategory === containerCategory) {
        // Correct sort!
        handleCorrectSort(draggedElement, container, draggedName);
    } else {
        // Wrong sort!
        handleWrongSort(draggedElement, container);
    }
}

function handleCorrectSort(itemElement, container, itemName) {
    // Remove from belt
    removeItemFromBelt(itemElement);

    // Add points
    gameState.score += 10;
    gameState.itemsSorted++;

    // Update container counter
    const counter = container.querySelector('.counter');
    counter.textContent = parseInt(counter.textContent) + 1;

    // Show fact (if available)
    const itemData = gameState.currentLevelItems.find(item => item.name === itemName);
    if (itemData && itemData.fact) {
        showFactToast(itemData.fact, itemData.emoji);
    }

    // Play correct sound
    playSound('correct');

    // Visual feedback
    itemElement.classList.add('correct-drop');

    updateUI();
    checkLevelComplete();
}

function handleWrongSort(itemElement, container) {
    // Wrong container - send back to belt
    container.classList.add('wrong-drop');
    setTimeout(() => container.classList.remove('wrong-drop'), 500);

    // Lose points
    gameState.score -= 10;

    // Show negative points feedback on container
    showPointsFeedback('-10', container);

    // Show red error message above belt
    const itemName = itemElement.dataset.name;
    const correctCategory = WASTE_CATEGORIES[itemElement.dataset.category];
    showErrorToast(`${itemName} hører ikke der! Skulle i ${correctCategory.name}`, '❌');

    // Play wrong sound
    playSound('yuck');

    updateUI();
}

function removeItemFromBelt(itemElement) {
    const index = gameState.itemsOnBelt.findIndex(item => item.element === itemElement);
    if (index > -1) {
        // Check if it was a valuable item
        if (gameState.itemsOnBelt[index].valuable) {
            gameState.valuableItemOnBelt = false;
            gameState.stopButtonActive = false;
            // Knappen skal ikke skjules - den skal alltid være der!
        }
        gameState.itemsOnBelt.splice(index, 1);
    }
    itemElement.remove();
    updateCapacity();
}

function showStopButton() {
    elements.stopButton.style.display = 'block';
}

function hideStopButton() {
    elements.stopButton.style.display = 'none';
}

function handleStopButton() {
    // Ignorer hvis spillet allerede er stoppet
    if (gameState.beltStopped || gameState.paused) {
        return;
    }

    // Stop the belt
    gameState.beltStopped = true;
    gameState.paused = true;

    // Check if there's actually a valuable item
    const hasValuableItem = gameState.itemsOnBelt.some(item => item.valuable);

    if (hasValuableItem) {
        // SUCCESS! Saved the valuable item
        const valuableItem = gameState.itemsOnBelt.find(item => item.valuable);
        handleValuableItemSaved(valuableItem);
    } else {
        // PENALTY! No valuable item on belt
        handleUnnecessaryStop();
    }
}

function handleValuableItemSaved(valuableItem) {
    const itemData = valuableItem.data;
    const itemElement = valuableItem.element;

    // Remove valuable item from belt
    removeItemFromBelt(itemElement);

    // Add big bonus points
    gameState.score += itemData.points;
    updateUI();

    // Show celebration
    showValuableItemToast(itemData.fact, itemData.emoji, itemData.points);
    playValuableItemSound();

    // Add fireworks effect
    createFireworks();

    // Resume game after 2 seconds
    setTimeout(() => {
        gameState.beltStopped = false;
        gameState.paused = false;
    }, 2000);
}

function handleUnnecessaryStop() {
    // Penalty for stopping unnecessarily
    const penalty = 50;
    gameState.score = Math.max(0, gameState.score - penalty);
    updateUI();

    // Show penalty message
    showPenaltyToast(`Du stoppet båndet uten grunn! -${penalty} poeng`);
    playSound('wrong');

    // Resume game after 2 seconds
    setTimeout(() => {
        gameState.beltStopped = false;
        gameState.paused = false;
    }, 2000);
}

function handleValuableItemThrownAway(itemElement, itemName) {
    // Remove the item
    removeItemFromBelt(itemElement);

    // Stop the game
    gameState.gameRunning = false;
    clearInterval(gameState.itemsSpawnInterval);
    clearInterval(gameState.itemsMoveInterval);

    // Show dramatic error message
    showValuableItemLostMessage(`Du kastet ${itemName} i søpla! 😱`, 'Du må starte nivået på nytt.');
    playSound('wrong');

    // Restart level after 3 seconds
    setTimeout(() => {
        restartCurrentLevel();
    }, 3000);
}

function handleValuableItemReachedEnd(itemElement, itemName) {
    // Remove the item
    removeItemFromBelt(itemElement);

    // Stop the game
    gameState.gameRunning = false;
    clearInterval(gameState.itemsSpawnInterval);
    clearInterval(gameState.itemsMoveInterval);

    // Show dramatic error message
    showValuableItemLostMessage(`${itemName} falt av båndet! 😱`, 'Du måtte ha stoppet båndet!');
    playSound('wrong');

    // Restart level after 3 seconds
    setTimeout(() => {
        restartCurrentLevel();
    }, 3000);
}

function restartCurrentLevel() {
    // Reset score to what it was at the start of the level (don't reset completely)
    startCurrentLevel();
}

function updateCapacity() {
    const percentage = (gameState.itemsOnBelt.length / gameState.maxItemsOnBelt) * 100;
    elements.capacityFill.style.width = `${percentage}%`;
    elements.capacityText.textContent = `${gameState.itemsOnBelt.length}/${gameState.maxItemsOnBelt}`;

    // Change color based on capacity
    let color;
    if (percentage < 50) {
        color = '#4CAF50'; // Green
    } else if (percentage < 60) {
        color = '#FFC107'; // Yellow
    } else if (percentage < 80) {
        color = '#FF9800'; // Orange
    } else {
        color = '#f44336'; // Red
    }
    elements.capacityFill.style.background = color;
}

function updateUI() {
    elements.currentLevel.textContent = gameState.currentLevel;
    elements.score.textContent = `${gameState.score}/${gameState.pointsNeededToComplete}`;
}

function checkLevelComplete() {
    if (gameState.score >= gameState.pointsNeededToComplete) {
        completeLevel();
    }
}

function completeLevel() {
    gameState.gameRunning = false;
    clearInterval(gameState.itemsSpawnInterval);
    clearInterval(gameState.itemsMoveInterval);

    const config = levelConfig[gameState.currentLevel];

    // Check if there's a quiz or find error task
    if (config.hasQuiz && Math.random() > 0.5) {
        showQuiz();
    } else if (config.hasFindError && Math.random() > 0.5) {
        showFindError();
    } else {
        showLevelComplete();
    }
}

function showQuiz() {
    const config = levelConfig[gameState.currentLevel];
    const availableQuestions = QUIZ_QUESTIONS.filter(q => q.level <= gameState.currentLevel);
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    document.getElementById('quiz-question').textContent = question.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => handleQuizAnswer(option, question.options, optionElement));
        optionsContainer.appendChild(optionElement);
    });

    // Hide feedback from previous quiz
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.add('hidden');
    feedback.innerHTML = '';

    showScreen('quiz');
}

function handleQuizAnswer(selectedOption, allOptions, optionElement) {
    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden');

    if (selectedOption.correct) {
        optionElement.classList.add('correct');
        feedback.className = 'quiz-feedback correct';
        feedback.innerHTML = `
            <h3>✅ Riktig!</h3>
            <p>${selectedOption.explanation}</p>
        `;
        gameState.score += 50; // Bonus points!
    } else {
        optionElement.classList.add('incorrect');
        feedback.className = 'quiz-feedback incorrect';
        const correctOption = allOptions.find(opt => opt.correct);
        feedback.innerHTML = `
            <h3>❌ Feil</h3>
            <p>${selectedOption.explanation}</p>
            <p><strong>Riktig svar:</strong> ${correctOption.text}</p>
            <p>${correctOption.explanation}</p>
        `;
    }

    updateUI();

    // Continue after 4 seconds
    setTimeout(() => {
        showLevelComplete();
    }, 4000);
}

function showFindError() {
    const availableTasks = FIND_ERROR_TASKS.filter(t => t.level <= gameState.currentLevel);
    const task = availableTasks[Math.floor(Math.random() * availableTasks.length)];

    document.getElementById('error-task-title').textContent = task.title;
    document.getElementById('error-task-description').textContent = task.description;

    const itemsContainer = document.getElementById('error-items');
    itemsContainer.innerHTML = '';

    task.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'error-item';
        itemElement.dataset.correct = item.correct;
        itemElement.dataset.shouldBe = item.shouldBe || '';
        itemElement.dataset.explanation = item.explanation || '';

        itemElement.innerHTML = `
            <span class="emoji">${item.emoji}</span>
            <span class="name">${item.name}</span>
        `;

        itemElement.addEventListener('click', () => {
            itemElement.classList.toggle('marked');
        });

        itemsContainer.appendChild(itemElement);
    });

    document.getElementById('error-feedback').classList.add('hidden');
    document.getElementById('check-errors-button').onclick = () => checkFindErrorAnswers(task);

    showScreen('findError');
}

function checkFindErrorAnswers(task) {
    const items = document.querySelectorAll('.error-item');
    let correctCount = 0;
    let totalErrors = task.items.filter(item => !item.correct).length;

    items.forEach(item => {
        const isMarked = item.classList.contains('marked');
        const shouldBeMarked = item.dataset.correct === 'false';

        if (isMarked === shouldBeMarked) {
            item.classList.add('revealed-correct');
            if (shouldBeMarked) correctCount++;
        } else {
            item.classList.add('revealed-incorrect');
        }

        // Show explanation for errors
        if (item.dataset.correct === 'false' && item.dataset.explanation) {
            const explanation = document.createElement('div');
            explanation.className = 'item-explanation';
            explanation.style.fontSize = '0.8em';
            explanation.style.color = '#f44336';
            explanation.style.marginTop = '5px';
            explanation.textContent = item.dataset.explanation;
            item.appendChild(explanation);
        }
    });

    const feedback = document.getElementById('error-feedback');
    feedback.classList.remove('hidden');

    if (correctCount === totalErrors) {
        feedback.innerHTML = '<h3>🎉 Perfekt! Du fant alle feilene!</h3>';
        gameState.score += 100;
    } else {
        feedback.innerHTML = `<h3>Du fant ${correctCount} av ${totalErrors} feil</h3>`;
        gameState.score += correctCount * 20;
    }

    updateUI();

    // Continue after 4 seconds
    document.getElementById('check-errors-button').disabled = true;
    setTimeout(() => {
        showLevelComplete();
    }, 4000);
}

function showLevelComplete() {
    const message = document.getElementById('level-complete-message');
    const stats = document.getElementById('level-stats');

    if (gameState.currentLevel === 3) {
        message.textContent = 'Du fullførte alle nivåene! 🏆';
    } else {
        message.textContent = `Du fullførte nivå ${gameState.currentLevel}!`;
    }

    stats.innerHTML = `
        <div class="stat-row">
            <span class="stat-label">Gjenstander sortert:</span>
            <span class="stat-value">${gameState.itemsSorted}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Totalt poeng:</span>
            <span class="stat-value">${gameState.score}</span>
        </div>
    `;

    const nextButton = document.getElementById('next-level-button');
    if (gameState.currentLevel >= 3) {
        nextButton.textContent = 'Spill på nytt';
        nextButton.onclick = restartGame;
    } else {
        nextButton.textContent = 'Neste nivå';
        nextButton.onclick = nextLevel;
    }

    playSound('level-complete');
    showScreen('levelComplete');
}

function nextLevel() {
    if (gameState.currentLevel < 3) {
        const nextLevelNum = gameState.currentLevel + 1;
        startLevel(nextLevelNum);
    }
}

function gameOver(reason) {
    gameState.gameRunning = false;
    clearInterval(gameState.itemsSpawnInterval);
    clearInterval(gameState.itemsMoveInterval);

    document.getElementById('game-over-screen').querySelector('p').textContent = reason;

    const finalStats = document.getElementById('final-stats');
    finalStats.innerHTML = `
        <div class="stat-row">
            <span class="stat-label">Nivå nådd:</span>
            <span class="stat-value">${gameState.currentLevel}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Totalt poeng:</span>
            <span class="stat-value">${gameState.score}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Gjenstander sortert:</span>
            <span class="stat-value">${gameState.itemsSorted}</span>
        </div>
    `;

    showScreen('gameOver');
}

function restartGame() {
    startGame();
}

function pauseGame() {
    gameState.paused = true;
    elements.pauseOverlay.classList.remove('hidden');

    // Pause all waste item animations
    document.querySelectorAll('.waste-item').forEach(item => {
        item.style.animationPlayState = 'paused';
    });

    // Pause belt animation
    elements.conveyor.style.animationPlayState = 'paused';
}

function resumeGame() {
    gameState.paused = false;
    elements.pauseOverlay.classList.add('hidden');

    // Resume all waste item animations
    document.querySelectorAll('.waste-item').forEach(item => {
        item.style.animationPlayState = 'running';
    });

    // Resume belt animation
    elements.conveyor.style.animationPlayState = 'running';
}

function quitGame() {
    gameState.gameRunning = false;
    clearInterval(gameState.itemsSpawnInterval);
    clearInterval(gameState.itemsMoveInterval);
    elements.pauseOverlay.classList.add('hidden');
    showScreen('start');
}

// Toast for facts - now shown above the conveyor belt
function showFactToast(fact, emoji) {
    const toast = document.createElement('div');
    toast.className = 'fact-toast';
    toast.style.cssText = `
        position: absolute;
        top: -80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(76, 175, 80, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.1em;
        z-index: 1000;
        animation: fadeIn 0.3s;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;
    toast.innerHTML = `<strong>${emoji}</strong> ${fact}`;

    // Add to the conveyor belt container instead of body
    const conveyorContainer = document.querySelector('.conveyor-belt-container');
    conveyorContainer.style.position = 'relative';
    conveyorContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toast for errors - shown above the conveyor belt in red
function showErrorToast(message, emoji) {
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.style.cssText = `
        position: absolute;
        top: -80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(244, 67, 54, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.1em;
        z-index: 1000;
        animation: fadeIn 0.3s;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;
    toast.innerHTML = `<strong>${emoji}</strong> ${message}`;

    // Add to the conveyor belt container instead of body
    const conveyorContainer = document.querySelector('.conveyor-belt-container');
    conveyorContainer.style.position = 'relative';
    conveyorContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2000); // Shorter duration for error messages
}

// Show points feedback (for wrong sorts)
function showPointsFeedback(points, container) {
    const feedback = document.createElement('div');
    feedback.className = 'points-feedback';
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(244, 67, 54, 0.95);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1.3em;
        font-weight: bold;
        z-index: 1000;
        animation: fadeOut 1s;
        pointer-events: none;
    `;
    feedback.textContent = points;

    container.style.position = 'relative';
    container.appendChild(feedback);

    setTimeout(() => feedback.remove(), 1000);
}

// Sound effects using Web Audio API
function playSound(soundType) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;

    switch(soundType) {
        case 'correct':
            // Positive "pling" sound - ascending tones
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;

        case 'yuck':
        case 'wrong':
            // "Æsj" sound - descending buzzy tone
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.4);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            oscillator.start(now);
            oscillator.stop(now + 0.4);
            break;

        case 'level-complete':
            // Victory fanfare - three ascending notes
            const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
            frequencies.forEach((freq, index) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + index * 0.15);
                gain.gain.setValueAtTime(0.3, now + index * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.15 + 0.5);
                osc.start(now + index * 0.15);
                osc.stop(now + index * 0.15 + 0.5);
            });
            break;
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Valuable item toast (special celebration)
function showValuableItemToast(fact, emoji, points) {
    const toast = document.createElement('div');
    toast.className = 'valuable-toast';
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        font-size: 1.5em;
        z-index: 2000;
        animation: fadeIn 0.5s;
        max-width: 600px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(255, 215, 0, 0.8);
        border: 4px solid white;
        font-weight: bold;
    `;
    toast.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 10px;">${emoji}</div>
        <div>${fact}</div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 1800);
}

// Penalty toast
function showPenaltyToast(message) {
    const toast = document.createElement('div');
    toast.className = 'penalty-toast';
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(244, 67, 54, 0.95);
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        font-size: 1.5em;
        z-index: 2000;
        animation: fadeIn 0.5s;
        max-width: 600px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(244, 67, 54, 0.8);
        font-weight: bold;
    `;
    toast.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 10px;">⚠️</div>
        <div>${message}</div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 1800);
}

// Fireworks effect
function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: ${['#FFD700', '#FFA500', '#FF6347', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1500;
            `;

            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            document.body.appendChild(firework);

            let x = 0;
            let y = 0;
            let opacity = 1;

            const animate = () => {
                x += vx / 30;
                y += vy / 30;
                opacity -= 0.02;

                firework.style.transform = `translate(${x}px, ${y}px)`;
                firework.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    firework.remove();
                }
            };

            animate();
        }, i * 30);
    }
}

// Valuable item sound (special success sound)
function playValuableItemSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    // Play a triumphant melody
    const notes = [
        { freq: 523.25, time: 0 },      // C5
        { freq: 659.25, time: 0.15 },   // E5
        { freq: 783.99, time: 0.3 },    // G5
        { freq: 1046.50, time: 0.45 }   // C6
    ];

    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(note.freq, now + note.time);
        gainNode.gain.setValueAtTime(0.3, now + note.time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.4);

        oscillator.start(now + note.time);
        oscillator.stop(now + note.time + 0.4);
    });
}

// Dramatic error message for losing valuable items
function showValuableItemLostMessage(title, subtitle) {
    const overlay = document.createElement('div');
    overlay.className = 'valuable-lost-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;

    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);
        color: white;
        padding: 50px 60px;
        border-radius: 20px;
        text-align: center;
        max-width: 600px;
        border: 5px solid #ff5252;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        animation: blink 0.5s infinite;
    `;

    messageBox.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">⚠️</div>
        <h2 style="font-size: 2.5em; margin-bottom: 15px; font-weight: bold;">${title}</h2>
        <p style="font-size: 1.5em; margin-bottom: 20px;">${subtitle}</p>
        <p style="font-size: 1.2em; opacity: 0.9;">Starter på nytt om 3 sekunder...</p>
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    // Add blink animation
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 100% {
                border-color: #ff5252;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            }
            50% {
                border-color: #ffeb3b;
                box-shadow: 0 20px 80px rgba(255, 82, 82, 0.8);
            }
        }
    `;
    document.head.appendChild(blinkStyle);

    // Remove after 3 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            overlay.remove();
            blinkStyle.remove();
        }, 500);
    }, 2500);
}
