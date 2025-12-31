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
            
            // Create main model
            var oModel = new JSONModel({
                welcome: "IT Request Manager"
            });
            this.setModel(oModel);
            
            // Create requests model
            var oRequestsModel = new JSONModel({
                requests: [
                    {
                        id: "REQ-001",
                        category: "Hardware",
                        priority: "High",
                        status: "Open",
                        createdOn: "2024-01-15",
                        description: "Laptop not turning on"
                    },
                    {
                        id: "REQ-002",
                        category: "Software",
                        priority: "Medium",
                        status: "In Progress",
                        createdOn: "2024-01-14",
                        description: "Need Adobe Acrobat installed"
                    }
                ]
            });
            this.setModel(oRequestsModel, "requestsModel");
            
            // Initialize router
            this.getRouter().initialize();
        }
    });
});