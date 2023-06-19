// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
declare const firebase: any;
@ccclass
export default class End extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  private gamemgr = null;
  onLoad() {
    this.gamemgr = cc.find("GameMgr").getComponent("GameMgr");

    cc.find("Canvas/P1/P1Time").getComponent(cc.Label).string =
      cc.find("GameMgr").getComponent("GameMgr").P1Time === 999
        ? "-"
        : cc.find("GameMgr").getComponent("GameMgr").P1Time.toString();
    cc.find("Canvas/P2/P2Time").getComponent(cc.Label).string =
      cc.find("GameMgr").getComponent("GameMgr").P2Time === 999
        ? "-"
        : cc.find("GameMgr").getComponent("GameMgr").P2Time.toString();

    cc.find("Canvas/P1/P1Name").getComponent(cc.Label).string = cc
      .find("GameMgr")
      .getComponent("GameMgr").P1Name;

    cc.find("Canvas/P2/P2Name").getComponent(cc.Label).string = cc
      .find("GameMgr")
      .getComponent("GameMgr").P2Name;
  }

  start() {
    firebase
      .database()
      .ref("users/" + this.gamemgr.P1Uid)
      .on("value", (snapshot) => {
        firebase
          .database()
          .ref("users/" + this.gamemgr.P1Uid)
          .update({
            name: this.gamemgr.P1Name,
            bestTime: Math.min(this.gamemgr.P1Time, snapshot.val().bestTime),
          });
      });

    firebase
      .database()
      .ref("users/" + this.gamemgr.P2Uid)
      .on("value", (snapshot) => {
        firebase
          .database()
          .ref("users/" + this.gamemgr.P2Uid)
          .update({
            name: this.gamemgr.P2Name,
            bestTime: Math.min(this.gamemgr.P2Time, snapshot.val().bestTime),
          });
      });
  }

  Home() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("ModeSelect");
    }, 500);
  }
  // update (dt) {}
}
