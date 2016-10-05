var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(ko, canvasObject, Settings, name) {
        // init the main params of the class
        _super.call(this, "circle", name, "CircleSettingsTemplate", "circleTemplate", canvasObject);
        // add class defenetion to the observable object
        this.localSettings = Settings;
        this.localSettings.circle = {
            radiusLength: ko.observable(100),
            linewidth: ko.observable(1),
            lineColor: ko.observable("#000000"),
            linesCount: ko.observable(10),
            linesRealCount: ko.observable(10),
            rotationAngle: 5,
            isLoaded: ko.observable(false)
        };
    }
    // download class to the UI
    Circle.prototype.Init = function (container) {
        this.loadFields();
        this.AddSection(container);
    };
    // add block to the UI panel
    Circle.prototype.AddSection = function (container) {
        _super.prototype.AddSection.call(this, container, this.templateName);
    };
    // Add fields into the block
    Circle.prototype.loadFields = function () {
        //should to be without whis for callback
        var settings = this.localSettings.circle;
        if (!settings.isLoaded()) {
            _super.prototype.loadTemplateCollection.call(this, this.templateFileName, function () {
                settings.isLoaded(true);
                // подгружаем цветовой круг для круга, когда шаблон загружен
                $.farbtastic('#circleColorCircle', function (color) {
                    $("#circleColor").val(color).css("background-color", color);
                    $("#circleColor").change();
                });
            });
        }
    };
    Circle.prototype.startDrawing = function (e) {
        this.localSettings.x = e.pageX;
        this.localSettings.y = e.pageY;
        var lineWidth = parseInt(this.localSettings.circle.linewidth());
        var lineColor = this.localSettings.circle.lineColor();
        this.changeLineLenght();
        this.DrawCircle(this.localSettings.x, this.localSettings.y, parseInt(this.localSettings.circle.radiusLength()), lineWidth, lineColor);
        this.makeInnerLines(this.localSettings.x, this.localSettings.y, parseInt(this.localSettings.circle.radiusLength()), parseInt(this.localSettings.circle.rotationAngle));
    };
    Circle.prototype.makeInnerRect = function (x, y, radius) {
        this.DrawLines(x - radius, y, x, y - radius);
        this.DrawLines(x, y - radius, x + radius, y);
        this.DrawLines(x + radius, y, x, y + radius);
        this.DrawLines(x, y + radius, x - radius, y);
    };
    Circle.prototype.changeLineLenght = function () {
        var dots = parseInt(this.localSettings.circle.linesCount());
        var reallinesCount = Math.round(dots / 4) * 4;
        this.localSettings.circle.linesRealCount(reallinesCount);
        this.localSettings.circle.rotationAngle = Math.round(360 / reallinesCount);
    };
    Circle.prototype.DrawLines = function (fromX, fromY, toX, toY) {
        var lineWidth = parseInt(this.localSettings.circle.linewidth());
        var lineColor = this.localSettings.circle.lineColor();
        _super.prototype.DrawLines.call(this, fromX, fromY, toX, toY, lineWidth, lineColor);
    };
    Circle.prototype.makeInnerLines = function (x, y, radius, angle) {
        this.makeInnerRect(x, y, radius);
        for (var i = 1; i < (this.localSettings.circle.linesRealCount() / 4); i++) {
            this.Rotation(this.localSettings.x, this.localSettings.y, (angle * i));
            this.makeInnerRect(x, y, radius);
            this.Rotation(this.localSettings.x, this.localSettings.y, (angle * i), -1);
        }
    };
    return Circle;
}(Shape));
//# sourceMappingURL=Circle.js.map