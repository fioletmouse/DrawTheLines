class Star extends Shape {
    localSettings: any;
    constructor(ko: any, canvasObject: CanvasContext, Settings: any, name: string) {

        // init the main params of the class
        super("star", name, "StarSettingsTemplate", "starTemplate", canvasObject);

        // add class defenetion to the observable object
        this.localSettings = Settings;
        this.localSettings.star = {
            lineUserLength: ko.observable(30),  // введено пользователем
            lineLength: ko.observable(0),      // применяется
            linewidth: ko.observable(1),
            lineColor: ko.observable("#000000"),
            linesCount: ko.observable(6),
            step: 5,
            rotationAngle: ko.observable(0),
            isLoaded: ko.observable(false)
        }
    }

    // download class to the UI
    Init(container: string)
    {
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
        var settings = this.localSettings;

        if (!settings.star.isLoaded()) {
            super.loadTemplateCollection(this.templateFileName, function () {
                settings.star.isLoaded(true);

                // подгружаем цветовой круг для звезды, когда шаблон загружен
                $.farbtastic('#starColorCircle', function (color) {
                    $("#starColor").val(color).css("background-color", color);
                    $("#starColor").change();
                });
            });
        }     
    }
    restore() { super.restore(); };
    startDrawing(e: any) {
        super.startDrawing(e);
        this.localSettings.x = e.pageX;
        this.localSettings.y = e.pageY;

        this.changeLineLenght();

        super.Rotation(this.localSettings.x, this.localSettings.y, this.localSettings.star.rotationAngle());

        this.makeBaseLines(this.localSettings.x, this.localSettings.y, this.localSettings.star.lineLength());
        this.makeJoinLines(this.localSettings.x, this.localSettings.y, this.localSettings.star.linesCount(), this.localSettings.star.lineLength());

        this.Rotation(this.localSettings.x, this.localSettings.y, this.localSettings.star.rotationAngle(), -1);
    }

    makeBaseLines = function (x, y, length) {
        this.DrawLines(x, y, x + length, y);
        this.DrawLines(x, y, x - length, y);
        this.DrawLines(x, y, x, y + length);
        this.DrawLines(x, y, x, y - length);
    }

    changeLineLenght() {
        var length: number = parseInt(this.localSettings.star.lineUserLength());
        var dots: number = parseInt(this.localSettings.star.linesCount());

        this.localSettings.star.step = Math.round(length / dots);

        var realLenght: number = this.localSettings.star.step * dots
        this.localSettings.star.lineLength(realLenght);
    }

    DrawLines(fromX, fromY, toX, toY) {
        var lineWidth: number = parseInt(this.localSettings.star.linewidth());
        var lineColor: string = this.localSettings.star.lineColor();
        super.DrawLines(fromX, fromY, toX, toY, lineWidth, lineColor);
    }

    makeJoinLines(x, y, linesCount, lenght) {
        var centre: number = 0;
        var end: number = 0;

        for (var i = 0; i < linesCount; i++) {
            end = i * this.localSettings.star.step;
            centre = (i + 1) * this.localSettings.star.step;

            this.DrawLines(x, y + centre, x + lenght - end, y); // право - низ
            this.DrawLines(x, y - centre, x + lenght - end, y); // право - верх
            this.DrawLines(x, y + centre, x - lenght + end, y); // лево - низ
            this.DrawLines(x, y - centre, x - lenght + end, y); // лево - верх
        }
    }
}