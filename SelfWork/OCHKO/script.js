var cardGame = {};

cardGame.playerCards = document.getElementById('playerCards');
cardGame.dealerCards = document.getElementById('dealerCards');
cardGame.hitButton = document.getElementById('hit');
cardGame.stayButton = document.getElementById('stay');
cardGame.playButton = document.getElementById('play');
cardGame.textUpdates = document.getElementById('textUpdates');
cardGame.buttonBox = document.getElementById('buttonBox');
cardGame.playerHandText = document.getElementById('playerHand');
cardGame.dealerHandText = document.getElementById('dealerHand');
cardGame.tracker = document.getElementById('tracker');
cardGame.newGame = document.getElementById('newGame');
cardGame.choice = document.getElementById('choice');

cardGame.pHand = [];
cardGame.dHand = [];
cardGame.deck = [];
cardGame.suits = ['Трефа <span class="bold">&#9827</span>', 'Буба <span class="redcard">&#9830</span>', 'Чирва <span class="redcard">&#9829</span>', 'Пика <span class="bold">&#9824</span>'];
cardGame.values = ["Туз", "Два", "Три", "Четыре", "Пять", "Шесть", "Семь", "Восемь", "Девять", "Десять", "Валет", "Дама", "Король"];
cardGame.gameStatus = 0; 
cardGame.wins = 0; 
cardGame.draws = 0; 
cardGame.losses = 0; 
cardGame.games = 0;

function card(suit, value, name) {
    this.suit = suit; 
    this.value = value;
    this.name = name;
};


var newGame = function () {
    cardGame.newGame.classList.add("hidden");
    
    cardGame.dealerCards.innerHTML = "";
    cardGame.dealerCards.innerHTML = "";
    cardGame.pHand = [];
    cardGame.dHand = [];
    cardGame.gameStatus = 0;

    cardGame.deck = createDeck();


    cardGame.pHand.push(cardGame.deck.pop());
    cardGame.pHand.push(cardGame.deck.pop());

    // check for player victory
    if (handTotal(cardGame.pHand) === 21)
    {
        cardGame.wins += 1;
        cardGame.games += 1;        
        cardGame.gameStatus = 1; 
        drawHands();
        cardGame.textUpdates.innerHTML = "Ты выиграл! 21 Сходу! Счатливчик!";
        track();
        cardGame.gameStatus = 2;
        return;
    }

    cardGame.dHand.push(cardGame.deck.pop());
    cardGame.dHand.push(cardGame.deck.pop());
   
    if (handTotal(cardGame.dHand) === 21)
    {
        cardGame.games += 1;
        cardGame.losses += 1;
        cardGame.gameStatus = 1;
        drawHands();
        cardGame.textUpdates.innerHTML = "Ты проиграл! У соперника 21 с раздачи :(";
        track();
        cardGame.gameStatus = 2; 
        return;
    }

    drawHands();
    advise();
    cardGame.buttonBox.classList.remove("hidden");
    cardGame.textUpdates.innerHTML = "Конец раздачи!";
    
};

var createDeck = function () {
    var deck = [];
    for (var a = 0; a < cardGame.suits.length; a++) {
        for (var b = 0; b < cardGame.values.length; b++) {
            var cardValue = b + 1;
            var cardTitle = "";            
            if (cardValue > 10){
                cardValue = 10;
            }
            if (cardValue != 1) {
                cardTitle += (cardGame.values[b] + cardGame.suits[a] + " (" + cardValue + ")");
            }
            else
            {
                cardTitle += (cardGame.values[b] + cardGame.suits[a] + " (" + cardValue + " или 11)");
            }
            var newCard = new card(cardGame.suits[a], cardValue, cardTitle);
            deck.push(newCard);
            

        }
    }
    deck = shuffle(deck);
    return deck;
};

var drawHands = function () {    
    var htmlswap = "";
    var ptotal = handTotal(cardGame.pHand);
    var dtotal = handTotal(cardGame.dHand);
    htmlswap += "<ul>";
    for (var i = 0; i < cardGame.pHand.length; i++)
    {
        htmlswap += "<li>" + cardGame.pHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    cardGame.playerCards.innerHTML = htmlswap;
    cardGame.playerHandText.innerHTML = "Твои карты (" + ptotal + ")";
    if (cardGame.dHand.length == 0)
    {
        return;
    }

    htmlswap = "";
    if (cardGame.gameStatus === 0)
    {
        htmlswap += "<ul><li>[Перевёрнутая карта]</li>";
        cardGame.dealerHandText.innerHTML = "Карты соперника (" + cardGame.dHand[1].value + " + перевёрнутая)"; 
    }
    else
    {
        cardGame.dealerHandText.innerHTML = "Рука соперника (" + dtotal + ")"; 
    }
    
    for (var i = 0; i < cardGame.dHand.length; i++) {
        if (cardGame.gameStatus === 0)
        {
            i += 1;
        }
        htmlswap += "<li>" + cardGame.dHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    cardGame.dealerCards.innerHTML = htmlswap;
};

var handTotal = function (hand) {
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {
        total += hand[i].value;
        if (hand[i].value == 1)
        {
            aceFlag += 1;
        }
    }
    for (var j = 0; j < aceFlag; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }
    return total;
}

var shuffle = function (deck) {
    var shuffledDeck = [];
    var deckL = deck.length;
    for (var a = 0; a < deckL; a++)
    {
        var randomCard = getRandomInt(0, (deck.length));        
        shuffledDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);        
    }
    return shuffledDeck;
}

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


var deckPrinter = function (deck) {
    for (var i = 0; i < deck.length; i++)
    {
        console.log(deck[i].name);
    }
    return
}

cardGame.playButton.addEventListener("click", newGame);

cardGame.hitButton.addEventListener("click", function () {
    if (cardGame.gameStatus === 2)
    {
        console.log("Нажатo \"беру\"когда игра была окончена или уже нажата.");
        return;
    }

    cardGame.pHand.push(cardGame.deck.pop());
    drawHands();
   

    var handVal = handTotal(cardGame.pHand);
    if (handVal > 21)
    {
        bust();
        advise();
        return;
    }
    else if (handVal === 21)
    {
        victory();
        advise();
        return;
    }
    advise();
    cardGame.textUpdates.innerHTML = "Берёшь?</p>";
    return;      
});

cardGame.stayButton.addEventListener("click", function stayLoop() {
    if (cardGame.gameStatus === 2)
    {
        console.log("Нажатo \"хорош\"когда игра была окончена или уже нажата.");
        return;
    }
    else if (cardGame.gameStatus === 0) 
    {
        
        cardGame.buttonBox.classList.add("hidden");
        var handVal = handTotal(cardGame.dHand);
        cardGame.gameStatus = 1;
        advise(); 
        cardGame.textUpdates.innerHTML = "Противник показывает перевёнутые карты";
        drawHands();
        setTimeout(stayLoop, 750);
    }
    else if (cardGame.gameStatus === 1) {    

    var handVal = handTotal(cardGame.dHand);
    if (handVal > 16 && handVal <= 21) 
    {
        drawHands();
        var playerVal = handTotal(cardGame.pHand);
        if (playerVal > handVal)
        {            
            victory();
            return;
        }
        else if (playerVal < handVal)
        {            
            bust();
            return;
        }
        else
        {            
            tie();
            return;
        }
    }
    if (handVal > 21)
    {
        victory();
        return;
    }
    else // hit
    {
        cardGame.textUpdates.innerHTML = "Соперник берёт";
        cardGame.dHand.push(cardGame.deck.pop());
        drawHands();
        setTimeout(stayLoop, 750);
        return;
    }   
    }
});

var victory = function () {
    cardGame.wins += 1;
    cardGame.games += 1;
    var explanation = "";
    cardGame.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(cardGame.pHand);
    var dealerTotal = handTotal(cardGame.dHand);
    if (playerTotal === 21)
    {
        explanation = "У тебя 21 сходу! Красава!";
    }
    else if (dealerTotal > 21)
    {
        explanation = "Соперник проиграл со счётом: " + dealerTotal + "!";
    }
    else
    {
        explanation = "У тебя: " + playerTotal + " а у соперника " + dealerTotal + ".";
    }
    cardGame.textUpdates.innerHTML = "Ты выиграл!<br>" + explanation + "<br> Нажми 'Новая игра' что б начать сначала. Мы в шаге от лимона!";
    track();
}

var bust = function () {
    cardGame.games += 1;
    cardGame.losses += 1;
    var explanation = "";
    cardGame.gameStatus = 2;
    var playerTotal = handTotal(cardGame.pHand);
    var dealerTotal = handTotal(cardGame.dHand);
    if (playerTotal > 21)
    {
        explanation = "Ты проиграл со счётом: " + playerTotal + ".";
    }
    cardGame.textUpdates.innerHTML = "Ты проиграл :(.<br>" + explanation + "<br> Не отчаивайся! Нажми 'Новая игра' и тебе точно вкатит.";
    track();
}

var tie = function () {    
    cardGame.games += 1;
    cardGame.draws += 1;
    var explanation = "";
    cardGame.gameStatus = 2;
    var playerTotal = handTotal(cardGame.pHand);
    cardGame.textUpdates.innerHTML = "Эх... Ничья у вас по " + playerTotal + " очков.<br> Нажми 'Новая игра' и ты его сделаешь!";
    track();
}

var track = function () {
    cardGame.tracker.innerHTML = "<p>Выигрышей: " + cardGame.wins + " Ничьих: " + cardGame.draws + " Поражений: " + cardGame.losses + "</p>";
    cardGame.newGame.classList.remove("hidden");
    cardGame.buttonBox.classList.add("hidden");
}

var softCheck = function (hand) {    
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {
        total += hand[i].value;
        if (hand[i].value == 1) {
            aceFlag += 1;
        }
    }

    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
            return true;
        }
    }    
    return false;
}

var advise = function () {
    if (cardGame.gameStatus > 0)
    {
        cardGame.choice.innerHTML = "";
        return;
    } 
    var playerTotal = handTotal(cardGame.pHand);
    var soft = softCheck(cardGame.pHand);
    console.log("Soft: " + soft);
    var dealerUp = cardGame.dHand[1].value;

    if (dealerUp === 1)
    {
        dealerUp = 11;
    }

    if (playerTotal <= 11 && !soft)
    {
        cardGame.choice.innerHTML = "Бери! Чего думать?!";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp <= 6 && !soft)
    {
        cardGame.choice.innerHTML = "Пожалуй, хорош!";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp >= 7 && !soft)
    {
        cardGame.choice.innerHTML = "Бери! Чего думать?!";
    }
    else if (playerTotal >= 17 && playerTotal <= 21 && !soft)
    {
        cardGame.choice.innerHTML = "Не-не-не. Даже не смей";
    }
    else if (playerTotal >= 12 && playerTotal <= 18 && soft)
    {
        cardGame.choice.innerHTML = "Я б взял...";
    }
    else if (playerTotal >= 19 && playerTotal <= 21 && soft)
    {
        cardGame.choice.innerHTML = "Ничего достойного не выпадет! Я ж тебя не подводил!";
    }
    else
    {
        cardGame.choice.innerHTML = "И вообще, думай сам! Что-то пошло не так, не везучий ты, давай пока!";
        console.log("Ошибка: Карты игрока: " + playerTotal + " а у соперника " + dealerUp + ".");
    }
    return;
}