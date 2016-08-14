var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(ko, title, name) {
        _super.call(this, title, name);
        this.ElementSettings = {};
        this.Init(ko);
    }
    Star.prototype.Init = function (ko) {
        this.ElementSettings = {
            lineUserLength: ko.observable(30),
            lineLength: ko.observable(0),
            linewidth: ko.observable(1),
            lineColor: ko.observable("#000000"),
            linesCount: ko.observable(6),
            step: 5,
            rotationAngle: ko.observable(0)
        };
    };
    Star.prototype.AddButton = function (container) {
        _super.prototype.AddContainer.call(this, container, 'SettingsTemplate');
    };
    Star.prototype.startDrawing = function (e) {
        alert("123");
        /*Settings.x = e.pageX - canvas.offsetLeft;
        Settings.y = e.pageY - canvas.offsetTop;

        this.changeLineLenghtToDots();

        this.Rotation(this.inRad(Settings.star.rotationAngle()));

        this.makeBaseLines(Settings.x, Settings.y, Settings.star.lineLength());
        this.makeJoinLines(Settings.x, Settings.y, Settings.star.linesCount(), Settings.star.lineLength());

        this.Rotation(-this.inRad(Settings.star.rotationAngle()));
        //console.log(Settings); */
    };
    return Star;
}(Shape));
//# sourceMappingURL=Star.js.map