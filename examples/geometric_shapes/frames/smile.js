window.drawSmileFrame = function (canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(140, 120, 100, 0, Math.PI * 2, true); // Outer circle
    context.stroke();

    // context.beginPath();
    // context.arc(65, 65, 5, 0, Math.PI * 2, true); // Outer circle
    // context.stroke();

    // context.beginPath();
    // context.rect(150, 100, 120, 150);
    // context.fill();
    // context.stroke();

    // context.beginPath();
    // context.arc(90, 65, 8, 0, Math.PI * 2, false);  // Right eye
    // context.stroke();
}
