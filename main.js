

let playPileCenter = [
    playPile1 = [], playPile2 = [], playPile3 = [],playPile4 = [], playPile5 = [], playPile6 = [], playPile7 = []
  ];
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
  function appendCard(currCard, containerClass, pileArray) 
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
    const draggedCard = document.getElementById(id);
    let dropCard = e.target;
    console.log(draggedCard.id)
    console.log(dropCard.id)
    // add it to the drop target
    if (draggedCard.dataset.color != dropCard.dataset.color &&
        (draggedCard.dataset.value == dropCard.dataset.value - 1 ||
        draggedCard.dataset.value == dropCard.dataset.value - 1)) 
        {
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
  /* function dragCheck(cardDiv, frequency)
  {
    for(let i = 0; i < frequency; i++) 
    {
        let currPile = playPileCenter[i];
        console.log( `${currPile[currPile.length - 1]}`)
        let topCard = currPile[currPile.length - 1];
        currPileDiv = document.getElementById(`playPile${i + 1}`)
        console.log(currPileDiv)
        console.log("this doesnt do anything does it :(")
        /* if (topCard.color != cardDiv.color &&
            (topCard.value == (cardDiv.value - 1) ||
            topCard.value == (cardDiv.value + 1)))
        { 
            currPileDiv.addEventListener('ondragover', allowDrop)
            currPileDiv.addEventListener('ondrop', drop)
        
        
       
    }
  } */
  function createField(size, containerClass, idName)
  {
      
      
      let container = document.querySelector(containerClass);
      let pile = document.createElement('div');
      pile.id = idName;
      container.appendChild(pile);
      return pile;
      
  }
  // Drag the card
  
  function turnCardActive(currCard) 
  {
    cardDiv = currCard.usableCardDiv;
    cardDiv.dataset.suit = currCard.suit;
    cardDiv.dataset.color = currCard.color;
    cardDiv.dataset.value = currCard.value;
    cardDiv.dataset.active = "true";
    cardDiv.draggable = "true";
    cardDiv.id = `${currCard.value}${currCard.suit.charAt(0)}`
    cardDiv.addEventListener('dragstart', dragStart)
    cardDiv.addEventListener('dragover', allowDrop)
    cardDiv.addEventListener('drop', drop)
    
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
  
  /* Create and fill 7 play piles */
  for(i = 0; i < 7; i++) 
  {
     let pile = createField(i + 1, ".middle", `playPile${i + 1}`);
     
     for(j = 0; j < i + 1; j++) 
     {
     currCard = placeCard(shuffled);
     appendCard(currCard, `#${pile.id}`, playPileCenter[i]);
     if (j == i)
     {
       /*  console.log(currCard[0].usableCardDiv); */
        currCard[0].usableCardDiv.setAttribute("style", `background-image: url(${currCard[0].front});`);
        turnCardActive(currCard[0], i);  
     }    
     else
     {
        currCard[0].usableCardDiv.setAttribute("style", `background-image: url(${cardBack});`);
     }
     }
  }
  let currPile = playPileCenter[1];
  //let theDiv = document.querySelector(currPile[0]);
  
  