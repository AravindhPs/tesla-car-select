interface Option {
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
}

interface Color {
    code: string;
    description: string;
    price: number;
}

interface Config {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

interface Model {
    code: string;
    description: string;
    colors: Color[];
    option: Option;
}

interface State {
    'model': string,
    'color': string,
    'colorprice': number,
    'colorcode': string,
    'config': string,
    'code': string,
    'range': string,
    'maxSpeed': string,
    'cost': number,
    'tow': Tow,
    'yoke': Yoke,
    [key: string]: string | number | boolean | Tow | Yoke

}

interface Tow {
    'isTowAvailable': boolean;
    'isTowSelect': boolean,
    'towHitchCost': number,
    [key: string]: number | boolean
}

interface Yoke {
    'isYokeAvailable': boolean;
    'isYokeSelect': boolean,
    'toYokeCost': number,
    [key: string]: number | boolean
}

export { Model, Color, Config, Tow, Yoke, State, Option };
