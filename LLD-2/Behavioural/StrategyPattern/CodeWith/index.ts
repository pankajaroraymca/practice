import { NormalDrive } from "./Strategies/normal.strategy";
import { SportsDrive } from "./Strategies/sports.strategy";

import { Vehicle } from "./vehicle.class";

const sportsDrive = new SportsDrive()
const normalDrive = new NormalDrive()

const goodsVehicle = new Vehicle(normalDrive)
const sportsVehicle = new Vehicle(sportsDrive)
const premiumVehicle = new Vehicle(sportsDrive)

goodsVehicle.drive()
sportsVehicle.drive()
premiumVehicle.drive()

// Now we are dynamically passing the drive mode while initializing vehicle.
// This way code is never repeated for drive modes.

