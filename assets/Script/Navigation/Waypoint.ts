// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Waypoint extends cc.Component {

    @property(Waypoint)
    readonly adjacentWaypoints: Waypoint[] = [];
    readonly distances: number[] = [];
    /**
     * Returns the distance to a given waypoint.
     * @param otherWaypoint The waypoint to compute the distance to.
     * @returns The distance to that waypoint.
     */
    public distanceTo(otherWaypoint: Waypoint): number{
        return this.distanceToNode(otherWaypoint.node);
    }

    public distanceToNode(otherNode: cc.Node): number{
        // Computes the magnitude of the vector (a - b)
        // Where "a" is the other waypoint's position, and
        // "b" is this waypoint's position.
        return otherNode.convertToWorldSpaceAR(cc.Vec2.ZERO)
            .sub(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO))
            .mag();
    }

    public addEdgeTo(otherWaypoint: Waypoint): void{
        this.adjacentWaypoints.push(otherWaypoint);
        this.distances.push(this.distanceTo(otherWaypoint));
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (let neighbor of this.adjacentWaypoints) {
            this.distances.push(this.distanceTo(neighbor));
        }
    }

    start () {

    }

    // update (dt) {}
}
