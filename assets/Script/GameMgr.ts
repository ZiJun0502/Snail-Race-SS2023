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

  // some global data
  public Volume = 5;
  public mute = false;
  public P1Time: number = 0;
  public P2Time: number = 0;

  // some private data
  private SettingVolume = null;
  onLoad() {
    // enable physic
    let physic = cc.director.getPhysicsManager();
    physic.enabled = true;
    physic.gravity = cc.v2(0, 0);

    // debug
    cc.director.getPhysicsManager().debugDrawFlags = 1;
    // add this node to persist node
    cc.game.addPersistRootNode(this.node);
    this.SettingVolume = this.node
      .getChildByName("Setting")
      .getChildByName("Volume")
      .getComponent(cc.Label);
  }

  start() {}
  // Volume control
  IncreaseVolume() {
    if (this.Volume >= 10) return;
    this.Volume += 1;
  }
  DecreaseVolume() {
    if (this.Volume <= 0) return;
    this.Volume -= 1;
  }
  CheckMute() {
    if (
      this.node
        .getChildByName("Setting")
        .getChildByName("Mute")
        .getComponent(cc.Toggle).isChecked === false
    )
      this.mute = true;
    else this.mute = false;
  }
  UpdateVolumeNumber() {
    if (this.mute) {
      this.SettingVolume.string = "0";
      return;
    }
    this.SettingVolume.string = this.Volume.toString();
  }

  // time for players
  SetP1time(time: number) {
    this.P1Time = time;
  }
  SetP2time(time: number) {
    this.P2Time = time;
  }

  update(dt) {
    this.UpdateVolumeNumber();
  }
}
