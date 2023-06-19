import WaypointGraph from "./Navigation/WaypointGraph";
// import { NavChaser } from "./strategies/NavChaser";

const {ccclass, property} = cc._decorator;
enum Status{
    WANDER,
    CHASE
}
@ccclass
export default class Rat extends cc.Component {
    private _moveDuration = 1.5;
    private _waitDuration = 0.75;
    private _waitRandomFactor = 0.2;
    private _nextWaitTime = 0;
    private _nextMoveTime = 0;
    private _wanderVelocity = 15;
    private _moveAxis2D = cc.Vec2.ZERO;

    private anim: cc.Animation = null;
    private status: Status = 0;
    @property(WaypointGraph)
    waypointGraph: WaypointGraph = null;
    @property(cc.Node)
    runTowards: cc.Node = null;

    // private _navChaser: NavChaser = null;
    // protected agentUpdate(dt: number): void {
    //     this._navChaser.update(dt);
    // }
    // @property(cc.Node)
    // runTowards: cc.Node = null;
    @property(cc.Node)
    p1: cc.Node = null;
    @property(cc.Node)
    p2: cc.Node = null;
    onLoad () {
        this.anim = this.getComponent(cc.Animation);
    }
    public get distanceFromTarget() {
        return this.runTowards.position.sub(this.node.position).mag()
    }
    start () {
        this._nextMoveTime = cc.director.getTotalTime() / 1000.0;
        this._nextWaitTime = this._nextMoveTime - this._waitDuration;
    }
    protected onTransitionFinish(): void {
        //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
        // TODO (4.2): Complete NavChaser's onTransitionFinish method.
        // [SPECIFICATIONS]
        // - NavChaser should move towards the waypoint on the waypoint graph 
        //   closest to this._runTowards.
        // - Assign your results to this._nextWaypoint.
        //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
       
        //#region [YOUR IMPLEMENTATION HERE]
        
        //#endregion
        // console.log(`NavChaser: Current: ${this.currentWaypoint.node.name}, Next: ${this.nextWaypoint.node.name}`);
    }
    update (dt) {
        let currentTime = cc.director.getTotalTime() / 1000.0;
        cc.log("current", currentTime);
        cc.log("nextWait", this._nextWaitTime);
        cc.log("nextMove", this._nextMoveTime);
        if(this.status == Status.WANDER){
            if(currentTime >= this._nextWaitTime){
                this._nextWaitTime = this._moveDuration + Math.random() * this._waitRandomFactor + this._nextMoveTime;
                this.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
            }
            if(currentTime >= this._nextMoveTime){
                this._nextMoveTime += this._waitDuration + this._moveDuration;
                this._moveAxis2D = randomPointOnUnitCircle();
                this.getComponent(cc.RigidBody).linearVelocity = this._moveAxis2D.mul(this._wanderVelocity);
                cc.log(this.getComponent(cc.RigidBody).linearVelocity.x, this.getComponent(cc.RigidBody).linearVelocity.y);
                this.playAnimation();
            }
        }else{

        }
    }
    playAnimation(){
        if(this._moveAxis2D.x > 0 && Math.abs(this._moveAxis2D.x) > Math.abs(this._moveAxis2D.y)){
            let state = this.anim.play("walkRight");
            this.node.scaleX = 1;
            state.repeatCount = 4;
        }else if(this._moveAxis2D.x < 0 && Math.abs(this._moveAxis2D.x) > Math.abs(this._moveAxis2D.y)){
            let state = this.anim.play("walkRight");
            this.node.scaleX = -1;
            state.repeatCount = 4;
        }else if(this._moveAxis2D.y > 0){
            this.node.scaleX = 1;
            let state = this.anim.play("walkTop");
            state.repeatCount = 4;
        }else{
            this.node.scaleX = 1;
            let state = this.anim.play("walkDown");
            state.repeatCount = 4;
        }

    }
}
function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}