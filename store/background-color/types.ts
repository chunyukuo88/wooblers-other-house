export enum ColorActionType {
    SET_RED = 'SET_RED',
    SET_BLUE = 'SET_BLUE',
    SET_GREEN = 'SET_GREEN',
    RESET = 'RESET',
}

export interface ColorState {
    red: number;
    green: number;
    blue: number;
    sum: number;
}

export interface ColorAction {
    type: ColorActionType;
    payload?: number;
}