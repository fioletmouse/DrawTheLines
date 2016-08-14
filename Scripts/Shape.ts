class Shape {
    title: string;
    name: string;

    constructor(title: string, name: string) {
        this.title = title;
        this.name = name
    }

    inRad (angle: number): number {
        return angle * Math.PI / 180;
    };

    startDrawing(e) { };
    /*Rotation (angle) {
        context.translate(Settings.x, Settings.y);   // сместили начало координат в точки клика
        context.rotate(angle);                       // повернули все, относительно точки клика
        context.translate(-Settings.x, -Settings.y); // вернули начало координат в левый верхний угол + учет поворота, т.е. она сместилась на угол
    };

    DrawLines (fromX, fromY, toX, toY, lineWidth, lineColor) {
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
        context.closePath();
    };

    DrawCircle (fromX, fromY, radius, lineWidth, lineColor) {
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        context.arc(fromX, fromY, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    };*/

    AddContainer(container: string, templateName: string): void {
        var html = '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#collapse-group" href="#' + this.title + '">' + this.name + '</a>' +
            '</h4>' +
            '</div>' +
            ' <div id="' + this.title + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<div data-bind="template: { name: \'' + templateName + '\', data: ' + this.title + ' }"></div>' +
            '</div></div></div>'
        $(container).find(".panel-default").last().before(html);
    }
}