<template src= "./Reviews.html">
</template>
<style src="./Reviews.css"></style>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import states from "../../assets/allmoduleinfo.json";
import moduleReviews from "../../assets/moduleReviews.json";
var code = "CS1010S";
var users_table = {
    "e1234567" : "iamwaihon",
    "e1234568" : "Guest",
    "e1234569" : "Justin Yeo",
    "e1234570" : "emman",
    "e1234571" : "yangshun",
    "e1234572" : "Jonathan Chang",
    "e1234573" : "Owen",
    "e1234574" : "Thiru",
    "e1234575" : "axw",
    "e1234576" : "prawira satya darma"
};
var cs1010sreviews = {
    "e1234567" : {
        year: "1314s1",
        staffadmin: 4.5,
        content: 4.7,
        overall: 4.6,
        written: "I took this mod in Semester 1, AY13/14. \
        The delivery of this module is a breath of fresh air. \
        The concept of gamification is applied here through the Coursemology platform. \
        Basically your 'homework' are called 'missions' and you can earn experience and achievements. \
        There is even a leaderboard ranking system which is quite cool to be honest. \
        Having said that, the workload for this module is quite heavy, \
        there are quite a lot of missions to do and they are not easy - if you are new to programming that is. \
        A problem can take either 15 minutes or 5 hours - it varies. \
        Tutors are there to help you out so don't worry. :) \
        Personally I find this module to be quite manageable and light. \
        Mainly because the homework are really so much fun to complete - \
        it's like problem solving. Or maybe because I have no life. To clarify - \
        I had almost zero experience in programming prior to joining this module. \
        In fact, it might be beneficial to have no experience as you do not have to unlearn bad habits. \
        Just do your work consistently and you will be fine. \
        Coursework takes up 35% of the final grade, which is achievable by most of the cohort. \
        You just need to achieve Level 35 in Coursemology. I reached Level 38. (But you still only get 35%!)\
        Another 5% is based on class participation. Try to prepare before your tutorials. \
        Your tutor will appreciate it - and you can have a much more fruitful tutorial session \
        as you can find out what is wrong with your answer that you have prepared. (Or ways to improve it.)\
        15% each for midterm and practical exam and 30% for the finals. Midterm was kind of easy, \
        practical exam was kind of hard and finals was okay-ish hard. There is no bell curve, \
        so try to score reasonably well for the exams. 80% for everything will likely give you an A."
    },
    "e1234568" : {
        year: "1415s1",
        staffadmin: 5.0,
        content: 5.0,
        overall: 5.0,
        written: "Statistics major here and took this module in Semester 1, AY14/15. \
        This is one of my core mods and the bidpoint for it was quite high \
        (most likely people are thinking to s/u it since it's the gradeless semester and CS \
        has been warned by seniors that it's extremely taxing as it requires consistent effort).\
        I was very intimidated at first due to the repeated warnings that this mod is crazily hard \
        but as the lectures progresses, I realized that Prof Ben really taught the concepts well. \
        Information are broken down into digestible pieces and as long as your foundations are solid, \
        you can really do higher-level coding which actually is a revisitation of old concepts but with \
        different lenses and applications. There are 4 main components to this module, namely: \
        Lectures, Tutorials, Recitations and Missions.\n[Lectures]\n As described above, \
        Prof Ben is committed, dedicated and very passionate. I really enjoyed his lectures a lot \
        as he inject random jokes (sometimes albeit lame but still a pleasant little escape from the \
        content-heavy slides) and shows inspiring/cool videos during breaks. I feel that he is really \
        invested in our learning progress as he keeps motivating us and encourages us. His attitude and \
        passion really made me enjoyed CS lectures immensely (:\n[Tutorials]\nI like tutorials as it \
        is a small group discussion and this environment made me less shy when raising questions. \
        Prof Ben always say that he have the best teaching staff and I agree. The tutors (or at the \
        very least, mine) are awesome.\n[Recitations]\nI'd be honest, I don't really find recitations \
        that useful because the answers will be uploaded eventually. I learn much more from missions. \
        (see below)\n[Missions]\nMISSIONS. I have a love-hate relationship with them... They're quite \
        tough so when i got stucked, it can get so bad that i stare at the screen for hours at the end, \
        as i tried to think of ways to code the solution. Prof Ben is absolutely right. CS1010S is really \
        less coding, more thinking. I remembered there was once i spent 5-6hours thinking just to code \
        ~5lines which was the answer. But on the brighter side, the sense of achievement upon completing \
        missions is too fulfilling to justify the amount of effort (and bleary-eyeness) and thinking put \
        into it. Missions are meant for one to struggle as only then will one learn. An important tip \
        though: do try to complete your mission early. One day before the dateline is NOT early. Starting \
        your missions early (actually starting them (reading, processing, thinking) and not just clicking \
        the start button) is really beneficial as it gives you a time buffer before the dateline. Sometimes \
        you might just get stucked in the same mindset but once you divert your attention to something else \
        or after a good night rest and returning back to the question, you might think differently and come \
        up with the answer. Another tip is also to not backlog in ANY of your missions. These procrastinations \
        pile up real fast and given that one mission is already so taxing and time-consuming, it is really \
        foolish to leave them 'to be completed later' which most likely equals to them being uncompleted. \n\
        The 35% from Coursemology is really free marks and one should be able to attain them if consistent \
        effort is placed.\n Good luck and don't fear CS1010S! Consistent effort is key (:\n Expected grade: A\n\
        Attained grade: A\nNote: I took this in gradeless sem and although this mod has no bell-curve, \
        the standard of the mid-terms and finals are rather easier than previous years. This was due to \
        the whole cohort not doing well and the easier standards are to motivate students to buck up. \
        Having said that, future semesters might have a harder time doing missions and all but nonetheless, \
        I still believe that with consistent effort each week, attending lectures, recitations and tutorials \
        regularly and submitting your missions before the dateline, an A is not unattainable."
    },
    "e1234569" : {
        year: "1314s1",
        staffadmin: 4.9,
        content: 4.5,
        overall: 4.7,
        written: "I agree with Yang Shun, who was our head tutor in semester 1 13/14. \
        There will be many missions to complete on Coursmology. Every mission is tough \
        but very interesting. Moreover, unlike CS1010, it will be taught in a very friendly \
        programming language which can support much about everything - it's called Python. \
        With it, your can focus more on the interesting part of programming thinking rather than \
        syntax. After taking this one module, i felt that it has improve my productivity since most \
        things in our age are going online. I think this will be the most worth-it module to take as \
        your UE for students from other faculties if you ever thought of learning programming. Rest \
        assured that python would become a popular and widely used language in data analysis or web \
        programming and you won't ever need to learn other language again."
    },
    "e1234570" : {
        year: "1314s1",
        staffadmin: 4.5,
        content: 4.7,
        overall: 4.6,
        written: ""
    },
    "e1234571" : {
        year: "1314s1",
        staffadmin: 4.5,
        content: 4.7,
        overall: 4.6,
        written: ""
    },
    "e1234572" : {
        year: "1314s1",
        staffadmin: 4.5,
        content: 4.7,
        overall: 4.6,
        written: ""
    },
};
var reviews = moduleReviews[code];
var workload = states[code]['workload'].split("-");
var mc = states[code]['mc'];
var mcText = "MC"
if (mc > 1) {
    mcText += "s";
}
var totalHours = workload.map(function(elt) {return parseInt(elt)}).reduce(function(a,b) {return a+b});
var totalString = totalHours + totalHours > 1 ? 'hrs' : 'hr'
//console.log(totalString);
//var width = 300;
//var scaleFac = 20;
//var barHeight = 30;

var writtenReviews = {};
for (let [id, written] of Object.entries(reviews)) {
    if (written['written'].length > 0) {
        writtenReviews[id] = written['written'];
    }
}
var avgStaffAdmin = Object.values(cs1010sreviews)
                          .map(function(x) {return x['staffadmin']})
                          .reduce(function(a,b) {return a+b}) / Object.values(cs1010sreviews).length;

var avgContent = Object.values(cs1010sreviews)
                       .map(function(x) {return x['content']})
                       .reduce(function(a,b) {return a+b}) / Object.values(cs1010sreviews).length;

var avgOverall = Object.values(cs1010sreviews)
                       .map(function(x) {return x['overall']})
                       .reduce(function(a,b) {return a+b}) / Object.values(cs1010sreviews).length;

avgOverall = Math.round(avgOverall*10)/10
avgStaffAdmin = Math.round(avgStaffAdmin*10)/10
avgContent = Math.round(avgContent*10)/10
//var overallStars = await document.getElementById("OverallStarsInner"));
//console.log(stars);
//stars.style.width = avgOverall;
//console.log(users_table);    

export default {
    name: "App",
    display: "Review",
    order: 14,
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            loadData: {},
            Mtitle: states[code]['fullname'],
            MDepartment: states[code]['department'],
            Mmc: mc.toString() + " " +mcText ,
            Mdescription:states[code]['desc'],
            PreclusionTitle:"Preclusion",
            Preclusion:states[code]['preclusion'],
            totalHours: totalHours + " " + totalString,
            Workload: states[code]['workload'],
            Workloadviz:"Workload Visualisation",
            PrereqTitle:"Prerequisites",
            PrereqTree:"Prereq Tree",
            FeedbackTitle: "Rating and Reviews",
            OverallFeedbackNum: avgOverall,
            ContentFeedback: avgContent,
            StaffFeedback: avgStaffAdmin,
            WrittenReviews: writtenReviews,
            users: users_table,
        };
    },
    mounted() {
        console.log("App loaded");
        this.getOverallStars();
    },
    computed: {
    },
    methods: {
        getOverallStars: function() {
            const avgOverall = Object.values(cs1010sreviews).map(function(x) {return x['overall']}).reduce(function(a,b) {return a+b}) / Object.values(cs1010sreviews).length;            
            const starPercentage = (avgOverall / 5) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage))}%`;
            document.querySelector("#StarsInner").style.width = starPercentageRounded;
        },
        getUsername: function(userid) {
            return users_table[userid];
        }
    },
}
</script>