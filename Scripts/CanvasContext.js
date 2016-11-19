var CanvasContext = (function () {
    function CanvasContext() {
        this.canvas = document.getElementById("cnv");
        this.context = this.canvas.getContext("2d");
        this.redraw();
    }
    CanvasContext.prototype.redraw = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setDefaultColor();
    };
    CanvasContext.prototype.setDefaultColor = function (color) {
        if (color === void 0) { color = "black"; }
        $("#cnv").css("background-color", color);
    };
    CanvasContext.prototype.clearContext = function () {
        this.context.setTransform(1, 0, 0, 1, 0, 0); // default params
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setDefaultColor();
    };
    CanvasContext.prototype.setClickAction = function (handler) {
        this.canvas.onclick = handler.startEvent.bind(handler);
    };
    CanvasContext.prototype.saveCanvas = function (name) {
        var dateTime = "_" + new Date().getDate() + "_" + new Date().getMonth() + "_" + new Date().getFullYear() + "_" +
            new Date().getHours() + "_" + new Date().getMinutes();
        if (name == null || name == "") {
            name = "lines_of_your_dream";
        }
        this.canvas.toBlob(function (blob) {
            saveAs(blob, name + dateTime + ".png");
        }, "image/png");
    };
    return CanvasContext;
}());
//# sourceMappingURL=CanvasContext.js.map