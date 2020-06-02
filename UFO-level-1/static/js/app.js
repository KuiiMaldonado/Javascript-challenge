// from data.js
var tableData = data;

//Get reference to the table body
var tBody = d3.select("#ufo-table > tbody");

//Reference to filter table button
var filterButton = d3.select("#filter-btn");

//Reference to filter form
var filterForm = d3.select("#form");

//Function to loop through data and add it to html
function updateTable(sightings)
{
    sightings.forEach(element => {
        var row = tBody.append("tr");
        Object.entries(element).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

//Handler for filtering the table data
function filterTable(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var dateInput = d3.select("#datetime");
    dateInputValue = dateInput.property("value");
    if(dateInputValue != ""){
        results =  tableData.filter((element) => {
            return element.datetime == dateInputValue;
        });
        tBody.selectAll("tr").remove();
        updateTable(results);
    }
    else{
        tBody.selectAll("tr").remove();
        updateTable(tableData);
    }      
}

//To show the complete table when the page loads/refreshes.
updateTable(tableData);

//Listeners
filterButton.on("click", filterTable);
filterForm.on("submit", filterTable);