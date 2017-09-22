Number.prototype.positiveModulo = function(n) {
    return ((this % n) + n) % n;
}

var directionConst = {
    N: "NORTH",
    S: "SOUTH",
    E: "EAST",
    W: "WEST"
};

var Rover = /** @class */ function (dimension) {
    var _DIMENSION_ = dimension;

    function Rover({x, y}, direction) {
        this.coordinate = {
          "x": x,
          "y": y
        };

        this.direction = direction;
    }
    Rover.prototype.move = function (direction) {
        direction = direction ? direction.toUpperCase() : direction;

        if (direction == directionConst.E) {
            this.coordinate.x++;
        }
        else if (direction == directionConst.N) {
            this.coordinate.y++;
        }
        else if (direction == directionConst.S) {
            this.coordinate.y--;
        }
        else if (direction == directionConst.W) {
            this.coordinate.x--;
        }

        this.coordinate.x = this.coordinate.x.positiveModulo(_DIMENSION_.width);
        this.coordinate.y = this.coordinate.y.positiveModulo(_DIMENSION_.height);

        this.direction = direction;
    };

    return Rover;
};

module.exports = Rover;
