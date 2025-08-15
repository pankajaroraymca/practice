import { Building } from "./Building/building.class";
import { ExternalButton } from "./Buttons/External/external-button.class";
import { InternalButton } from "./Buttons/Internal/internal-buttons.class";
import { ElevatorDispatcher } from "./Dispatchers/dispatcher.class";
import { AllFloorsElevatorDispatchStrategy } from "./Dispatchers/Strategy/all-floors.strategy";
import { FixedElevatorDispatchStrategy } from "./Dispatchers/Strategy/fixed.strategy";
import { EDisplayDirection } from "./Display/display.interface";
import { ElevatorCarController } from "./ElevatorCar/elevator-car-controller";
import { ElevatorCar } from "./ElevatorCar/elevator-car.class";
import { Floor } from "./floors/floor.class";


// INITIALIZATION
const building = new Building()

const floor0 = new Floor(0)
const floor1 = new Floor(1)
const floor2 = new Floor(2)
const floor3 = new Floor(3)
const floor4 = new Floor(4)

building.addFloors(floor0)
building.addFloors(floor1)
building.addFloors(floor2)
building.addFloors(floor3)
building.addFloors(floor4)

const elevatorCar1 = new ElevatorCar()
const elevatorCar2 = new ElevatorCar()
const elevatorCar3 = new ElevatorCar()

const fixedFloorStrategy1 = new FixedElevatorDispatchStrategy([0, 2, 4])
const fixedFloorStrategy2 = new FixedElevatorDispatchStrategy([1, 3])
const allFloorStrategy = new AllFloorsElevatorDispatchStrategy()

const elevatorCarController1 = new ElevatorCarController(elevatorCar1, fixedFloorStrategy1)
const elevatorCarController2 = new ElevatorCarController(elevatorCar2, fixedFloorStrategy2)
const elevatorCarController3 = new ElevatorCarController(elevatorCar3, allFloorStrategy)

const internalButtonForElevator1 = new InternalButton(elevatorCarController1)
const internalButtonForElevator2 = new InternalButton(elevatorCarController2)
const internalButtonForElevator3 = new InternalButton(elevatorCarController3)

const elevatorDispatcher1 = new ElevatorDispatcher()
const elevatorDispatcher2 = new ElevatorDispatcher()

elevatorDispatcher1.addElevatorController(elevatorCarController1)
elevatorDispatcher1.addElevatorController(elevatorCarController2)
elevatorDispatcher2.addElevatorController(elevatorCarController3)

const externalButton1Floor0 = new ExternalButton(elevatorDispatcher1)
const externalButton2Floor0 = new ExternalButton(elevatorDispatcher2)

const externalButton1Floor1 = new ExternalButton(elevatorDispatcher1)
const externalButton2Floor1 = new ExternalButton(elevatorDispatcher2)

const externalButton1Floor2 = new ExternalButton(elevatorDispatcher1)
const externalButton2Floor2 = new ExternalButton(elevatorDispatcher2)

const externalButton1Floor3 = new ExternalButton(elevatorDispatcher1)
const externalButton2Floor3 = new ExternalButton(elevatorDispatcher2)

const externalButton1Floor4 = new ExternalButton(elevatorDispatcher1)
const externalButton2Floor4 = new ExternalButton(elevatorDispatcher2)

floor0.addExternalButtons(externalButton1Floor0)
floor0.addExternalButtons(externalButton2Floor0)

floor1.addExternalButtons(externalButton1Floor1)
floor1.addExternalButtons(externalButton2Floor1)

floor2.addExternalButtons(externalButton1Floor2)
floor2.addExternalButtons(externalButton2Floor2)

floor3.addExternalButtons(externalButton1Floor3)
floor3.addExternalButtons(externalButton2Floor3)

floor4.addExternalButtons(externalButton1Floor4)
floor4.addExternalButtons(externalButton2Floor4)


// OPERATIONAL
floor0.pressButton(externalButton1Floor0.getId(), EDisplayDirection.UP)
floor2.pressButton(externalButton1Floor2.getId(), EDisplayDirection.DOWN)

internalButtonForElevator1.pressButton(0)
internalButtonForElevator2.pressButton(3)
internalButtonForElevator3.pressButton(2)