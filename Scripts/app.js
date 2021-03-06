/// <reference path="typings/jquery/jquery.d.ts" />
window.onload = function () {
    var w = window;
    var ko = w.ko;
    var canvasObject = new CanvasContext();
    var elementsInitializer = new elementsWrapper(ko, canvasObject);
    canvasObject.setClickAction(elementsInitializer);
    $("#clearCanvas").on("click", canvasObject.clearContext.bind(canvasObject));
    $("#saveImg").on("click", function () { canvasObject.saveCanvas.call(canvasObject, $("#fileName").first().val()); });
};
//# sourceMappingURL=App.js.map