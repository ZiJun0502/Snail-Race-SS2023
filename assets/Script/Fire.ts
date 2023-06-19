// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Fire extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.AudioClip)
  fireAudio: cc.AudioClip = null;
  // onLoad () {}

  start() {}
  onBeginContact(contact, self, other) {
    if (other.node.getComponent("Snail")) {
      //this.node.getComponent(cc.Animation).play();
      //this.fireParticle.resetSystem();
      other.node.getComponent("Snail").fire();
      cc.audioEngine.play(
        this.fireAudio,
        false,
        cc.find("GameMgr").getComponent("GameMgr").getVolume()
      );
    }
  }
  // update (dt) {}
}
