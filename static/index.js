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

class WordOnGrid {
    constructor(word) {
        this.word = word; // The word itself
        this.characters = []; // Array to store characters with their positions
        this.isHorizontal; // Boolean indicating the orientation of the word

        // Calculate the positions of characters based on orientation

    }

    getCoordinates(charX, charY) {
        for (let i = 0; i < word.length; i++) {
            if (isHorizontal) {
                charX += i;
            } else {
                charY += i;
            }
            this.characters.push({ char: word[i], x: charX, y: charY });
        }
    }

    // Method to get the character at a specific index
    getCharacter(index) {
        return this.characters[index];
    }

    // Method to get the length of the word
    getLength() {
        return this.word.length;
    }
}
function runCrossWord() {
    document.getElementById("answerBar").classList.add("hidden");

    if (inGame == true) {
        if (window.confirm("There is already a game open. Would you like to exit this and start a new one?")) {
            var currentGame = document.getElementById("game");
            currentGame.remove();
        }
    }
    inGame = true;

    var game = document.createElement("div");
    game.id = "game";

    // Create a grid container
    var gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // Generate grid cells

    //setSquareTypable(1, 1);
    namesCopy = randomizeNames();
    namesCopy = namesCopy.map(function (element) {
        return element.toLowerCase();
    });
    board = Array.from({ length: 16 }, () => Array.from({ length: 16 }).fill(''));

    names_placed = 0;

    namesCopy.forEach(function (name) {
        // Generate a random starting position and orientation for the word
        let startX = Math.floor(Math.random() * 16);
        let startY = Math.floor(Math.random() * 16);
        let isHorizontal = Math.random() < 0.5; // Randomly choose horizontal or vertical orientation

        // Create a WordOnGrid object for the current name
        let word = new WordOnGrid(name);

        // Add the WordOnGrid object to the array
        wordsOnGrid.push(word);
    });

    for (var i = 0; i < 16; i++) { // Adjust the number of rows as needed
        for (var j = 0; j < 16; j++) { // Adjust the number of columns as needed
            var gridItem = document.createElement("input");
            gridItem.classList.add("grid-item");
            gridItem.setAttribute("type", "text"); // Set input type to text
            gridItem.setAttribute("maxlength", "0"); // Limit input to one character
            gridItem.value = board[i][j]; // Empty content initially
            gridItem.setAttribute("data-row", i); // Set row index as data attribute
            gridItem.setAttribute("data-col", j); // Set column index as data attribute
            gridContainer.appendChild(gridItem);


        }
    }

    // Append the grid container to the game
    game.appendChild(gridContainer);

    // Append the game to the document body
    document.body.appendChild(game);

    /*
    for(let i = 0; i < names[0].length; i++){
        var square = document.querySelector('.grid-item[data-row="' + i + '"][data-col="' + 0 + '"]');
        setSquareTypable(i, 0)
        square.value = names[0][i];
        
    }

    */
}


function randomizeNames() {
    namesCopy = names;
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [namesCopy[i], namesCopy[j]] = [namesCopy[j], namesCopy[i]];
    }
    return namesCopy;
}

function setSquareTypable(row, col) {
    var square = document.querySelector('.grid-item[data-row="' + row + '"][data-col="' + col + '"]');
    square.style.backgroundColor = "grey";
    square.setAttribute("maxlength", "1");
}

function checkForGame() {
    if (inGame == true) {
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
    game.appendChild(answerBar);
    game.id = "game";
    score = 0;


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
    imageGrid.appendChild(img);

    // Set the name to display (name of the selected image without extension)
    imageName = files[randomIndex].name.split('.')[0];
    prevRand = randomIndex;
    //name.innerHTML = imageName;
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
            imageGrid.appendChild(img);
            imageName = files[randomIndex].name.split('.')[0];
            score++;
            showScore.innerHTML = score;
            result.style.display = "none";
        })
    } else { //* If not correct, show an x that will disappear after a second
        document.getElementById("result").innerText = "❌";
        sleep(1000).then(() => {
            result.style.display = "none";
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
