var files = [];
var names = [];

function saveFiles() {
    //* If the user hasn't uploaded anything, don't let them start a game
    if (document.getElementById("folderUpload").files.length == 0) {
        alert("Please upload at least one file.");
    } else { //* If there is at least one file uploaded, save the files and move to the next page
        document.getElementById("welcome").style.display = "none";
        //* sleep for display purposes
        sleep(500).then(() => {
            files = document.getElementById("folderUpload").files;      //* files = the user's files
            getNames();                                                 //* add names from all the photos
            document.getElementById("options").style.display = "block"; //* next page
        })
    }
}

//* helper function to sleep
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var inGame = false;
var currentPerson;   //* tracks the current person being searched for
var score = 0;       //* score starts at 0, and this resets every game
var prevRand = null; //* avoid repetition in random generator

var scoreDisplay, scoreText, showScore, nameDisplay, nameText, showName;

function runPhotoMatch() {
    checkForGame();

    //* Create a new game
    inGame = true;
    var game = document.createElement("div");
    game.id = "game";

    //* Creates a score display
    scoreDisplay = document.createElement("div");
    scoreDisplay.style.padding = 0;
    scoreDisplay.id = "scoreDisplay";
    scoreText = document.createElement("p");
    scoreText.innerHTML = "Score: ";
    scoreText.style.display = "inline-block";
    game.appendChild(scoreDisplay);
    scoreText.style.marginRight = "5px";
    scoreDisplay.appendChild(scoreText);
    showScore = document.createElement("p");
    showScore.style.display = "inline-block";
    scoreDisplay.appendChild(showScore);
    showScore.id = "score";
    showScore.innerHTML = score;

    //* Creates a name display
    nameDisplay = document.createElement("div");
    nameDisplay.style.padding = 0;
    nameDisplay.id = "nameDisplay";
    nameText = document.createElement("p");
    nameText.innerHTML = "Find";
    nameText.style.marginRight = "5px";
    nameText.style.display = "inline-block";
    showName = document.createElement("p");
    showName.style.display = "inline-block";
    nameDisplay.appendChild(nameText);
    nameDisplay.appendChild(showName);
    game.appendChild(nameDisplay);

    //* Creates the "end game" button
    var doneHolder = document.createElement("div");
    doneHolder.style.width = "100vw";
    doneHolder.style.display = "flex";
    doneHolder.style.justifyContent = "center";
    var done = document.createElement("button");
    doneHolder.appendChild(done);
    doneHolder.id = "done-holder";
    done.marginLeft = "0";
    done.innerHTML = "End game";
    done.id = "end-game";
    done.className = "button";
    done.onclick = function () {
        endGame();
    }

    //* Appends game and end game button
    document.body.appendChild(game);
    document.body.appendChild(doneHolder);

    //* Creates a grid to hold the images
    var imageGrid = document.createElement("div");
    imageGrid.id = "image-grid";
    game.appendChild(imageGrid);

    //* Adds each image uploaded into the grid
    for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        var img = document.createElement("img");
        img.className = "image";
        imageGrid.appendChild(img);
        img.setAttribute("src", URL.createObjectURL(files[i]))
        img.src = URL.createObjectURL(files[i]);
        var thisName = names[i];
        img.id = names[i].replace(" ", "-") //* Make the image ID the name of the person
        img.onclick = functionHandler(names[i])
    }

    //* Generates a random index to get a random name to find
    var num = Math.floor(Math.random() * (files.length));
    showName.innerHTML = names[num];
    currentPerson = names[num]; //* Stores the current person being looked for
    prevRand = num; //* Stores this random to avoid getting the same numbers in a row
}

//* Simple handler for check function
var functionHandler = function (param) {
    return function () { check(param) };
}

function runCrossWord() {
    document.getElementById("answerBar").classList.add("hidden");

    checkForGame();
    inGame = true;

    
    const size = 30;
    let board = new Array(size).fill().map(() => new Array(size).fill(' '));
    let names = ['alice', 'bob', 'charlie', 'david', 'emma', 'frank', 'grace', 'henry', 'isabella', 'jack', 'lily', 'michael', 'nora', 'oliver', 'penny'];


    shuffle(names);

    let charWordMap = {};

    for (let word of names) {
        for (let char of word) {
            if (char in charWordMap) {
                charWordMap[char].push(word);
            } else {
                charWordMap[char] = [word];
            }
        }
    }

    let used = {};
    for (let name of names) {
        used[name] = false;
    }

    

    board = place(board, names[0], 10, 10, 'vertical');
    used[names[0]] = true;

    let index = 0;

    while (index < 50) {
        let notPlaced = true;
        index++;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (board[y][x] !== ' ' && notPlaced) {
                    let char = board[y][x];
                    for (let word of charWordMap[char]) {
                        if (!used[word]) {
                            let result = place(board, word, x, y - word.indexOf(char), 'vertical');
                            if (result !== false) {
                                used[word] = true;
                                board = result;
                                notPlaced = false;
                            } else {
                                result = place(board, word, x - word.indexOf(char), y, 'horizontal');
                                if (result !== false) {
                                    used[word] = true;
                                    board = result;
                                    notPlaced = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (let row of board) {
        console.log(row.join(' '));
    }



    var game = document.createElement("div");
    game.id = "game";

    var gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            var gridItem = document.createElement("input");
            gridItem.classList.add("grid-item");
            gridItem.setAttribute("type", "text");
            gridItem.setAttribute("maxlength", "1");
            gridItem.value = board[i][j];
            gridContainer.appendChild(gridItem);
        }
    }

    game.appendChild(gridContainer);
    document.body.appendChild(game);
    console.log("gridContainer:", gridContainer);
    console.log("game:", game);

    
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function place(board, name, x, y, direction) {
    let index = 0;
    let boardCopy = JSON.parse(JSON.stringify(board));
    let newX = x;
    let newY = y;

    for (let char of name) {
        if (index === 0) {
            if (direction === 'vertical' && (boardCopy[newY - 1][newX] !== ' ' || boardCopy[newY][newX - 1] !== ' ' || boardCopy[newY][newX + 1] !== ' ')) {
                return false;
            }
            if (direction === 'horizontal' && (boardCopy[newY][newX - 1] !== ' ' || boardCopy[newY - 1][newX] !== ' ' || boardCopy[newY + 1][newX] !== ' ')) {
                return false;
            }
            boardCopy[newY][newX] = char;
        } else if (boardCopy[newY][newX] === char) {
            // Do nothing
        } else if (boardCopy[newY][newX] === ' ') {
            if (direction === 'vertical') {
                if (boardCopy[newY][newX + 1] === ' ' && boardCopy[newY][newX - 1] === ' ' && boardCopy[newY + 1][newX] === ' ') {
                    boardCopy[newY][newX] = char;
                } else {
                    return false;
                }
            }
            if (direction === 'horizontal') {
                if (boardCopy[newY][newX + 1] === ' ' && boardCopy[newY - 1][newX] === ' ' && boardCopy[newY + 1][newX] === ' ') {
                    boardCopy[newY][newX] = char;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
        newX += direction === 'horizontal' ? 1 : 0;
        newY += direction === 'vertical' ? 1 : 0;
        index++;
    }

    return boardCopy;
}

function setSquareTypable(row, col) {
    var square = document.querySelector('.grid-item[data-row="' + row + '"][data-col="' + col + '"]');
    square.style.backgroundColor = "grey";
    square.setAttribute("maxlength", "1");
}

function checkForGame() {
    if (inGame == true) {
        document.body.appendChild(answerBar);
        if (window.confirm("There is already a game open. Would you like to exit this and start a new one?")) {
            var currentGame = document.getElementById("game");
            currentGame.remove();
            document.getElementById("done-holder").remove();
             score = 0;
        }
    }
}

//* Runs the typing game
function runTypeName() {
    checkForGame();

    //* Unhide elements and set up game
    inGame = true;
    var answerBar = document.getElementById("answerBar");
    answerBar.classList.remove("hidden");
    var game = document.createElement("div");
    game.id = "game";
    score = 0;
 
    answerBar.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            checkAnswer();
        }
    });

    //* Set up score display
    var scoreDisplay = document.createElement("p");
    scoreDisplay = document.createElement("div");
    scoreDisplay.id = "scoreDisplay";
    scoreText = document.createElement("p");
    scoreText.innerHTML = "Score: ";
    scoreText.id = "scoreText"
    game.appendChild(scoreDisplay);
    scoreDisplay.appendChild(scoreText);
    showScore = document.createElement("p");
    showScore.style.display = "inline-block";
    scoreDisplay.appendChild(showScore);
    showScore.id = "score";
    showScore.innerHTML = score;

    //* End game button
    var doneHolder = document.createElement("div");
    doneHolder.id = "done-holder";
    var done = document.createElement("button");
    doneHolder.appendChild(done);
    done.innerHTML = "End game";
    done.marginLeft = "0";
    done.id = "end-game";
    done.className = "button";
    done.onclick = function () {
        endGame();
    }

    //* Append necessary things
    document.body.appendChild(game);
    document.body.appendChild(doneHolder);
    game.appendChild(scoreDisplay);

    //* Create a holder for the image
    imageHolder = document.createElement("div");
    imageHolder.id = "image-holder";
    game.appendChild(imageHolder);


    // Randomly select an index within the range of files array
    randomIndex = Math.floor(Math.random() * files.length);

    // Create an image element
    img = document.createElement("img");
    img.className = "image";
    img.setAttribute("src", URL.createObjectURL(files[randomIndex]));
    img.src = URL.createObjectURL(files[randomIndex]);
    img.style.height = "30vh";
    img.style.width = "30vh";
    img.style.marginBottom = "2.5vh";
    img.style.objectFit = "cover";
    img.style.float = "left";

    // Append the image to the image grid
    imageHolder.appendChild(img);

    // Set the name to display (name of the selected image without extension)
    imageName = files[randomIndex].name.split('.')[0];
    prevRand = randomIndex;
    //name.innerHTML = imageName;
    
    game.appendChild(answerBar);
}


//* Answer checker for photo matching game
function check(name) {
    name = name.replace("-", " ");
    if (name.toLowerCase() == currentPerson.toLowerCase()) { //* If the answer is right
        //* Generate a new random index that is NOT the previous index
        var num = Math.floor(Math.random() * (files.length));
        while (prevRand == num) {
            num = Math.floor(Math.random() * (files.length));
        }
        prevRand = num;

        //* Set the new name
        showName.innerHTML = names[num];
        currentPerson = names[num];

        //* Increase and set score
        score++;
        showScore.innerHTML = score;

        //* Reset all brightnesses (see below)
        for (var i = 0; i < files.length; i++) {
            document.getElementById(names[i].replace(" ",)).style.filter = "brightness(100%)";
        }
    } else {
        //* If the answer is wrong, grey out that image
        document.getElementById(name).style.filter = "brightness(50%)";
    }
}

//* Answer checking function for typing game
function checkAnswer() {
    var userAnswer = document.getElementById("answer").value;
    var correctAnswer = imageName.toLowerCase(); // Convert both answers to lowercase
    var result = document.getElementById("result");
    result.style.display = "inline-block";

    //* If the answer is correct
    if (userAnswer.toLowerCase() == correctAnswer) { // Compare case-insensitively
        //* Display a check
        result.innerText = "✓";
        result.style.color = "green";

        sleep(500).then(() => { //* Short pause for display purposes
            //* Generate a new random index and use that to load another photo
            prev = randomIndex;
            while (randomIndex == prev && files.length > 1) {
                randomIndex = Math.floor(Math.random() * files.length);
            }
            img.setAttribute("src", URL.createObjectURL(files[randomIndex]));
            img.src = URL.createObjectURL(files[randomIndex]);
            imageHolder.appendChild(img);
            imageName = files[randomIndex].name.split('.')[0];
            score++;
            showScore.innerHTML = score;
            result.style.display = "none";
            answer.value = "";
        })
    } else { //* If not correct, show an x that will disappear after a second
        document.getElementById("result").innerText = "❌";
        sleep(1000).then(() => {
            result.style.display = "none";
            answer.value = "";
        })
    }
    showScore.innerHTML = score;
}

//* Set name array to the names of all the files
function getNames() {
    for (var i = 0; i < files.length; i++) {
        names[i] = files[i].name.split('.')[0];
    }
}

//* Restart the game
function backToHome() {
    location.reload();
}

//* For the end game button
function endGame() {
    //* Hide game and other page elements
    game.remove();  //* remove the game
    inGame = false; //* set in game boolean to false
    document.getElementById("options").style.display = "none";
    document.getElementById("done-holder").remove();

    //* Create stats box
    document.getElementById("stats").style.display = "block";
    document.getElementById("final-score").innerHTML = score;

    //* Create play again button
    var holder = document.createElement("div");
    holder.id = "done-holder"; //* We can use the same styling from the end game button holder
    var playAgain = document.createElement("button");
    document.body.appendChild(holder);
    playAgain.id = "end-game"; //* We can use the same styling as the one from the end game button
    playAgain.className = "button";
    playAgain.innerHTML = "Memorize another set of names"
    playAgain.onclick = function () {
        location.reload();
    }
    holder.appendChild(playAgain);
}
