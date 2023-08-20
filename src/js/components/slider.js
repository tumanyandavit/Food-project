function sliderModule() {
    	// slider
	const slides = document.querySelectorAll(".offer__slide");
	const prev = document.querySelector(".offer__slider-prev");
	const next = document.querySelector(".offer__slider-next");
	const current = document.querySelector("#current");
	const total = document.querySelector("#total");
	const slider = document.querySelector(".offer__slider");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesInner = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	checkForZero()

	slidesInner.style.cssText = `
	  display: flex;
	  width: ${100 * slides.length}%;
	  transition: all 0.5s;
	`;

	slidesWrapper.style.overflow = "hidden";
	slides.forEach(slide => slide.style.width = width);

	slider.style.position = "relative";
    
	const dots = [];
	const dotsWrapper = document.createElement("ul");
	dotsWrapper.style.cssText = `
	position: absolute;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 15;
    display: flex;
	justify-content: center;
	margin-left: 15%;
	margin-right: 15%;
	list-style: none;
	`;

	slider.append(dotsWrapper);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-left: 3px;
		margin-right: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5s;
		transition: opacity .5s;
		`;

		if (i === 0) {
           dot.style.opacity = 1;
		}
		dotsWrapper.append(dot);
		dots.push(dot);
	}

	next.addEventListener("click", () => sliderLogic(+width.replace(/\D/g, "") * (slides.length - 1), true, false));
	prev.addEventListener("click", () => sliderLogic(0, false, true));

	dots.forEach(dot => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			slideIndex = slideTo;
			offset = +width.replace(/\D/g, "") * (slideTo - 1);
			slidesInner.style.transform = `translateX(-${offset}px)`;
			checkForZero();
			dotLogic();
		});
	})

	function checkForZero() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	function dotLogic () {
		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	}

	function sliderLogic (statement, next = false, prev = false) {
		if (next === true && prev === false) {
            slideIndex === slides.length || slideIndex >= slides.length ? slideIndex = 1 : slideIndex++;
			offset === statement ? offset = 0 : offset += +width.replace(/\D/g, "");
		}

		if (next === false && prev === true) {
			slideIndex === 1 || slideIndex <= 1 ? slideIndex = slides.length : slideIndex--;
			offset === statement ? offset =  +width.replace(/\D/g, "") * (slides.length - 1) : offset -= +width.replace(/\D/g, "");
		}

		slidesInner.style.transform = `translateX(-${offset}px)`;
		checkForZero();
		dotLogic();
	}


	// let slideIndex = 1;

	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// prev.addEventListener("click", () => slidesState(-1));
	// next.addEventListener("click", () => slidesState(1));

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(slide => slide.style.display = "none");
	// 	slides[slideIndex - 1].style.display = "block";

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}

	// }

	// function slidesState(n) {
	// 	showSlides(slideIndex += n);
	// }

}

// module.exports = sliderModule;
export default sliderModule;