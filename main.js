import { fstat } from 'node:fs';


let names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["Hearts", "Clubs", "Spades", "Diamonds"]
let cards= [];
let card = {
    cardName: "",
    suit:"",
    color: "",
    value :0,
    img:""
}

let imgArray = fs.readdir(singleCards)
imgArray.forEach(image => { card.img = image
    
});

function createDeck()
{
    for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < names.length; j++)
        {
            newCard = Object.create(card);

            if (i == 0 || i == 3)
            {
                newCard.color = "red";
            }
            else
            {
                newCard.color = "black";
            }
            
            newCard.cardName = names[j];
            newCard.suit = suits[i];
            newCard.value = j + 1;
            cards.push(newCard);
            
        }
        
    }
}
createDeck();
console.log(cards);
