const input = document.getElementById("vvod");
const knopkaVvoda = document.getElementById("knopka");
const listik = document.getElementById("listik");

let data = []

if (localStorage.getItem("dataPizdato")) {
	data = JSON.parse(localStorage.getItem("dataPizdato"))
}


const dataUpdate = () => {
	localStorage.setItem("dataPizdato", JSON.stringify(data))
}

const sozdanieElementa = (text, checked, id) => {
	let elementik = document.createElement("div")
	elementik.classList.add("element")
	if (checked) {
		elementik.classList.add("element_line")
		elementik.innerHTML = `<div>${text}</div>
	<input id="${id}" checked type="checkbox">`
	} else {
		elementik.innerHTML = `<div>${text}</div>
		<input  id="${id}" type="checkbox">`
	}

	listik.append(elementik)
}

knopkaVvoda.addEventListener("click", () => {
	let text = input.value
	input.value = ""
	if (text.trim() === "") {
		return;
	}
	sozdanieElementa(text, false, data.length)
	data.push({ text, checked: false })

	dataUpdate()
})

listik.addEventListener("click", (event) => {
	if (event.target.type !== "checkbox") {
		return
	}
	let id = Number(event.target.id)
	let parent = event.target.parentElement

	if (event.target.checked) {
		parent.classList.add("element_line")
		data[id].checked = true;
	}
	else {
		parent.classList.remove("element_line")
		data[id].checked = false;
	}
	dataUpdate()
})


data.forEach((i, index) => {
	sozdanieElementa(i.text, i.checked, index)
})