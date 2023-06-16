// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class End extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.find("Canvas/P1/P1Time").getComponent(cc.Label).string = cc
      .find("GameMgr")
      .getComponent("GameMgr")
      .P1Time.toString();
    cc.find("Canvas/P2/P2Time").getComponent(cc.Label).string = cc
      .find("GameMgr")
      .getComponent("GameMgr")
      .P2Time.toString();
  }

  start() {}

  Home() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("ModeSelect");
    }, 500);
  }
  // update (dt) {}
}
