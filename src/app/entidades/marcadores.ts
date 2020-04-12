export class Marcadores {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;

    constructor(label?, lat?, lng?) {
        this.label = label ? label : '';
        this.lat = lat ? lat : 0;
        this.lng = lng ? lng : 0;
        this.draggable = false;
    }
}