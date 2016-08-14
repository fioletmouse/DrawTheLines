class elementsWrapper {
    /*объект для хранения данных для нокаута*/
    Settings = { x: 0, y: 0, star: null };
    arr: Array<Shape> = [];

    constructor(ko: any) {
        /*незаконченный вариант инициализация объектов. !!! Переделать!*/
        var star = new Star(ko, "star", "Звезда")
        this.arr.push(star);
        star.AddButton("#collapse-group");
        this.Settings.star = star.ElementSettings;

       /* var circle = new Circle('circle', 'Круг');
        arr.push(circle);
        circle.AddButton("#collapse-group");
        Settings.circle = circle.ElementSettings;*/

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
        /*$('#colorpicker').farbtastic(function (color) {
            $("#cnv").css("background-color", color);
        });*/

        // цветовой круг для цвезды
       /* $("#colorCircle").farbtastic(function (color) {
            $("#color").val(color).css("background-color", color);
            $("#color").change();
        });*/

        /* цветовой круг для круга */
       /* $("#colorCircleForCircle").farbtastic(function (color) {
            $("#colorCirclePicker").val(color).css("background-color", color);
            $("#colorCirclePicker").change();
        })*/
    }

    startEvent(e) {
        if ($('#collapse-group div[aria-expanded=true]')[0] != null) {
            this.arr.forEach(function (item, i, arr) {
                if (item.title == $('#collapse-group div[aria-expanded=true]').attr("id")) {
                    item.startDrawing(e);
                    return;
                }
            })
        }
        else {
            alert("Выберите тип элемента для отрисовка")
        }
    }
}