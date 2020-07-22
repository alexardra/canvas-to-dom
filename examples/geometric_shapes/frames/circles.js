window.drawCirclesFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(140, 120, 100, 0, Math.PI * 2, true); // Outer circle
    context.stroke();

    context.beginPath();
    context.arc(65, 65, 5, 0, Math.PI * 2, true); // Outer circle
    context.stroke();

    context.beginPath();
    context.rect(200, 100, 10, 20);
    context.fill();
    context.stroke();

    context.beginPath();
    context.rect(190, 120, 10, 20);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(90, 65, 8, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(120, 65, 7, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(150, 75, 10, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(200, 70, 14, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(160, 100, 10, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(100, 180, 20, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(170, 180, 25, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(90, 90, 10, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(130, 100, 12, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(125, 140, 14, 0, Math.PI * 2, false); // Right eye
    context.stroke();

    context.beginPath();
    context.arc(70, 140, 17, 0, Math.PI * 2, false); // Right eye
    context.stroke();
}