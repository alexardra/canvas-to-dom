window.drawOverlappingFrame = function (canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "red";
    context.arc(50, 75, 25, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "blue";
    context.rect(70, 75, 40, 50);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();


    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";
    context.rect(120, 120, 60, 40);
    context.fillStyle = "red";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "blue";
    context.arc(170, 160, 25, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
}
