var icons = ["plus"];
var svg = d3.select("#scatter"),
  margin = { top: 20, right: 20, bottom: 20, left: 30 },
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  domainwidth = width - margin.left - margin.right,
  domainheight = height - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .domain([12, 60])
  .range([0, domainwidth]);
//var x = 12;
var y = d3.scaleLinear()
  .domain([12, 60])
  .range([domainheight, 0]);

// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.select("#icons")
  .selectAll("i").data(icons)
  .enter().append("i")
  .attr("class", function (d) {
    return "icon fa fa-2x fa-" + d;
  })
  .on("click",openQuickCreateForm);
var g = svg.append("g")
  .attr("transform", "translate(" + margin.top + "," + margin.top + ")");

g.append("rect")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("fill", "#F6F6F6");

g.append("text")
  .attr("x", [width - margin.left - margin.right])
  .attr("height", height - margin.top - margin.bottom)
  .attr("fill", "#F6F6F6");

g.append("text")
  .attr("x", width - 2 * (margin.right + margin.left))
  .attr("y", margin.top)
  .text("HOT");

g.append("text")
  .attr("x", margin.left)
  .attr("y", margin.top)
  .text("RISKY");

g.append("text")
  .attr("x", margin.left)
  .attr("y", height - 1.5 * (margin.bottom + margin.top))
  .text("QUALIFY OUT?");

g.append("text")
  .attr("x", width - 3 * (margin.right + margin.left))
  .attr("y", height - 1.5 * (margin.bottom + margin.top))
  .text("NEEDS WORK");

// g.append('text')
//   .attr('font-family', 'FontAwesome')
//   .attr('font-size', function(d) { return d.size+'em'} )
//   .attr("transform", "translate("+ (width/2-(3*margin.right)) +","+((height)-margin.top)+")")  // centre below axis

//   .text(function(d) { return '\uf118' }); 
g.append("text")
  .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  .attr("transform", "translate(" + (width / 2 - margin.right) + "," + ((height) - margin.top) + ")")  // centre below axis
  .text("RISK FACTORS");

// now add titles to the axes
g.append("text")
  .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  .attr("transform", "translate(" + -5 + "," + ((height / 2) - margin.top) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
  .text("OPPORTUNITY FACTORS");
var OpportunityId = parent.Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
//var OpportunityId = "BE0E0283-5BF2-E311-945F-6C3BE5A8DD64";
//d3.json("https://cdn.rawgit.com/agholap/temp/8700905f/data.json", function(error, data) {
var oDataUrl = parent.Xrm.Page.context.getClientUrl() + "/api/data/v8.2/neu_opportunityprofiles?$select=neu_date,neu_opportunityfactors,neu_riskfactors,neu_userbuyerscoverage&$filter=statuscode eq 1 and _neu_opportunityid_value eq " + OpportunityId
//var oDataUrl = "https://neuprojectdemo.crm.dynamics.com/api/data/v8.2/neu_opportunityprofiles?$select=neu_date,neu_opportunityfactors,neu_riskfactors,neu_userbuyerscoverage&$filter=_neu_opportunityid_value eq " + OpportunityId
d3.json(oDataUrl, function (error, data) {
  if (error) throw error;
  //append circle
  var gdots = g.selectAll("g.dot")
    .data(data.value)
    .enter().append("g");

  gdots.append("circle")
    .attr("class", "dot")
    .attr("r", 7)
    .attr("cx", function (d) { return x(d.neu_riskfactors); })
    .attr("cy", function (d) { return y(d.neu_opportunityfactors); })
    .on("mouseover", function (d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html( d.neu_date.substring(0, d.neu_date.indexOf("T")))
        .style("left", (d3.event.pageX) + "px")
        .style("background-color", "#FFFFE0")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) { 
      div.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .style("fill", function (d) {
      // if (d.value >= 3 && d.consequence <= 3) {return "#60B19C"} // Top Left
      //   else if (d.value >= 3 && d.consequence >= 3) {return "#8EC9DC"} // Top Right
      //    else if (d.value <= 3 && d.consequence >= 3) {return "#D06B47"} // Bottom Left
      //   else {
      return "#ffa500" //} //Bottom Right         
    });
  gdots.append("text")
    .attr("class", "textLabel")
    .text(function (d) { return d.neu_date.substring(0, d.neu_date.indexOf("T")); })
    .attr("x", function (d) { return x(d.neu_riskfactors); })
    .attr("y", function (d) { return y(d.neu_opportunityfactors) + 13; });



  //draw x axies
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y.range()[0] / 2 + ")")
    .call(d3.axisBottom(x).ticks(0));

  g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
    .call(d3.axisLeft(y).ticks(0));
});

function padExtent(e, p) {
  if (p === undefined) p = 1;
  return ([e[0] - p, e[1] + p]);
};

function openQuickCreateForm() {
  console.log('icon clicked');
  var OpportunityId = parent.Xrm.Page.data.entity.getId();
  var param = {};
  // param["neu_opportunityid"] =  {
  //   id:OpportunityId,
  //   entityType:"opportunity"
  // } ;
  //var OpportunityId = "BE0E0283-5BF2-E311-945F-6C3BE5A8DD64";
  var parentAccount = {
    entityType: "opportunity",
    id: OpportunityId
  };
  parent.Xrm.Utility.openQuickCreate("neu_opportunityprofile", parentAccount, param)
    .then(function (lookup) { successCallback(lookup); }, function (error) { errorCallback(error); });
}

// *** Function called on success.
function successCallback(lookup) {
//reloading chart  
  location.reload();
}

// **** Function called on error.
function errorCallback(e) {
  // *** No new contact created, which is an error we can ignore!
  alert("Error: " + e.errorCode + " " + e.message);
}