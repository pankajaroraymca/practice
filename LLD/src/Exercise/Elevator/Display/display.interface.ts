export interface IDisplay {
    setFloor(floor: number): void
    setDirection(direction: EDisplayDirection): void
    getFloor(): number
    getDirection(): EDisplayDirection
    show(): void
}

export enum EDisplayDirection {
    UP = 'UP',
    DOWN = 'DOWN',
    NONE = 'NONE'
}