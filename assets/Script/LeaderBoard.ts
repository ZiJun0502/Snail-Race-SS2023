// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
declare const firebase: any;
@ccclass
export default class LeaderBoard extends cc.Component {
  @property(cc.AudioClip)
  flipAudio: cc.AudioClip = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.game.addPersistRootNode(this.node);
    let ref = firebase.database().ref("users");

    ref
      .orderByChild("bestTime")
      .limitToFirst(4)
      .on("value", (snapshot) => {
        let i = 1;
        snapshot.forEach((el) => {
          console.log(el.child("name").val(), el.child("bestTime").val());
          this.node
            .getChildByName("#" + i.toString())
            .getChildByName("#" + i.toString() + "Name")
            .getComponent(cc.Label).string = el.child("name").val();

          this.node
            .getChildByName("#" + i.toString())
            .getChildByName("#" + i.toString() + "Time")
            .getComponent(cc.Label).string = el.child("bestTime").val();
          i++;
        });
      });
  }

  start() {}

  LeaderBoardShow() {
    cc.tween(this.node)
      .call(() => {
        cc.audioEngine.play(
          this.flipAudio,
          false,
          cc.find("GameMgr").getComponent("GameMgr").getVolume()
        );
      })
      .to(1, { position: cc.v3(480, 320, 0) }, { easing: "cubicInOut" })
      .call(() => {
        this.node.setPosition(cc.v3(480, 320, 0));
      })
      .start();
  }
  LeaderBoardHide() {
    cc.tween(this.node)
      .call(() => {
        cc.audioEngine.play(
          this.flipAudio,
          false,
          cc.find("GameMgr").getComponent("GameMgr").getVolume()
        );
      })
      .to(1, { position: cc.v3(1440, 320, 0) }, { easing: "cubicInOut" })
      .call(() => {
        this.node.setPosition(cc.v3(1440, 320, 0));
      })
      .start();
  }
  // update (dt) {}
}
