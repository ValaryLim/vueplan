<template src = "./ModuleInfo.html"> </template>
<style src = "./ModuleInfo.css"> </style>

<script>
import modules from "../../assets/allmoduleinfo.json";
import moduleReviews from '../../assets/moduleReviews.json';
import users_table from '../../assets/users.json'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as Treeviz from 'treeviz';

export default {
	name: "App",
	display: "Module Information",
	components: {
		FontAwesomeIcon,
		Treeviz,

	},
	data: function() {
		return {
			search:'',
			mods: Object.values(modules),
			show: true,
			}
		},

	props: ['allmodules'],	

	computed: {
	filteredList() {
		if(this.search != ''){
			document.getElementById("res").innerHTML ="";
		}
		return Object.keys(this.allmodules).filter(mod => {
			return this.allmodules[mod].fullname.toUpperCase().includes(this.search.toUpperCase())
            })
		}
	},
	
	methods:{  
		modInfo:function(mod){
			this.search ='';
			this.show = false;
			var res = document.getElementById("res");
			window.scrollTo(0,0);

			res.innerHTML = "<h1>" + mod.code + " " + mod.title + "</h1>";
			res.insertAdjacentHTML('beforeend', '<div id = indicators>' + mod.department + " | " +  mod.mc + " MCs</div><hr></hr>");
			res.insertAdjacentHTML('beforeend', "<p>" + mod.desc + "</p>")
			
			
			//PREREQUISITES      
			var arr = [];      
			var arrInd = [] 
			if (mod.prereq != ""){
				res.insertAdjacentHTML('beforeend', '<br>');
				document.getElementById('res').insertAdjacentHTML('beforeend',"<h4>Prerequisites</h4><hr></hr>")
				
				for(let i=0; i <this.mods.length; i++){
					var index = mod.prereq.toUpperCase().indexOf(this.mods[i].code);
					if(index != -1){
						//check for those with modules that have same starting index
						var check = arrInd.indexOf(index);
						if(check != -1){
							if (this.mods[i].code.length > arr[check][1].code.length){
								arr.splice(check, 1);
								arrInd.splice(check, 1);
								arr.push([index,this.mods[i]]);
								arrInd.push(index);
							}
						}else{
							arr.push([index,this.mods[i]]);
							arrInd.push(index);	
						}
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
					res.insertAdjacentHTML('beforeend',"<span id = '"+ eventname + "'>"+ arr[i][1].code+ "</span>");        
					startIndex = arr[i][0] + arr[i][1].code.length;
				}

				document.getElementById("res").insertAdjacentHTML('beforeend', mod.prereq.substring(startIndex, mod.prereq.length) +"</h4>");
			}
		
      
			//PRECLUSIONS
			var arr_a = [];
			if (mod.preclusion != ""){
				res.insertAdjacentHTML('beforeend', '<br><br>');
				
				document.getElementById('res').insertAdjacentHTML('beforeend',"<h4>Preclusions</h4><hr></hr>")
				
				for(let i=0; i <this.mods.length; i++){
					index = mod.preclusion.toUpperCase().indexOf(this.mods[i].code);
					if(index != -1){
						if(this.mods[i].code != mod.code){
							arr_a.push([index,this.mods[i]])
						}
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
					res.insertAdjacentHTML('beforeend',"<span id = '"+ eventname + "'>"+arr_a[i][1].code+ "</span>");
					startIndex = arr_a[i][0] + arr_a[i][1].code.length;
				}
				document.getElementById("res").insertAdjacentHTML('beforeend', mod.preclusion.substring(startIndex, mod.preclusion.length) +"</h4>");

			}
			

				var arr_all = arr.concat(arr_a).reverse();
				//onclick of the module code, brings you to the module page      
				var matches = document.querySelectorAll("span");
				var x = this;
				for (let j = arr_all.length-1; j >= 0; j--) {
					let button = matches[matches.length-j-1];
					button.addEventListener('click', function() {
							x.modInfo(arr_all[j][1]);
						}
					)
				}
			
			//End Prerequisite/preclusion

			res.insertAdjacentHTML('beforeend', '<br><br>');
			
			//Workload
			res.insertAdjacentHTML('beforeend', '</p>')
			var workload = modules[mod.code]['workload'].split("-");

			if (modules[mod.code]['workload']!=''){
				var totalHours = workload.map(function(elt) {return parseInt(elt)}).reduce(function(a,b) {return a+b});
				var totalString = totalHours + totalHours > 1 ? 'hrs' : 'hr';

				res.insertAdjacentHTML('beforeend', '<h4>Weekly Workload - '+ totalHours  + totalString +'</h4>');

				var col = ["#A3586D","#5C4A72","#F3B05A","#F4874B","#F46A4E"];
				var names = ["Lec","Tut", "Lab","Proj","Prep"];

				for (i = 0; i < 5; i++) {
					for (var j = 0; j < workload[i]; j++){	
						res.insertAdjacentHTML('beforeend', '<svg width="38" height="23"><rect width="37" height="23" fill="' + col[i] + '"/></svg>');
					}
				}


				res.insertAdjacentHTML('beforeend', '<p id = labels></p>');
				var label = document.getElementById("labels");

				for (i = 0; i < 5; i++) {
					if (workload[i] == 1){
						label.insertAdjacentHTML('beforeend', '<span style="color:'+ col[i] + '">' + names[i] + '&nbsp;'.repeat(3) + '</span>');
					}else if (workload[i] >1){			
						label.insertAdjacentHTML('beforeend', '<span style="color:'+ col[i] + '">' + names[i] + '&nbsp;'.repeat((workload[i]-1)*8 + 3) + '</span>');
					}
				}
			}
			res.insertAdjacentHTML('beforeend', '<br>');

			
			
			//TREE
			var lst1 = Object.keys(this.allmodules).filter(module => {
				return this.allmodules[module].prereq.toUpperCase().includes(mod.code)
			});

			var lst = []
			for(i in lst1){
				if (lst1[i] != mod.code){
					lst.push(lst1[i]);
				}
			}

			if(lst.length > 0){
				var data_1 = [
					{id: 1, text_1: mod.code, father: null, color:"#FF5722" },
				]
				var count = 2;
				for(var i in lst){
					data_1.push({id: count, text_1: this.allmodules[lst[i]].code, father: 1, color:"#FFC107"});
					count++;
				}

				res.insertAdjacentHTML('beforeend','<h4>'+'Dependent Modules' +'</h4>');


				var len = lst.length*40;
				if (len != 0){
					res.insertAdjacentHTML('beforeend', '<div id="tree" style="height:' + len + 'px; width:500px"></div> ');
				}else{
					res.insertAdjacentHTML('beforeend', '<div id="tree" style="height: 50px; width:500px"></div> ');
				}

				var myTree = Treeviz.create({
					htmlId: "tree",
					idKey: "id",
					hasPan: false,
					hasZoom:false,
					hasFlatData: true,
					relationnalField: "father",
					nodeWidth:75,
					nodeHeight:25,
					mainAxisNodeSpacing:2,
					isHorizontal:true,
					renderNode: function(node) {
					var result = "<div class='box' style='cursor:pointer;height:"
						+node.settings.nodeHeight+ "px; width:"
						+node.settings.nodeWidth
						+"px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:" 
						+node.data.color
						+ ";border-radius:px;'><div><strong>"
					+node.data.text_1+
					"</strong></div></div>";
					return result;
					},
					linkShape:"curve",
					onNodeClick : (nodeData) => x.modInfo(this.allmodules[nodeData.data.text_1])

				});

				myTree.refresh(data_1);
			}


			res.insertAdjacentHTML('beforeend', '<br>');
			
			
			//REVIEWS
			console.log("reviews")
			var overallReviewNum = Object.values(moduleReviews[mod.code]).map(function(x) {return x['overall']}).reduce(function(a,b) {return a+b}) / Object.values(moduleReviews[mod.code]).length;
			var avgStaffAdmin = Object.values(moduleReviews[mod.code]).map(function(x) {return x['staffadmin']}).reduce(function(a,b) {return a+b}) / Object.values(moduleReviews[mod.code]).length;
			var avgContent = Object.values(moduleReviews[mod.code]).map(function(x) {return x['content']}).reduce(function(a,b) {return a+b}) / Object.values(moduleReviews[mod.code]).length;


			overallReviewNum = Math.round(overallReviewNum*10)/10;
			avgStaffAdmin = Math.round(avgStaffAdmin*10)/10;
			avgContent = Math.round(avgContent*10)/10;
			res.insertAdjacentHTML('beforeend', '<h2>Workload - '+ totalHours + ' ' + totalString +'</h2>');
			res.insertAdjacentHTML('beforeend','<h3>'+workload+'</h3>');
			res.insertAdjacentHTML('beforeend','<div>Workload viusalisation here</div><br></br>');
			res.insertAdjacentHTML('beforeend','<h2>Prerequisite Tree</h2><hr></hr>');
			res.insertAdjacentHTML('beforeend', '<div>Insert Prereq tree here</div><br></br>');
			res.insertAdjacentHTML('beforeend', '<h2>Ratings and Reviews</h2><hr></hr>');
			res.insertAdjacentHTML('beforeend','<h3 id = "OverallFeedbackNum">'+overallReviewNum+'</h3>');
			res.insertAdjacentHTML('beforeend','<div id = "StarsOuter"><div id = "StarsInner"></div></div><div></div>');
			res.insertAdjacentHTML('beforeend','<div id = "ContentFeedback">Learning Contents: ' + avgContent + '</div><div id = "sep"> | </div><div id = "StaffFeedback">Staff and Administration: ' + avgStaffAdmin + "</div><br></br>");
			res.insertAdjacentHTML('beforeend','<h4 id = "WrittenReviewsTitle">Written Reviews</h4><hr></hr><table><tbody id = "tabody">');
			var writtenReviews = {};
			for (let [id, written] of Object.entries(moduleReviews[mod.code])) {
				if (written['written'].length > 0) {
					writtenReviews[id] = written;
				}
			}
			for (let [id, review] of Object.entries(writtenReviews)) {
				var r = document.getElementById("tabody");
				var y = review["year"];
				var year = y.slice(0,2) + "/" + y.slice(2,4)+ " Semester " + y.slice(5,6);
				r.insertAdjacentHTML('beforeend','<tr>');
				r.insertAdjacentHTML('beforeend','<td>'+ users_table[id]+'<br></br>Year & Semester taken: <br></br>'+ year +'</td>' + '<td>'+review['written']+'</td></tr>');
			}
			res.insertAdjacentHTML('beforeend','</tbody></table');
			const starPercentage = (overallReviewNum / 5) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage))}%`;
            document.querySelector("#StarsInner").style.width = starPercentageRounded;

			//res.insertAdjacentHTML('beforeend','<div id = "StarsOuter"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><div id = "StarsInner"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div></div><div></div>');
			//res.insertAdjacentHTML('beforeend','<div id = "StarsOuter"><font-awesome-icon icon="times" /><font-awesome-icon icon="times" /><font-awesome-icon icon="times" /><font-awesome-icon icon="times" /><div id = "StarsInner"></div></div><div></div>');
			//res.insertAdjacentHTML('beforeend',);

		}
	}
}
</script>