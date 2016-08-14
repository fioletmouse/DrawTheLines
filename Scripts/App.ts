/// <reference path="typings/jquery/jquery.d.ts" />
window.onload = () => {

    var w: any = window;
    var ko: any = w.ko;

    var canvasObject = new CanvasContext();
    var elementsInitializer = new elementsWrapper(ko);
    canvasObject.setClickAction(elementsInitializer);
};