// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Firework extends cc.Component {
  @property(cc.AudioClip)
  fireworkAudio: cc.AudioClip = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.audioEngine.play(
      this.fireworkAudio,
      false,
      cc.find("GameMgr").getComponent("GameMgr").getVolume()
    );
  }

  start() {}

  // update (dt) {}
}
