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
    CanvasContext.prototype.setDefaultColor = function () {
        $("#cnv").css("background-color", "black");
    };
    CanvasContext.prototype.clearContext = function () {
        this.context.setTransform(1, 0, 0, 1, 0, 0); // default params
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setDefaultColor();
    };
    CanvasContext.prototype.setClickAction = function (handler) {
        this.canvas.onclick = handler.startEvent.bind(handler);
    };
    return CanvasContext;
}());
//# sourceMappingURL=CanvasContext.js.map