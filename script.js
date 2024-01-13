// Bắt đầu lúc 5:20
const tilesContainer = document.querySelector('.tiles');


// dùng colors để match với nhau
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];



// nối 2 array với nhau, để tạo ra 1 cặp color
// Chú ý cái này gọi là "spread operator"
// const colorsPicklist = [...colors, ...colors];

// Dùng "let" thay cho "const" vì khi Reset lại game thì không thực hiện lệnh gán này được 
// khi dùng định nghĩa là const ==> dùng let thì được
let colorsPicklist = [...colors, ...colors];
// console.log(colorsPicklist);




// tạo biến dùng cho tiện, đỡ phải gọi mỗi lần cần đến
const tileCount = colorsPicklist.length;


/////////////////////////////////////////////////////////////////////////////////////////////////////
// Game state ==> biến đếm để so sánh với tổng số Tiles
// tức là khi revealedCount === tileCount thì end game vì đã mở hết các Tiles rồi
let revealedCount = 0;


// biến dùng để gán giá trị object "tile" vừa được click
// giá trị ban đầu là "null"
let activeTile = null;


// Flag để dùng trong việc tạo thời gian chờ nếu 2 item không giống nhau thì chờ 1 khoảng thời gian rồi tự động đóng lại
let awaitingEndOfMove = false;


/////////////////////////////////////////////////////////////////////////////////////////////////////
// build tile element and return new element mới được tạo ra
function buildTile(color) {

	// tạo 1 div mới ==>> chú ý là vẫn chưa được gán vô HTML
	const element = document.createElement("div");
	
	// tạo class cho <div> vừa mới tạo ra
	// Chú ý là class ".tile" đã được CSS sẵn trong "Style.css"
	element.classList.add("tile");


	// chú ý là "data-color" là HTML Attribute do user định nghĩa
	// tham khảo thêm "data-*" attribute
	// data-color này dùng để so sánh 2 tiles xem có giống màu không
	element.setAttribute("data-color", color);

	
	// "data-*" attribute này là để kiểm tra xem tile đã được mở chưa
	// tức là nếu 2 tile đã trùng nhau và được mở thì sẽ không xét lại nữa (bỏ qua)
	// giá trị khởi tạo của "data-revealed" là "false" ==> tức là chưa mở
	element.setAttribute("data-revealed", "false");



	element.addEventListener("click", () => {

		// Dùng biến "revealed" để kiểm tra xem element vừa được click có đang mở không
		// => tức là đã tìm được 1 cặp trùng nhau
		const revealed = element.getAttribute("data-revealed");


		// Bước này là để kiểm tra 1 số điều kiện ví dụ như 2 tiles không trùng nhau thì không thể mở tiles khác trong thời gian chờ đóng 2 tiles đó lại
		// tức là return (thoát khỏi Event luôn) ==>> xem 16:45
		// Điều kiện thứ 3 là kiểm tra xem có phải click vô cùng 1 tile hay không
		if (awaitingEndOfMove || revealed === "true"  || element === activeTile) {
			
			// console.log(awaitingEndOfMove);
			
			// console.log(revealed);

			return;
		}


		// color này là argument được truyền vào cho function buildTile(color)
		// còn 1 cách khác nữa là truy cập vào "dataset" vừa tạo ở trên ==> element.dataset.color cũng cho kết quả tương tự
		element.style.backgroundColor = color;
		// console.log(color);


		// Cái này tự thêm vô để hiển thị name of color
		element.innerText = color;

		// nếu chưa gán element cho activeTile thì gán vô => giá trị ban đầu là "null"
		// gán xong element thì thoát khỏi Event luôn
		if (!activeTile) {
			activeTile = element;
			return;
		}


		/* Bắt đầu kiểm tra Logic */
		// chú ý là activeTile lúc này là element được click lần 1
		const colorToMatch = activeTile.getAttribute("data-color"); 

		// còn color này là giá trị của color click lần 2
		if (colorToMatch === color) {

			// Khi 2 tiles giống nhau thì thay đổi value của data-atrribute là "true"
			element.setAttribute("data-revealed", "true");
			activeTile.setAttribute("data-revealed", "true");


			// reset lại 2 biến này và tiếp tục các tiles khác
			awaitingEndOfMove = false;
			activeTile = null;


			// Mỗi lần mở 2 tiles nên cần tăng 2 đơn vị
			revealedCount += 2;



			// Khi mở ra hết rồi thì đưa ra thông báo
			// Chú ý: setTimeOut là tự viết thêm vô cho hợp lý 
			// => tức là nếu theo nguyên mẫu thì Tile cuối cùng chưa kịp hiện ra thì đã hiển thị Alert rồi.
			// thêm cái setTimeout() để hiển thị màu cho Tile cuối cùng rồi mới hiển thị Alert
			if (revealedCount === tileCount) {
				setTimeout( () => {
					alert("You win! Refresh to start again.");
				}, 200);
			}



			// Cần phải return chỗ này bởi vì activeTile đã reset là "null"
			// => cho nên chương trình khi đọc "activeTile.style.backgroundColor" ở dưới sẽ báo lỗi
			// => bởi vì activeTile không còn là 1 Element nữa
			return;

		}
		/* Kết thúc kiểm tra Logic */


		// Gán true để không thể click các Tile khác do lệnh return ở trên
		// Chú ý là khi kết hợp với "return" của if(!activeTile) thì sẽ có 2 lần click vô Tiles bất kì
		// lần đầu là do if(!activeTile) thoát ra và lần sau do if(awaitingEndOfMove) với giá trị của awaitingEndOfMove=true
		awaitingEndOfMove = true;


		setTimeout(() => {

			// dùng "null" delete luôn backgroundColor ==>> tức là không set gì hết
			// tức là "empty"
			element.style.backgroundColor = null;
			activeTile.style.backgroundColor = null;

			// console.log(element.style.backgroundColor);
			// console.log(activeTile.style.backgroundColor);


			// tự thêm vô 2 dòng code sau, xóa text trong div đi
			activeTile.innerText = null;
			element.innerText = null;

			// reset lại 2 biến sau khi đóng 2 Tiles lại
			// Chú ý là trong khi chờ setTimeout() được thực hiện thì không thể chọn các Tiles khác
			// là vì 2 biến này chưa được reset
			awaitingEndOfMove = false;
			activeTile = null;

		}, 1000);


	});


	return element;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////
// Build up tiles
// Phần này dùng để phân bố color trong <div class="tiles">

for (let i = 0; i < tileCount; i++) {

	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	
    const color = colorsPicklist[randomIndex];
    // console.log(color);


    // tạo tile element mới bên trong <div class="tiles"> với color vừa được chọn
    const tile = buildTile(color);


    // Xóa luôn phần tử vừa mới được random pick
    // ==>> đồng thời chính array đó cũng bị "overwrite"
    // tức là length của mảng colorsPicklist.lenght cũng bị ngắn lại
	colorsPicklist.splice(randomIndex, 1);    
    
    
	// console.log(color);
    // console.log(colorsPicklist.length);

    
    // tạo xong element mới rồi thì gắn vô <div class="tiles">
    tilesContainer.appendChild(tile);

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resetFunction(e) {
	
	// console.log(e.target);

	colorsPicklist = [...colors, ...colors];
	revealedCount = 0;
	activeTile = null;
	awaitingEndOfMove = false;


	for (let i = 0; i < tileCount; i++) {

		tilesContainer.removeChild(tilesContainer.children[0]);

		const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
		
		const color = colorsPicklist[randomIndex];
		// console.log(color);
	
	
		// tạo tile element mới bên trong <div class="tiles"> với color vừa được chọn
		const tile = buildTile(color);
	
	
		// Xóa luôn phần tử vừa mới được random pick
		// ==>> đồng thời chính array đó cũng bị "overwrite"
		// tức là length của mảng colorsPicklist.lenght cũng bị ngắn lại
		colorsPicklist.splice(randomIndex, 1);    
		
		
		// console.log(color);
		// console.log(colorsPicklist.length);
	
		
		// tạo xong element mới rồi thì gắn vô <div class="tiles">
		tilesContainer.appendChild(tile);
	
	}
}


let resetBtn = document.querySelector(".rstGame");
resetBtn.addEventListener('click', resetFunction)




