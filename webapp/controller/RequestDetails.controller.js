sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.RequestDetails", {
        onInit: function() {
            console.log("RequestDetails controller initialized");
            
            // Create view model for edit mode
            var oViewModel = new JSONModel({
                editMode: false,
                originalData: null
            });
            this.getView().setModel(oViewModel, "viewModel");
            
            // Get router and attach route matched
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("details").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var sRequestId = oArgs.requestId;
            
            console.log("Loading details for request:", sRequestId);
            
            // Find the request in the model
            var oModel = this.getOwnerComponent().getModel("requestsModel");
            var aRequests = oModel.getProperty("/requests") || [];
            var oRequest = aRequests.find(function(req) {
                return req.id === sRequestId;
            });
            
            if (oRequest) {
                // Bind the request to the view
                this.getView().bindElement({
                    path: "requestsModel>/requests/" + aRequests.indexOf(oRequest),
                    model: "requestsModel"
                });
                
                // Store original data for cancel
                var oViewModel = this.getView().getModel("viewModel");
                oViewModel.setProperty("/originalData", JSON.parse(JSON.stringify(oRequest)));
            } else {
                MessageToast.show("Request not found");
                this.onNavBack();
            }
        },

        onNavBack: function() {
            this.getOwnerComponent().getRouter().navTo("myrequests");
        },

        onEdit: function() {
            var oViewModel = this.getView().getModel("viewModel");
            oViewModel.setProperty("/editMode", true);
        },

        onSave: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var oViewModel = this.getView().getModel("viewModel");
            var oRequest = this.getView().getBindingContext("requestsModel").getObject();
            
            // Simple validation
            if (!oRequest.category || !oRequest.priority || !oRequest.description) {
                MessageBox.warning(oBundle.getText("msgFillRequired"));
                return;
            }
            
            // Update the model (binding automatically updates)
            oViewModel.setProperty("/editMode", false);
            oViewModel.setProperty("/originalData", null);
            
            MessageToast.show(oBundle.getText("msgRequestUpdated"));
            
            // Optional: Force model update
            var oModel = this.getOwnerComponent().getModel("requestsModel");
            oModel.updateBindings();
        },

        onCancelEdit: function() {
            var oViewModel = this.getView().getModel("viewModel");
            var oOriginalData = oViewModel.getProperty("/originalData");
            
            if (oOriginalData) {
                // Restore original data
                var oRequestContext = this.getView().getBindingContext("requestsModel");
                var oModel = oRequestContext.getModel();
                var sPath = oRequestContext.getPath();
                
                oModel.setProperty(sPath, oOriginalData);
            }
            
            oViewModel.setProperty("/editMode", false);
            oViewModel.setProperty("/originalData", null);
        },

        onDelete: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var that = this;
            
            MessageBox.confirm(oBundle.getText("msgConfirmDelete"), {
                title: oBundle.getText("titleConfirm"),
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        that._deleteRequest();
                    }
                }
            });
        },

        _deleteRequest: function() {
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var oRequestContext = this.getView().getBindingContext("requestsModel");
            
            if (oRequestContext) {
                var oModel = oRequestContext.getModel();
                var aRequests = oModel.getProperty("/requests");
                var sPath = oRequestContext.getPath();
                var nIndex = parseInt(sPath.split("/").pop());
                
                // Remove from array
                aRequests.splice(nIndex, 1);
                oModel.setProperty("/requests", aRequests);
                
                MessageToast.show(oBundle.getText("msgRequestDeleted"));
                this.onNavBack();
            }
        },

        formatStatusState: function(sStatus) {
            if (sStatus === "Open") return "Warning";
            if (sStatus === "In Progress") return "Information";
            if (sStatus === "Closed") return "Success";
            return "None";
        },

        formatPriorityState: function(sPriority) {
            if (sPriority === "Critical") return "Error";
            if (sPriority === "High") return "Error";
            if (sPriority === "Medium") return "Warning";
            if (sPriority === "Low") return "Success";
            return "None";
        }
    });
});