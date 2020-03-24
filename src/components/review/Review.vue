<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
</style>
<template>
    <div id="overlay"> 
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h1 id = 'reviewTitle'>Add Review</h1>
              <button type="button" id='closeReview'>
                <font-awesome-icon icon="times" />
              </button>
            </slot>
          </div>
          <div class="modal-body">
            <table id = "review">
              <tr class = "rows">
                <td class="one">Year and Sem taken: </td>
                <td>
                  <select id="year" style='float:right'>
                    <option v-for="year in yearlist()" :key="year">{{year.slice(0,2)+'/'+year.slice(3,5)+' Semester '+year[6]}}</option>
                  </select>
                </td>
              </tr>
              <tr class = "rows">
                <td class="one">Quality of Content: </td>
                <td class="spin">
                <b-form-spinbutton id="quality" min="1" max="5" value="5" inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Relevance of Content: </td>
                <td class="spin">
                <b-form-spinbutton id="relevance" min="1" max="5" value="5" inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Difficulty of content: </td>
                <td class="spin">
                <b-form-spinbutton id="difficulty" value="5" min="1" max="5" inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Heaviness of workload: </td>
                <td class="spin">
                <b-form-spinbutton id="workload" value="5" min="1" max="5" inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Quality of teaching staff: </td>
                <td class="spin">
                <b-form-spinbutton id="staff" value="5" min="1" max="5" inline></b-form-spinbutton>
                </td>
              </tr>
              <tr>
              <slot name="body" id='writtenBody'>
                <textarea id ='writtenReview' rows=10 cols=105 placeholder = 'Write your review here!'></textarea>
              </slot>
              </tr>
            </table>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              Click 'OK' to submit your review!
              <button id = 'submitReview' @click="submitR()">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    data() {
      return {
        
      }
    },
    components: {
        FontAwesomeIcon,
    },
    methods: {
        yearlist: function() {
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
        submitR: function() {
          var quality = document.getElementById("quality").value;
          var relevance = document.getElementById("relevance").value;
          var staff = document.getElementById("staff").value;
          var difficulty = document.getElementById("difficulty").value;
          var workload = document.getElementById("workload").value;
          var review = document.getElementById('writtenReview');
          var year = document.getElementById('year').value
          this.$parent.submitReview(quality, 
                                    relevance, 
                                    workload, 
                                    staff, 
                                    difficulty,
                                    review,
                                    year);
          quality = 5;
          relevance = 5;
          staff = 5;
          difficulty = 5;
          workload = 5;
          review = "";
          console.log(this.yearlist()[0]);
          year = this.yearlist()[0];
        }
    },
}
</script>