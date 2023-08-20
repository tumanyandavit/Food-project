// const spinner = require("./spinner");
import spinner from "./spinner";

function formsModule() {
    	// we creating post request to server

	const forms = document.querySelectorAll("form");
	const messages = {
		loading: spiner,
		success: "Thank you ! We will contact with you.",
		failure: "Sorry, but this moment something went wrong !"
	};

	forms.forEach(form => bindPostData(form));

	async function postData(url, data) {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=utf-8"
			},
			body: data
		});

		if (!request.ok) {
			throw new Error();
		}

		return await request.json();
	}

	async function getData(url) {
		const request = await fetch(url);
		if (!request.ok) {
			throw new Error();
		}
		return await request.json();
	}

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const { loading, success, failure } = messages;

			const loader = document.createElement("div");
			loader.innerHTML = loading();
			form.append(loader);

			if (!navigator.onLine) {
				messagesModal(failure + ": Please check your internet connection and try again.");
				loader.remove();
				form.reset();
			}

			const empty = /^$/g;
			const phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]?[0-9]{4,6}$/im;
			let status = false;

			for (let i = 0; i < form.querySelectorAll("input").length; i++) {
				if (empty.test(form[i].value) || !phone.test(form[1].value)) {
                    status = false;
					messagesModal("Please fill all fildes. On phone filed please fill telephone number format");
					loader.remove();
					form.reset();
					break;
				} else {
					status = true;
				}
			}

			if (status) {
				const formData = new FormData(form);
				//    const data = JSON.stringify(Object.fromEntries(formData.entries()));
	
				//    postData("http://localhost:8888/requests", data)
				axios.post("http://localhost:8888/requests", Object.fromEntries(formData.entries()))
					.then(data => {
						console.log(data);
						messagesModal(success);
					})
					.catch(err => {
						messagesModal(failure + ": " + err)
					})
					.finally(() => {
						loader.remove();
						form.reset();
					});
			} else {
               console.log("status is falsed");
			}
		});
	}

	function messagesModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");
		prevModalDialog.classList.add("hide");
		openModel();

		const messageModal = document.createElement("div");
		messageModal.classList.add("modal__dialog");
		messageModal.innerHTML = `
		  <div class="modal__content">
		    <div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		  </div>
		`;

		document.querySelector(".modal").append(messageModal);

		setTimeout(() => {
			messageModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModel();
		}, 2000);
	}

}

// module.exports = formsModule;
export default formsModule;