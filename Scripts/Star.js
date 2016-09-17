var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(ko, canvasObject, Settings, name) {
        // init the main params of the class
        _super.call(this, "star", name, "StarSettingsTemplate", "starTemplate", canvasObject);
        this.makeBaseLines = function (x, y, length) {
            this.DrawLines(x, y, x + length, y);
            this.DrawLines(x, y, x - length, y);
            this.DrawLines(x, y, x, y + length);
            this.DrawLines(x, y, x, y - length);
        };
        // add class defenetion to the observable object
        this.localSettings = Settings;
        this.localSettings.star = {
            lineUserLength: ko.observable(30),
            lineLength: ko.observable(0),
            linewidth: ko.observable(1),
            lineColor: ko.observable("#000000"),
            linesCount: ko.observable(6),
            step: 5,
            rotationAngle: ko.observable(0),
            isLoaded: ko.observable(false)
        };
    }
    // download class to the UI
    Star.prototype.Init = function (container) {
        this.loadFields();
        this.AddSection(container);
    };
    // add block to the UI panel
    Star.prototype.AddSection = function (container) {
        _super.prototype.AddSection.call(this, container, this.templateName);
    };
    // Add fields into the block
    Star.prototype.loadFields = function () {
        //should to be without whis for callback
        var settings = this.localSettings;
        if (!settings.star.isLoaded()) {
            _super.prototype.loadTemplateCollection.call(this, this.templateFileName, function () {
                settings.star.isLoaded(true);
                // подгружаем цветовой круг для звезды, когда шаблон загружен
                $.farbtastic('#starColorCircle', function (color) {
                    $("#starColor").val(color).css("background-color", color);
                    $("#starColor").change();
                });
            });
        }
    };
    Star.prototype.startDrawing = function (e) {
        this.localSettings.x = e.pageX;
        this.localSettings.y = e.pageY;
        this.changeLineLenght();
        _super.prototype.Rotation.call(this, this.localSettings.x, this.localSettings.y, this.localSettings.star.rotationAngle());
        this.makeBaseLines(this.localSettings.x, this.localSettings.y, this.localSettings.star.lineLength());
        this.makeJoinLines(this.localSettings.x, this.localSettings.y, this.localSettings.star.linesCount(), this.localSettings.star.lineLength());
        this.Rotation(this.localSettings.x, this.localSettings.y, this.localSettings.star.rotationAngle(), -1);
    };
    Star.prototype.changeLineLenght = function () {
        var length = parseInt(this.localSettings.star.lineUserLength());
        var dots = parseInt(this.localSettings.star.linesCount());
        this.localSettings.star.step = Math.round(length / dots);
        var realLenght = this.localSettings.star.step * dots;
        this.localSettings.star.lineLength(realLenght);
    };
    Star.prototype.DrawLines = function (fromX, fromY, toX, toY) {
        var lineWidth = parseInt(this.localSettings.star.linewidth());
        var lineColor = this.localSettings.star.lineColor();
        _super.prototype.DrawLines.call(this, fromX, fromY, toX, toY, lineWidth, lineColor);
    };
    Star.prototype.makeJoinLines = function (x, y, linesCount, lenght) {
        var centre = 0;
        var end = 0;
        for (var i = 0; i < linesCount; i++) {
            end = i * this.localSettings.star.step;
            centre = (i + 1) * this.localSettings.star.step;
            this.DrawLines(x, y + centre, x + lenght - end, y); // право - низ
            this.DrawLines(x, y - centre, x + lenght - end, y); // право - верх
            this.DrawLines(x, y + centre, x - lenght + end, y); // лево - низ
            this.DrawLines(x, y - centre, x - lenght + end, y); // лево - верх
        }
    };
    return Star;
}(Shape));
//# sourceMappingURL=Star.js.map