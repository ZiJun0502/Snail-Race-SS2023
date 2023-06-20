// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private idleFrame: cc.SpriteFrame = null;

    private anim: cc.Animation = null;

    private timer : number = 0;

    private isopen : boolean = false;

    private animateState = null;

    @property(cc.AudioClip)
    gateAudio: cc.AudioClip = null;

    public ResumeAction(){

    };

    start () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.getComponent(cc.Animation);
    }

    update(dt)
    {
        this.playerAnimation(dt);
    }

    playerAnimation(dt) {
        //console.log(this.timer, this.isopen);
        if (!this.isopen) {
            // Play close animation
            this.timer += dt;
    
            if (this.timer >= 3) {
                this.animateState = this.anim.play('gateopen');
                // cc.audioEngine.play(
                //     this.gateAudio,
                //     false,
                //     cc.find("GameMgr").getComponent("GameMgr").getVolume()
                // );
                if(this.timer >= 3.24)
                {
                    this.isopen = true;
                    this.timer = 0;
                    
                }
                
            }
        } else {
            
            this.timer += dt;

            if (this.timer >= 2.76) {
                this.animateState = this.anim.play('gateclose');
                cc.audioEngine.play(
                    this.gateAudio,
                    false,
                    cc.find("GameMgr").getComponent("GameMgr").getVolume()
                );
                this.isopen = false;
                this.timer = 0;
            }
        }
    }
    onBeginContact(contact, selfCollider, otherCollider){

    }
    onEndContact(contact, selfCollider, otherCollider){
        
    }
    onPreSolve(contact, selfCollider, otherCollider){
        if (this.isopen) contact.disabled = true;
    }
    onPostSolve(contact, selfCollider, otherCollider){
        
    }
}
