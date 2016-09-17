var Shape = (function () {
    function Shape(title, name, templateName, templateFileName, canvasObject) {
        this.title = title;
        this.name = name;
        this.templateName = templateName;
        this.templateFileName = templateFileName;
        this.canvasObj = canvasObject;
    }
    Shape.prototype.inRad = function (angle) {
        return angle * Math.PI / 180;
    };
    ;
    // mouse click event for every class
    Shape.prototype.startDrawing = function (e) { };
    ;
    Shape.prototype.DrawLines = function (fromX, fromY, toX, toY, lineWidth, lineColor) {
        this.canvasObj.context.beginPath();
        this.canvasObj.context.lineWidth = lineWidth;
        this.canvasObj.context.strokeStyle = lineColor;
        this.canvasObj.context.moveTo(fromX, fromY);
        this.canvasObj.context.lineTo(toX, toY);
        this.canvasObj.context.stroke();
        this.canvasObj.context.closePath();
    };
    ;
    Shape.prototype.Rotation = function (pointX, pointY, angle, posOrNeg) {
        if (posOrNeg === void 0) { posOrNeg = 1; }
        this.Rotation_Rad(pointX, pointY, posOrNeg * this.inRad(angle));
    };
    Shape.prototype.Rotation_Rad = function (pointX, pointY, angle) {
        this.canvasObj.context.translate(pointX, pointY); // сместили начало координат в точки клика
        this.canvasObj.context.rotate(angle); // повернули все, относительно точки клика
        this.canvasObj.context.translate(-pointX, -pointY); // вернули начало координат в левый верхний угол + учет поворота, т.е. она сместилась на угол
    };
    ;
    Shape.prototype.DrawCircle = function (fromX, fromY, radius, lineWidth, lineColor) {
        this.canvasObj.context.beginPath();
        this.canvasObj.context.lineWidth = lineWidth;
        this.canvasObj.context.strokeStyle = lineColor;
        this.canvasObj.context.arc(fromX, fromY, radius, 0, Math.PI * 2, false);
        this.canvasObj.context.stroke();
        this.canvasObj.context.closePath();
    };
    ;
    Shape.prototype.AddSection = function (container, templateName) {
        var html = '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a data-toggle="collapse" data-parent="#collapse-group" href="#' + this.title + '">' + this.name + '</a>' +
            '</h4>' +
            '</div>' +
            ' <div id="' + this.title + '" class="panel-collapse collapse">' +
            '<div class="panel-body">' +
            '<div data-bind="template: { \'if\': ' + this.title + '.isLoaded, name: \'' + templateName + '\', data:' + this.title + ' }"></div>' +
            '</div></div></div>';
        $(container).find(".panel-default").last().before(html);
    };
    Shape.prototype.loadTemplateCollection = function (file, success) {
        $.get(file + '.html', function (templates) {
            $('body').append(templates);
            success();
        });
    };
    ;
    return Shape;
}());
//# sourceMappingURL=Shape.js.map