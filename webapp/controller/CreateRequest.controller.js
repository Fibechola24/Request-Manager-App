sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.CreateRequest", {
        onInit: function() {
            console.log("CreateRequest controller initialized");
        },

        onNavBack: function() {
            this.getOwnerComponent().getRouter().navTo("dashboard");
        },

        onCancel: function() {
            this.getOwnerComponent().getRouter().navTo("dashboard");
        },

        onSubmit: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            
            // Simple validation
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

            MessageToast.show(oBundle.getText("msgRequestCreated"));
            this.getOwnerComponent().getRouter().navTo("dashboard");
        }
    });
});