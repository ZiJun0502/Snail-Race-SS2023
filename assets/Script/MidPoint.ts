// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MidPoint extends cc.Component {
  @property(cc.Node)
  p1: cc.Node = null;
  @property(cc.Node)
  p2: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt) {
    this.node.setPosition(
      (this.p1.position.x + this.p2.position.x) / 2,
      (this.p1.position.y + this.p2.position.y) / 2
    );
  }
}
