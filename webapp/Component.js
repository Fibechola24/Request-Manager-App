sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("ui5.requestmanagerapp.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);
            
            console.log("✅ App initialized");
            
            // Create sample data model
            var oModel = new JSONModel({
                welcome: "IT Request Manager",
                requests: [
                    { id: "REQ-001", title: "Laptop Issue", status: "Open" },
                    { id: "REQ-002", title: "Software Install", status: "In Progress" }
                ]
            });
            this.setModel(oModel);
            
            // Initialize router
            this.getRouter().initialize();
        }
    });
});