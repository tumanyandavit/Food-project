function menuCradModulle () {
	//    class MneuCard {
	// 	constructor (img, alt, title, descr, price, parentSeelector) {
	//       this.img = img;
	// 	  this.alt = alt;
	// 	  this.title = title;
	// 	  this.descr = descr;
	// 	  this.price = price;
	// 	  this.parent = document.querySelector(parentSeelector);
	// 	  this.transfer = 27;
	// 	  this.changeToUAH();
	// 	};


	// changeToUAH () {
	// 	this.price = this.price * this.transfer;
	// };

	// 	render () {
	const { img, alt, title, descr, price, parent } = this;
	const element = document.createElement("div");
	element.classList.add("menu__item");

	const transfer = 27.59;

	function changeToUAH() {
		function changeToUAH() {
			price = (parseFloat(price) * parseFloat(transfer)).toFixed(2);
		};
	}
	changeToUAH();

	element.innerHTML = `
	  <img src=${img} alt=${alt}>
	  <h3 class="menu__item-subtitle">${title}</h3>
	  <div class="menu__item-descr">${descr}</div>
	  <div class="menu__item-divider"></div>
	  <div class="menu__item-price">
		  <div class="menu__item-cost">Цена:</div>
		  <div class="menu__item-total"><span>${price}</span> грн/день</div>
	  </div>
	  `;

	// 	  parent.append(element);
	// 	};
	//    };

	//    getData("http://localhost:8888/menu")
	//        .then(data => data.forEach(({img, altimg, title, descr, price}) => {
	// 		new MneuCard(img, altimg, title, descr, price, ".menu .container").render();
	// 	   }));

	axios.get("http://localhost:8888/menu")
		.then(request => console.log(createMenuCards(request.data)));

	function createMenuCards(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement("div");
			element.classList.add("menu__item");
			element.innerHTML = `
		<img src=${img} alt=${alt}>
		<h3 class="menu__item-subtitle">${title}</h3>
		<div class="menu__item-descr">${descr}</div>
		<div class="menu__item-divider"></div>
		<div class="menu__item-price">
			<div class="menu__item-cost">Цена:</div>
			<div class="menu__item-total"><span>${price}</span> грн/день</div>
		</div>
		`;
			document.querySelector(".menu .container").append(element);
		});
	}

}

// module.exports = menuCradModulle;
export default menuCradModulle;