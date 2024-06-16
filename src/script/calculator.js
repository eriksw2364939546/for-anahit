let display = document.querySelector(".calc__display");

let buttons = Array.from(document.querySelectorAll(".calc__btn"));

buttons.map((button) => {
	button.addEventListener("click", (e) => {
		switch (e.target.innerText) {
			case "AC":
				display.innerText = "0";
				break;
			case "=":
				try {
					if (display.innerText.includes("%")) {
						let temp = display.innerText.split("%")
						display.innerText = +temp[0] * +temp[1] / 100
					} else {
						display.innerText = eval(display.innerText);
					}
				} catch (e) {
					display.innerText = "Error!";
				}
				break;
			case "+/-":
				display.innerText = "-";
				break;
			default:
				if (display.innerText === "0" && e.target.innerText !== ".") {
					display.innerText = e.target.innerText;
				} else {
					display.innerText += e.target.innerText;
				}
		}
	});
});