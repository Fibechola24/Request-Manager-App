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
            this.getOwnerComponent().getRouter().navTo("create");
        },

        onNavigateToMyRequests: function() {
            MessageToast.show("My Requests will be implemented in Phase 3");
        }
    });
});