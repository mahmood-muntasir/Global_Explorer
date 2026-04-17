function validateInput(days, budget) {

    // Regex to check numbers only
    let numberCheck = /^[0-9]+$/;

    if (!numberCheck.test(days) || !numberCheck.test(budget)) {
        return false;
    }

    if (days <= 0 || budget <= 0) {
        return false;
    }

    return true;
}

function generateBreakdown(days, budget) {

    let output = "";

    for (let i = 1; i <= days; i++) {

        let food = budget * 0.3;
        let stay = budget * 0.4;
        let transport = budget * 0.2;
        let activities = budget * 0.1;

        output += "<strong>Day " + i + "</strong><br>";
        output += "Accommodation: $" + stay.toFixed(2) + "<br>";
        output += "Food: $" + food.toFixed(2) + "<br>";
        output += "Transport: $" + transport.toFixed(2) + "<br>";
        output += "Activities: $" + activities.toFixed(2) + "<br><br>";
    }

    return output;
}

function planTrip() {

    // Get input values
    let days = document.getElementById("days").value;
    let budget = document.getElementById("budget").value;

    // Validate input
    if (!validateInput(days, budget)) {
        document.getElementById("result").innerHTML =
        "Please enter valid numbers greater than 0.";
        document.getElementById("breakdown").innerHTML = "";
        return;
    }

    // Convert to numbers
    days = parseInt(days);
    budget = parseInt(budget);

    // Calculate total cost
    let totalCost = days * budget;

    // Array for categories
    let messages = ["Budget trip", "Moderate trip", "Luxury trip"];
    let category = "";

    // Conditional logic
    if (totalCost < 1000) {
        category = messages[0];
    } else if (totalCost < 3000) {
        category = messages[1];
    } else {
        category = messages[2];
    }

    // Object to store trip data
    let trip = {
        days: days,
        budget: budget,
        total: totalCost,
        category: category
    };

    // Display results
    document.getElementById("result").innerHTML =
    "<strong>Total Cost: $" + trip.total + " (" + trip.category + ")</strong><br><br>";

    document.getElementById("breakdown").innerHTML =
    generateBreakdown(trip.days, trip.budget);
}