/// <reference path="typings/jquery/jquery.d.ts" />
window.onload = () => {

    var w: any = window;
    var ko: any = w.ko;

    var canvasObject = new CanvasContext();
    var elementsInitializer = new elementsWrapper(ko, canvasObject);
    canvasObject.setClickAction(elementsInitializer);

    $("#clearCanvas").on("click", canvasObject.clearContext.bind(canvasObject));
};