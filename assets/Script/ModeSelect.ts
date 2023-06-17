// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.preloadScene("Local2p");
    cc.director.preloadScene("MapEditor");
  }
  Local2p() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    //setTimeout(() => {
    cc.director.loadScene("Local2p");
    //}, 500);
  }
  MapEditor() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    //setTimeout(() => {
    cc.director.loadScene("MapEditor");
    //}, 500);
  }
  LogOut() {
    cc.find("GameMgr").getComponent("GameMgr").P1Name = "";
    cc.find("GameMgr").getComponent("GameMgr").P2Name = "";
    cc.find("GameMgr").getComponent("GameMgr").P1Uid = "";
    cc.find("GameMgr").getComponent("GameMgr").P2Uid = "";
    cc.find("GameMgr").getComponent("GameMgr").P1Time = 999;
    cc.find("GameMgr").getComponent("GameMgr").P2Time = 999;
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("SignIn");
    }, 500);
  }
  start() {}

  // update (dt) {}
}
