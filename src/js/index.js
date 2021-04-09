import '../css/index.css'
import $ from 'jquery'
import Vue from 'vue'
import app from '../components/app.vue'

$(function(){
  $('li:odd').css('backgroundColor','pink')
  $('li:even').css('backgroundColor','blue')
})

var vm = new Vue({
  el: '#app',
  render: c => c(app)
});
