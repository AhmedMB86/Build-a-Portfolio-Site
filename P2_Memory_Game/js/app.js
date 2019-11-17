/*
 * Create a list that holds all of your cards
 */
const holdCards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];



/////////////////////////// all variables the code needs

let cards = document.querySelectorAll('.card');
let openCards = [];
let Stars = document.querySelector('.stars');
let allstars = document.getElementsByClassName('fa-star');
let rating = 0;
let Timer = document.querySelector('.timer');
let Match = 0;
let stars3 = 16;
let stars2 = 20;
let star1 = 24;
let seconds = 0;
let timer;
let Moves = 0;
let clearcount = 0;
const addstar1 = `<li><i class="fa fa-star"></i></li>`;

const addstar2 = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

const addstar3 = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;



////////////////////////////////////////////////////////////////////////
//////////////////////////////////Rating Function



let rate = () => {

    if (Moves == stars3) {
        rating = 3;
        var laststar = allstars[ allstars.length-1 ];
        laststar.parentNode.removeChild(laststar);

    } else if ( Moves == stars2) {
        rating = 2;
        var laststar = allstars[ allstars.length-1 ];
        laststar.parentNode.removeChild(laststar);
       
    } else if (Moves == star1) {
        rating = 1;
        var laststar = allstars[ allstars.length-1 ];
        laststar.parentNode.removeChild(laststar);
       
    } else if (Moves > 41) {
        
        GameOvermoves();
    }

}
//////////////////////////////////////////////////////////////////////
////////////////////////////End Game Functions////////////////////////
const youWon = () => {
    //alert(`congratulations you Won in ${seconds} Seconds within ${Moves} Moves`);
    rate();
    console.log(rating);
    if (rating == 0) {
        alert(`congratulations you Won in ${seconds} Seconds within ${Moves} Moves
                your score is the best (3 Stars) `);
    }
    if (rating == 3) {
        alert(`congratulations you Won in ${seconds} Seconds within ${Moves} Moves
                your score is (2 Stars) try again you can reach the highest score 3 Stars`);
    }
    if (rating == 2) {
        alert(`congratulations you Won in ${seconds} Seconds within ${Moves} Moves
                your score is 1 Star try again you can reach the highest score 3 Stars `);
    }
    if (rating == 1) {
        alert(`congratulations you Won in ${seconds} Seconds within ${Moves} Moves
               but you score too low (no stars) try again you can reach the highest score 3 Stars `);
    }
    clearInterval(timer);
    return;
}

const GameOver = () => {
    alert(`GameOver TimeOut in 8 minutes try again`);
    inGame();
    return;
}

const GameOvermoves = () => {
    alert(`GameOver your moves should be less 
    than 30 Moves you got no score try again`);
    inGame();
    return;
}
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////timer functionality
let Count = () => {
    timer = setInterval(() => {
        if (Match == 8) {
            youWon();
            clearInterval(timer);
            return;
        }

       
        if (seconds >= 500 || Moves > 30) {
            if (Moves > 30) {
                GameOvermoves();
                clearInterval(timer);
                return;
            }
            GameOver();
            clearInterval(timer);
            return;
        }
        ++seconds;
        console.log(`${seconds} sce`)
        Timer.innerHTML = seconds;
    }, 1000);
}

//////////////////////////////////////////////////////////////////////////////






/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function AddCards(card) {
    return `<li class="card" data-Card="${card}"><i class= "fa ${card}"></i></li>`;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let MoveCounter = document.querySelector('.moves');

let resetBtn = document.querySelector('.restart');

const inGame = () => {
  
    switch (allstars.length){
        case 0:
                //for(let i=3;i <= allstars.length ;i--)
                Stars.insertAdjacentHTML('afterbegin',addstar3);
        break;
        case 1:
                Stars.insertAdjacentHTML('afterbegin',addstar2);
        break;
        case 2:
                Stars.insertAdjacentHTML('afterbegin',addstar1);
        break;

    }
    let deck = document.querySelector('.deck');
    Moves = 0;
    Match = 0;
    clearcount = 0;
    rating = 0 ;
    clearInterval(timer);
    seconds = 0;
    Timer.innerHTML = seconds;
    let cardHtml = shuffle(holdCards).map(function (card) {
        cards = document.querySelectorAll('.card');
        return AddCards(card);
        // return console.log(shuffle(holdCards));
    });

    MoveCounter.innerHTML = Moves;
    deck.innerHTML = cardHtml.join('');

    cards = document.querySelectorAll('.card');
    openCards = [];
    play(cards, openCards);

}

const play = (cards, openCards) => {

    cards.forEach(card => {

        card.addEventListener('click', e => {

            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                if (clearcount == 0) {
                    Count();
                    clearcount = 1;
                }

                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {

                    if (openCards[0].dataset.card == openCards[1].dataset.card) {

                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        openCards = [];
                        ++Match;
                    }
                    else {
                        setTimeout(() => {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show');
                            });

                            openCards = [];
                        }, 900);

                    }

                    ++Moves;
                    if (Moves > 15){
                        rate();
                    }
                }

            }

            MoveCounter.innerHTML = Moves;
        });

    });
}

resetBtn.addEventListener('click', e => {
    inGame();
});

inGame();
