localStorage.setItem("username", "Bella"); 
localStorage.setItem("password", "qwe123"); 
let enteredUsername;
// Delen med att lagra namn,lösen, samt en varibel som går att komma åt beroende på var man är i koden.
// Nedanför börjar hanteringen av formuläret när det skickas. Ett stort "block" sköter detta.
document.getElementById("uppgifter").addEventListener("submit", function(form) {
    form.preventDefault();

        enteredUsername = document.getElementById("userName").value;
        let enteredPassword = document.getElementById("passWord").value;
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

// Jämförelsen av skickade uppgifter och lagrade uppgifter börjar här. Meddelar anv vad som har gått fel.
    if (enteredUsername.trim() === "" || enteredPassword.trim() === "") {
        document.getElementById("felmeddelande").innerHTML = "<p>Fyll i alla fält.</p>";
        console.log ("Fyll i alla fält.");
    }else if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        console.log("Välkommen!");
        loggedIn(); //Går vidare till en stor funktion som sköter vad som händer hos en inloggad anv.
    } else {
        document.getElementById("userName").value = enteredUsername;
        document.getElementById("passWord").value = "";
        document.getElementById("felmeddelande").innerHTML = "<p>Kontrollera ditt användarnamn samt lösenord.</p>";
        console.log("Kontrollera ditt användarnamn samt lösenord.");
 //Har man kommit till else har man inte lyckats med något som är rätt egentligen :).       
    }
});
// Huvudfunktionen vad som ska göras vid hos en anv. som har lyckats med sin inloggning.
function loggedIn(){
    const visaHuvud = document.querySelector(".huvud"); // Första huvudfönstret
    const inLoggad = document.querySelector(".inloggad"); //Andra huvudfönstret
    localStorage.setItem("trueFalse", true); /* Denna sköter en viktig uppgift 
    om man är utloggad/inloggad vid stängning av sin webbläsare */
        if (enteredUsername) {
            localStorage.setItem("trueFalse", true);
            inLoggad.innerHTML = "<h2>Välkommen " + enteredUsername + " till Tidaholms Brukshundklubb medlemsportal. Du är nu inloggad.</h2><br>";
         } 
        else {
        inLoggad.innerHTML = "<h2>Välkommen till Tidaholms Brukshundklubb medlemsportal. Du är nu inloggad.</h2><br>";
        }
    //else är enbart om man inte man får med "anvnamn" så det inte står undefined.
        const logoutButton = document.createElement("input");
        logoutButton.type = "button";
        logoutButton.id = "utLoggad";
        logoutButton.value = "Logga ut";
        logoutButton.name = "Logga ut";
        visaHuvud.style.display = "none";
        inLoggad.style.display = "block";
        inLoggad.appendChild(logoutButton);
    //Skapar en utloggningsknapp till index.html när man är inloggad. Sätter vilket fönster som ska visas när man är inloggad.

    document.getElementById("utLoggad").addEventListener("click", function()
    {
        localStorage.setItem("trueFalse", false);
        visaHuvud.style.display = "block";
        inLoggad.style.display = "none";
        logoutButton.remove();
        location.reload();
        console.log("Du loggades ut.")
    });
 /* Koden ovanför hanterar utloggningen. Vilka fönster ska visas efter samt en "refresh". 
 Sätter värdet i "trueFalse" till false för första gången med eftersom man har gjort ett 
 medvetet val att logga ut.*/
}
// Nedanför är en funktion som kollar vid öppning av sidan igen om man är inloggad eller inte.
window.addEventListener("load", function () {
    const kontroll = localStorage.getItem("trueFalse");
    if (kontroll === "true") {
        enteredUsername = localStorage.getItem("username");
        loggedIn();
    }
    else {
        localStorage.setItem("trueFalse", false);
        visaHuvud.style.display = "block";
        inLoggad.style.display = "none";
        location.reload();
        console.log("Du loggades ut.")  
    }
});