sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.Dashboard", {
        onInit: function() {
            console.log("Dashboard controller initialized");
        },

        onNavigateToCreate: function() {
            this.getOwnerComponent().getRouter().navTo("create");
        },

        onNavigateToMyRequests: function() {
            this.getOwnerComponent().getRouter().navTo("myrequests");
        }
    });
});