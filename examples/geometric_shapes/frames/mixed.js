window.drawMixedFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.rect(0, 0, 150, 300);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    // context.beginPath();
    // context.arc(150, 150, 50, 0, Math.PI * 2, false);
    // context.fillStyle = "white";
    // context.fill();
    // context.stroke();
}