interface Dimension {
  width: number;
  height: number;
}

enum directionConst {
  N = "north",
  S = "south",
  E = "east",
  W = "west"
};

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone(): Coordinate {
    return new Coordinate(this.x, this.y);
  }
}

export function Rover(dimension: Dimension) {

  var _DIMENSION_: Dimension = dimension;

  class Rover {
    coordinate: Coordinate;
    direction: directionConst;

    constructor(coordinate: Coordinate, direction: directionConst) {
      this.coordinate = coordinate;
      this.direction = direction;
    }

    public move(direction: directionConst) {
      var _coordinate: Coordinate = this.coordinate.clone();

      if (direction == directionConst.E) {
        this.coordinate.x++;
      } else if (direction == directionConst.N) {
        this.coordinate.y++;
      } else if (direction == directionConst.S) {
        this.coordinate.y--;
      } else if (direction == directionConst.W) {
        this.coordinate.x--;
      }

      // restore coordinates
      if (this.coordinate.x < 0 || this.coordinate.y < 0 || this.coordinate.x > _DIMENSION_.width || this.coordinate.y > _DIMENSION_.height) {
        this.coordinate = _coordinate;
      }

    }
  }


  return Rover;
}
