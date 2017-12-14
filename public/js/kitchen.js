/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */
'use strict';
//Vue.component registrerar en global komponent. 'order-item-to-prepare' är komponenten nedan
//Komponenter har sin egna isolerade omfattning. Data kan inte refereras direkt från 
//parent till child. men detta går att göra genom props
Vue.component('order-item-to-prepare', {
  props: ['uiLabels', 'order', 'orderId', 'lang'],
  template: '<div>\
          <order-item\
            :ui-labels="uiLabels"\
            :lang="lang"\
            :order-id="orderId"\
            :order="order">\
          </order-item>\
          <button v-on:click="orderDone">\
            {{uiLabels.ready}}\
          </button>\
          <button v-on:click="cancelOrder">\
            {{uiLabels.cancel}}\
          </button>\
         </div>',
  methods: {
    orderDone: function () {
      this.$emit('done');
    },
    cancelOrder: function () {
        this.$emit('cancel');
    }
  }
});



Vue.component('ingredient', {
  props: ['item', 'type', 'lang'],
  template: ' <div class="ingredient">\
                  <label>\
                    {{item["ingredient_"+ lang]}} ({{ (type=="smoothie") ? item.vol_smoothie:item.vol_juice }} ml), {{item.stock}} pcs\
                  </label>\
              </div>',
  data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit('increment');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
});


var vm = new Vue({
  el: '#orders',
  mixins: [sharedVueStuff], // include stuff that is used both in the ordering system and in the kitchen
  methods: {
    markDone: function (orderid) {
      socket.emit("orderDone", orderid);
    },
    sendCancel: function (orderid) {
      socket.emit("cancelOrder", orderid);
    },

    showFinishedOrder: function() {
      document.getElementById("stock-page").style.display = "none";
      document.getElementById("kitchenVue").style.display = "none";
      document.getElementById("finishedOrder-page").style.display = "block";
    },

    showStock: function(){
      document.getElementById("stock-page").style.display = "block";
      document.getElementById("kitchenVue").style.display = "none";
      document.getElementById("finishedOrder-page").style.display = "none";
      getIngredients();
    },
    showOrder: function(){
      document.getElementById("stock-page").style.display = "none";
      document.getElementById("finishedOrder-page").style.display = "none";
      document.getElementById("kitchenVue").style.display = "block";
    },
    showTable: function(){
      document.getElementById("stock-list").style.display = "none";
      document.getElementById("kitchenVue").style.display = "none";
    },
    showDiagram: function(){
      document.getElementById("stock-list").style.display = "none";
      document.getElementById("kitchenVue").style.display = "none";
    },
    showList: function(){
      document.getElementById("stock-list").style.display = "block";
    }
  }
});


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}






