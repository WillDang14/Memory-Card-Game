var errors = 0;

// tên các loại card
var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
var board = [];


// Kích thước của #board
var rows = 4;
var columns = 5;


var card1Selected;
var card2Selected;

// ===================================================================================== //
// shuffleCards là hàm gọi để chia bài / sắp xếp cards
window.onload = function() {
    
    shuffleCards();

    startGame();

}

function shuffleCards() {
    // vì game này là tìm 2 card giống nhau nên phải thêm 10 cards nữa
    // The concat() method returns a new array, containing the joined arrays.
    cardSet = cardList.concat(cardList);

    // console.log(cardSet);


    // shuffle ==>> sắp xếp cards
    for (let i = 0; i < cardSet.length; i++) {

        // get random index ==>> tức là vị trí trong #board
        let j = Math.floor(Math.random() * cardSet.length)


        // swap
        let temp = cardSet[i];

        // i là giá trị tăng dần, còn j là giá trị random
        cardSet[i] = cardSet[j];
        // gán lại vị trí j bằng giá trị i
        cardSet[j] = temp;
    }

    // console.log(cardSet);
}


/* ======================================================================================== */
// The pop() method removes (pops) the last element of an array.
// The pop() method changes the original array.
// The pop() method returns the removed element.

// The push() method adds new items to the end of an array.
// The push() method changes the length of the array.
// The push() method returns the new length.
function startGame() {

    //arrange the board 4x5 => tạo board có 4row x 5col
    for (let r = 0; r < rows; r++) {
        
        let row = [];
        
        for (let c = 0; c < columns; c++) {

            // The pop() method returns the removed element.
            // cardImg là element cuối cùng trong array cardSet
            let cardImg = cardSet.pop();
            
            // 
            row.push(cardImg); //JS


            // tạo element trong HTML
            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img");

            card.id = r.toString() + "-" + c.toString();
            

            // bài này author không cho images vào 1 folder
            // card.src = cardImg + ".jpg";
            card.src = "images/" + cardImg + ".jpg";

            
            card.classList.add("card");

            // tạo event listen để card có thể click được
            card.addEventListener("click", selectCard);

            
            document.getElementById("board").append(card);

        }

        // vậy là board là 1 array có chứa 4 array nhỏ bên trong 
        // mỗi array nhỏ là 1 row
        board.push(row);

    }

    console.log(board);

    // setTimeout(hideCards, 1000);
    setTimeout(hideCards, 2000);
}


/* ======================================================================================== */
// Giấu card đi bằng cách dùng card khác che vào
function hideCards() {
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns; c++) {

            let card = document.getElementById(r.toString() + "-" + c.toString());

            // card.src = "back.jpg";
            card.src = "images/back.jpg";

        }

    }

}

/* ======================================================================================== */
// Hàm này dùng để mở card ở vị trí được click ==>> chỉ mở được 2 card 1 lần
// sau đó thì tự động đón lại
function selectCard() {

    // kiểm tra xem là card đang ở mặt nào (back hay front)
    if (this.src.includes("back")) {

        if (!card1Selected) {

            // gán card1 cho object là card vừa được click
            card1Selected = this;

            // xác định tọa độ của card-1
            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
        
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);


            // sau khi tìm được tọa độ rồi thì dẫn image vô
            // card1Selected.src = board[r][c] + ".jpg";
            card1Selected.src = "images/" + board[r][c] + ".jpg";

        } else if (!card2Selected && this != card1Selected) {
            
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "images/" + board[r][c] + ".jpg";
            

            // chờ 1 chút rồi lật card lại (thực ra là dẫn lại src khác)
            setTimeout(update, 1000);

        }

    }

}


/* ======================================================================================== */
// 
function update() {

    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        
        // card1Selected.src = "back.jpg";
        // card2Selected.src = "back.jpg";

        card1Selected.src = "images/back.jpg";
        card2Selected.src = "images/back.jpg";
        
        errors += 1;
        
        document.getElementById("errors").innerText = errors;
    }


    // de-select both cards ==>> để có thể chọn card khác
    // vì sau khi được gán giá trị là card vừa được click ở trên thì card1Seclect / card2Seclect khác "null"
    // ==>> nên giờ phải gán là null
    card1Selected = null;
    card2Selected = null;
}











