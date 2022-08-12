

let playPileCenter = [
    playPile1 = [], playPile2 = [], playPile3 = [],playPile4 = [], playPile5 = [], playPile6 = [], playPile7 = []
  ];
  let acePileCenter = [
      acePile1 = [], acePile2 = [], acePile3 = [], acePile4 = []
  ]
  let names = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  let suits = ["Heart", "Club", "Spade", "Diamond"];
  let cards=[];
  let card = {
      cardDiv: function(img) {
          cardDiv = document.createElement('div');
          cardDiv.classList.add("card");
          
          cardDiv.setAttribute("style", `background-image: url(${img});`);
          return usableCardDiv = cardDiv;
      },
      usableCardDiv: "ITS NOT UNDEFINED ITS JUST NOT DOING ANYTHING",
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

                 /*  newCard.img = `singleCards/${newCard.suit}-${newCard.value}.svg`; */
              }
              else{
                    newCard.usableCardDiv = newCard.cardDiv(`singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`);
                   /*  newCard.img = `singleCards/${newCard.suit}-${newCard.value}-${newCard.cardName}.svg`; */
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
  function createField(size, containerClass, className)
  {
      
      
      let container = document.querySelector(containerClass);
      let pile = document.createElement('div');
      pile.classList.add(className);
      container.appendChild(pile);
      return pile;
      
  }
  
  
  /* Create 4 ace piles 
  for(i = 0; i < 4; i++) 
  {
      createField(i, ".top", ".column");
  }
  */
  
  let unShuffled = createDeck(cards);
  let shuffled = shuffle(unShuffled);
  
  /* Create and fill 7 play piles */
  for(i = 0; i < 7; i++) 
  {
     let pile = createField(i + 1, ".middle", `playPile${i + 1}`);
     for(j = 0; j < i + 1; j++) 
     {
  
     appendCard(placeCard(shuffled), `.${pile.className}`, playPileCenter[i]);
     }
  }
  let currPile = playPileCenter[1];
  //let theDiv = document.querySelector(currPile[0]);
  console.log(currPile[0].usableCardDiv);
  function checkDragged()
  {
    for(let i = 0; i < 7; i++) 
    {
      if (playPileCenter[i].length ) 
      {

      }
    }
  }
  
  
  