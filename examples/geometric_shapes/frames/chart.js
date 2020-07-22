window.drawChartFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "orange";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "purple";
    context.rect(10, 10, 30, 270);
    context.fillStyle = "purple";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(25, 25);
    context.lineTo(35, 35);
    context.lineTo(15, 35);
    context.lineTo(25, 25);
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "black";
    context.rect(50, 30, 30, 250);
    context.fillStyle = "black";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(57.5, 50);
    context.lineTo(72.5, 50);
    context.lineTo(65, 70);
    context.lineTo(57.5, 50);
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";
    context.rect(100, 30, 50, 250);
    context.fillStyle = "red";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(125, 50);
    context.lineTo(140, 70);
    context.lineTo(110, 70);
    context.lineTo(125, 50);
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "purple";
    context.rect(170, 20, 35, 260);
    context.fillStyle = "purple";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "purple";
    context.rect(240, 90, 40, 190);
    context.fillStyle = "purple";
    context.fill();
    context.stroke();
}