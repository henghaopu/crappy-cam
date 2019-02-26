// view-model
var vm = new Vue({

    el: '#app',
    
    // model
    data: {
        // reference to dom element
        video: null,
        canvas: null,
        // reference to WebRTC stream
        stream: null
        
    },
    mounted () {
        // get dom element
        this.video = document.querySelector('video')
        this.canvas = document.querySelector('canvas')
    },
    methods: {
        async openCamera() {
            
            if (hasGetUserMedia()) {
                // The constraints parameter is a MediaStreamConstraints object with two members: video and audio
                const constraints = {
                    video: true
                }
                const stream = await navigator.mediaDevices.getUserMedia(constraints)
                this.stream = stream
                this.video.srcObject = stream
                /*
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
                */
            } else {
                alert('getUserMedia() is not supported by your browser')
            }

            function hasGetUserMedia() {
                return (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
            }
        },
        pauseVideo() {
            // pause the stream
            this.video.pause()
        },
        resumeVideo() {
            this.video.play()
        },
        closeCamera() {
            // stop both video and audio
            this.stream.getTracks().forEach(track => {
                track.stop()
            })
            // stop only audio
            // this.streamData.getAudioTracks()[0].stop();
            // stop only audio 
            // this.streamData.getVideoTracks()[0].stop();
        },
        takeAPhoto() {
            this.canvas.width = this.video.videoWidth
            this.canvas.height = this.video.videoHeight
            this.canvas.getContext('2d').drawImage(this.video, 0, 0)
        }
    }
})