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
                <td class="one">Year and Semester: </td>
                <td>
                  <select class="custom-select" id="year" style='float:right'>
                    <option v-for="year in yearlist()" :key="year">{{year.slice(0,2)+'/'+year.slice(3,5)+' Semester '+year[6]}}</option>
                  </select>
                </td>
              </tr>
              <tr class = "rows">
                <td class="one">Quality of Content: </td>
                <td class="spin">
                <b-form-spinbutton size="sm" id="quality" v-model="quality" min=1 max=5 inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Relevance of Content: </td>
                <td class="spin">
                <b-form-spinbutton size="sm" id="relevance" v-model="relevance" min=1 max=5 inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Difficulty of Content: </td>
                <td class="spin">
                <b-form-spinbutton size="sm" id="difficulty" v-model="difficulty" min=1 max=5 inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Heaviness of Workload: </td>
                <td class="spin">
                <b-form-spinbutton size="sm" id="workload" v-model="workload" min=1 max=5 inline></b-form-spinbutton>
                </td>
              </tr>
              <tr class = "rows">
              <td class="one">Quality of Teaching Staff: </td>
                <td class="spin">
                <b-form-spinbutton size="sm" id="staff" v-model="staff" min=1 max=5 inline></b-form-spinbutton>
                </td>
              </tr>
            </table>
            <slot name="body" id='writtenBody'>
              <textarea id ='writtenReview' cols=1000 rows=4 placeholder = 'Type your review here'></textarea>
            </slot>
            <slot name="footer">
              <button class="btn" id = 'submitReview' @click="submitR()">
                Submit Review
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
        quality:5,
        staff:5,
        relevance:5,
        difficulty:5,
        workload:5,
      }
    },
    props : {
      q: Number,
      s: Number,
      r: Number,
      d: Number,
      w: Number,
    },
    watch: {
      q: function(val) {
        this.quality = val;
      },
      s: function(val) {
        this.staff = val;
      },
      r: function(val) {
        this.relevance = val;
      },
      d: function(val) {
        this.difficulty = val;
      },
      w: function(val) {
        this.workload = val;
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
          var review = document.getElementById('writtenReview');
          var year = document.getElementById('year').value;
          this.$parent.submitReview(this.quality,
                                    this.staff,
                                    this.relevance,
                                    this.difficulty,
                                    this.workload,
                                    review,
                                    year);
          review.value = "";
          var value = this.yearlist()[0];
          var yearString = value.slice(0,5)+' Semester '+ value[6];
          document.getElementById('year').value = yearString;
          console.log(document.getElementById('year').value);
        }
    },
}
</script>