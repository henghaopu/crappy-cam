// view-model
var vm = new Vue({

    el: '#app',
    
    // model
    data: {
        // reference to dom element
        video: null,
        // reference to WebRTC stream
        stream: null,
    },
    mounted () {
        // get dom element
        this.video = document.querySelector('video')
    },
    methods: {
        openCamera() {
            
            if (hasGetUserMedia()) {
                // The constraints parameter is a MediaStreamConstraints object with two members: video and audio
                const constraints = {
                    video: true
                }
                // use WebRTC - getUserMedia() API to access camera
                navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    // reference stream for other functions to use
                    this.stream = stream
                    // srcObject is a dom property
                    this.video.srcObject = stream
                })
                .catch(err => {
                    console.log(err)
                })
            
            } else {
                alert('getUserMedia() is not supported by your browser')
            }

            function hasGetUserMedia() {
                return (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
            }
        }
    }
})