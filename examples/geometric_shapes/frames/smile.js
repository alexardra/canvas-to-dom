window.drawSmileFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.stroke();
    context.beginPath();
    context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.stroke();
    context.beginPath();
    context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    context.stroke();
    context.beginPath();
    context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    context.stroke();
}