const inputText = document.getElementById("input-el");
const button = document.getElementById("input-btn");
const ulel = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFormLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

let myLeads = [];

if (leadsFormLocalStorage) {
	myLeads = leadsFormLocalStorage;
	render(myLeads);
}

button.addEventListener("click", function () {
	myLeads.push(inputText.value);
	inputText.value = "";
	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render(myLeads);
});

function render(leads) {
	let leadlist = "";
	for (i = 0; i < leads.length; i++) {
		leadlist += `<li><a target='_blank' href= '${leads[i]}'>${leads[i]}</a></li>`;
	}
	ulel.innerHTML = leadlist;
}

deleteBtn.addEventListener("click", function () {
	localStorage.clear;
	myLeads = [];
	render(myLeads);
});

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	});
});
