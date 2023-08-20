function calculatorModule() {
    const result = document.querySelector(".calculating__result span");
	let gender, height, weight, age, ratio;

	function initStartSettings (key, value, variable) {
		if (localStorage.getItem(key)) {
			variable = localStorage.getItem(key)
		} else {
			variable = value;
			localStorage.setItem(key, value);
		}
	}
	initStartSettings("gender", "female", gender);
	initStartSettings("ratio", 1.375, ratio);

	// if (this.localStorage.getItem("gender")) {
    //     gender = localStorage.getItem("gender")
	// } else {
	// 	gender = "female";
	// 	localStorage.setItem("gender", "female");
	// }

	// if (localStorage.getItem("radio")) {
    //   ratio = localStorage.getItem("ratio")
	// } else {
	// 	ratio = 1.375;
	// 	localStorage.setItem("ratio", 1.375);
	// }

	function calcTotal () {
		if (!gender || !height || !weight || !age || !ratio) {
           result.textContent = "_____";
		   return;
		}

		if (gender === "female") {
			result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * ratio);
		} else if (gender === "male") {
			result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * ratio);
		} else {
			result.textContent = "____";
		}
 	}

	 calcTotal();

	 function initLocalSettings (selector, activeClass) {
		const elements = document.querySelectorAll(selector);
        
		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute("id") === localStorage.getItem("gender")) {
			   elem.classList.add(activeClass);              
			}

			if (elem.dataset.ratio === localStorage.getItem("ratio")) {
				elem.classList.add(activeClass);              
			 }
		})
	 }

	 initLocalSettings("#gender div", "calculating__choose-item_active");
	 initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

	 function getStaticInformation (selector, activeClass) {
       const elements = document.querySelectorAll(selector);

	   elements.forEach(elem => {
		elem.addEventListener("click", (e) => {
			if (e.target.dataset.ratio) {
               ratio = parseFloat(e.target.dataset.ratio);
			   localStorage.setItem("ratio", parseFloat(e.target.dataset.ratio));
			} else {
				gender = e.target.getAttribute("id");
				localStorage.setItem("gender", e.target.getAttribute("id"));
			}

			elements.forEach(elem => elem.classList.remove(activeClass));
			e.target.classList.add(activeClass);
			calcTotal();
		});
	   });
	 }

	 getStaticInformation("#gender div", "calculating__choose-item_active");

	 getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

	 function getDynamicInformation (selector) {
       const input = document.querySelector(selector);

	   input.addEventListener("input", () => {
		const val = input.value;

        if (val.match(/\D/g)) {
           input.style.border = "1px solid red";
		   const timerID = setTimeout(() => {
			input.value = "";
			input.removeAttribute("style");
			clearTimeout(timerID)
		   }, 200);
		}

         switch(input.getAttribute("id")) {
        case "height":
			height = parseFloat(val);
			break;
		case "weight":
			weight = parseFloat(val);
			break;
		case "age":
			age = parseFloat(val);
			break;
	   }

	   calcTotal();
	 });
   }

   getDynamicInformation("#height");
   getDynamicInformation("#weight");
   getDynamicInformation("#age");
}

// module.exports = calculatorModule;
export default calculatorModule;