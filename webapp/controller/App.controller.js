sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.App", {
        onInit: function() {
            console.log("App controller initialized");
            
            // Get the App control
            var oApp = this.byId("app");
            
            // Remove the initial loading page after router initializes
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRouteMatched(function() {
                // Remove the initial page if it exists
                var aPages = oApp.getPages();
                if (aPages.length > 1) {
                    oApp.removePage(aPages[0]);
                }
            });
        }
    });
});