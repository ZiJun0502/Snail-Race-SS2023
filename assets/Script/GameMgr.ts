// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let physic = cc.director.getPhysicsManager();

    physic.enabled = true;
    physic.gravity = cc.v2(0, 0);
  }

  start() {}

  // update (dt) {}
}
