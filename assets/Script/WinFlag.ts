// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinFlag extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  onBeginContact(contact, self, other) {
    cc.find("Canvas/CameraMgr").getComponent("CameraMgr").Win();
    this.node.getComponent(cc.PhysicsBoxCollider).enabled = false;
  }
  // update (dt) {}
}
