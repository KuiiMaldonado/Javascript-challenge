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

//Function for filtering results depending on each input field
function applyFilter(results, id, field)
{
    var formInput = d3.select(id);
    formInputValue = formInput.property("value");
    console.log(`Filter value: ${formInputValue}`);
    if(formInputValue != ""){
        results =  results.filter((element) => {
            return element[field] == formInputValue;
        });
    }
    return results;
}

//Handler for filtering the table data
function filterTable(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    results = tableData;

    //Date filter
    results = applyFilter(results, "#dateFilter", "datetime");
    //City filter
    results = applyFilter(results, "#cityFilter", "city");
    //State filter
    results = applyFilter(results, "#stateFilter", "state");
    //Country filter
    results = applyFilter(results, "#countryFilter", "country");
    //Shape filter
    results = applyFilter(results, "#shapeFilter", "shape");

    tBody.selectAll("tr").remove();
    updateTable(results);     
}

//To show the complete table when the page loads/refreshes.
updateTable(tableData);

//Listener
filterButton.on("click", filterTable);