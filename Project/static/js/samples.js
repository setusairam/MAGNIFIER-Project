var videoElement = document.getElementById('video');
var videoContainer = document.getElementById('video-container');
var menu = document.getElementById('menu');
var scale = 1;
var maxScale = 5;
var zoomStep = 0.2;
var translateX = 0;
var translateY = 0;

// Toggle the menu for filters
function toggleMenu() {
    menu.classList.toggle('active');
}

// Access the user's camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
    }).then(function (stream) {
        videoElement.srcObject = stream;
    }).catch(function (error) {
        console.error('Error accessing the camera:', error);
    });
} else {
    console.error('getUserMedia is not supported in this browser');
}

function zoomIn() {
    if (scale < maxScale) {
        scale += zoomStep;
        applyTransform();
    }
}

function zoomOut() {
    if (scale > 1) {
        scale -= zoomStep;
        if (scale < 1) scale = 1;
        applyTransform();
    }
}

function applyTransform() {
    videoElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Handle drag movement to move around when zoomed in
videoContainer.addEventListener('mousedown', function (e) {
    e.preventDefault();
    videoContainer.style.cursor = 'grabbing';

    let startX = e.clientX;
    let startY = e.clientY;

    function onMouseMove(e) {
        translateX += (e.clientX - startX) / scale;
        translateY += (e.clientY - startY) / scale;
        startX = e.clientX;
        startY = e.clientY;
        applyTransform();
    }

    function onMouseUp() {
        videoContainer.style.cursor = 'grab';
        videoContainer.removeEventListener('mousemove', onMouseMove);
        videoContainer.removeEventListener('mouseup', onMouseUp);
    }

    videoContainer.addEventListener('mousemove', onMouseMove);
    videoContainer.addEventListener('mouseup', onMouseUp);
});

// Filters
function applyNormal() {
    videoElement.style.filter = 'none';
}

function applyProtanopia() {
    videoElement.style.filter = 'grayscale(100%) sepia(100%) hue-rotate(270deg)';
}

function applyDeuteranopia() {
    videoElement.style.filter = 'grayscale(100%) sepia(100%) hue-rotate(90deg)';
}

function applyLightBlue() {
    videoElement.style.filter = 'brightness(150%) contrast(100%) sepia(20%) hue-rotate(180deg)';
}

function applyLightGreen() {
    videoElement.style.filter = 'brightness(130%) saturate(200%) hue-rotate(100deg)';
}

function applyLightPink() {
    videoElement.style.filter = 'brightness(120%) contrast(100%) sepia(30%) hue-rotate(330deg)';
}

function applyLightYellow() {
    videoElement.style.filter = 'brightness(140%) contrast(150%) hue-rotate(60deg)';
}

function applyGrayscale() {
    videoElement.style.filter = 'grayscale(100%)';
}

function applyInverted() {
    videoElement.style.filter = 'invert(100%)';
}

function applyInvertedGrayscale() {
    videoElement.style.filter = 'grayscale(100%) invert(100%)';
}

function applyYellowOnBlue() {
    videoElement.style.filter = 'invert(100%) sepia(100%) hue-rotate(180deg) saturate(300%) brightness(50%)';
}

function applyBlueOnYellow() {
    videoElement.style.filter = 'sepia(100%) hue-rotate(180deg) saturate(300%) brightness(50%)';
}

function applyNeonOrangeOnBlack() {
    videoElement.style.filter = 'invert(100%) sepia(100%) saturate(500%) hue-rotate(330deg) brightness(50%) contrast(200%)';
}

function applyNeonGreenOnBlack() {
    videoElement.style.filter = 'invert(100%) sepia(100%) saturate(500%) hue-rotate(90deg) brightness(50%) contrast(200%)';
}

// Custom Filter
function applyCustomFilter() {
    var hue = document.getElementById('hue').value;
    var brightness = document.getElementById('brightness').value;
    var contrast = document.getElementById('contrast').value;
    var saturation = document.getElementById('saturation').value;

    videoElement.style.filter = `hue-rotate(${hue}deg) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        requestFullscreen();
    } else {
        exitFullscreen();
    }
}

function requestFullscreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
