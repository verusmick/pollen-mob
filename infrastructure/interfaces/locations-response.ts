export interface LocationsResponse {
    id:         string;
    name:       string;
    network:    Network;
    lon:        number;
    lat:        number;
    algorithms: AlgorithmElement[];
}

export interface AlgorithmElement {
    from:      string;
    to:        null | string;
    algorithm: AlgorithmEnum;
}

export enum AlgorithmEnum {
    PomoAI = "POMO-AI",
    V0317 = "V03_17",
    V0921 = "V09_21",
}

export enum Network {
    EPIN = "ePIN",
    EPINManu = "ePIN Manu",
    PollenScience = "PollenScience",
}
