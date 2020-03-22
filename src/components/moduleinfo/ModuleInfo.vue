<template src = "./ModuleInfo.html"> </template>
<style src = "./ModuleInfo.css"> </style>

<script>
import modules from "../../assets/allmoduleinfo.json";
import firebase from 'firebase';
import database from'../firebase.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as Treeviz from 'treeviz';
import { mapGetters } from "vuex";
import Chart from '../moduleinfo/Chart.vue'


var moduleReview = {};
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
		},
		yearlist() {
			var firstYear = 1994;
			var years = [];
			var date = new Date();
			var currYear = date.getFullYear();
			var currMonth = date.getMonth();
			if (currMonth > 7) {
				currYear = currYear-1;
			}
			while (firstYear < currYear){
				var firstTwo = firstYear%100;
				var lstTwo = (firstYear+1)%100;
				firstTwo = firstTwo.toString();
				lstTwo = lstTwo.toString();
				if (firstTwo.length < 2) {
					firstTwo = '0' + firstTwo;
				}
				if (lstTwo.length < 2) {
					lstTwo = '0' + lstTwo;
				}
				var acadsem1 = firstTwo+'/'+lstTwo+'s1';
				var acadsem2 = firstTwo+'/'+lstTwo+'s2';
				if (currMonth > 7 && firstYear == currYear) {
					years.push(acadsem1);
				} else {
					years.push(acadsem1);
					years.push(acadsem2);
				}
				firstYear++;
			}
			years.reverse();
			return years;
		},
		// map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        }),
	},
	
	methods:{
		modInfo: function(mod){
			this.search ='';
			this.show = false;
			var res = document.getElementById("res");
			window.scrollTo(0,0);

			res.innerHTML = "<h1 id='mod_title'>" + mod.code + " " + mod.title + "</h1>";
			res.insertAdjacentHTML('beforeend', '<div id = indicators>' + mod.department + " | " +  mod.mc + " MCs</div><hr></hr>");
			res.insertAdjacentHTML('beforeend', "<p>" + mod.desc + "</p>");

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

			//Reviews section
			//console.log('Reviews');
			this.fetchReviews();
		},
		submitReview: function() {
			var userid;
			var user = this.fetchUser();
			if (user != null) {
				userid = user.uid;
			}
			var module_code = document.getElementById('mod_title').innerHTML.split(' ')[0];
			var quality = document.getElementById('qualityc').value;
			var relevance = document.getElementById('relevance').value;
			var difficulty = document.getElementById('difficulty').value;
			var review = document.getElementById('writtenReview');
			var staff = document.getElementById('staff').value;
			var workload = document.getElementById('workload').value;
			var year = document.getElementById('year').value;
			year = year.slice(0,2)+year.slice(3,5)+'s'+year.slice(-1)[0];
			var reviewDict = {};
			reviewDict['userid'] = user.displayName;
			reviewDict['quality'] = parseFloat(quality);
			reviewDict['relevance'] = parseFloat(relevance);
			reviewDict['difficulty'] = parseFloat(difficulty);
			reviewDict['staff'] = parseFloat(staff);
			reviewDict['workload'] = parseFloat(workload);
			reviewDict['review'] = review.value;
			reviewDict['year'] = year;
			
			if (moduleReview == undefined) {
				moduleReview = {};
			}
			moduleReview[userid] = reviewDict;
			database.collection('reviews').doc(module_code).set({
				"module_reviews": moduleReview,
			},{merge:true});
			document.querySelector('#overlay').style.display = 'none';
			moduleReview = {};
			this.updateReviews();
		},
		updateReviews: function() {
			var module_code = document.getElementById('mod_title').innerHTML.split(' ')[0];
			let userRef = database.collection('reviews').doc(module_code);
			var overallReviewNum = 0;
			var avgQualityContent = 0;
			var avgRelevanceContent = 0;
			var avgDifficultyContent = 0;
			var avgWorkload = 0;
			var avgStaff = 0;
			var module_review = {};
            userRef.get().then( doc => {
				module_review = doc.data()['module_reviews'];
				moduleReview = module_review;
				avgQualityContent = Object.values(module_review).map(function(x) {return x['quality']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
				avgRelevanceContent = Object.values(module_review).map(function(x) {return x['relevance']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
				avgDifficultyContent = Object.values(module_review).map(function(x) {return x['difficulty']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
				avgWorkload = Object.values(module_review).map(function(x) {return x['workload']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
				avgStaff = Object.values(module_review).map(function(x) {return x['staff']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
				overallReviewNum = (avgQualityContent+avgRelevanceContent+avgDifficultyContent+avgWorkload+avgStaff)/5;
				overallReviewNum = Math.round(overallReviewNum*10)/10;
				avgQualityContent = Math.round(avgQualityContent*10)/10;
				avgRelevanceContent = Math.round(avgRelevanceContent*10)/10;
				avgDifficultyContent = Math.round(avgDifficultyContent*10)/10;
				avgStaff = Math.round(avgStaff*10)/10;
				avgWorkload = Math.round(avgWorkload*10)/10;
				document.getElementById('OverallFeedbackNum').innerHTML = overallReviewNum;
				document.getElementById('QualityContentFeedback').innerHTML = 'Quality of content: '+ avgQualityContent.toString() + '/5';
				document.getElementById('RelevanceContentFeedback').innerHTML = 'Relevance of content: '+ avgRelevanceContent.toString() + '/5';
				document.getElementById('DifficultyContentFeedback').innerHTML = 'Difficulty of content: '+ avgDifficultyContent.toString() + '/5';
				document.getElementById('WorkloadFeedback').innerHTML = 'Heaviness of Workload: '+ avgWorkload.toString() + '/5';
				document.getElementById('StaffFeedback').innerHTML = 'Quality of teaching staff: '+ avgStaff.toString() + '/5';
				document.querySelector('#userReview').style.disabled = true;
				var writtenReviews = {};
				for (let [id, written] of Object.entries(module_review)) {
					if (written['review'].length > 0) {
						writtenReviews[id] = written;
					}
				}
				var r = document.getElementById("tabody");
				r.innerHTML = "";
				for (let [id, review] of Object.entries(writtenReviews)) {
					var y = review["year"];
					var d = review['difficulty'];
					var q = review['quality'];
					var re = review['relevance'];
					var s = review['staff'];
					var w = review['workload'];
					var n = review['userid'];
					var year = y.slice(0,2) + "/" + y.slice(2,4)+ " Sem " + y.slice(5,6);
					r.insertAdjacentHTML('beforeend','<tr>');
					if (id.includes("Guest")){
						id = "Guest";
					}
					r.insertAdjacentHTML('beforeend','<td>'+ id+'<br></br>'+ year +'</td>' + '<td>'+
					'<div id = "quality">Quality of content: ' + q +'/5</div>'+ 
					'<div id = "quality">Relevance of content: ' + re +'/5</div>'+
					'<div id = "quality">Difficulty of content: ' + d +'/5</div>'+
					'<div id = "quality">Heaviness of Workload: ' + w +'/5</div>'+
					'<div id = "quality">Teaching staff: ' + s +'/5</div>'
					+review['review']+'</td></tr>');
					r.insertAdjacentHTML('beforeend','<td>'+ n +'<br></br>'+ year +'</td>' + '<td>'+ '\n' +review['review']+'</td></tr>');
				}
				const starPercentage = (overallReviewNum / 5) * 100;
				const starPercentageRounded = `${(Math.round(starPercentage))}%`;
				document.querySelector("#StarsInner").style.width = starPercentageRounded;
			});
		},
		fetchUser: function() {
			var user = firebase.auth().currentUser;
			return user;
		},
		fetchReviews: function() {
			var module_code = document.getElementById('mod_title').innerHTML.split(' ')[0];
			let userRef = database.collection('reviews').doc(module_code);
			var res = document.getElementById("res");
			const overlay = document.querySelector('#overlay');
			var overallReviewNum = 0;
			var avgQualityContent = 0;
			var avgRelevanceContent = 0;
			var avgDifficultyContent = 0;
			var avgWorkload = 0;
			var avgStaff = 0;
			var module_review = {};
			var userid = this.fetchUser().uid;
			res.insertAdjacentHTML('beforeend', '<h2>Ratings and Reviews</h2><hr></hr>');
			res.insertAdjacentHTML('beforeend','<h3 id = "OverallFeedbackNum">'+overallReviewNum+'</h3>');
			res.insertAdjacentHTML('beforeend','<div id = "StarsOuter"><div id = "StarsInner"></div></div><div></div>');
			res.insertAdjacentHTML('beforeend','<div id = "QualityContentFeedback">Quality of content: '+ avgQualityContent + '</div>');
			res.insertAdjacentHTML('beforeend','<div id = "RelevanceContentFeedback">Relevance of Content: ' + avgRelevanceContent + "</div>");
			res.insertAdjacentHTML('beforeend','<div id = "DifficultyContentFeedback">Difficulty of Content: ' + avgDifficultyContent + "</div>");
			res.insertAdjacentHTML('beforeend','<div id = "WorkloadFeedback">Heaviness of Workload: ' + avgWorkload + "</div>");
			res.insertAdjacentHTML('beforeend','<div id = "StaffFeedback">Quality of teaching staff: ' + avgStaff + "</div>");
			res.insertAdjacentHTML('beforeend','<canvas id="myChart" width="400" height="400"></canvas>');
			res.insertAdjacentHTML('beforeend','<br></br>');
			res.insertAdjacentHTML('beforeend','<h4 id = "WrittenReviewsTitle">Written Reviews   <button id = "userReview">Review this module now!</button></h4>');	
			const reviewMod = document.querySelector('#userReview');
			reviewMod.addEventListener('click',function(){
				overlay.style.display = 'block';
				});
			const closeReview = document.querySelector('#closeReview');
			closeReview.addEventListener('click',function(){
				overlay.style.display = 'none';
			});
            userRef.get().then( doc => {
				if (doc.exists) {
					module_review = doc.data()['module_reviews'];
					moduleReview = module_review;
					avgQualityContent = Object.values(module_review).map(function(x) {return x['quality']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
					avgRelevanceContent = Object.values(module_review).map(function(x) {return x['relevance']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
					avgDifficultyContent = Object.values(module_review).map(function(x) {return x['difficulty']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
					avgWorkload = Object.values(module_review).map(function(x) {return x['workload']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
					avgStaff = Object.values(module_review).map(function(x) {return x['staff']}).reduce(function(a,b) {return a+b}) / Object.values(module_review).length;
					overallReviewNum = (avgQualityContent+avgRelevanceContent+avgDifficultyContent+avgWorkload+avgStaff)/5;
					overallReviewNum = Math.round(overallReviewNum*10)/10;
					avgQualityContent = Math.round(avgQualityContent*10)/10;
					avgRelevanceContent = Math.round(avgRelevanceContent*10)/10;
					avgDifficultyContent = Math.round(avgDifficultyContent*10)/10;
					avgStaff = Math.round(avgStaff*10)/10;
					avgWorkload = Math.round(avgWorkload*10)/10;
					var ctx = document.getElementById('myChart').getContext('2d');
					var data = {
						labels: ['Quality of content', 'Relevance of content', 'Difficulty of content', 'Heaviness of Workload', 'Quality of teaching staff'],
						datasets: [{
							label: 'Breakdown of rating',
							backgroundColor: 'rgb(255, 99, 132)',
							borderColor: 'rgb(255, 99, 132)',
							data: [avgQualityContent, avgRelevanceContent, avgDifficultyContent, avgWorkload, avgStaff],
						}]
					}
					new Chart(ctx, {
						type: 'radar',
						data: data,
					});
					document.getElementById('OverallFeedbackNum').innerHTML = overallReviewNum;
					document.getElementById('QualityContentFeedback').innerHTML = 'Quality of content: '+ avgQualityContent.toString();
					document.getElementById('RelevanceContentFeedback').innerHTML = 'Relevance of content: '+ avgRelevanceContent.toString();
					document.getElementById('DifficultyContentFeedback').innerHTML = 'Difficulty of content: '+ avgDifficultyContent.toString();
					document.getElementById('WorkloadFeedback').innerHTML = 'Heaviness of Workload: '+ avgWorkload.toString();
					document.getElementById('StaffFeedback').innerHTML = 'Quality of teaching staff: '+ avgStaff.toString();
				}
				if (Object.keys(module_review).includes(userid)) {
					reviewMod.disabled = true;
				}
				
				const starPercentage = (overallReviewNum / 5) * 100;
				const starPercentageRounded = `${(Math.round(starPercentage))}%`;
				document.querySelector("#StarsInner").style.width = starPercentageRounded;
				try {
					var x = document.getElementById("tabody");
					x.innerHTML = "";
				} catch (error) {
					res.insertAdjacentHTML('beforeend','<hr></hr><table><tbody id = "tabody">');
					console.log("No tag found error")
				}
				
				var writtenReviews = {};
				if (moduleReview != {}) {
					for (let [id, written] of Object.entries(module_review)) {
						if (written['review'].length > 0) {
							writtenReviews[id] = written;
						}
					}
					for (let [id, review] of Object.entries(writtenReviews)) {
						var r = document.getElementById("tabody");
						var y = review["year"];
						var d = review['difficulty'];
						var q = review['quality'];
						var re = review['relevance'];
						var s = review['staff'];
						var w = review['workload'];
						var n = review['userid']
						var year = y.slice(0,2) + "/" + y.slice(2,4)+ " Sem " + y.slice(5,6);
						r.insertAdjacentHTML('beforeend','<tr>');
						if (id.includes("Guest")){
							id = "Guest";
						}
						r.insertAdjacentHTML('beforeend','<td>'+ n+'<br></br>'+ year +'</td>' + '<td>'+
						'<div id = "quality">Quality of content: ' + q + '/5</div>'+ 
						'<div id = "quality">Relevance of content: ' + re +'/5</div>'+
						'<div id = "quality">Difficulty of content: ' + d +'/5</div>'+
						'<div id = "quality">Heaviness of Workload: ' + w +'/5</div>'+
						'<div id = "quality">Teaching staff: ' + s +'/5</div>'
						+review['review']+'</td></tr>');
					}
				}
				res.insertAdjacentHTML('beforeend','</tbody></table');
			});
		}
	}
}
//unique userid
//disable button
//reviews load too long
//close button
//reviews showing everything
</script>