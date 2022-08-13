

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
      cardDiv: function(img) {
          cardDiv = document.createElement('div');
          cardDiv.classList.add("card");
          /* newSVG = document.createElement('IMG');
          newSVG.src=`${img}`;
          cardDiv.appendChild(newSVG);
          newSVG.setAttribute('style', 'display:flex; justify-content: center; height: auto; width: auto') */
          cardDiv.setAttribute("style", `background-image: url(${img});`);
          return usableCardDiv = cardDiv;
      },
      usableCardDiv: "ITS NOT UNDEFINED ITS JUST NOT DOING ANYTHING",
      front: "",
      cardName: "",
      suit:"",
      color: "",
      value : 0
  }
  
  
  //start helper functions
  
  function getRandomCard(array)
  {
      let rand = Math.floor(Math.random() * (array.length));
      return array.splice(rand, 1)[0];
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
      //console.log(card);
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
                    newCard.usableCardDiv = newCard.cardDiv(`singleCards/${newCard.suit}-${newCard.value}.svg`);
                 // console.log(newCard.cardDiv(`singleCards/${newCard.suit}-${newCard.value}.svg`));

                    newCard.front = `singleCards/${newCard.suit}-${newCard.value}.svg`;
              }
              else{
                    newCard.usableCardDiv = newCard.cardDiv(`singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`);
                    newCard.front = `singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`; 
              }
              
              array.push(newCard);
          }
          
      }
  }
  function appendCard(deckArray, dropArray, dropIdOrClass, pileType, spliceRemove) 
  {
    console.log(deckArray)
      let currCardArray = deckArray.splice(0, spliceRemove);
      let dropDiv = document.querySelector(dropIdOrClass);
      //console.log(currCard[0].usableCardDiv);

      // Places the card in the memory in dropArray and visually in the gui representation
      for(let i = spliceRemove - 1; i > -1; i--) {

        currCard = currCardArray[i]
        console.log(`SPLICE REMOVE LOOP ####################`)
        console.log(currCard)
        console.log(currCard)
        console.log(i)
        console.log(currCard.usableCardDiv)
        dropArray.unshift(currCard);
        dropDiv.appendChild(currCard.usableCardDiv)
        dropDiv = currCard.usableCardDiv;
      }
      // currCard[0].cardDiv().setAttribute('style', 'background-image = ${') = `${currCard[0].img})`;
      console.log(dropArray);
     // console.log(currCard[0].cardName);
      return currCardArray[0];
  }
  function loadPlayPile(currCard, containerClass, pileArray) 
  {
      let container = document.querySelector(containerClass);
      //console.log(currCard[0].usableCardDiv);
      currCard[0].usableCardDiv;
      pileArray.push(currCard);
     // currCard[0].cardDiv().setAttribute('style', 'background-image = ${') = `${currCard[0].img})`;
      //console.log(pileArray);
     // console.log(currCard[0].cardName);
      return container.appendChild(currCard[0].usableCardDiv);
  }
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function dragStart(e) {
    console.log("please")
    e.dataTransfer.setData('text/plain', e.target.id);
    // Hides the card when dragging it, cannot make it revert if no valid drop yet
    /* setTimeout(() => {
       e.target.classList.add('hide');
    }, 0); */
}
function drop(e) {

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    let draggedCard = document.getElementById(id);
    let draggedCardPile = draggedCard.parentElement;
    let dropCard = e.target;
    let dropCardPile = e.target.parentElement;
    let totalCardStack = 1;
    // Find the pile of the currently dragged card, going through each div until it reaches the outermost pile div
    while(!draggedCardPile.classList.contains('pile'))
    {
        draggedCardPile = draggedCardPile.parentElement;
        totalCardStack++;
    }
    while(!dropCardPile.classList.contains('pile'))
    {
        dropCardPile = dropCardPile.parentElement;
        totalCardStack++;
    }
    console.log(draggedCardPile)
    console.log(draggedCard.id)
    console.log(dropCard.id)
    // add it to the drop target
    if (draggedCard.dataset.color != dropCard.dataset.color &&
        (draggedCard.dataset.value == dropCard.dataset.value - 1 ||
        draggedCard.dataset.value == dropCard.dataset.value - 1)) 
        {
            let stackSize = draggedCard.childElementCount + 1;
            console.log(stackSize)
            
                let draggedCardArray = playPileCenter[draggedCardPile.id]
                let droppedCardArray = playPileCenter[dropCardPile.id]
                appendCard(draggedCardArray, droppedCardArray,`#${draggedCardPile.id}`, `playPile`, stackSize)
                console.log(`${i}th loop header /n /n`)
                console.log(draggedCardArray[0])
                console.log(draggedCardArray)
                console.log(droppedCardArray)
                /* e.target.appendChild(draggedCard); */

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
            console.log(playPileCenter[draggedCardPile.id])
            console.log(playPileCenter[dropCardPile.id])
            e.target.appendChild(draggedCard);
        //  draggedCard.classList.remove('hide');

    }
    else
    {
      //  e.target.appendChild(draggedCard);
    }
    // e.target.appendChild(draggedCard);
    // draggable.classList.remove('hide');
}

  function createField(size, containerClass, idName)
  {
      
      
      let container = document.querySelector(containerClass);
      let pile = document.createElement('div');
      pile.id = idName;
      pile.classList.add("pile");
      container.appendChild(pile);
      return pile;
      
  }
  // Add all identifying card information to the usableCardDiv and add event listeners to listen for drops and drags for each active/visible card
  
  function turnCardActive(currCard) 
  {
    cardDiv = currCard.usableCardDiv;
    cardDiv.dataset.suit = currCard.suit;
    cardDiv.dataset.color = currCard.color;
    cardDiv.dataset.value = currCard.value;
    cardDiv.dataset.active = "true";
    cardDiv.draggable = "true";
    cardDiv.setAttribute("style", `background-image: url(${currCard.front});`);
    cardDiv.id = `${currCard.value}${currCard.suit.charAt(0)}`;
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
  
  let unShuffled = createDeck(cards);
  let dictDeck = unShuffled;
  let shuffled = shuffle(unShuffled);
  
  /* Create and fill 7 play piles AND convert all top cards into their active counterpart */
  for(i = 0; i < 7; i++) 
  {
     let pile = createField(i + 1, ".middle", `playPile${i + 1}`);
     
     for(j = 0; j < i + 1; j++) 
     {
        console.log(shuffled)
     let currCard = appendCard(shuffled, playPileCenter[`playPile${i + 1}`], `#${pile.id}`, "playPile", 1);
     console.log('it appended')
     if (j == i)
     {
       /*  console.log(currCard[0]); */
       console.log(currCard)
        turnCardActive(currCard, i);  
     }    
     else
     {
        console.log()
        /* currCard[0].usableCardDiv.setAttribute("style", `background-image: url(${cardBack});`); */
     }
     }
  }
  //let theDiv = document.querySelector(currPile[0]);
  
  