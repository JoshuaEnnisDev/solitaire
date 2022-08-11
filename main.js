let names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["Hearts", "Clubs", "Spades", "Diamonds"]
let cards= [];
let card = {
    cardName: "",
    suit:"",
    color: "",
    value :0
}

function createDeck()
{
    for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
        {
            card.cardName = names[j];
            card.suit = suits[i];
            card.value = j + 1;
            console.log(card);
            cards.push(card);
        }
    }
}
createDeck();
console.log(cards);
