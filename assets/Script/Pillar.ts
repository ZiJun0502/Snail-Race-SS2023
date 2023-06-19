// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.AudioClip })
    soundEffect: cc.AudioClip = null;

    private anim: cc.Animation = null;

    private moveSpeed: number = 100;

    public ResumeAction(){
        this.pillarMove(1);
    };

    start () {
        let delayTime = Math.random() * 6;
        this.pillarMove(delayTime);
    }

    // update (dt) {}
    pillarMove(delayTime: number)
    {
        let easeRate: number = 2;
    
        let moveAction: cc.ActionInterval;

        var nodeRotation = this.node.rotation;
        var nodeRotationRad = cc.misc.degreesToRadians(nodeRotation);
        var direction = cc.v2(Math.cos(nodeRotationRad),-Math.sin(nodeRotationRad));
        console.log(direction);

        
        moveAction = cc.sequence(
            cc.moveBy(3, direction.mul(100)).easing(cc.easeInOut(easeRate)),
            cc.moveBy(3, direction.mul(-100)).easing(cc.easeInOut(easeRate))
        ).repeatForever();
        

        this.scheduleOnce(() => {
            this.node.runAction(moveAction);
        }, delayTime);
    }


}
