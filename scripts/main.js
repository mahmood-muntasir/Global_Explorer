/* 
Unit 7: External API Mashup
APIs used:
- REST Countries API
- Open-Meteo API
- ExchangeRate API

Purpose:
Provide real-time travel insights aligned with user personas.
*/
$(document).ready(function(){


    /* ===============================
       THEME (DARK MODE)
    =============================== */

    // Load saved theme automatically
    if(localStorage.getItem("theme") === "dark"){
        $("body").addClass("dark-mode");
    }

    // Toggle + save theme
    $("#themeToggle").click(function(){
        $("body").toggleClass("dark-mode");

        if($("body").hasClass("dark-mode")){
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Auto focus on search input
    $("#countryInput").focus();


    /* ===============================
       COUNTRY + WEATHER (API MASHUP)
    =============================== */

    let selectedCountry = "";

    $("#searchCountry").click(function(){

        let country = $("#countryInput").val().trim();

        if(!country){
            $("#countryResult").html("Please enter a country.");
            return;
        }

        $("#countryResult").html("Loading...");
        $("#searchCountry").prop("disabled", true);

        fetch("https://restcountries.com/v3.1/name/" + country)
            .then(res => res.json())
            .then(data => {

                let c = data[0];

                selectedCountry = c.currencies ? Object.keys(c.currencies)[0] : "USD";

                let name = c.name.common;
                let capital = c.capital ? c.capital[0] : "N/A";
                let lat = c.latlng[0];
                let lon = c.latlng[1];

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                    .then(res => res.json())
                    .then(weather => {

                        let temp = weather.current_weather ? weather.current_weather.temperature : "N/A";
                        let advice = temp > 25 
                            ? "Great weather for travel!"
                            : "Consider packing warm clothes.";

                        let output = `
                             <div class="card">
                                <h3>${name}</h3>
                                 <img src="${c.flags.png}" width="120">
                                 <p><strong>Capital:</strong> ${capital}</p>
                                <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
                                 <p><strong>Temperature:</strong> ${temp}°C</p>
                                 <p><strong>Travel Tip:</strong> ${advice}</p>

                             </div>
                        `;

                        $("#countryResult").hide().html(output).fadeIn(800);
                        $("#searchCountry").prop("disabled", false);

                    });

            })
            .catch(() => {
                $("#countryResult").html("<p style='color:red;'>Country not found. Try again.</p>");
                $("#searchCountry").prop("disabled", false);
            });

    });

    // Allow Enter key to trigger search
    $("#countryInput").keypress(function(e){
        if(e.which === 13){
            $("#searchCountry").click();
        }
    });


    /* ===============================
       CURRENCY CONVERTER
    =============================== */

    $("#convertCurrency").click(function(){

        let amount = $("#amount").val();

        if(!selectedCountry){
            $("#currencyResult").html("Search a country first.");
            return;
        }

        if(!amount){
            $("#currencyResult").html("Enter an amount.");
            return;
        }

        $("#currencyResult").html("Converting...");

        fetch("https://api.exchangerate-api.com/v4/latest/USD")
            .then(res => res.json())
            .then(data => {

                let rate = data.rates[selectedCountry];

                if(!rate){
                    $("#currencyResult").html("Currency not available.");
                    return;
                }

                let converted = (amount * rate).toFixed(2);

                $("#currencyResult").html(
                    `<p>${amount} USD = ${converted} ${selectedCountry}</p>`
                );

            });

    });


    /* ===============================
       UI ENHANCEMENTS (UNIT 6)
    =============================== */

    // Fade in content
    $("#content").hide().fadeIn(1000);

    // Toggle planner
    $("#togglePlanner").click(function(){
        $("#plannerSection").slideToggle();
    });

    // Highlight city
    $(".city").click(function(){
        $(".city").removeClass("selected");
        $(this).addClass("selected");
    });

    // Hover nav links
    $("#navigation a").hover(
        function(){ $(this).css("color", "red"); },
        function(){ $(this).css("color", ""); }
    );

    // Date picker (safe)
    if ($("#date").length) {
        $("#date").datepicker();
    }

    // Calculate trip
    $("#calculateBtn").click(function(){
        let btn = $(this);

        btn.text("Calculating...");

        if (typeof planTrip === "function") {
            planTrip();
        }

        $("#result, #breakdown").hide().slideDown(800);

        setTimeout(function(){
            btn.text("Calculate Trip");
        }, 1000);
    });

    // Form validation
    $("form").submit(function(event){
        let name = $("#name").val();
        let email = $("#email").val();

        if(name === "" || email === ""){
            alert("Please fill out all fields.");
            event.preventDefault();
        } else {
            alert("Message sent successfully!");
        }
    });

    // Toggle tip
    $("#toggleTips").click(function(){
        $("#tipSection").slideToggle();
    });

    // Image animation
    $(".clickable-image").click(function(){
        $(this).fadeOut(200).fadeIn(200);
    });

    $("#clearResults").click(function(){
    $("#countryResult").html("");
    $("#currencyResult").html("");
    $("#countryInput").val("");
    $("#amount").val("");
    });

});

