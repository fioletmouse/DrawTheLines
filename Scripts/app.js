/// <reference path="typings/jquery/jquery.d.ts" />
window.onload = function () {
    var w = window;
    var ko = w.ko;
    var canvasObject = new CanvasContext();
    var elementsInitializer = new elementsWrapper(ko);
    canvasObject.setClickAction(elementsInitializer);
};
//# sourceMappingURL=App.js.map