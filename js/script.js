//variable chessCharacters & chessNumber  which maps x and y cordinate to chess cordinates
//ex: [2,0] = "C8"

const chessCharacters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chessNumber = [7, 6, 5, 4, 3, 2, 1, 0];


// queen1 will holda details abt queen1
let queen1 = {
    direction: "S",
    position: {
        x: 1,
        y: 0,
    }
};

// queen1 will holda details abt queen2
let queen2 = {
    direction: "N",
    position: {
        x: 1,
        y: 7,
    }
};

// Function calculates the new position of queen after taking the noOfSteps(number of steps)
// and direction into direction
const updateCoordinates = (
    xSteps,
    ySteps,
    xOperator = "add",
    yOperator = "add"
) => {

    // both variables will be updated with new positions
    let xValue = null;
    let yValue = null;

    // Updates x coordinate
    if (xOperator === "add") {
        xValue = queen.position.x + Number.parseInt(xSteps);
    } else if (xOperator === "sub") {
        xValue = queen.position.x - Number.parseInt(xSteps);
    }

    // updates y coordinate
    if (yOperator === "add") {
        yValue = queen.position.y + Number.parseInt(ySteps);
    } else if (yOperator === "sub") {
        yValue = queen.position.y - Number.parseInt(ySteps);
    }

    //getting opposite queens coordinates
    let oppQueen = whichQueen === 1 ? queen2 : queen1

    let opp_queen_x = oppQueen.position.x
    let opp_queen_y = oppQueen.position.y


    // checks if the coordinates go out of boards limit or if the new move of one queen leads the queen at same 
    // as of other queen hen it will show message the move is not possible
    if (yValue >= 0 && yValue <= 7 && xValue >= 0 && xValue <= 7 && (opp_queen_x !== xValue || opp_queen_y !== yValue)) {
        // will remove the queens image from last position
        removeImage();
        queen.position.y = yValue;
        queen.position.x = xValue;
    } else {
        $message.style.opacity = "100%";
        console.log("Move not possible");
    }
};



// object holds the directions as key and will update the queens position as per the noOfsteps
// asked for by calling updateCoordinates function hen move function is called.
const Coordinates = {
    N: {
        fullForm: "South",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = 0),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    S: {
        fullForm: "North",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = 0),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "sub")
            ),
    },
    E: {
        fullForm: "East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = 0),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    W: {
        fullForm: "West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = 0),
                (xOperator = "sub"),
                (yOperator = "add")
            ),
    },
    SE: {
        fullForm: "North East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "sub")
            ),
    },
    SW: {
        fullForm: "North West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "sub"),
                (yOperator = "sub")
            ),
    },
    NE: {
        fullForm: "South East",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "add"),
                (yOperator = "add")
            ),
    },
    NW: {
        fullForm: "South West",
        move: (noOfSteps = 1) =>
            updateCoordinates(
                (xSteps = noOfSteps),
                (ySteps = noOfSteps),
                (xOperator = "sub"),
                (yOperator = "add")
            ),
    },
};

// return queen location and direction
const queenLocation = (q) =>
    `${chessCharacters[q.position.x]}${
    chessNumber[q.position.y]}`;

// Function takes new direction abbreviation i.e N,S,E as input so that the direction of queen can be changed.
const changeDirection = (newDirection) => {
    queen.direction = newDirection.toUpperCase()
};


const queenDetails = (noOfSteps = 1) => {
    movingDirection = queen.direction;
    oldXCoordinates = queen.position.x;
    oldYCoordinates = queen.position.y;
    console.log(`-> Queens's last position : ${queenLocation(queen)} \n`);
    Coordinates[movingDirection].move(noOfSteps);
    if (
        oldXCoordinates !== queen.position.x ||
        oldYCoordinates !== queen.position.y
    ) {
        console.log(`-> Queen's new position : ${queenLocation(queen)} \n`);
        createImage(whichQueen, queen)
        moved = true;
    }
};

// Moves Queen by n steps
const jumpMoveForward = (noOfSteps) => {
    queenDetails(noOfSteps);
};

// fucntion for creating queen image

const createImage = (queenNumber, q) => {

    const div = document.querySelector(`#${queenLocation(q)}`)
    div.innerHTML = `<img src="images/queen${queenNumber}.png" alt="Queen2" class="queen${queenNumber}"></img>`
}

// when new coordinate is given the queen image from old coordinates will be removed
const removeImage = () => {
    const div = document.querySelector(`#${queenLocation(queen)}`)
    const queenElement = document.querySelector(`.queen${whichQueen}`)
    div.removeChild(queenElement)
}

// placing queen on chess board as per default location
createImage(1, queen1)
createImage(2, queen2)

// after every move queen will be changed whichQueen wil hold number to denote if to choose queen first or second
var whichQueen = 1;
// as per whichQueen queen varibale will hold the reference to repective queen.
var queen = whichQueen === 1 ? queen1 : queen2;
// will check is queen has been moved or not
var moved = false;


// getting steps and direction elements
let $steps = document.querySelector(".steps")
let $direction = document.querySelector(".direction")
let $queenText = document.querySelector("#queen")
let $message = document.querySelector(".message")

function move() {

    // setting queen direction
    queen.direction = $direction.value

    // moving queen
    jumpMoveForward($steps.value)

    if (moved) {
        whichQueen = whichQueen === 1 ? 2 : 1;
        queen = whichQueen === 1 ? queen1 : queen2;
        $queenText.innerHTML = `Queen Active:&nbsp;&nbsp;${whichQueen}`
        $message.style.opacity = "0";
    }

    moved = false;
}