const words = ["banana", "apple", "car", "airplane", "romania", "wallcode"];
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let randomWord = getRandomWord(words);
let guessedLetter = 0;
let nrLife = 0;
let lettersFound = "";
let images = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg'
];

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function resetGame() {
    window.location.reload();
}

function newGame() {
    let divNewGame = document.getElementById("newGame");
    if (divNewGame) {
        let button = document.createElement("button");
        button.textContent = "New Game";
        button.id = "btnNewGame";
        button.addEventListener('click', function() {
            resetGame();
        });
        divNewGame.appendChild(button);
    }
}

function checkStatus() {
    if (guessedLetter === randomWord.length) {
        let win = document.createElement("h1");
        win = "CONGRATULATIONS YOU WIN !!";
        win.classList = "mesaje";
        let divGame = document.getElementById("game");
        divGame.innerHTML = win;
        newGame();
    } else if (nrLife == 6) {
        let lost = document.createElement("h1");
        lost = "<strong>SORRY YOU LOST</strong><br>" +
         "<strong>The word was</strong><br>" +
          `<strong>${randomWord}</strong>`;
          lost.classList = "mesaje;"
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
        } else if (checkNrLettersFound === 0 && i === randomWord.length - 1) {
            let img = document.getElementById("myFriend");
            let card = document.getElementById("card");
            img.src = images[nrLife];
            ++nrLife;
            card.appendChild = (img);
        }
    }
    lettersFound += letter;
    checkStatus();
}

function hideWord() {
    let hideEl = document.getElementById("hideWord");
    for (let i = 0; i < randomWord.length; i++) {
        let pElement = document.createElement('p');
        pElement.textContent = '_';
        pElement.id = i;
        hideEl.appendChild(pElement);
    }
}

function startGame() {
    let buttonsDiv = document.getElementById("game");
    let card = document.getElementById("card");
    let buttonStart = document.getElementById("startGame")
    card.removeChild(buttonStart);
    let img = document.createElement("img");
    img.src = "first.jpg";
    img.id= "myFriend";
    card.appendChild(img);
    hideWord();
    for (let i = 0; i < alphabet.length; i++) {
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