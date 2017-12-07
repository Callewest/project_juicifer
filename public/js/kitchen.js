/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */
'use strict';

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
    showStock: function(){
      document.getElementById("stock-page").style.display = "block";
      document.getElementById("kitchenVue").style.display = "none";
      getIngredients();
    },
    showOrder: function(){
      document.getElementById("stock-page").style.display = "none";
      document.getElementById("kitchenVue").style.display = "block";
    }
  }
});











