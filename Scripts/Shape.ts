class Shape {
    title: string;
    name: string;
    templateName: string;
    templateFileName: string;
    canvasObj: CanvasContext;

    constructor(title: string, name: string, templateName: string, templateFileName: string, canvasObject: CanvasContext) {
        this.title = title;
        this.name = name;
        this.templateName = templateName;
        this.templateFileName = templateFileName;
        this.canvasObj = canvasObject;
    }

    inRad (angle: number): number {
        return angle * Math.PI / 180;
    };

    // mouse click event for every class
    startDrawing(e: any)
    {
    };

    DrawLines(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, lineColor: string) {
        this.canvasObj.context.beginPath();
        this.canvasObj.context.lineWidth = lineWidth;
        this.canvasObj.context.strokeStyle = lineColor;
        this.canvasObj.context.moveTo(fromX, fromY);
        this.canvasObj.context.lineTo(toX, toY);
        this.canvasObj.context.stroke();
        this.canvasObj.context.closePath();
    };

    Rotation(pointX: number, pointY: number, angle: number, posOrNeg: number = 1) {
        this.Rotation_Rad(pointX, pointY, posOrNeg*this.inRad(angle));
    }

    Rotation_Rad(pointX: number, pointY: number, angle: number) {
        this.canvasObj.context.translate(pointX, pointY);   // сместили начало координат в точки клика
        this.canvasObj.context.rotate(angle);                       // повернули все, относительно точки клика
        this.canvasObj.context.translate(-pointX, -pointY); // вернули начало координат в левый верхний угол + учет поворота, т.е. она сместилась на угол
    };

    DrawCircle(fromX: number, fromY: number, radius: number, lineWidth: number, lineColor: number) {
        this.canvasObj.context.beginPath();
        this.canvasObj.context.lineWidth = lineWidth;
        this.canvasObj.context.strokeStyle = lineColor;
        this.canvasObj.context.arc(fromX, fromY, radius, 0, Math.PI * 2, false);
        this.canvasObj.context.stroke();
        this.canvasObj.context.closePath();
    };

    AddSection(container: string, templateName: string): void {
        var html = '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#collapse-group" href="#' + this.title + '">' + this.name + '</a>' +
            '</h4>' +
            '</div>' +
            ' <div id="' + this.title + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<div data-bind="template: { \'if\': '+this.title+'.isLoaded, name: \'' + templateName + '\', data:' + this.title + ' }"></div>' +
            '</div></div></div>'
        $(container).find(".panel-default").last().before(html);
    }

    loadTemplateCollection(file, success) {
        $.get(file + '.html', function (templates) {
            $('body').append(templates);
            success();
        });
    };
}