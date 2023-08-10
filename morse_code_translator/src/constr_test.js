class Car {
    constructor(model,colour) {
        this.model = model;
        this.colour = colour;
    }

    show() {
        console.log(`${this.model} available in ${this.colour}`);
    }
}

exports.Car = Car;