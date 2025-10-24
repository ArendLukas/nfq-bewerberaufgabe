import type { Component } from "vue";

export interface DaytimeSlideshowTabData {
    id: string;
    iconComponent: Component; 
    ariaLabel: string; 
    labelId: string;
    imageUrl: string;
    timeString: string;
    description: string;
    energySavings: number;
    moneySavings: number;
}