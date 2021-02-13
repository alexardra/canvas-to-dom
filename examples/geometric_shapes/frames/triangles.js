window.drawTrianglesFrame = function(canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let colors = ["red", "blue", "#33FFC4", "#5B2C6F", "#16A085", "#EB984E", "#E74C3C", "#E8DAEF", "#F4ECF7"];

    let x = 25;
    for (let i = 0; i < colors.length; i++) {
        context.beginPath();
        context.strokeStyle = colors[i];
        context.moveTo(25 + x * i, 25);
        context.lineTo(35 + x * i, 35);
        context.lineTo(15 + x * i, 35);
        context.lineTo(25 + x * i, 25);
        context.fillStyle = colors[i];
        context.fill();
        context.stroke();
    }

    for (let i = 0; i < colors.length; i++) {
        context.beginPath();
        context.strokeStyle = colors[i];
        context.moveTo(25 + x * i, 50);
        context.lineTo(35 + x * i, 40);
        context.lineTo(15 + x * i, 40);
        context.lineTo(25 + x * i, 50);
        context.fillStyle = colors[i];
        context.fill();
        context.stroke();
    }

    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(100, 290);
    context.lineTo(290, 290);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.moveTo(140, 170);
    context.lineTo(160, 210);
    context.lineTo(135, 210);
    context.closePath();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.moveTo(200, 210);
    context.lineTo(200, 260);
    context.lineTo(160, 260);
    context.closePath();
    context.fillStyle = "#33FFC4";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(100, 90);
    context.lineTo(290, 90);
    context.lineTo(290, 280);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.moveTo(130, 100);
    context.lineTo(190, 100);
    context.lineTo(190, 160);
    context.closePath();
    context.strokeStyle = 'grey';
    context.fillStyle = "grey";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "purple";
    context.rect(200, 100, 35, 40);
    context.fillStyle = "purple";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "#3371FF";
    context.rect(250, 100, 30, 20);
    context.fillStyle = "#3371FF";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "#A569BD";
    context.rect(245, 130, 20, 20);
    context.fillStyle = "#A569BD";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(250, 260);
    context.lineTo(240, 280);
    context.lineTo(210, 250);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();
    context.stroke();

    context.beginPath();
    context.strokeStyle = "Tomato";
    context.rect(20, 90, 50, 200);
    context.fillStyle = "Tomato";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(45, 120, 15, 0, Math.PI * 2, false); // Right eye
    context.fillStyle = "DodgerBlue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(45, 160, 18, 0, Math.PI * 2, false); // Right eye
    context.fillStyle = "MediumSeaGreen";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(45, 200, 18, 0, Math.PI * 2, false); // Right eye
    context.fillStyle = "LightGray";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(45, 240, 15, 0, Math.PI * 2, false); // Right eye
    context.fillStyle = "peachpuff";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(45, 270, 10, 0, Math.PI * 2, false); // Right eye
    context.fillStyle = "lightcyan";
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "aquamarine";
    context.moveTo(220, 160);
    context.lineTo(280, 160);
    context.stroke();

    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "maroon";
    context.moveTo(230, 170);
    context.lineTo(280, 180);
    context.stroke();

}