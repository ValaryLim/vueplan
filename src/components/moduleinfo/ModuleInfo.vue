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
			mod:[
				{code: 'BT1101', title: 'Introduction to Business Analytics', desc: 'This module provides students with an introduction to the fundamental concepts and tools needed to understand the emerging role of business analytics in business and non-profit organizations. The module aims to demonstrate to students how to apply basic business analytics tools in a spreadsheet environment, and how to communicate with analytics professionals to effectively use and interpret analytic models and results for making better and more well-informed business decisions', prerequisite: '', preclusion: 'DSC1007/DSC1007X'},

				{code: 'BT2101', title: 'Decision Making Methods and Tools', desc: 'This module provides a general introduction to using various IT-driven tools, software and techniques for decision making support. The module will start off by describing the decision-making process in businesses today. It will proceed to cover methods such as prediction and classification methods, markov chain monte carlo, simulation, forecasting time series, and neural network among others. Examples will also be drawn from various industry domains and applications.', prerequisite: 'CS1010 and equivalent&(MA1521/MA1102R)&BT1101', preclusion: ''},

				{code: 'BT2102', title: 'Data Management and Visualisation', desc: 'This module aims to provide students with practical knowledge and understanding of basic issues and techniques in data management and warehousing with relational database management systems, as well as data visualisation principles, techniques and tools. The module covers data management concepts, conceptual and logical design, database management, data warehousing concepts, data warehousing design, relational database management systems and tools, data visualisation and dashboard design concepts, visual perception and design principles, visualisation techniques and tools for temporal and spatial data, proportions and relationships, multivariate and complex data, etc.', prerequisite: 'CS1010&BT1101', preclusion: ''},

				{code: 'BT3102', title: 'Computational Methods for Business Analytics', desc: 'Computers are becoming readily accessible, and its use in business analytics is growing more prevalent. This module will introduce students to computational methods, algorithms and techniques used in business fields such as finance, marketing and economics to address complex analytics problems. The course will cover topics and algorithms in areas such as optimization methods, numerical analysis, simulations, monte-carlo methods, graph and flow methods, and computational complexity issues to address business analytics related problems. Students will get the opportunity to learn about these computational methods and issues through hands-on practice assignments, case analysis discussions, and course projects.', prerequisite: 'BT2101&(CS1020/CS1020E/CS2020/CS2030/CS2103/CS2103T/CS2113/CS2113T)', preclusion: ''},

				{code: 'BT3103', title: 'Application Systems Development for Business Analytics', desc: 'This module aims to train students to be conversant in the technologies, approaches, principles and issues in designing IT applications systems for business analytics. Major topics include: rapid web frameworks, scripting languages, database design, web and mobile interfaces, tracking and analysis of customers, payment services / verification, implementing security, designing and deploying web and mobile services, and operational considerations and technical tradeoffs.', prerequisite: 'BT2102', preclusion: ''},

				{code: 'BT4013', title: 'Analytics for Capital Market Trading and Investment', desc: 'This module offers a broad coverage of quantitative trading and financial portfolio optimization, which consists of trading strategies based on quantitative analysis. It will also aim to identify trading opportunities, practices, optimal execution and placements of trading on current technological platforms. Regulations and risk management of quantitative trading will also be emphasized.', prerequisite: 'BT3102', preclusion: ''},

				{code: 'BT4015', title: 'Geospatial Analytics', desc: 'This module will offer an in-depth coverage of geospatial analysis, starting with the transferring of knowledge in the gathering, display, and manipulation of imagery, GPS, satellite photography and historical data. Geospatial storage tools such as PostGIS that have been created to provide a more scalable backend will be introduced. Other geospatial tools, such as ArcGIS, will be covered. Exploratory Spatial and Spatio-temporal Data Analysis (ESDA, ESTDA) and spatial statistics, including spatial autocorrelation and spatial regression are some of the geospatial data analytics methods covered in detail on the variety of business contexts, operations and applications.', prerequisite: '(ST2131/ST2334)&BT2101&BT2102&(CS2010/CS2040 or their equiavlent)', preclusion: ''},

				{code: 'BT4014', title: 'Analytics Driven Design of Adaptive Systems', desc: 'To design technology that impacts people – in education, health, business – this course introduces methods for creating systems that use data intelligently to improve themselves. This requires combining human intelligence (using methods like crowdsourcing, collaborative design) with artificial intelligence (discovering which technology designs help which people) through designing randomized A/B experiments that are collaborative, dynamic, and personalized.', prerequisite: 'BT2102', preclusion: ''},

				{code: 'BT4012', title: 'Fraud Analytics', desc: 'This module provides you with the foundational application of analytics in the audit and investigation processes. Students will have an opportunity to gain technological and managerial overview of analytical techniques, link analytics, continuous monitoring of business activities, and analytics reporting. The crimes to be covered in this module include fraud, money laundering, terror financing, collusion, market manipulation, cyber intrusion, and control lapses.', prerequisite: 'BT3102', preclusion: ''},

				{code: 'BT4016', title: 'Risk Analytics for Financial Services', desc: 'This module exposes students to fundamentals of risk analytics in financial service sector. Students will be taught on the fundamentals of financial services and financial risks. They also learn about interest risk analytics and credit risk analytics.', prerequisite: 'BT2102&BT2101', preclusion: ''},

				{code: 'BT4103', title: 'Business Analytics Capstone Project', desc: 'This project can be viewed as a large-scale practical module. Emphasis will be placed on understanding the objectives of the analytics exercise, applying appropriate analytic methods and techniques, evaluating database designs, modelling strategies and implementation, and monitoring analytics performances. Students will sharpen communication skills through close team interactions, consultations, and formal presentations. Students will also develop a comprehensive understanding of the issues of business analytics such as data privacy and security, legal issues and responsibilities, business/technical communication of the results of data analytics.', prerequisite: 'BT3102&BT3103&IS2101', preclusion: 'BT3101'},

				{code: 'BT4211', title: 'Data-Driven Marketing', desc: 'In today’s environment, marketing or business analysts require tools and techniques to both quantify the strategic value of marketing initiatives, and to maximize marketing campaign performance. This module aims to teach students concepts, methods and tools to demonstrate the return on investment (ROI) of marketing activities and to leverage on data and marketing analytics to make better and more informed marketing decisions. The course topics covered include marketing performance management, marketing metrics, data management, market response and diffusion models, market and customer segmentation models, analytic marketing and value driven segmentation, digital media marketing analytics, etc. Students will have access to real marketing and customer data sources, and will conduct hands-on marketing analysis using data mining and statistical analysis tools.', prerequisite: 'MKT1705X&[(BT2101&BT2102)/(DBA3803&IT3010)]', preclusion: ''},

				{code: 'BT4240', title: 'Machine Learning for Predictive Analytics', desc: 'This module provides a comprehensive coverage of methods and tools for predictive data analytics. Various techniques from data mining, statistics and artificial intelligence will be discussed. The emphasis will be on more recent developments in machine learning methods such as neural networks and support vector machines that have been shown to be very effective in discovering reliable patterns from past data and making accurate predictions of future outcomes. Applications of predictive analytics in business will also be discussed.', prerequisite: '(MA1101R/MA1311)&(MA1521/MA1102R)&BT2101', preclusion: 'IS4240/IT3011/CS3244'},

				{code: 'BT4212', title: 'Search Engine Optimization and Analytics', desc: 'This course teaches the concepts, techniques and methods to analyse and improve the visibility of a website or a web page in search engines via the “natural” or un-paid (“organic” or “algorithmic”) search results. Students will be taught concepts and knowledge in terms of how search engines work, what people search for, what are the actual search terms or keywords typed into search engines, which search engines are preferred by their targeted audience, and how to optimize a website in terms of editing its content, structure and links, and associated coding to both increase its relevance to specific keywords and to remove barriers to the indexing activities of search engines. Importantly, the module will emphasize the relationship of search engine optimization to digital marketing in terms of building high quality web pages to engage and persuade, setting up analytics programs to enable sites to measure results, and improving a site\'s conversion rate.', prerequisite: '(CS1010&BT2101)/(DAO2702&DBA3803)', preclusion: ''},

				{code: 'BT4221', title: 'Big Data Techniques and Technologies', desc: 'This module teaches students concepts, techniques and technologies in handling and analyzing big data sets, i.e., data sets whose size is beyond the ability of commonly used software tools to capture, manage, and process the data within a tolerable elapsed time. Common sources and domains of big data include ubiquitous information-sensing mobile devices, web and software logs, financial trading transactions, large-scale e-commerce, RFID and wireless sensor networks, etc. Conceptual big data topics covered include big data instructure, analytics scalability and processes, etc. Technical frameworks for big data handling and analytics taught include Hadoop, HBase, Cassandra, MapReduce, Dynamo, R, in-database analytics, mining of data streams, etc.', prerequisite: '(CS1010&BT2101&BT2102)/(DAO2702&DBA3803&IT3010', preclusion: 'CS4225/CS5425'},

				{code: 'BT4222', title: 'Mining Web Data for Business Insights', desc: 'The World Wide Web overwhelms us with immense amounts of widely distributed, interconnected, rich, and dynamic hypertext information. It has profoundly influenced many aspects of our lives, changing the ways individuals communicate and the manners businesses are conducted. This module aims to teach students various concepts, methods and tools in mining Web data in the form of unstructured Web hyperlinks, page contents, and usage logs to uncover deep business insights and knowledge for business implications that are embedded in the billions of Web pages and servers. Topics covered include various text mining methodologies, case applications and tutorials on Web data mining for marketing, sales and finance applications, social Web data mining from Facebook and Twitter, and Web analytics involving clickstream and site traffic data, etc.', prerequisite: '(CS1010&BT2101&BT2102)/[DAO2702&DBA3803&IT3010]', preclusion: ''},

				{code: 'CS1010S', title: 'Programming Methodoloy', desc: 'This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and is equivalent to CS1010 and CS1010E Programming Methodology. Topics covered include problem solving by computing, writing pseudo-codes, basic problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoS students.', prerequisite: '', preclusion: 'CS1010/CS1010E/CS1010J/CS1010X/CS1010XCP/CS1101S'},

				{code: 'CS2030', title: 'Programming Methodology II', desc: 'This module is a follow up to CS1010. It explores two modern programming paradigms, object-oriented programming and functional programming. Through a series of integrated assignments, students will learn to develop medium-scale software programs in the order of thousands of lines of code and tens of classes using objectoriented design principles and advanced programming constructs available in the two paradigms. Topics include objects and classes, composition, association, inheritance, interface, polymorphism, abstract classes, dynamic binding, lambda expression, effect-free programming, first class functions, closures, continuations, monad, etc.', prerequisite: 'CS1010 or equivalent', preclusion: 'CS1020 or equivalent'},

				{code: 'CS2040', title: 'Data Structures and Algorithms', desc: 'This module introduces students to the design and implementation of fundamental data structures and algorithms. The module covers basic data structures (linked lists, stacks, queues, hash tables, binary heaps, trees, and graphs), searching and sorting algorithms, and basic analysis of algorithms.', prerequisite: 'CS1010 or equivalent', preclusion: 'CS1020/CS1020E/CS2020/CS2010/CS2040C/CS2040S'},

				{code: 'IS1103', title: 'IS Innovations in Organisations and Society', desc: 'The module gives a wide yet insightful understanding of the impact of IT on organisation and society. Issues such as Internet and “new economy” geographies; impacts of IT and creation of IT innovation for public health, urban planning, and regional equity, food systems, climate change can be discussed. Other issues for consideration could be dark web and IT security advancement, open vs. closed innovation creation. Misuse of IT that put ethics and professionalism into question will be also discussed.', prerequisite: '', preclusion: ''},

				{code: 'IS2101', title: 'Business and Technical Communication', desc: 'Business and Technical Communication a customized core module for the School of Computing, aims to give its students a professional edge in the competitive and interconnected job market by preparing and enhancing their professional communication skills in IT related work settings. By the end of the module, students will have an array of communicative skills. Students will be able to: - write effective and persuasive business letters/ email messages and proposals - speak and deliver confidently with and without multimodal aids both in prepared and impromptu speech situations such as meetings, job interviews, oral presentations and proposal presentations - have an enhanced awareness of intercultural and interpersonal concepts and skills - critically analyze communication contexts and use these skills in written and spoken assignments This is a 48-hour module taught over 12 weeks with a three-hour tutorials and a one-hour online lecture + related per week.', prerequisite: 'Students who are required to read ES1000 and/or ES1102/ES1103 must pass it/them before taking IS2101', preclusion: 'ES2002/ES2007D/CS2101/CS2103T/ES1601'},

				{code: 'IS3103', title: 'Information Systems Leadership and Communication', desc: 'Today’s technology leaders need to have a deep understanding of business fundamentals, recognize the key drivers of innovation, and develop effective leadership to align and integrate novel technologies and business processes for successful products and services. The course will not only cover major topics relating strategic, tactical and operational facets of thought leadership in propelling IT implementations, adoptions and changes in organization but also equip students with industry-relevant communication skillsets. The strategic facet will explore the various contexts, complex issues and dynamic paths that evoke leadership in information systems, including technology championship, disruptive technology, and IT ecosystem. The tactical facet will strategize a culture to co-create value and nurture technological innovations. Students will be taught effective communication skills for influential communication, change management communication and directional communication. These skillsets will enable them to foster partnership between technology and business stakeholders such as vendors, IT professionals and functional users. The operational facet will include leadership areas in IT portfolio management, change management, and IT applications. Through a synthesis of critical knowledge areas required of technology leaders, students will examine the intersection of technology and business to drive IT-enabled changes in an organization. The course will prepare students for senior technology positions, and develop core communication skills that leaders need to be equipped with to be successful in leading technological transformations.', prerequisite: '(IS1103 or equivalent)&(CS2101/IS2101)', preclusion: 'IS3101'},

				{code: 'MA1101R', title: 'Linear Algebra I', desc: 'This module is a first course in linear algebra. Fundamental concepts of linear algebra will be introduced and investigated in the context of the Euclidean spaces R^n. Proofs of results will be presented in the concrete setting. Students are expected to acquire computational facilities and geometric intuition with regard to vectors and matrices. Some applications will be presented. Major topics: Systems of linear equations, matrices, determinants, Euclidean spaces, linear combinations and linear span, subspaces, linear independence, bases and dimension, rank of a matrix, inner products, eigenvalues and eigenvectors, diagonalization, linear transformations between Euclidean spaces, applications.', prerequisite: 'GCE ‘A’ Level or H2 Mathematics/H2 Further Mathematics/MA1301/MA1301FC/MA1301X', preclusion: 'EG1401/EG1402/MA1101/MA1311/MA1506/MA1508/FOE students'},

				{code: 'MA1102R', title: 'Calculus', desc: 'This is a course in single-variable calculus. We will introduce precise definitions of limit, continuity, the derivative and the Riemann integral. Students will be exposed to computational techniques and applications of differentiation and integration. This course concludes with an introduction to first order differential equations. Major topics: Functions, precise definitions of limit and continuity. Definition of the derivative, velocities and rates of change, Intermediate Value Theorem, differentiation formulas, chain rule, implicit differentiation, higher derivatives, the Mean Value Theorem, curve sketching. Definition of the Riemann integral, the Fundamental Theorem of Calculus. The elementary transcendental functions and their inverses. Techniques of integration: substitution, integration by parts, trigonometric substitutions, partial fractions. Computation of area, volume and arc length using definite integrals. First order differential equations: separable equations, homogeneous equations, integrating factors, linear first order equations, applications.', prerequisite: 'GCE ‘A’ Level or H2 Mathematics or H2 Further Mathematics /MA1301/MA1301FC/MA1301X', preclusion: 'EE1401/EE1461/EG1401/EG1402/CE1402/MA1102/MA1312/MA1505/MA1505C/MA1507/MA1521/CEC students or COM students who matriculated on and after 2002 (including poly 2002 intake)or FOE students'},

				{code: 'EC1301', title: 'Principles of Economics', desc: 'This course is designed to teach the basic principles of economics to undergraduates from non-economic majors. It introduces students to elementary microeconomic and macroeconomic concepts and provides them with an economic framework to understand the workings of individual markets, the aggregate economy, as well as international trade and finance.', prerequisite: '', preclusion: 'EC1101E/BH1005/BSP1005/BSP1703/RE1704/USE2301/All BBA, BAC, BBA(Hons) and BAC(Hons) students are not allowed to take EC1301.'},

				{code: 'MKT1705X', title: 'Principles of Marketing', desc: 'This module is designed to provide knowledge, techniques and understanding of marketing principles. It provides students with a conceptual framework to analyse and interpret marketing phenomena and to suggest courses of action in response to marketing problems. It covers topics such as the marketing concept, the marketing environment and the marketing mix which includes product, pricing, distribution and promotion. Other related topics include consumer behaviour, market segmentation and targeting, marketing research and information system, marketing planning, implementation and control, and public issues in marketing. This is a foundation module for business students and provides the basis for later concentration in the marketing area.', prerequisite: '', preclusion: 'MKT1003/MKT1003X/RST and EMG students'},

				{code: 'ST2334', title: 'Proability and Statistics', desc: 'Basic concepts of probability, conditional probability, independence, random variables, joint and marginal distributions, mean and variance, some common probability distributions, sampling distributions, estimation and hypothesis testing based on a normal population. This module is targeted at students who are interested in Statistics and are able to meet the pre-requisites. Preclude ME students taking or have taken ME4273.', prerequisite: 'MA1102R/MA1312/MA1505/MA1507/MA1521', preclusion: 'ST1131/ST1131A/ST1232/ST2131/MA2216/CE2407/EC2231/EC2303/PR2103/DSC2008/ME students taking or having taken ME4273. All ISE students.'},

				{code: 'MA1521', title: 'Calculus in Computing', desc: 'This module provides a basic foundation for calculus and its related subjects required by computing students. The objective is to train the students to be able to handle calculus techniques arising in their courses of specialization. In addition to the standard calculus material, the course also covers simple mathematical modeling techniques and numerical methods in connection with ordinary differential equations. Major topics: Preliminaries on sets and number systems. Calculus of functions of one variable and applications. Sequences, series and power series. Functions of several variables. Extrema. First and second order differential equations. Basic numerical methods for ordinary differential equations.', prerequisite: 'GCE ‘A’ Level Mathematics or H2 Mathematics or H2 Further Mathematics/MA1301/MA1301X', preclusion: 'Students reading a primary major in Mathematics or Applied Mathematics or Quantitative Finance or Data Science and Analytics/MA1102R/MA1312/MA1505/MA1507/MA2501/FoE students'}
			],
			states : modules,
			}
		},

	computed: {
	filteredList() {
		if(this.search != ''){
			document.getElementById("res").innerHTML ="";
		}
		return this.mods.filter(mod => {
			return mod.code.toLowerCase().includes(this.search.toLowerCase())||mod.title.toLowerCase().includes(this.search.toLowerCase())
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
			res.insertAdjacentHTML('beforeend',"<style> #StarsOuter { display: inline-block;\
  					position: relative;\
  					font-family: FontAwesome;\
  					font-size: 20px;\
					}\

					#StarsOuter::before {\
					content: "\f006 \f006 \f006 \f006 \f006";\
					}\

					#StarsInner {\
					position: absolute;\
					top: 0;
					left: 0;
					white-space: nowrap;
					overflow: hidden;
					width: 0;
					font-size: 20px;
					}
					#StarsInner::before {
					content: "\f005 \f005 \f005 \f005 \f005";
					color: #f8ce0b;
					}</style>)

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