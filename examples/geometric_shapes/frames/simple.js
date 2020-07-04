window.drawSimpleFrame = function (canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.strokeStyle = "blue";
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "yellow";
    context.rect(80, 90, 20, 20);
    context.stroke();

    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "green";
    context.moveTo(130, 130);
    context.lineTo(170, 170);
    context.stroke();

    context.beginPath();
    context.strokeStyle = "blue";
    context.moveTo(160, 200);
    context.lineTo(200, 220);
    context.lineTo(220, 160);
    context.lineTo(160, 200);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
}
