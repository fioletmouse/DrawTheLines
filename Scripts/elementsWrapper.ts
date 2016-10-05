class elementsWrapper {
    /*объект для хранения данных для нокаута*/
    Settings = { x: 0, y: 0 };

    // object helps to determine what element should draw
    arr: Array<Shape> = [];

    constructor(ko: any, canvasObject: CanvasContext) {
        //create an instance of the class
        var star = new Star(ko, canvasObject, this.Settings, "Звезда")
        // add to the UI
        star.Init("#collapse-group");
        // add to the elements array
        this.arr.push(star);
        

        var circle = new Circle(ko, canvasObject, this.Settings, 'Круг');
        circle.Init("#collapse-group");
        this.arr.push(circle);

        ko.applyBindings(this.Settings);

        /*строим слайдер*/
        $('#opener').on('click', function () {
            var panel = $('#slide-panel');
            if (panel.hasClass("visible")) {
                panel.removeClass('visible').animate({ 'margin-left': '-250px' });
            } else {
                panel.addClass('visible').animate({ 'margin-left': '0px' });
            }
            return false;
        });

        /*color-picker для фона*/
        $.farbtastic('#colorpicker', function (color) {
            $("#cnv").css("background-color", color);
        });
    }
    restore()
    {
        this.arr[0].restore();
    }
    startEvent(e) {
        if ($('#collapse-group div[aria-expanded=true]')[0] != null) {
            this.arr.forEach(function (item, i, arr) {
                if (item.title == $('#collapse-group div[aria-expanded=true]').attr("id")) {
                    item.startDrawing(e);
                    return;
                }
            });
        }
        else {
            alert("Выберите тип элемента для отрисовка")
        }
    }
}