sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.Dashboard", {
        onInit: function() {
            console.log("Dashboard controller initialized");
        },

        onNavigateToCreate: function() {
            MessageToast.show("Create Request navigation will be implemented in Phase 2");
        },

        onNavigateToMyRequests: function() {
            MessageToast.show("My Requests navigation will be implemented in Phase 3");
        }
    });
});