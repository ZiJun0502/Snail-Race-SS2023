// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Node })

    private init_pos: cc.Vec3 = null;

    private anim: cc.Animation = null;

    private animState: cc.AnimationState = null;

    @property(cc.AudioClip)
    fanAudio: cc.AudioClip = null;

    public ResumeAction(){
        this.blowMove(1);
    };

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
        let delayTime = 1;
        this.init_pos = this.node.position;
        this.blowMove(delayTime);
        this.playAnim();
    }

    playAnim() {
        if (this.anim)
            this.animState = this.anim.play();
    }

    blowMove(delayTime: number)
    {
        let easeRate: number = 2;
    
        let moveAction: cc.ActionInterval;

        
        moveAction = cc.sequence(
            cc.moveBy(2, cc.v2(50, 0)).easing(cc.easeInOut(easeRate)),
            cc.moveBy(2, cc.v2(-50, 0)).easing(cc.easeInOut(easeRate))
        ).repeatForever();
        

        this.scheduleOnce(() => {
            this.node.runAction(moveAction);
        }, delayTime);
    }


    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider)
    {
        var nodeRotation = this.node.rotation;
        var nodeRotationRad = cc.misc.degreesToRadians(nodeRotation);
        var direction = cc.v2(-Math.sin(nodeRotationRad),-Math.cos(nodeRotationRad));
        contact.disabled = true;
        setTimeout(() =>{
            otherCollider.node.getComponent("Snail").StartBlowing(direction);
            cc.audioEngine.play(
                this.fanAudio,
                false,
                cc.find("GameMgr").getComponent("GameMgr").getVolume()
            );
        }, 500);
        console.log("onbegin");
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider)
    {
        setTimeout(() =>{
            otherCollider.node.getComponent("Snail").StopBlowing();
        }, 500);
        console.log("onend");
    }
}
