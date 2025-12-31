sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.App", {
        onInit: function() {
            console.log("App controller loaded");
        },

        onTestPress: function() {
            MessageToast.show("Hello from IT Request Manager!");
        }
    });
});