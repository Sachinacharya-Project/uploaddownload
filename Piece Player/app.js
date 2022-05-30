const video = document.getElementById('video');
if (Hls.isSupported()) {
    const hls = new Hls({
        debug: true,
    });
    const video_src = "./video/index.m3u8"
    hls.loadSource(video_src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        video.muted = true;
        video.play();
    });
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = video_src;
    video.addEventListener('canplay', () => {
        video.play();
    });
}