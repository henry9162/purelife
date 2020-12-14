import Vue from 'vue'
import VueBarcodeScanner from 'vue-barcode-scanner';

let options = {
  sensitivity: 300, // default is 100
  requiredAttr: true, // default is false
  callbackAfterTimeout: true // default is false
}

Vue.use(VueBarcodeScanner, options);