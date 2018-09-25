namespace specialized_overloading {

    interface Document {
        createElement(tagName: "div"): HTMLDivElement; // specialized
        createElement(tagName: "span"): HTMLSpanElement; // specialized
        createElement(tagName: "canvas"): HTMLCanvasElement; // specialized
        createElement(tagName: string): HTMLElement; // non-specialized
    }

}
