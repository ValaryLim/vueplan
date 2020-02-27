<template src = "./ModuleInfo.html"> </template>
<style src = "./ModuleInfo.css"> </style>

<script>
import modules from "../../assets/allmoduleinfo.json";
import moduleReviews from '../../assets/moduleReviews.json';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
	name: "App",
	display: "Module Information",
	components: {
		FontAwesomeIcon
	},
	data: function() {
		return {
			search:'',
			mods: Object.values(modules),
			}
		},

	props: ['allmodules'],	

	computed: {
	filteredList() {
		if(this.search != ''){
			document.getElementById("res").innerHTML ="";
		}
		return Object.keys(this.allmodules).filter(mod => {
			return mod.toUpperCase().includes(this.search.toUpperCase())
            })
		}
	},
	
	methods:{  

		modInfo:function(mod){
			this.search ='';
			var res = document.getElementById("res");
			res.innerHTML = "<h1>" + mod.code + " " + mod.title + "</h1>";
			res.insertAdjacentHTML('beforeend', '<div id = indicators>' + mod.department + " | " + "4 MCs</div><hr></hr>");
			res.insertAdjacentHTML('beforeend', "<p>" + mod.desc + "</p>" + "<h2>Prerequisites</h2><hr></hr><p>");
			//PREREQUISITES      
			//getting the index the module is found at
			var arr = [];      
			for(let i=0; i <this.mods.length; i++){
				var index = mod.prereq.toUpperCase().indexOf(this.mods[i].code);
				if(index != -1){
					arr.push([index,this.mods[i]])
				}
			}
		
			var startIndex = 0;
			arr.sort(function(a,b) {return a[0]-b[0]});
			if (arr.length == 0 && mod.prereq.length == 0) {
				res.insertAdjacentHTML('beforeend', "None");
			}  
			//joining the substrings to form the necessary output
			for(let i = 0; i<arr.length; i++){ 
				res.insertAdjacentHTML('beforeend',mod.prereq.substring(startIndex, arr[i][0]));        
				var eventname = 'temp'.concat(i);
				res.insertAdjacentHTML('beforeend',"<a id = '"+ eventname + "'href='#'>"+ arr[i][1].code+ "</a>");        
				startIndex = arr[i][0] + arr[i][1].code.length;
			}

			res.insertAdjacentHTML('beforeend', mod.prereq.substring(startIndex, mod.prereq.length) +"</p>");
		
		
		
			//PRECLUSIONS
			document.getElementById('res').insertAdjacentHTML('beforeend',"<h2>Preclusions</h2><hr></hr><p>")
			var arr_a = [];      
			for(let i=0; i <this.mods.length; i++){
				index = mod.preclusion.toUpperCase().indexOf(this.mods[i].code);
				if(index != -1){
					arr_a.push([index,this.mods[i]])
				}
			}
		
			startIndex = 0;
			arr_a.sort(function(a,b) {return a[0]-b[0]});
			if (arr_a.length == 0 && mod.preclusion.length == 0) {
				res.insertAdjacentHTML('beforeend', "None");
			}
			//joining the substrings to form the necessary output
			for(let i = 0; i<arr_a.length; i++){ 
				res.insertAdjacentHTML('beforeend',mod.preclusion.substring(startIndex, arr_a[i][0]));        
				eventname = 'temp'.concat(i);
				res.insertAdjacentHTML('beforeend',"<a id = '"+ eventname + "'href='#'>"+arr_a[i][1].code+ "</a>");
				startIndex = arr_a[i][0] + arr_a[i][1].code.length;
			}
			res.insertAdjacentHTML('beforeend', '</p>')

			
			var workload = modules[mod.code]['workload'].split("-");
			var totalHours = workload.map(function(elt) {return parseInt(elt)}).reduce(function(a,b) {return a+b});
			var totalString = totalHours + totalHours > 1 ? 'hrs' : 'hr';
			var overallReviewNum = Object.values(moduleReviews[mod.code]).map(function(x) {return x['overall']}).reduce(function(a,b) {return a+b}) / Object.values(moduleReviews[mod.code]).length;
			overallReviewNum = Math.round(overallReviewNum*10)/10	
			res.insertAdjacentHTML('beforeend', '<h2>Workload - '+ totalHours + ' ' + totalString +'</h2>');
			res.insertAdjacentHTML('beforeend','<h3>'+workload+'</h3>');
			res.insertAdjacentHTML('beforeend','<div>Workload viusalisation here</div><br></br>');
			res.insertAdjacentHTML('beforeend','<h2>Prerequisite Tree</h2><hr></hr>');
			res.insertAdjacentHTML('beforeend', '<div>Insert Prereq tree here</div><br></br>');
			res.insertAdjacentHTML('beforeend', '<h2>Ratings and Reviews</h2><hr></hr>');
			res.insertAdjacentHTML('beforeend','<h3 id = "OverallFeedbackNum">'+overallReviewNum+'</h3>');
			res.insertAdjacentHTML('beforeend','<div id = "StarsOuter"><div id = "StarsInner"></div></div><div></div>');
			var arr_all = arr.concat(arr_a).reverse();
			console.log(arr_all.length)
			//onclick of the module code, brings you to the module page      
			var matches = document.querySelectorAll("a");
			console.log(matches);
			console.log(arr_all);
			var x = this;
			for (let j = arr_all.length-1; j >= 0; j--) {
				let button = matches[matches.length-j-1];

				button.addEventListener('click', function() {
						console.log(arr_all, "Array All")
						console.log(arr_all[0][parseInt(j)], "Select Module");
						x.modInfo(arr_all[j][1]);
					}
				)
			}
		},
	}
}

</script>