var fpsDiv = document.getElementById("fpsValue");

var frames = 0;
var startTime = performance.now();
var FPSNormal = 0;

var FPSrIC = 0;
var hasrICBeenCalledForThisFrame = null;

var frameTime = 10;

var frameTimeLabel = document.getElementById("frameTimeLabel");
document.getElementById("frameTime").addEventListener("change", function(e) {
    frameTime = this.value;
    frameTimeLabel.textContent = frameTime;
});

function updateLabel(fps) {
    fpsDiv.textContent = Math.round(fps);
}

// Deduce framerate based on remaining time per frame
// Goal is 60FPS - this should not be hardcoded!
function fpsCallback(d) {
    // Calculate the actual time the frame took
    // and the according FPS
    var goal = 1000 / 60;
    var elapsed = goal - d.timeRemaining();
    FPSrIC = (goal * 60) / elapsed;

    // Tell the FPS meter that we are over 60FPS
    hasrICBeenCalledForThisFrame = true;
}

// Every 1000ms, let's update the framerate
function calculateFPSNormal() {
    var t = performance.now();
    var dt = t - startTime;

    // if elapsed time is greater than 1s
    if (dt > 1000) {
        // calculate the frames drawn over the period of time
        FPSNormal = (frames * 1000) / dt;
        // and restart the values
        frames = 0;
        startTime = t;
    }
    frames++;
}

function sleep(ms) {
    var t = performance.now();
    do {} while (performance.now() - t < ms);
}

function render() {
    // Simulate some rendering code
    sleep(frameTime);

    // We're doing nothing, except updating the framerate
    calculateFPSNormal();

    // Update the label using the appropriate value
    updateLabel(hasrICBeenCalledForThisFrame ? FPSrIC : FPSNormal);

    // Queue the call to render() for the next frame
    hasrICBeenCalledForThisFrame = false;
    requestIdleCallback(fpsCallback);
    requestAnimationFrame(render);
}

// Start rendering
render();