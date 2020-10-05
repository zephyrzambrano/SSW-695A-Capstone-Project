var tabs = document.querySelectorAll(".tabs_wrap ul li");
var physical = document.querySelectorAll(".phy");
var mental = document.querySelectorAll(".mental");
var all = document.querySelectorAll(".item_wrap");

tabs.forEach((tab)=>{
	tab.addEventListener("click", ()=>{
		tabs.forEach((tab)=>{
			tab.classList.remove("active");
		})
		tab.classList.add("active");
		var tabval = tab.getAttribute("data-tabs");

		all.forEach((item)=>{
			item.style.display = "none";
		})

		if(tabval == "physical"){
			males.forEach((physical)=>{
				male.style.display = "block";
			})
		}
		else if(tabval == "mental"){
			females.forEach((mental)=>{
				female.style.display = "block";
			})
		}
		else{
			all.forEach((item)=>{
				item.style.display = "block";
			})
		}

	})
})