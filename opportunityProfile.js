if (typeof (Neudesic) == "undefined") {
    Neudesic = { __namespace: true };
}
Neudesic.OpportunityProfile = {

    OnFormLoad: function () {
		debugger;
		//alert(Xrm.Page.getAttribute("neu_date").getValue() + "\n" + new Date() + "\n" + new Date("2018-05-31"));
		var formType = Xrm.Page.ui.getFormType();
		if (formType == 1 /*Create*/) {
			Neudesic.OpportunityProfile.FillFromPreviousRecord()
		}
    },	

    FillFromPreviousRecord: function () {
		if (Xrm.Page.getAttribute("neu_opportunityid").getValue() != null) {
			var OpportunityId = Xrm.Page.getAttribute("neu_opportunityid").getValue()[0].id.toString().replace("{", "").replace("}", "");
			if (OpportunityId != null && OpportunityId != undefined && OpportunityId != "") {
				$.ajax({
					type: "GET",
					contentType: "application/json; charset=utf-8",
					datatype: "json",
					url: Xrm.Page.context.getClientUrl() + "/api/data/v8.2/neu_opportunityprofiles?$select=neu_date,neu_accesstobudget,neu_budget,neu_champion,neu_compellingevent,neu_competitorsposition,neu_corporatefit,neu_costofsale,neu_decisionprocess,neu_definitionofrequirements,neu_delivery,neu_financialbuyer,neu_needbusinessdrivers,neu_ongoingrevenue,neu_ourproofreferences,neu_oursolutionfit,neu_paybackroi,neu_presentrelationship,neu_salesresourcerequired,neu_solutionvision,neu_strategicpurchase,neu_technicalbuyer,neu_timescales,neu_timetodeliver,neu_userbuyerscoverage&$filter=_neu_opportunityid_value eq " + OpportunityId + "&$orderby=neu_date desc",
					beforeSend: function(XMLHttpRequest) {
						XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
						XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
						XMLHttpRequest.setRequestHeader("Accept", "application/json");
						XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=\"*\",odata.maxpagesize=1");
					},
					async: false,
					success: function(data, textStatus, xhr) {
						var results = data;
						for (var i = 0; i < results.value.length; i++) {
							Neudesic.OpportunityProfile.AssignValue("neu_accesstobudget",results.value[i]["neu_accesstobudget"]);
							Neudesic.OpportunityProfile.AssignValue("neu_budget",results.value[i]["neu_budget"]);
							Neudesic.OpportunityProfile.AssignValue("neu_champion",results.value[i]["neu_champion"]);
							Neudesic.OpportunityProfile.AssignValue("neu_compellingevent",results.value[i]["neu_compellingevent"]);
							Neudesic.OpportunityProfile.AssignValue("neu_competitorsposition",results.value[i]["neu_competitorsposition"]);
							Neudesic.OpportunityProfile.AssignValue("neu_corporatefit",results.value[i]["neu_corporatefit"]);
							Neudesic.OpportunityProfile.AssignValue("neu_costofsale",results.value[i]["neu_costofsale"]);
							Neudesic.OpportunityProfile.AssignValue("neu_decisionprocess",results.value[i]["neu_decisionprocess"]);
							Neudesic.OpportunityProfile.AssignValue("neu_definitionofrequirements",results.value[i]["neu_definitionofrequirements"]);
							Neudesic.OpportunityProfile.AssignValue("neu_delivery",results.value[i]["neu_delivery"]);
							Neudesic.OpportunityProfile.AssignValue("neu_financialbuyer",results.value[i]["neu_financialbuyer"]);
							Neudesic.OpportunityProfile.AssignValue("neu_needbusinessdrivers",results.value[i]["neu_needbusinessdrivers"]);
							Neudesic.OpportunityProfile.AssignValue("neu_ongoingrevenue",results.value[i]["neu_ongoingrevenue"]);
							Neudesic.OpportunityProfile.AssignValue("neu_ourproofreferences",results.value[i]["neu_ourproofreferences"]);
							Neudesic.OpportunityProfile.AssignValue("neu_oursolutionfit",results.value[i]["neu_oursolutionfit"]);
							Neudesic.OpportunityProfile.AssignValue("neu_paybackroi",results.value[i]["neu_paybackroi"]);
							Neudesic.OpportunityProfile.AssignValue("neu_presentrelationship",results.value[i]["neu_presentrelationship"]);
							Neudesic.OpportunityProfile.AssignValue("neu_salesresourcerequired",results.value[i]["neu_salesresourcerequired"]);
							Neudesic.OpportunityProfile.AssignValue("neu_solutionvision",results.value[i]["neu_solutionvision"]);
							Neudesic.OpportunityProfile.AssignValue("neu_strategicpurchase",results.value[i]["neu_strategicpurchase"]);
							Neudesic.OpportunityProfile.AssignValue("neu_technicalbuyer",results.value[i]["neu_technicalbuyer"]);
							Neudesic.OpportunityProfile.AssignValue("neu_timescales",results.value[i]["neu_timescales"]);
							Neudesic.OpportunityProfile.AssignValue("neu_timetodeliver",results.value[i]["neu_timetodeliver"]);
							Neudesic.OpportunityProfile.AssignValue("neu_userbuyerscoverage",results.value[i]["neu_userbuyerscoverage"]);
							//Neudesic.OpportunityProfile.AssignValue("neu_date",results.value[i]["neu_date"]);
							//Neudesic.OpportunityProfile.AssignValue("neu_date","2018-05-31");
							//Neudesic.OpportunityProfile.AssignValue("neu_date",new Date());
							Neudesic.OpportunityProfile.SetDefaultDateTimeValue("neu_date",0,0);
						}
					},
					error: function(xhr, textStatus, errorThrown) {
						Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
					}
				});
			}
		}
    },	

    AssignValue: function (attributeName, value) {
		Xrm.Page.getAttribute(attributeName).setValue(value);
		Xrm.Page.getAttribute(attributeName).setSubmitMode("always");
	},	

    OnDateChange: function (attributeName, value) {
		/*if (Xrm.Page.getAttribute("neu_date").getValue() == null) {
			Neudesic.OpportunityProfile.AssignValue("neu_date",new Date());
		}*/
	},
	
    SetDefaultDateTimeValue: function (attributeName, hour, minute) {
		// FORM_TYPE_CREATE = 1
		if (Xrm.Page.ui.getFormType() == 1)
		{
			var attribute = Xrm.Page.getAttribute(attributeName);

			if (attribute.getValue() == null)
			{
				attribute.setValue(new Date());
			}

			attribute.setValue(attribute.getValue().setHours(hour, minute, 0));
		}
	}
}
