<template src = "./ModuleInfo.html"> </template>
<style src = "./ModuleInfo.css"> </style>

<script>
export default {
	name: "App",
	display: "Module Information",
	data: function() {
		return {
			search:'',
			};
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
		var mods = Object.keys(this.allmodules);

		document.getElementById("res").innerHTML = "<h1>" + mod.code + " " + mod.title + "</h1>" + "<p>" + mod.desc + "</p>" + "<h4>Prerequisites: ";      
		//PREREQUISITES      
		//getting the index the module is found at
		
		var arr = [];      
		for(let i=0; i < mods.length; i++){
			var index = mod.prereq.toUpperCase().indexOf(this.allmodules[mods[i]].code);
			if(index != -1){
				arr.push([index,this.allmodules[mods[i]]])
			}
		}
      
		var startIndex = 0;
		arr.sort(function(a,b) {return a[0]-b[0]});
           
		//joining the substrings to form the necessary output
		for(let i = 0; i<arr.length; i++){ 
			document.getElementById('res').insertAdjacentHTML('beforeend',mod.prereq.substring(startIndex, arr[i][0]));        
			var eventname = 'temp'.concat(i);
			document.getElementById('res').insertAdjacentHTML('beforeend',"<a id = '"+ eventname + "'href='#'>"+ arr[i][1].code+ "</a>");        
			startIndex = arr[i][0] + arr[i][1].code.length;
		}

		document.getElementById("res").insertAdjacentHTML('beforeend', mod.prereq.substring(startIndex, mod.prereq.length) +"</h4>");
      
      
      
		//PRECLUSIONS
		document.getElementById('res').insertAdjacentHTML('beforeend',"<h4>Preclusions: ")
		var arr_a = [];      
		for(let i=0; i <mods.length; i++){
			index = mod.preclusion.toUpperCase().indexOf(this.allmodules[mods[i]].code);
			if(index != -1){
				if(this.allmodules[mods[i]].code != mod.code){
					arr_a.push([index,this.allmodules[mods[i]]])
				}
			}
		}
      
		startIndex = 0;
		arr_a.sort(function(a,b) {return a[0]-b[0]});
           
		//joining the substrings to form the necessary output
		for(let i = 0; i<arr_a.length; i++){ 
			document.getElementById('res').insertAdjacentHTML('beforeend',mod.preclusion.substring(startIndex, arr_a[i][0]));        
			eventname = 'temp'.concat(i);
			document.getElementById('res').insertAdjacentHTML('beforeend',"<a id = '"+ eventname + "'href='#'>"+arr_a[i][1].code+ "</a>");        
			startIndex = arr_a[i][0] + arr_a[i][1].code.length;
		}
      
		var arr_all = arr.concat(arr_a).reverse();
		console.log(arr_all.length)
		//onclick of the module code, brings you to the module page      
		var matches = document.querySelectorAll("a");
		console.log(matches);

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
		document.getElementById("res").insertAdjacentHTML('beforeend', mod.preclusion.substring(startIndex, mod.preclusion.length) +"</h4>");
	},      
	}
}

</script>
