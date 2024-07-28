 
  <script>
  import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
  
  export default {
    props: {
      qrbox: { type: Number, default: 250 },
      fps: { type: Number, default: 10 },
    },
    mounted() {
      Html5Qrcode.getCameras()
        .then(devices => {
          if (devices && devices.length) {
            const cameraId = devices[0].id;
            this.startScanner(cameraId);
          } else {
            console.error('No cameras found.');
          }
        })
        .catch(err => {
          console.error('Error getting cameras:', err);
        });
    },
    methods: {
      startScanner(cameraId) {
        const config = {
          fps: this.fps,
          qrbox: this.qrbox,
        };
        const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
        html5QrcodeScanner.render(
          decodedText => this.onScanSuccess(decodedText),
          // error => this.onScanFailure(error),
          cameraId
        );
      },
      onScanSuccess(decodedText) {
        this.$emit('result', decodedText);
      },
      onScanFailure(error) {
        console.warn('Code scan error:', error);
        // Handle scan failure, you may choose to ignore and keep scanning.
      },
    },
  };
  </script>
  
  
 

<template>
  <div id="qr-code-full-region" class="qr-scanner" style="position: relative; width: 100%; padding: 0px; border: none;"></div>
</template>

<style scoped>
#html5-qrcode-button-camera-start,
#html5-qrcode-button-camera-stop,
#html5-qrcode-button-file-selection {
  height: 40px;   width: 100%;
  max-width: 128px;
  border: none;
  background-color:#2D796D; color: white;
  border-radius: 5px;
  margin: 20px 0;
}

#html5-qrcode-button-camera-stop {
  background-color:#2D796D;
}

</style>
 
  