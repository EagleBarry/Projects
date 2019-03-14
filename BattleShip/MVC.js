let boardSize = 10;
    let ships = 3;
    let locations = [];
    let shots = 0;
    let hits=0;
    let newLocations = [];

    function Battleship() {
          this.size = 5
          this.hits = 0;
          this.location = [];
    }
    function Destroyer() {
        this.size= 4;
        this.hits = 0;
        this.location = [];
    }
    var battleShip = new Battleship();
    var _1stDestroyer = new Destroyer();
    var _2ndDestroyer = new Destroyer();

    function guessLocation(){
        var coordinates = document.getElementById("coord").value.toUpperCase();
        
        if(coordinates == "SHOW"){
            for (let i = 0; i < newLocations.length; i++) {
                var toBeShown = document.getElementById(newLocations[i] + " ship");
                toBeShown.innerHTML = "O";
            }
        }

        var message = document.getElementById("textLocation");
        var letter = coordinates.charAt(0);
        var number;
        number = parseInt(coordinates.charAt(1));
        if(!Number.isInteger(number) || letter > "J"){
            message.innerHTML = "*** Error ***";
            return;
        }
        if(coordinates.length == 2){
            number = coordinates.charAt(1);
        }
        else{
            if(coordinates.charAt(2) >= 'A' || coordinates.charAt(2) > 0){
            message.innerHTML = "*** Error ***";
            return;
            }
            else{
            number = coordinates.charAt(1) + coordinates.charAt(2);
            }
        }
        var letterToNumber = parseInt(letter,36)-10;
        let guess = letterToNumber+""+(number-1);
        var element = document.getElementById(letterToNumber+""+(number-1));
        if (element != null){
            message.innerHTML = "*** Miss ***";
            element.innerText='_';
            shots++;
        }
        else{
            message.innerHTML = "*** Hit ***";
            var hit =document.getElementById(letterToNumber+""+(number-1) + " ship");
            if (hit == null){
                message.innerHTML = "You've already fired there!";
                return;
            }
            hit.innerText = "X";
            hits++;
            shots++;
            if(battleShip.location.includes(guess)){
                battleShip.location.splice(battleShip.location.indexOf(guess),1);
                battleShip.hits++;
                if (battleShip.hits == battleShip.size) {
                    message.innerHTML = "*** Sunk ***";
                }
            }
            else if(_1stDestroyer.location.includes(guess)){
                _1stDestroyer.location.splice(_1stDestroyer.location.indexOf(guess),1);
                _1stDestroyer.hits++;
                if (_1stDestroyer.hits == _1stDestroyer.size) {
                    message.innerHTML = "*** Sunk ***";
                }
            }
            else if(_2ndDestroyer.location.includes(guess)){
                _2ndDestroyer.location.splice(_2ndDestroyer.location.indexOf(guess),1);
                _2ndDestroyer.hits++;
                if(_2ndDestroyer.hits == _2ndDestroyer.size){
                    message.innerHTML = "*** Sunk ***"
                }
            }
            hit.id = element;
        }           
        if(hits == 13){
            var end = document.getElementById("endGame");
            end.innerHTML = "Well done! You completed the game in " + shots + " shots";
        }
      }
    function shipSpawn(){              
        shipLocation(battleShip.size);
        shipLocation(_1stDestroyer.size);
        shipLocation(_2ndDestroyer.size);
        for (let i = 0; i < locations.length; i++) {
            newLocations[i] = locations[i];            
        }
        for (let i = 0; i < 3; i++) {
        if (battleShip.location.length != 5) {
            for (let i = 0; i < 5; i++) {
                battleShip.location.push(locations[i]);
            }
                locations.splice(0,5);
            }
            else if(_1stDestroyer.location.length != 4){
                for (let i = 0; i < _1stDestroyer.size; i++) {
                    _1stDestroyer.location.push(locations[i]);                    
                }
                locations.splice(0,4);
            }
            else{
                for (let i = 0; i < _2ndDestroyer.size; i++) {
                    _2ndDestroyer.location.push(locations[i]);                        
                }
                locations.splice(0,4);
            }                  
        }
    }
    function shipLocation(size){
        var direction = Math.floor(Math.random() * 2);
        var added = 0;
        
        if (direction === 1) {
            let row = Math.floor(Math.random() * boardSize);
		    let col = Math.floor(Math.random() * (boardSize - size + 1));
            let end = col+size;
            while (col < end) {
                var futureLocation = row + "" + col;
                if (!locations.includes(futureLocation)){
                    locations.push(futureLocation);
                    var nextElements = document.getElementById(futureLocation);
                    nextElements.id = futureLocation +" ship";
                }
                else{
                    while (added > 0) {
                        var number = locations.pop();
                        var fixElement = document.getElementById(number + " ship")
                        fixElement.id = number;
                        added--;
                    }
                    shipLocation(size);
                    break;
                }
                col++;
                added++;
            }
        }
        else{
            let row = Math.floor(Math.random() * (boardSize - size + 1));
		    let col = Math.floor(Math.random() * boardSize);
            
            let end = row+size;
            while (row < end) {
                var futureLocation = row + "" + col;
                if (!locations.includes(futureLocation)){
                    locations.push(futureLocation);
                    var nextElements = document.getElementById(futureLocation);
                    nextElements.id = futureLocation +" ship";
                }
                else{
                    if (added == 0) {
                        shipLocation(size);
                    }
                    else{                            
                        while (added > 0) {
                            var number = locations.pop();
                            var fixElement = document.getElementById(number + " ship")
                            fixElement.id = number;
                            added--;
                        }
                    }
                    shipLocation(size);
                    break;
                }
                row++;
                added++;
            }
        }
      }
document.onload = shipSpawn();