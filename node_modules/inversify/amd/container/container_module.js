define(["require", "exports", "../utils/guid"], function (require, exports, guid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContainerModule = (function () {
        function ContainerModule(registry) {
            this.guid = guid_1.guid();
            this.registry = registry;
        }
        return ContainerModule;
    }());
    exports.ContainerModule = ContainerModule;
});
