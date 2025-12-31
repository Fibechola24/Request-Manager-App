sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
    "use strict";

    function _newId() {
        return "REQ-" + Date.now();
    }

    function _todayISO() {
        var d = new Date();
        var yyyy = d.getFullYear();
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var dd = String(d.getDate()).padStart(2, "0");
        return yyyy + "-" + mm + "-" + dd;
    }

    return Controller.extend("ui5.requestmanagerapp.controller.CreateRequest", {
        onInit: function() {
            console.log("CreateRequest controller initialized");
        },

        onNavBack: function() {
            this.getOwnerComponent().getRouter().navTo("dashboard");
        },

        onCancel: function() {
            this._resetForm();
            this.getOwnerComponent().getRouter().navTo("dashboard");
        },

        onSubmit: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            
            // Get form values
            var oCategory = this.byId("categorySelect");
            var oPriority = this.byId("prioritySelect");
            var oDesc = this.byId("descArea");
            
            if (!oCategory || !oPriority || !oDesc) {
                MessageBox.error("Form elements not found");
                return;
            }

            var sCategory = oCategory.getSelectedKey();
            var sPriority = oPriority.getSelectedKey();
            var sDesc = oDesc.getValue().trim();

            if (!sCategory || !sPriority || !sDesc) {
                MessageBox.warning(oBundle.getText("msgFillRequired"));
                return;
            }

            // Get the component
            var oComponent = this.getOwnerComponent();
            if (!oComponent) {
                MessageBox.error("Component not found");
                return;
            }

            // Get the requests model
            var oRequestsModel = oComponent.getModel("requestsModel");
            if (!oRequestsModel) {
                // Create the model if it doesn't exist
                oRequestsModel = new sap.ui.model.json.JSONModel({
                    requests: []
                });
                oComponent.setModel(oRequestsModel, "requestsModel");
            }

            // Get current requests
            var aRequests = oRequestsModel.getProperty("/requests") || [];

            // Add new request
            aRequests.unshift({
                id: _newId(),
                category: sCategory,
                priority: sPriority,
                description: sDesc,
                status: "Open",
                createdOn: _todayISO()
            });

            // Update model
            oRequestsModel.setProperty("/requests", aRequests);
            MessageToast.show(oBundle.getText("msgRequestCreated"));

            // Reset form and navigate back
            this._resetForm();
            this.getOwnerComponent().getRouter().navTo("dashboard");
        },

        _resetForm: function() {
            var oCategory = this.byId("categorySelect");
            var oPriority = this.byId("prioritySelect");
            var oDesc = this.byId("descArea");

            if (oCategory) oCategory.setSelectedKey("");
            if (oPriority) oPriority.setSelectedKey("");
            if (oDesc) oDesc.setValue("");
        }
    });
});