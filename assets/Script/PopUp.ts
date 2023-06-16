// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Setting extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.active = false;
  }

  start() {}

  Show() {
    this.node.active = true;
    this.node.opacity = 0;
    this.node.scale = 0.2;
    cc.tween(this.node)
      .to(0.5, { scale: 3, opacity: 255 }, { easing: "quartInOut" })
      .start();
  }
  Hide() {
    cc.tween(this.node)
      .to(0.5, { scale: 0.2, opacity: 0 }, { easing: "quartInOut" })
      .call(() => {
        this.node.active = false;
      })
      .start();
  }
  // update (dt) {}
}
