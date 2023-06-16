// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class StopScene extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.game.addPersistRootNode(this.node);
  }

  Stop() {
    /* cc.tween(this.node)
      .to(1, { position: cc.v3(480, 320, 0) }, { easing: "cubicInOut" })
      .call(() => {
        this.node.setPosition(cc.v3(480, 320, 0));
        cc.director.pause();
      })
      .start(); */
    cc.tween(this.node)
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node.opacity = 105;
        cc.director.pause();
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.Resume, this);
      })
      .start();
  }

  Resume() {
    /* cc.director.resume();
    cc.tween(this.node)
      .to(1, { position: cc.v3(-480, 320, 0) }, { easing: "cubicInOut" })
      .call(() => {
        this.node.setPosition(cc.v3(-480, 320));
      })
      .start(); */

    cc.director.resume();
    cc.tween(this.node)
      .to(1, { opacity: 0 }, { easing: "cubicInOut" })
      .call(() => {
        this.node.opacity = 0;
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.Resume, this);
      })
      .start();
  }

  start() {}

  // update (dt) {}
}
