(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{539:function(t,e,o){var content=o(672);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(14).default)("6235d1cb",content,!0,{sourceMap:!1})},577:function(t,e,o){"use strict";o(7),o(6),o(72),o(8),o(33),o(16),o(17),o(10),o(184),o(47),o(9),o(38);var n=o(2),r=o(3),l=o(89),d=o(101);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(r.a)(l.a,Object(d.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},o={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?o.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(o.valid=e(input)))})):o.valid=e(input),o},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},671:function(t,e,o){"use strict";var n=o(539);o.n(n).a},672:function(t,e,o){var n=o(13),r=o(141),l=o(142),d=o(143),c=o(144),f=o(145);e=n(!1);var h=r(l),m=r(d),v=r(c),y=r(f);e.push([t.i,'@font-face{font-family:"gotham-black";src:url('+h+')}@font-face{font-family:"gotham-bold";src:url('+m+')}@font-face{font-family:"gotham-light";src:url('+v+')}@font-face{font-family:"gotham-thin";src:url('+y+')}.custom-h5[data-v-8786b36a]{font-size:"20px"!important}.custom-h5[data-v-8786b36a],.custom-h6[data-v-8786b36a]{font-weight:500;font-family:"gotham-black"!important;line-height:normal}.custom-h6[data-v-8786b36a]{font-size:"16px"}.custom-h4[data-v-8786b36a]{font-size:"24px"!important}.custom-h3[data-v-8786b36a],.custom-h4[data-v-8786b36a]{font-weight:500!important;font-family:"gotham-black"!important;line-height:normal!important}.custom-h3[data-v-8786b36a]{font-size:"28px"!important}.custom-h2[data-v-8786b36a]{font-size:"32px"!important;font-weight:500!important;font-family:"gotham-black"!important;line-height:normal!important}.custom-light-h5[data-v-8786b36a]{font-size:"20px"!important}.custom-light-h5[data-v-8786b36a],.custom-light-h6[data-v-8786b36a]{font-weight:500;font-family:"gotham-light"!important;line-height:normal}.custom-light-h6[data-v-8786b36a]{font-size:"16px"}.custom-light-h4[data-v-8786b36a]{font-size:"24px"!important}.custom-light-h3[data-v-8786b36a],.custom-light-h4[data-v-8786b36a]{font-weight:500!important;font-family:"gotham-light"!important;line-height:normal!important}.custom-light-h3[data-v-8786b36a]{font-size:"28px"!important}.custom-light-h2[data-v-8786b36a]{font-size:"32px"!important;font-weight:500!important;font-family:"gotham-light"!important;line-height:normal!important}.sideNav-title[data-v-8786b36a]{color:#3cb371}.custom-loader[data-v-8786b36a]{-webkit-animation:loader-data-v-8786b36a 1s infinite;animation:loader-data-v-8786b36a 1s infinite;display:flex}@-webkit-keyframes loader-data-v-8786b36a{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes loader-data-v-8786b36a{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.list-color[data-v-8786b36a]{color:#22a64e!important}.post-caption[data-v-8786b36a]{font-family:"gotham-light";font-weight:100}.custom-style[data-v-8786b36a]{font-family:"gotham-black"!important}',""]),t.exports=e},719:function(t,e,o){"use strict";o.r(e);o(58);var n=o(19),r={layout:"admin",data:function(){return{disabled:!0,disableEdit:!1,disableUpdate:!0,loading:!1,valid:!0}},computed:{loyaltyPoint:{get:function(){return this.$store.state.loyalties.loyaltyPoint},set:function(t){this.$store.dispatch("loyalties/setLoyalty",t)}},value:{get:function(){return this.$store.state.loyalties.value},set:function(t){this.$store.dispatch("loyalties/setValue",t)}},loyaltyPointToBuy:{get:function(){return this.$store.state.loyalties.loyaltyPointToBuy},set:function(t){this.$store.dispatch("loyalties/setLoyaltyToBuy",t)}},valueToBuy:{get:function(){return this.$store.state.loyalties.valueToBuy},set:function(t){this.$store.dispatch("loyalties/setValueToBuy",t)}}},methods:{edit:function(){this.editView()},update:function(){var t=this;this.loading=!0,this.$store.dispatch("loyalties/updateLoyalty").then((function(e){t.loading=!1,t.reset()}))},editView:function(){this.disabled=!1,this.disableUpdate=!1,this.disableEdit=!0},reset:function(){this.disabled=!0,this.disableUpdate=!0,this.disableEdit=!1},getLoyaltySetUp:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("loyalties/getLoyaltySetUp");case 2:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.getLoyaltySetUp()}},l=(o(671),o(57)),d=o(71),c=o.n(d),f=o(472),h=o(214),m=o(486),v=o(577),y=o(114),w=o(487),x=o(81),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"d-flex justify-center"},[o("v-card",{staticClass:"mt-14",attrs:{width:"70%",color:"#22A64E"}},[o("v-card",{staticClass:"mx-4 py-6",attrs:{flat:""}},[o("div",[o("v-form",{ref:"form",staticClass:"px-6",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[o("div",{staticClass:"text-h5 custom-style list-color text-center pt-2 pb-6"},[t._v("Loyalty Set Up")]),t._v(" "),o("v-row",[o("v-col",{attrs:{cols:"12",md:"6"}},[o("div",{staticClass:"post-caption pb-4"},[t._v("To Acquire")]),t._v(" "),o("v-text-field",{attrs:{"prepend-inner-icon":"",type:"number",color:"green",filled:"",dense:"",rounded:"",disabled:t.disabled,label:"loyal Point"},model:{value:t.loyaltyPoint,callback:function(e){t.loyaltyPoint=e},expression:"loyaltyPoint"}}),t._v(" "),o("v-text-field",{attrs:{"prepend-inner-icon":"",type:"number",color:"green",filled:"",dense:"",rounded:"",disabled:t.disabled,label:"Value"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),o("v-col",{attrs:{cols:"12",md:"6"}},[o("div",{staticClass:"post-caption pb-4"},[t._v("To Buy")]),t._v(" "),o("v-text-field",{attrs:{"prepend-inner-icon":"",type:"number",color:"green",filled:"",dense:"",rounded:"",disabled:t.disabled,label:"loyal Point"},model:{value:t.loyaltyPointToBuy,callback:function(e){t.loyaltyPointToBuy=e},expression:"loyaltyPointToBuy"}}),t._v(" "),o("v-text-field",{attrs:{"prepend-inner-icon":"",type:"number",color:"green",filled:"",dense:"",rounded:"",disabled:t.disabled,label:"Value"},model:{value:t.valueToBuy,callback:function(e){t.valueToBuy=e},expression:"valueToBuy"}})],1)],1),t._v(" "),o("div",{staticClass:"d-flex justify-center pb-3"},[o("v-btn",{staticClass:"white--text mt-4 rounded-0 px-8 py-5 text-capitalize",attrs:{depressed:"",large:"","prepend-inner-icon":"",color:"#009933",disabled:t.disableEdit},on:{click:t.edit}},[t._v("Edit\r\n                        ")]),t._v(" "),o("v-btn",{staticClass:"white--text mt-4 ml-3 rounded-0 px-8 py-5 text-capitalize",attrs:{depressed:"",large:"","prepend-inner-icon":"",color:"#009933",loading:t.loading,disabled:t.disabled},on:{click:t.update},scopedSlots:t._u([{key:"loader",fn:function(){return[o("span",{staticClass:"custom-loader"},[o("v-icon",{attrs:{light:""}},[t._v("mdi-cached")])],1)]},proxy:!0}])},[t._v("\r\n                                Update\r\n                            "),o("v-icon",{attrs:{right:""}},[t._v("mdi-send")])],1)],1)],1)],1)])],1)],1)}),[],!1,null,"8786b36a",null);e.default=component.exports;c()(component,{VBtn:f.a,VCard:h.a,VCol:m.a,VForm:v.a,VIcon:y.a,VRow:w.a,VTextField:x.a})}}]);