class Circle extends Shape {
    localSettings: any;

    constructor(ko: any, canvasObject: CanvasContext, Settings: any, name: string) {

        // init the main params of the class
        super("circle", name, "CircleSettingsTemplate", "circleTemplate", canvasObject);

        // add class defenetion to the observable object
        this.localSettings = Settings;
        this.localSettings.circle = {
            radiusLength: ko.observable(100),
            linewidth: ko.observable(1),
            lineColor: ko.observable("#000000"),
            linesCount: ko.observable(10),           // введено пользователем
            linesRealCount: ko.observable(10),
            rotationAngle: 5,
            isLoaded: ko.observable(false)
        }
    }

    // download class to the UI
    Init(container: string) {
        this.loadFields();
        this.AddSection(container);
    }

    // add block to the UI panel
    AddSection(container: string) {
        super.AddSection(container, this.templateName);
    }

    // Add fields into the block
    loadFields() {
        //should to be without whis for callback
        var settings = this.localSettings.circle;

        if (!settings.isLoaded()) {
            super.loadTemplateCollection(this.templateFileName, function () {
                settings.isLoaded(true);

                // подгружаем цветовой круг для круга, когда шаблон загружен
                $.farbtastic('#circleColorCircle', function (color) {
                    $("#circleColor").val(color).css("background-color", color);
                    $("#circleColor").change();
                });
            });
        }
    }

    startDrawing(e: any) {
        this.localSettings.x = e.pageX;
        this.localSettings.y = e.pageY;

        var lineWidth = parseInt(this.localSettings.circle.linewidth());
        var lineColor = this.localSettings.circle.lineColor();

        this.changeLineLenght();
        this.DrawCircle(this.localSettings.x, this.localSettings.y, parseInt(this.localSettings.circle.radiusLength()), lineWidth, lineColor)
        this.makeInnerLines(this.localSettings.x, this.localSettings.y, parseInt(this.localSettings.circle.radiusLength()), parseInt(this.localSettings.circle.rotationAngle))
    }

    makeInnerRect(x, y, radius) {
        this.DrawLines(x - radius, y, x, y - radius);
        this.DrawLines(x, y - radius, x + radius, y);
        this.DrawLines(x + radius, y, x, y + radius);
        this.DrawLines(x, y + radius, x - radius, y);
    }

    changeLineLenght() {
        var dots = parseInt(this.localSettings.circle.linesCount());

        var reallinesCount = Math.round(dots / 4) * 4;
        this.localSettings.circle.linesRealCount(reallinesCount);
        this.localSettings.circle.rotationAngle = Math.round(360 / reallinesCount);
    }

    DrawLines(fromX, fromY, toX, toY) {
        var lineWidth: number = parseInt(this.localSettings.circle.linewidth());
        var lineColor: string = this.localSettings.circle.lineColor();
        super.DrawLines(fromX, fromY, toX, toY, lineWidth, lineColor);
    }

    makeInnerLines(x, y, radius, angle) {
        this.makeInnerRect(x, y, radius);
        for (var i = 1; i < (this.localSettings.circle.linesRealCount() / 4); i++) {
            this.Rotation(this.localSettings.x, this.localSettings.y, (angle * i));
            this.makeInnerRect(x, y, radius);
            this.Rotation(this.localSettings.x, this.localSettings.y, (angle * i), -1);
        }
    }
}