"use strict";

import tabModule from "../src/js/components/tab";
import timerModule from "../src/js/components/timer";
import modalModule from "../src/js/components/modal";
import menuCardModule from "../src/js/components/menuCard";
import formsModule from "../src/js/components/forms";
import sliderModule from "../src/js/components/slider";
import calculatorModule from "../src/js/components/calculator";

window.addEventListener("DOMContentLoaded", function () {
	// const tabModule = require("./components/tab");
	// const timerModule = require("./components/timer");
	// const modalModule = require("./components/modal");
	// const menuCardModule = require("./components/menuCard");
	// const formsModule = require("./components/forms");
	// const sliderModule = require("./components/slider");
	// const calculatorModule = require("./components/calculator");

	tabModule();
	timerModule("2023-12-31 23:59:59");
	modalModule();
	menuCardModule();
	formsModule();
	sliderModule();
	calculatorModule();
});