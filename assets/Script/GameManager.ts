// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  public stopTimer = false;
  public stopGame = false;
  public time: number = 0;

  private timeLabel = null;
  onLoad() {
    this.timeLabel = this.node.getChildByName("Timer").getComponent(cc.Label);
  }

  start() {}

  WhoWin(player: string) {
    if (player == "Snail1") {
      if (this.time < cc.find("GameMgr").getComponent("GameMgr").P1Time) {
        cc.find("GameMgr")
          .getComponent("GameMgr")
          .SetP1time(this.time.toFixed().toString());
      }
    } else if (player == "Snail2") {
      if (this.time < cc.find("GameMgr").getComponent("GameMgr").P2Time) {
        cc.find("GameMgr")
          .getComponent("GameMgr")
          .SetP2time(this.time.toFixed().toString());
      }
    }
  }

  Finish() {
    cc.find("WinNode").getComponent("WinScene").Win();
    setTimeout(() => {
      cc.director.loadScene("TestEndScene");
    }, 500);
  }
  updateTime(dt) {
    if (this.stopGame) return;
    if (this.stopTimer) return;

    this.time += dt;

    this.timeLabel.string = this.time.toFixed().toString();
  }
  update(dt) {
    this.updateTime(dt);
  }
}
