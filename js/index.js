"use strict";

window.addEventListener("DOMContentLoaded", function () {
    const tabsHeaders = document.querySelectorAll(".tabheader__item");
    const tabsContents = document.querySelectorAll(".tabcontent");
    const tabsHeadersParent = document.querySelector(".tabheader__items");

    function hideTabContent () {
        tabsContents.forEach(tabContent => {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show", "fade");
        });
        tabsHeaders.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
    }

    function showTabContent (i = 0) {
      tabsContents[i].classList.add("show", "fade");
      tabsContents[i].classList.remove("hide");
      tabsHeaders[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();

    tabsHeadersParent.addEventListener("click", (e) => {
        if(e.target && e.target.matches(".tabheader__item")){
            tabsHeaders.forEach((tabHeader, index) => {
               if(e.target === tabHeader){
                hideTabContent();
                showTabContent(index);
               }
            });
        }
    });

    // function getTimeRemaining (endtime) {
	// 	const total = Date.parse(endtime) - Date.parse(new Date());
	// 	let days, hours, minutes, seconds;

	// 	if (total <= 0) {
	// 		days = 0;
	// 		hours = 0;
	// 		minutes = 0;
	// 		seconds = 0;
	// 	} else {
	// 		days = Math.floor(total / (1000 * 60 * 60 * 24));
	// 		hours = Math.floor((total / (1000 * 60 * 60) % 24));
	// 		minutes = Math.floor((total / 1000 / 60) % 60);
	// 		seconds = Math.floor((total / 1000) % 60);
	// 	}

	// 	return {
	// 		total,
	// 		days,
	// 		hours,
	// 		minutes,
	// 		seconds
	// 	};
	// }

	// function setZero (n) {
	// 	return n >= 0 && n < 10 ? `0${n}` : n;
	// }

	// function setClock (selector, endtime) {
	// 	const timer = document.querySelector(selector);
	// 	const daysBlock = timer.querySelector("#days");
	// 	const hoursBlock = timer.querySelector("#hours");
	// 	const minutesBlock = timer.querySelector("#minutes");
	// 	const secondsBlock = timer.querySelector("#seconds");
	// 	const timerId = setInterval(updateClock, 1000);

	// 	function updateClock () {
	// 		const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
	// 		daysBlock.textContent = setZero(days);
	// 		hoursBlock.textContent = setZero(hours);
	// 		minutesBlock.textContent = setZero(minutes);
	// 		secondsBlock.textContent = setZero(seconds);

	// 		if (total <= 0) {
	// 			clearInterval(timerId);
	// 		}
	// 	}

	// 	updateClock();
	// }

	// setClock(".timer", "2023-07-15 14:00:00");
    
	// timer logic start
	function getTimeRemaining(endtime) {
		const total = Date.parse(endtime) - Date.parse(new Date());
		let days, hours, minutes, seconds;

		if(total <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0
		} else {
			days = Math.floor(total / (1000 * 60 * 60 * 24));
			hours = Math.floor((total / (1000 * 60 * 60) % 24));
			minutes = Math.floor((total / 1000 / 60) % 60);
			seconds = Math.floor((total / 1000) % 60);
		}
		return {
			total,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function setZero (n) {
      return n >= 0 && n < 10 ? `0${n}` : n;
	}

	function setClock (selector, endtime) {
		const timer = document.querySelector(selector);
        const daysBlock = timer.querySelector("#days");
		const hoursBlock = timer.querySelector("#hours");
		const minutesBlock = timer.querySelector("#minutes");
		const secondsBlock = timer.querySelector("#seconds");
		const timerId = setInterval(updateClock, 1000);

		function updateClock () {
			// const time  = getTimeRemaining(endtime);
			const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
			daysBlock.textContent = setZero(days);
			hoursBlock.textContent = setZero(hours);
			minutesBlock.textContent = setZero(minutes);
			secondsBlock.textContent = setZero(seconds);

			if(timerId <= 0) {
				clearInterval(timerId);
			}
		}
		updateClock ();
	}
	setClock(".timer", "2023-07-18 22:15:00");
	// timer logic end

	// modal logic start
    const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");
	const modalCloseBtn = document.querySelector("[data-close");

	modalTrigger.forEach(btn => btn.addEventListener("click", openModel));

	modalCloseBtn.addEventListener("click", closeModel);

	modal.addEventListener("click", (e) => {
       if(e.target === modal) {
		closeModel();
	   }
	});

	document.addEventListener("keydown", (e) => {
		if(e.key === "Escape" && modal.matches(".show")) {
			closeModel();
		}
	});

	const modalTimerId = setTimeout(openModel, 600000);

	function showModalByScroll () {
		if(window.scrollY >= 1000) {
			openModel();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);

	function openModel () {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearTimeout(modalTimerId);
	}

	function closeModel () {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.removeAttribute("style");
	}
	//modal logic end

	// used Class for menu cards => start
   class MneuCard {
	constructor (img, alt, title, descr, price, parentSeelector) {
      this.img = img;
	  this.alt = alt;
	  this.title = title;
	  this.descr = descr;
	  this.price = price;
	  this.parent = document.querySelector(parentSeelector);
	  this.transfer = 27;
	  this.changeToUAH();
	};


	changeToUAH () {
		this.price = this.price * this.transfer;
	};
 
	render () {
	  const {img, alt, title, descr, price, parent} = this;
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

	  parent.append(element);
	};
   };

   new MneuCard(
	"img/tabs/vegy.jpg",
	"vegy",
	"Меню \"Фитнес\"",
    "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
	8.5,
	".menu .container"
   ).render();

   new MneuCard(
	"img/tabs/elite.jpg",
	"elite",
	"Меню \"Премиум\"",
    "В меню \"Премиум\" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
	20.4,
	".menu .container"
   ).render();

   new MneuCard(
	"img/tabs/post.jpg",
	"post",
	"Меню \"Постное\"",
    "Меню \"Постное\" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
	15.9,
	".menu .container"
   ).render();
	// used Class for menu cards => start
});