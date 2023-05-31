// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Controller from "./input/Controller";

const { ccclass, property } = cc._decorator;

enum FacingDirection{
    Right,
    Left
}

function sign(x: number) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

/**
 * A component that implements movement and actions for each actor.
 * It will read input from the first component it finds that has
 * implemented IInputControls.
 */
@ccclass
export default class ActorController extends Controller {
    @property({ type: cc.Enum(FacingDirection) })
    initialFacingDirection = FacingDirection.Right;

    private _animation: cc.Animation = null;
    private _animState: cc.AnimationState = null;
    private _rigidbody: cc.RigidBody = null;
    @property(cc.String)
    idleAnimationName: string = "";
    @property(cc.String)
    moveAnimationName: string = "";
    private _idleAnimState: cc.AnimationState = null;
    private _moveAnimState: cc.AnimationState = null;

    @property(cc.Float)
    moveSpeed = 10;
    public moveAxisX = 0;
    public moveAxisY = 0;
    public get moveAxis2D() {
        return new cc.Vec2(this.moveAxisX, this.moveAxisY);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._animation = this.node.getComponent(cc.Animation);
        if (!this._animation) console.warn(`ActorController: Component cc.Animation missing on node ${this.node.name}`);
        this._rigidbody = this.node.getComponent(cc.RigidBody);
        if (!this._rigidbody) console.warn(`ActorController: Component cc.Rigidbody missing on node ${this.node.name}`);
    }

    start() {
        super.start();
        this._idleAnimState = this._animation.getAnimationState(this.idleAnimationName);
        this._moveAnimState = this._animation.getAnimationState(this.moveAnimationName);
        this._animState = this._animation.play(this.idleAnimationName);

    }


    update(dt) {
        // Receive external input if available.
        if (this.inputSource) {
            this.moveAxisX = this.inputSource.horizontalAxis;
            this.moveAxisY = this.inputSource.verticalAxis;
        }

        this._rigidbody.linearVelocity = this.moveAxis2D.mul(this.moveSpeed * dt);
        if (!this._rigidbody.linearVelocity.fuzzyEquals(cc.Vec2.ZERO, 0.01)) {
            if (this._animState != this._moveAnimState) {
                this._animState = this._animation.play(this.moveAnimationName);
            }
            if (this.moveAxisX != 0) {
                this.node.setScale(new cc.Vec2(
                    // X
                    this.initialFacingDirection == FacingDirection.Right ?
                        sign(this.moveAxisX) :
                        -sign(this.moveAxisX)
                    ,
                    // Y
                    1
                    )
                );
                
            }

        }
        else {
            if (this._animState != this._idleAnimState) {
                this._animState = this._animation.play(this.idleAnimationName);
            }
            
        }
        this.node.position = this.node.position.add(this._rigidbody.linearVelocity);
        
    }

    



    
}
