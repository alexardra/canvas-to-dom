window.drawPolygonsFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "#a893bd";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.strokeStyle = "red";
    context.moveTo(140, 25);
    context.lineTo(135, 45);
    context.lineTo(105, 45);
    context.lineTo(115, 25);
    context.fillStyle = "red";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(40, 25);
    context.lineTo(50, 70);
    context.lineTo(15, 35);
    context.lineTo(25, 25);
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(70, 25);
    context.lineTo(100, 50);
    context.lineTo(80, 80);
    context.lineTo(100, 25);
    context.fillStyle = "green";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "gold";
    context.moveTo(70, 80);
    context.lineTo(100, 105);
    context.lineTo(80, 135);
    context.lineTo(50, 155);
    context.lineTo(50, 105);
    context.fillStyle = "gold";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "SlateBlue";
    context.moveTo(200, 120);
    context.lineTo(220, 140);
    context.lineTo(210, 170);
    context.lineTo(180, 140);
    context.lineTo(180, 130);
    context.lineTo(200, 120);
    context.fillStyle = "SlateBlue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "blue";
    context.moveTo(70, 200);
    context.lineTo(40, 220);
    context.lineTo(50, 240);
    context.lineTo(80, 260);
    context.lineTo(120, 230);
    context.lineTo(70, 200);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "blue";
    context.moveTo(150, 200);
    context.lineTo(120, 220);
    context.lineTo(130, 240);
    context.lineTo(160, 260);
    context.lineTo(210, 240);
    context.lineTo(150, 200);
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(140, 150, 40, 0, Math.PI * 2, false);
    context.fillStyle = "brown";
    context.fill();
    context.stroke();

    context.beginPath();
    context.rect(130, 140, 30, 40);
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();
}