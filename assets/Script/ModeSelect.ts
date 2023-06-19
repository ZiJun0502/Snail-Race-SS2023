// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
declare const firebase: any;
@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.preloadScene("Local2p");
    cc.director.preloadScene("MapEditor");
    cc.find("GameMgr").getComponent("GameMgr").playBGM1();
    let ref1 = firebase
      .database()
      .ref("users/" + cc.find("GameMgr").getComponent("GameMgr").P1Uid);

    firebase
      .database()
      .ref("users/" + cc.find("GameMgr").getComponent("GameMgr").P1Uid)
      .once("value")
      .then((snapshot) => {
        cc
          .find("Canvas/background/Player1/P1Name")
          .getComponent(cc.Label).string = snapshot.val().name;
        cc
          .find("Canvas/background/Player1/P1Time")
          .getComponent(cc.Label).string = snapshot.val().bestTime;
      });
    firebase
      .database()
      .ref("users/" + cc.find("GameMgr").getComponent("GameMgr").P2Uid)
      .once("value")
      .then((snapshot) => {
        cc
          .find("Canvas/background/Player2/P2Name")
          .getComponent(cc.Label).string = snapshot.val().name;
        cc
          .find("Canvas/background/Player2/P2Time")
          .getComponent(cc.Label).string = snapshot.val().bestTime;
      });
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
  start() {}

  // update (dt) {}
}
