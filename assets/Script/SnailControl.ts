// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SnailControl extends cc.Component {

    private s1;
    private s2;
    @property(cc.Node)
    snail1: cc.Node = null;
    @property(cc.Node)
    snail2: cc.Node = null;

    onLoad () {
        this.s1 = this.snail1.getComponent("Snail");
        this.s2 = this.snail2.getComponent("Snail");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.s2.leftDown = true;
                break;
            case cc.macro.KEY.right:
                this.s2.rightDown = true;
                break;
            case cc.macro.KEY.up:
                this.s2.upDown = true;
                break;
            case cc.macro.KEY.down:
                this.s2.downDown = true;
                break;
            case cc.macro.KEY.ctrl:
                this.s2.sqzDown = true;
                break;

            case cc.macro.KEY.a:
                this.s1.leftDown = true;
                break;
            case cc.macro.KEY.d:
                this.s1.rightDown = true;
                break;
            case cc.macro.KEY.w:
                this.s1.upDown = true;
                break;
            case cc.macro.KEY.s:
                this.s1.downDown = true;
                break;
            case cc.macro.KEY.shift:
                this.s1.sqzDown = true;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.s2.leftDown = false;
                break;
            case cc.macro.KEY.right:
                this.s2.rightDown = false;
                break;
            case cc.macro.KEY.up:
                this.s2.upDown = false;
                break;
            case cc.macro.KEY.down:
                this.s2.downDown = false;
                break;
            case cc.macro.KEY.ctrl:
                this.s2.sqzDown = false;
                this.s2.release();
                break;
            case cc.macro.KEY.a:
                this.s1.leftDown = false;
                break;
            case cc.macro.KEY.d:
                this.s1.rightDown = false;
                break;
            case cc.macro.KEY.w:
                this.s1.upDown = false;
                break;
            case cc.macro.KEY.s:
                this.s1.downDown = false;
                break;
            case cc.macro.KEY.shift:
                this.s1.sqzDown = false;
                this.s1.release();
        }
    }
}
