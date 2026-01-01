sap.ui.define([], function() {
    "use strict";

    var EmailService = {
        
        // Simulate sending email
        sendNotification: function(sRecipient, sSubject, sBody) {
            console.log("📧 Email Notification Sent:");
            console.log("To: " + sRecipient);
            console.log("Subject: " + sSubject);
            console.log("Body: " + sBody);
            
            // In a real app, this would call an email API
            // For simulation, we'll just log and return success
            
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve({
                        success: true,
                        messageId: "simulated-" + Date.now(),
                        timestamp: new Date().toISOString()
                    });
                }, 1000);
            });
        },
        
        // Notify when request is created
        notifyRequestCreated: function(oRequest, sRecipient) {
            var sSubject = "New IT Request Created: " + oRequest.id;
            var sBody = this._createRequestCreatedBody(oRequest);
            return this.sendNotification(sRecipient, sSubject, sBody);
        },
        
        // Notify when request status changes
        notifyStatusUpdate: function(oRequest, sOldStatus, sRecipient) {
            var sSubject = "Request Status Updated: " + oRequest.id;
            var sBody = this._createStatusUpdateBody(oRequest, sOldStatus);
            return this.sendNotification(sRecipient, sSubject, sBody);
        },
        
        // Notify when request is assigned
        notifyAssignment: function(oRequest, sAssignee, sRecipient) {
            var sSubject = "Request Assigned to You: " + oRequest.id;
            var sBody = this._createAssignmentBody(oRequest, sAssignee);
            return this.sendNotification(sRecipient, sSubject, sBody);
        },
        
        // Body templates
        _createRequestCreatedBody: function(oRequest) {
            return `New IT Service Request Created

Request ID: ${oRequest.id}
Category: ${oRequest.category}
Priority: ${oRequest.priority}
Status: ${oRequest.status}
Created On: ${oRequest.createdOn}

Description:
${oRequest.description}

Please check the IT Request Manager for updates.

This is an automated notification.`;
        },
        
        _createStatusUpdateBody: function(oRequest, sOldStatus) {
            return `IT Request Status Updated

Request ID: ${oRequest.id}
Old Status: ${sOldStatus}
New Status: ${oRequest.status}
Updated On: ${new Date().toLocaleDateString()}

Current Details:
Category: ${oRequest.category}
Priority: ${oRequest.priority}

Description:
${oRequest.description}

Please check the IT Request Manager for more details.

This is an automated notification.`;
        },
        
        _createAssignmentBody: function(oRequest, sAssignee) {
            return `New Request Assigned to You

Request ID: ${oRequest.id}
Assigned To: ${sAssignee}
Priority: ${oRequest.priority}
Status: ${oRequest.status}

Description:
${oRequest.description}

Action Required: Please review and update the status.

Please login to IT Request Manager to take action.

This is an automated notification.`;
        },
        
        // Get user email from preferences (simulated)
        getUserEmail: function() {
            // In real app, get from user profile
            return localStorage.getItem("userEmail") || "user@company.com";
        },
        
        // Set user email preference
        setUserEmail: function(sEmail) {
            localStorage.setItem("userEmail", sEmail);
            console.log("Email preference saved:", sEmail);
        },
        
        // Check if notifications are enabled
        isNotificationsEnabled: function() {
            return localStorage.getItem("emailNotifications") !== "false";
        },
        
        // Enable/disable notifications
        setNotificationsEnabled: function(bEnabled) {
            localStorage.setItem("emailNotifications", bEnabled);
            console.log("Email notifications:", bEnabled ? "enabled" : "disabled");
        }
    };

    return EmailService;
});