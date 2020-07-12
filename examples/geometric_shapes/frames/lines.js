window.drawLinesFrame = function (canvas) {
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let colors = ["red", "yellow", "green", "blue", "purple", "black", "grey", "brown", "aquamarine", "coral"];

    let drawLine = function (context, x0, y0, x1, y1, color) {
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = color;
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
    }
    let x = 40, y = 70;
    for (let i = 0; i < colors.length; i++) {
        drawLine(context, x, y + i * 10, x + 60, y + i * 10, colors[i]);
    }

    x = 120, y = 70;
    for (let i = 0; i < colors.length; i++) {
        drawLine(context, x, y + i * 10, x + 60, y + i * 10 + 20, colors[i]);
    }

    x = 120, y = 70;
    for (let i = 0; i < colors.length; i++) {
        drawLine(context, x, y + i * 10, x + 60, y + i * 10 + 20, colors[i]);
    }

    x = 200, y = 70;
    for (let i = 0; i < colors.length; i++) {
        drawLine(context, x, y + i * 10, x + 60, y + i * 10 - 20, colors[i]);
    }
}
