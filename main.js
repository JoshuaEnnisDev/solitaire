//globals
let playPile1, playPile2, playPile3,playPile4, playPile5, playPile6, playPile7 = [];
let acePile1, acePile2, acePile3, acePile4 = [];
let names = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
let suits = ["Heart", "Club", "Spade", "Diamond"];
let cards=[];
let card = {
    cardName: "",
    suit:"",
    color: "",
    value :0,
    img:""
}


//start helper functions

function getRandomCard(array)
{
    let rand = Math.floor(Math.random() * (array.length));
    return array.splice(rand, 1);
}

function shuffle()
{
    let shuffledDeck = [];

    for (let i = 0; i < 52; i++)
    {
       shuffledDeck[i] = getRandomCard(cards);
       //console.log(`the cards length is ${array.length} and i is ${i}`);
    }
    return shuffledDeck;
}

function drawCard(array)
{
    let card = array.shift();
    array.unshift(card);
    return card;
}
function placeCard(array)
{
    let card = array.shift();
    return card;
}

function createDeck(array)
{
    
    for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
        {
            let newCard = Object.create(card);

            if (i == 0 || i == 3)
            {
                newCard.color = "red";
            }
            else
            {
                newCard.color = "black";
            }
            
            newCard.cardName = names[j].toUpperCase();
            newCard.suit = suits[i].toUpperCase();
            newCard.value = j + 1;

            if (newCard.value <= 10){
                newCard.img = `singleCards/${newCard.suit}-${newCard.value}.svg`;
            }
            else{
                newCard.img = `singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`;
            }
            
            array.push(newCard);
            
        }
        
    }
}

function createField(size, containerClass, className)
{
    for (let i = 0; i < size; i++)
    {
        placeCard(cards);
    }
    
    let container = document.querySelector(containerClass);
    let pile = document.createElement('div');
    pile.classList.add(className);
    return container.appendChild(pile);
    
}


/* Create 4 ace piles 
for(i = 0; i < 4; i++) 
{
    createField(i, ".top", ".column");
}
*/

/* Create and fill 7 play piles */
for(i = 0; i < 7; i++) 
{
    createField(i + 1, ".middle", `.column${i + 1}`);
    //appendCard()
}

function checkDragged()
{
}
let unShuffled = createDeck(cards);
let shuffled = shuffle(unShuffled);

const holder = document.querySelector('#deck');







