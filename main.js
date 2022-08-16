
let playPileCenter = {
    "playPile1" : [], "playPile2" : [], "playPile3" : [], "playPile4": [], "playPile5" : [], "playPile6" : [], "playPile7" : []
};
  let acePileCenter = [
      acePile1 = [], acePile2 = [], acePile3 = [], acePile4 = []
  ]
  let names = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  let suits = ["Heart", "Club", "Spade", "Diamond"];
  let cards=[];
  let cardBack = "cardBacks/abstract_clouds.svg"
  let card = {
      createCardDiv: function(img) {
          cardDiv = document.createElement('div');
          cardDiv.classList.add("card", "fill");
          let newSVG = document.createElement('img');
          newSVG.src = cardBack;
          newSVG.classList.add("image", "fill");
          cardDiv.appendChild(newSVG);
          return cardDiv = cardDiv;
      },
      cardDiv: "ITS NOT UNDEFINED ITS JUST NOT DOING ANYTHING",
      front: "",
      cardName: "",
      suit:"",
      color: "",
      value : 0
  }
  
  
  //start helper functions
  
  /* Returns a random card object */
  function getRandomCard(array)
  {
      let rand = Math.floor(Math.random() * (array.length));
      return array.splice(rand, 1)[0];
  }
  
  /* Returns a shuffled deck array of size 52 */
  function shuffle(deck)
  { 
    let shuffled = [];

      for (let i = 0; i < 52; i++)
      {
         shuffled[i] = getRandomCard(deck);
      }
      //console.log(shuffled);
      return shuffled;
  }
  
function drawCard(e)
{
    // Checks to ensure the deck isnt empty, if it is, then set the deck equal to the flipped over discard pile and empty out the elements from under the discard pile div using JQuery
    if (shuffled.length == 0) 
    {
        shuffled = discardPile.reverse();
        discardPile = [];
        $(document).ready(function(){
            $("#discardPile").empty();
        });
    }
    else 
    {
        // Take the topmost card of the shuffled deck and place it into the discard pile, allowing usage through turnCardActive
        let currCard = appendCard(shuffled, discardPile, '#discardPile', 'discardPile', 1);       
        let lastCard = discardPile[1];
        // If there is a card before the currently drawn one, turn it inactive, so that the user cannot pull and drop any card out of the discard pile stack
        if (lastCard != null) 
        {
            lastCard.cardDiv.removeEventListener('dragstart', dragStart);
            lastCard.cardDiv.removeEventListener('dragover', allowDrop);
            lastCard.cardDiv.removeEventListener('drop', drop);
        } 
        turnCardActive(currCard);
    }
    // turnCardActive(currCard);
}


  /* Initalize all object information for a standard 52 card deck, including: 
     the suit of a card: card.suit*/

  function createDeck()
  {
    let unshuffled = [];
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
                    newCard.cardDiv = newCard.createCardDiv(`singleCards/${newCard.suit}-${newCard.value}.svg`);
                 // console.log(newCard.cardDiv(`singleCards/${newCard.suit}-${newCard.value}.svg`));

                    newCard.front = `singleCards/${newCard.suit}-${newCard.value}.svg`;
              }
              else{
                    newCard.cardDiv = newCard.createCardDiv(`singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`);
                    newCard.front = `singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`; 
              }
              
              unshuffled.push(newCard);
          }   
      } 
    return unshuffled;
  }


  /* Appends spliceRemove card(s) both in memory and visually based upon:
   the array it is coming from: deckArray, 
   the array it is going to: dropArray,
   and the container of dropArray: found by dropIdOrClass  */
  function appendCard(deckArray, dropArray, dropIdOrClass, pileType, spliceRemove) 
  {
      console.log(deckArray)
      let currCardArray = deckArray.splice(0, spliceRemove);
      console.log(currCardArray)
      let dropDiv = document.querySelector(dropIdOrClass);
      //console.log(currCard[0].cardDiv);

      // Places the card in the memory in dropArray and visually in the gui representation
      for(let i = spliceRemove - 1; i > -1; i--) {

        let currCard = currCardArray[i]
        console.log(`SPLICE REMOVE LOOP ####################`)
        console.log(currCard)
        console.log(currCard)
        console.log(i)
        console.log(currCard.cardDiv)
        currCard.cardDiv.classList.add("childCard")
        dropArray.unshift(currCard);
        dropDiv.appendChild(currCard.cardDiv)
        dropDiv = currCard.cardDiv;
      } 
      // currCard[0].cardDiv().setAttribute('style', 'background-image = ${') = `${currCard[0].img})`;
      console.log(dropArray);
     // console.log(currCard[0].cardName);
      return currCardArray[0];
  }


  /* Displays a drop prompt over a valid drop object */
  function allowDrop(e) {
    e.preventDefault();
  }
  /* Holds a dragged objects data in memory */
  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    // Hides the card when dragging it, cannot make it revert if no valid drop yet
    /* setTimeout(() => {
       e.target.classList.add('hide');
    }, 0); */
}
    function drawClick(e) {
        
    }

/*  Drops the currently selected card on top of another both in memory and visually if it meets certain conditions
    dependent on the dropDiv's class */
function drop(e) {

    // Get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    let draggedCard = document.getElementById(id);
    console.log(draggedCard)
    if (draggedCard.classList.contains("image")) 
    {
        draggedCard = draggedCard.parentElement;
    }
    let draggedCardPile = draggedCard.parentElement;
    let dropCard = e.target;
    if (dropCard.classList.contains("image")) 
    {
        dropCard = dropCard.parentElement;
    }
    let dropCardPile = e.target.parentElement;
    // Find the pile of the currently dragged card, going through each div until it reaches the outermost pile div
    while(!draggedCardPile.classList.contains('pile'))
    {
        draggedCardPile = draggedCardPile.parentElement;
    }
    // Find the pile of the drop card, going through each div until it reaches the outermost pile div
    while(!dropCardPile.classList.contains('pile'))
    {
        dropCardPile = dropCardPile.parentElement;
    }
    console.log(draggedCardPile)
    console.log(draggedCard.id)
    console.log(dropCard.id)
    let droppedCardArray = playPileCenter[dropCardPile.id]
    // Checks the draggedCard's color and value to see if it is eligible to be dropped on the dropCard
        // if so, places the dragged card on top of the drop card event both in memory and visually
    if (draggedCard.dataset.color != dropCard.dataset.color &&
        (draggedCard.dataset.value == dropCard.dataset.value - 1) &&
        draggedCardPile.classList.contains('playPile'))
        {
            // Determines the stack size of a card pile by filtering out every image from the children, technically could do draggedCard.childrenCount / 2 and round as well
            let stackSize = draggedCard.children;
            console.log()
            stackSize = Array.from(stackSize);
            stackSize = stackSize.filter(element => !(element.classList.contains("image")));
            stackSize = stackSize.length + 1;
            console.log(`stacksize: ${stackSize}`);
            let draggedCardArray = playPileCenter[draggedCardPile.id]
            droppedCardArray = playPileCenter[dropCardPile.id]
            // Append the current dragged card and its children to the current dropcard
            appendCard(draggedCardArray, droppedCardArray,`#${dropCardPile.id}`, `between`, stackSize)
            // Turn the new top card to an active state
            turnCardActive(draggedCardArray[0])
            /* console.log(`${i}th loop header /n /n`)
            console.log(draggedCardArray[0])
            console.log(draggedCardArray)
            console.log(droppedCardArray) */
            
            // Console.log function to keep track of arrays in memory
            for(let i = 0; i < 7; i++) {
                if(draggedCardPile.id == `playPile${i + 1}`)
                {
                    console.log(`playPile${i + 1}} is the draggedCardPile`)
                    console.log(playPileCenter[`playPile${i + 1}`])
                }
                else if(dropCardPile.id == `playPile${i + 1}`)
                {
                    console.log(`playPile${i + 1}} is the dropCardPile`)
                    console.log(playPileCenter[`playPile${i + 1}`])
                }
                else
                {
                    console.log(`playPile${i + 1}}`)
                    console.log(playPileCenter[`playPile${i + 1}`])
                }

            }
            /* console.log(playPileCenter[draggedCardPile.id])
            console.log(playPileCenter[dropCardPile.id]) */
            // Append the current div to the dropDiv visually to follow the memory
            dropCard.classList.add("new-pile");
        //  draggedCard.classList.remove('hide');

    }
    // Handle a draggedCard from the discard pile instead of between play piles
    else if (draggedCard.dataset.color != dropCard.dataset.color &&
        (draggedCard.dataset.value == dropCard.dataset.value - 1) &&
        draggedCardPile.classList.contains('discardPile'))
    {
        // Use append card to pull the topmost card from the discard pile and put it in the corresponding dropPile
        appendCard(discardPile, droppedCardArray, `#${dropCardPile.id}`, 'discard', 1)
        dropCard.appendChild(draggedCard);
        // Turns the new topmost card active
        turnCardActive(discardPile[0]);
    }
}


  /* Create field div, set its class and id to the idName, and append it to the containerClass div */
  function createField(size, containerClass, idName, fieldClass)
  {
      
      
      let container = document.querySelector(containerClass);
      let pile = document.createElement('div');
      pile.id = idName;
      pile.classList.add("pile");
      pile.classList.add(`${fieldClass}`)
      container.appendChild(pile);
      return pile;
      
  }


  /* Add all identifying card information to the cardDiv and add event listeners to listen for drops and drags for each active/visible card */ 
  function turnCardActive(currCard) 
  {
    // Set all div information
    let cardDiv = currCard.cardDiv;
    cardDiv.dataset.suit = currCard.suit;
    cardDiv.dataset.color = currCard.color;
    cardDiv.dataset.value = currCard.value;
    cardDiv.dataset.active = "true";
    cardDiv.classList.remove("hide");
    let image = cardDiv.firstChild
    image.setAttribute('src', `${currCard.front}`);
    // cardDiv.setAttribute("style", `background-image: url(${currCard.front});`);
    cardDiv.id = `${currCard.value}${currCard.suit.charAt(0)}`;
    cardDiv.draggable = "true";
    // Set event listeners for drag and drop usage
    
    cardDiv.addEventListener('dragstart', dragStart);
    cardDiv.addEventListener('dragover', allowDrop);
    cardDiv.addEventListener('drop', drop);
  }
  
  /* Create 4 ace piles 
  for(i = 0; i < 4; i++) 
  {
      createField(i, ".top", ".column");
  }
  */

  // Initial deck creation and shuffling
  let unShuffled = createDeck();
  let dictDeck = createDeck().reverse();
  let shuffled = shuffle(unShuffled);
  //let dictDeck = unShuffled;
  /* Create and fill 7 play piles AND convert all top cards into their active counterpart */
  for(i = 0; i < 7; i++) 
  {
     let pile = createField(i + 1, ".middle", `playPile${i + 1}`, `playPile`);
     // Adds a placeholder card to the array both visually and in memory to allow for kings to go on an empty stack and for the last card on a stack to be moved off of the playPile
     let placeholderCard = Object.create(card);
     placeholderCard.value = 14;
     placeholderCard.color = "colorless";
     placeholderCard.front = "cardBacks/blank_card.svg"
     placeholderCard.cardDiv = placeholderCard.createCardDiv("nothing");

     placeholderCard.cardDiv.classList.add("ghost", "hide");
     placeholderCard.cardDiv.firstChild.src = "cardBacks/blank_card.svg"
     placeholderCard = [placeholderCard];
     appendCard(placeholderCard, playPileCenter[`playPile${i + 1}`], `#${pile.id}`, "playPile", 1)

     // Append up to 7 cards to the current pile, depending on the current pile number, i + 1
     for(j = 0; j < i + 1; j++) 
     {
        // CHANGE DECK BACK TO SHUFFLED LATER
        let currCard = appendCard(shuffled, playPileCenter[`playPile${i + 1}`], `#${pile.id}`, "playPile", 1);
        console.log('it appended')
        if (j == i)
        {
            // Turn the top card of the current play pile to an active, draggable/droppable state
            turnCardActive(currCard, i);  
        }    
        else
        {
            // Flip cards to their backs if they are under the top card in the 
        }
     }
  }

/* Initialize deck, discard pile, and the corresponding button that controls the card drawing system*/
let deckDiv = createField(1, ".top", 'deckPile', 'deckPile');
let discardPile = [];
let drawButton = document.createElement("button");
drawButton.classList.add("card");
let drawImg = document.createElement("img")
drawImg.src = "cardBacks/abstract_clouds.svg"
drawButton.appendChild(drawImg)
deckDiv.appendChild(drawButton);
drawButton.addEventListener('click', drawCard)
let discardDiv = createField(1, ".top", 'discardPile', 'discardPile');

