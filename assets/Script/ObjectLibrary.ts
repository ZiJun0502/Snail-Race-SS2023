// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObjectLibrary extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  show() {
    cc.tween(this.node)
      .to(
        1,
        { position: cc.v3(0, -200, 0), scale: 1 },
        { easing: "cubicInOut" }
      )
      .call(() => {
        this.node.setPosition(cc.v3(0, -200, 0));
        this.node.scale = 1;
      })
      .start();
  }
  hide() {
    cc.tween(this.node)
      .to(
        1,
        { position: cc.v3(0, -400, 0), scale: 0 },
        { easing: "cubicInOut" }
      )
      .call(() => {
        this.node.setPosition(cc.v3(0, -400, 0));
        this.node.scale = 0;
      })
      .start();
  }
  // update (dt) {}
}
