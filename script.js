const words = ["banana", "apple", "car", "airplane", "romania", "wallcode"];
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let randomWord = getRandomWord(words);
let guessedLetter = 0;
let nrMistakes = 0;
let lettersFound = "";
let images = [
    'img/img1.jpg',
    'img/img2.jpg',
    'img/img3.jpg',
    'img/img4.jpg',
    'img/img5.jpg',
    'img/img6.jpg'
];

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function resetGame() {
    window.location.reload();
}

function newGame() {
    let divNewGame = document.getElementById("newGame");
    let button = document.createElement("button");
    button.textContent = "New Game";
    button.id = "btnNewGame";
    button.addEventListener('click', function() {
         resetGame();
    });
    divNewGame.appendChild(button);

}

function checkStatus() {
    if (guessedLetter === randomWord.length) {
        let win = document.createElement("h1");
        win = "CONGRATULATIONS YOU WIN !!";
        let divGame = document.getElementById("game");
        divGame.innerHTML = win;
        newGame();
    } else if (nrMistakes === 6) {
        let lost = document.createElement("h1");
        lost = "SORRY YOU LOST<br>" +"The word was<br>" +
               `${randomWord}`;
        let divGame = document.getElementById("game");
        divGame.innerHTML = lost;
        newGame();
    }
}

function checkLetter(letter) {
    let checkNrLettersFound = 0;
    for (let i = 0; i < randomWord.length; i++) {
        if (letter === randomWord[i]) {
            let showLetter = document.getElementById(i);
            showLetter.innerHTML = letter;
            if (lettersFound.indexOf(letter) === -1) {
                ++guessedLetter;
            }
            ++checkNrLettersFound;
        } 
    }
    if (checkNrLettersFound === 0) {
        let img = document.getElementById("myFriend");
        let card = document.getElementById("card");
        img.src = images[nrMistakes];
        ++nrMistakes;
        card.appendChild = (img);
    }
    lettersFound += letter;
    checkStatus();
}

function hideWord() {
    let divHideWord = document.getElementById("hideWord");
    for (let i = 0; i < randomWord.length; ++i) {
        let hiddenLetter = document.createElement('p');
        hiddenLetter.textContent = '_';
        hiddenLetter.id = i;
        divHideWord.appendChild(hiddenLetter);
    }
}

function startGame() {
    let buttonsDiv = document.getElementById("game");
    let card = document.getElementById("card");
    let buttonStart = document.getElementById("startGame")
    card.removeChild(buttonStart);
    let img = document.createElement("img");
    img.src = "img/first.jpg";
    img.id= "myFriend";
    card.appendChild(img);
    hideWord();
    for (let i = 0; i < alphabet.length; ++i) {
        let letter = alphabet[i];
        let button = document.createElement("button");
        button.className = "keyboard";
        button.textContent = letter.toUpperCase(); 
        button.addEventListener("click", function() {
            checkLetter(letter);
        });
        buttonsDiv.appendChild(button);
    }
}
