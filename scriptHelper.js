// Write your helper functions here!
require('isomorphic-fetch');



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

  let missionTarget= document.getElementById("missionTarget");

  missionTarget.innerHTML= ` 
   
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `
}

  function validateInput(testInput) {
    let inputType= ""
  
   if (testInput=== "") {
     inputType= "Empty"
   }
     
  else if (isNaN(Number(testInput))) {
    inputType= "Not a Number"
    }
  else {
    inputType= "Is a Number"
  };
   
  return inputType;

};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
            let launchStatus= document.getElementById("launchStatus");
            let faultyItems= document.getElementById("faultyItems");
            let pilotStatus= document.getElementById("pilotStatus")
            let copilotStatus= document.getElementById("copilotStatus");
            let fuelStatus= document.getElementById("fuelStatus");
            let cargoStatus= document.getElementById("cargoStatus");
         
  if (validateInput(pilot)==="Empty" || validateInput(copilot)==="Empty" || validateInput(fuelLevel)=== "Empty" || validateInput(cargoMass) === "Empty") {
    window.alert("All fields are mandatory");
    Event.preventDefault();
  };

  if (validateInput(pilot)=== "Is a Number" || validateInput(copilot)=== "Is a Number") {
    window.alert("Please enter valid names for the pilot and copilot, exluding any numbers or symbols.")
    Event.preventDefault();
  };

  if (validateInput(fuelLevel)==="Not a Number" || validateInput(cargoMass)=== "Not a Number") {
    window.alert("Please enter valid amounts for fuel and cargo levels")
    Event.preventDefault();
  }
 pilotStatus.innerHTML= pilot;
 copilotStatus.innerHTML=copilot;

  if (Number(fuelLevel)< 10000) {
faultyItems.style.visibility= "visible";
fuelStatus.innerHTML= "Not Enough Fuel";
launchStatus.innerHTML= "Shuttle not ready for launch";
launchStatus.style.color= "red";
  };

  if (Number(cargoMass)>10000) {
faultyItems.style.visibility= "visible";
cargoStatus.innerHTML= "Too Much Cargo";
launchStatus.innerHTML= "Shuttle not ready for launch";
launchStatus.style.color= "#C7254E";
  }

  else {
    launchStatus.innerHTML= "Shuttle is ready for launch";
    launchStatus.style.color= "#419F6A";
  }
         
   
};


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
  });

    return planetsReturned;
};

function pickPlanet(planets) {
let missionPlanetIndex= Math.floor(Math.random()*planets.length);
let missionPlanet= planets[missionPlanetIndex];

return missionPlanet
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
