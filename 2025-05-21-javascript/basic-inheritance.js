class vehicle{
    turnedOn = false;

    constructor(brand, model, plate){
        this.brand = brand;
        this.model = model;
        this.plate = plate;
    }

    turnOn(){
        if(this.turnedOn){
            console.log("The vehicle is already turned on");
            return;
        }
        this.turnedOn = true;
        console.log("The vehicle is turned on");
    }
    turnOff(){
        if(!this.turnedOn){
            console.log("The vehicle is already turned off");
            return;
        }
        this.turnedOn = false;
        console.log("The vehicle is turned off");
    }
}

class car extends vehicle{
    constructor(brand, model, plate, seats){
        super(brand, model, plate);
        this.seats = seats;
        this.takenSeats = 0;
    }

    addPassenger(){
        if(this.takenSeats >= this.seats){
            console.log("No more seats available");
            return;
        }
        this.takenSeats++;
        console.log("Passenger added");
    }
    removePassenger(){
        if(this.takenSeats <= 0){
            console.log("No passengers to remove");
            return;
        }
        this.takenSeats--;
        console.log("Passenger removed");
    }


}

const pandino = new vehicle("Fiat", "Panda", "AB123CD");
const golf = new car("Volkswagen", "Golf", "EF456GH", 5);
pandino.turnOn();
pandino.turnOff();
golf.turnOn();
golf.addPassenger();
golf.addPassenger();
golf.addPassenger();
golf.removePassenger();
golf.removePassenger();