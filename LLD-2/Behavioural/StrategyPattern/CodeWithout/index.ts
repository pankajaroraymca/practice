import { GoodsVehicle } from "./goods.vehicle";
import { PremiumVehicle } from "./premium.vehicle";
import { SportsVehicle } from "./sports.vehicle";

const sportsCar = new SportsVehicle()
const goodsVehicle = new GoodsVehicle()
const premiumVehicle = new PremiumVehicle()

// Sports vehicle has a drive functionality of sportsly
sportsCar.drive()

// Good vehicle has a drive functionality of normally
goodsVehicle.drive()

// Premium vehicle has a drive functionality of sportsly
premiumVehicle.drive()

// Problem
// You can both sports vehicle and premium vehicle shares the same drive method.
// But we have overrride both drive methods of premium class and sports class
// The code is repeating.
// we will solve this problem by using Strategy pattern.

// What is Strategy Pattern?
// The Strategy Pattern is a behavioral design pattern that allows you to select an algorithm at runtime by encapsulating it in separate classes and making them interchangeable.

// When to use Strategy Pattern?
// 1) When child classes overriding the parent method and the code is same in child class
// 2) When you have multiple algorithm like different types of drive methods and you want to dynamically exchange them at runtime
// 3) This will follow Open Closed Principle as parent class will not be changed. If new drive method is introduced, then there will be new class.
