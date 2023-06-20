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
  @property(cc.AudioClip)
  BGM1: cc.AudioClip = null;
  @property(cc.AudioClip)
  BGM2: cc.AudioClip = null;
  @property(cc.AudioClip)
  BGM3: cc.AudioClip = null;
  // some global data
  public Volume = 5;
  public mute = false;
  public P1Time: number = 999;
  public P2Time: number = 999;
  public P1Name: string = "";
  public P2Name: string = "";
  public P1Uid: string = "";
  public P2Uid: string = "";

  // some private data
  private SettingVolume = null;
  private currentBGM = null;
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

    this.playBGM1();
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
    /* if (
      this.node
        .getChildByName("Setting")
        .getChildByName("Mute")
        .getComponent(cc.Toggle).isChecked === false
    )
      this.mute = true;
    else this.mute = false; */
    if (this.mute === true) this.mute = false;
    else this.mute = true;
  }
  UpdateMuteCheck() {
    if (this.mute === true)
      this.node
        .getChildByName("Setting")
        .getChildByName("Mute")
        .getComponent(cc.Toggle).isChecked = false;
    else
      this.node
        .getChildByName("Setting")
        .getChildByName("Mute")
        .getComponent(cc.Toggle).isChecked = true;
  }
  /* UpdateVolumeNumber() {
    if (this.mute) {
      this.SettingVolume.string = "0";
      return;
    }
    this.SettingVolume.string = this.Volume.toString();
  } */
  UpdateVolumeNumber() {
    if (this.mute) {
      this.SettingVolume.string = "0";
      cc.audioEngine.setVolume(this.currentBGM, 0);
      return;
    }
    this.SettingVolume.string = this.Volume.toString();
    cc.audioEngine.setVolume(this.currentBGM, this.Volume);
  }
  getVolume() {
    if (this.mute) return 0;
    return this.Volume;
  }
  // bgm
  playBGM1() {
    cc.audioEngine.stopAll();
    this.currentBGM = cc.audioEngine.play(this.BGM1, true, this.getVolume());
  }
  playBGM2() {
    cc.audioEngine.stopAll();
    this.currentBGM = cc.audioEngine.play(this.BGM2, true, this.getVolume());
  }
  playBGM3() {
    cc.audioEngine.stopAll();
    this.currentBGM = cc.audioEngine.play(this.BGM3, true, this.getVolume());
  }
  stopBGM() {
    this.mute = true;
  }
  resumeBGM() {
    this.mute = false;
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
    this.UpdateMuteCheck();
  }
}
