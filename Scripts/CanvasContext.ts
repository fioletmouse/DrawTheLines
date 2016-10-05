class CanvasContext {
    canvas: any;
    context: any;

    constructor() {
        this.canvas = document.getElementById("cnv");
        this.context = this.canvas.getContext("2d");
        this.redraw();
    }

    redraw() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setDefaultColor();
    }

    setDefaultColor(color: string = "black") {
        $("#cnv").css("background-color", color);
    }

    clearContext() {
        this.context.setTransform(1, 0, 0, 1, 0, 0); // default params
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setDefaultColor();
    }

    setClickAction(handler: elementsWrapper) {
        this.canvas.onclick = handler.startEvent.bind(handler);
    }
}