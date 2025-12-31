sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("ui5.requestmanagerapp.controller.MyRequests", {
      onInit: function () {
        console.log("MyRequests controller initialized");

        // Debug: Check if table and binding exist
        this._debugModel();
      },

      onNavBack: function () {
        this.getOwnerComponent().getRouter().navTo("dashboard");
      },

      onSearch: function (oEvent) {
        var sQuery = oEvent.getSource().getValue() || "";
        sQuery = sQuery.trim();
        console.log("Search query:", sQuery);

        var oTable = this.byId("requestsTable");
        if (!oTable) {
          console.error("Table not found with ID: requestsTable");
          MessageToast.show("Table not found");
          return;
        }

        var oBinding = oTable.getBinding("items");
        if (!oBinding) {
          console.error("Table binding not found");
          MessageToast.show("Table data not loaded");
          return;
        }

        if (!sQuery) {
          console.log("Clearing filters");
          oBinding.filter([]);
          return;
        }

        // Create filters for search
        var aFilters = [
          new Filter("id", FilterOperator.Contains, sQuery),
          new Filter("category", FilterOperator.Contains, sQuery),
          new Filter("status", FilterOperator.Contains, sQuery),
          new Filter("description", FilterOperator.Contains, sQuery),
          new Filter("priority", FilterOperator.Contains, sQuery),
        ];

        console.log("Applying filters for query:", sQuery);
        oBinding.filter(
          new Filter({
            filters: aFilters,
            and: false, // Use OR logic (search in any field)
          })
        );
      },

      // Debug function to check model state
      _debugModel: function () {
        var oComponent = this.getOwnerComponent();
        var oModel = oComponent.getModel("requestsModel");

        if (oModel) {
          var data = oModel.getData();
          console.log("Requests model data:", data);
          console.log(
            "Number of requests:",
            data.requests ? data.requests.length : 0
          );

          // Check if table exists
          var oTable = this.byId("requestsTable");
          console.log("Table found:", !!oTable);

          if (oTable) {
            var binding = oTable.getBinding("items");
            console.log("Table binding:", binding);
          }
        } else {
          console.warn("Requests model not found!");
        }
      },

      // Format function for status colors
      formatStatusState: function (sStatus) {
        if (sStatus === "Open") {
          return "Warning";
        } else if (sStatus === "In Progress") {
          return "Information";
        } else if (sStatus === "Closed") {
          return "Success";
        }
        return "None";
      },

      onSelectionChange: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");
        if (oSelectedItem) {
          var oContext = oSelectedItem.getBindingContext("requestsModel");
          var oRequest = oContext.getObject();

          // Navigate to details view
          this.getOwnerComponent().getRouter().navTo("details", {
            requestId: oRequest.id,
          });
        }
      },
      formatPriorityState: function (sPriority) {
        if (sPriority === "Critical") return "Error";
        if (sPriority === "High") return "Error";
        if (sPriority === "Medium") return "Warning";
        if (sPriority === "Low") return "Success";
        return "None";
      },

      formatPriorityIcon: function (sPriority) {
        if (sPriority === "Critical") return "sap-icon://alert";
        if (sPriority === "High") return "sap-icon://error";
        if (sPriority === "Medium") return "sap-icon://warning";
        if (sPriority === "Low") return "sap-icon://information";
        return "";
      },
      formatStatusState: function (sStatus) {
        if (sStatus === "Open") return "Warning";
        if (sStatus === "In Progress") return "Information";
        if (sStatus === "Closed") return "Success";
        return "None";
      },
    });
  }
);
