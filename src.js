var files = [];
var names = [];


function saveFiles() {
    if (document.getElementById("folderUpload").files.length == 0) {
        alert("Please upload at least one file.");
    } else {
        document.getElementById("welcome").style.display = "none";
        var loading = document.createElement("img");
        loading.src = "../loading.gif";
        loading.id = "loading";
        document.body.appendChild(loading);
        sleep(500).then(() => {
            loading.remove();
            files = document.getElementById("folderUpload").files;
            getNames();
            document.getElementById("options").style.display = "block";
        })
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var inGame = false;
var found = false;
var currentPerson;
var score = 0;
var prevRand = null;

var scoreDisplay, scoreText, showScore, nameDisplay, nameText, showName;

function runPhotoMatch() {
    if (inGame == true) {
        if (window.confirm("There is already a game open. Would you like to exit this and start a new one?")) {
            var currentGame = document.getElementById("game");
            currentGame.remove();
            document.getElementById("done-holder").remove();
            score = 0;
        }
    }
    inGame = true;

    var game = document.createElement("div");
    game.id = "game";

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

    document.body.appendChild(game);
    document.body.appendChild(doneHolder);

    var imageGrid = document.createElement("div");
    imageGrid.id = "image-grid";
    game.appendChild(imageGrid);

    for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        var img = document.createElement("img");
        img.className = "image";
        imageGrid.appendChild(img);
        img.setAttribute("src", URL.createObjectURL(files[i]))
        img.src = URL.createObjectURL(files[i]);
        var thisName = names[i];
        img.id = names[i].replace(" ", "-")
        img.onclick = functionHandler(names[i])
    }

    var num = Math.floor(Math.random() * (files.length));
    showName.innerHTML = names[num];
    currentPerson = names[num];
    prevRand = num;
}


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
            namesCopy = namesCopy.map(function(element) {
                return element.toLowerCase();
            });
            board = Array.from({ length: 16 }, () => Array.from({ length: 16 }).fill(''));

            names_placed = 0;
            
            namesCopy.forEach(function(name) {
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

function runTypeName() {
    if (inGame == true) {
        if (window.confirm("There is already a game open. Would you like to exit this and start a new one?")) {
            var currentGame = document.getElementById("game");
            currentGame.remove();
            document.getElementById("done-holder").remove();
            score = 0;
        }
    }
    inGame = true;

    document.getElementById("answerBar").classList.remove("hidden");

    var game = document.createElement("div");
    game.id = "game";
    score = 0;

    var scoreDisplay = document.createElement("p");
    var name = document.createElement("p");

    document.body.appendChild(game);

    var doneHolder = document.createElement("div");
    doneHolder.style.width = "100vw";
    doneHolder.style.display = "flex";
    doneHolder.style.justifyContent = "center";
    var done = document.createElement("button");
    doneHolder.appendChild(done);
    doneHolder.id = "done-holder";
    done.innerHTML = "End game";
    done.marginLeft = "0";
    done.id = "end-game";
    done.className = "button";
    done.onclick = function () {
        endGame();
    }

    document.body.appendChild(game);
    document.body.appendChild(doneHolder);

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

    game.appendChild(scoreDisplay);
    game.appendChild(name);

    imageGrid = document.createElement("div");
    imageGrid.id = "image-holder";

    game.appendChild(imageGrid);

    game.appendChild(document.getElementById("answerBar"));

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

function check(name) {
    console.log(name);
    name = name.replace("-", " ");
    if (name.toLowerCase() == currentPerson.toLowerCase()) {
        var num = Math.floor(Math.random() * (files.length));
        while (prevRand == num) {
            num = Math.floor(Math.random() * (files.length));
        }
        prevRand = num;
        showName.innerHTML = names[num];
        currentPerson = names[num];
        score++;
        console.log(score);
        showScore.innerHTML = score;
        for (var i = 0; i < files.length; i++) {
            document.getElementById(names[i].replace(" ",)).style.filter = "brightness(100%)";
        }

    } else {
        document.getElementById(name).style.filter = "brightness(50%)";
    }
}

function checkAnswer() {
    var userAnswer = document.getElementById("answer").value;
    var correctAnswer = imageName.toLowerCase(); // Convert both answers to lowercase
    var result = document.getElementById("result");
    result.style.display = "inline-block";

    if (userAnswer.toLowerCase() == correctAnswer) { // Compare case-insensitively
        result.innerText = "✓";
        result.style.color = "green";
        sleep(500).then(() => {
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
    } else {
        document.getElementById("result").innerText = "❌";
        sleep(1000).then(() => {
            result.style.display = "none";
        })
    }
    showScore.innerHTML = score;
}

function getNames() {
    for (var i = 0; i < files.length; i++) {
        names[i] = files[i].name.split('.')[0];
    }
}

function backToHome() {
    location.reload();
}

function endGame() {
    game.remove();
    inGame = false;

    // var stats = document.createElement("div");
    // stats.id = "stats";
    // document.body.appendChild(stats);
    document.getElementById("options").style.display = "none";
    document.getElementById("stats").style.display = "block";

    document.getElementById("done-holder").remove();

    document.getElementById("final-score").innerHTML = score;


    var holder = document.createElement("div");
    holder.style.width = "100vw";
    holder.style.display = "flex";
    holder.style.justifyContent = "center";
    var playAgain = document.createElement("button");
    document.body.appendChild(holder);
    playAgain.id = "end-game";
    playAgain.className = "button";
    playAgain.style.marginLeft = "0";
    playAgain.innerHTML = "Memorize another set of names"
    playAgain.onclick = function () {
        location.reload();
    }

    holder.appendChild(playAgain);
}