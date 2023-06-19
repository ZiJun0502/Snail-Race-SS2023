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
    cc.game.addPersistRootNode(this.node);
    this.node.opacity = 0;
    this.node.getChildByName("CountingNumber").getComponent(cc.Label).string =
      "";
  }

  start() {}

  StartScene() {
    var num: number = 3;
    //this.node.active = true;

    cc.tween(this.node)
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node
          .getChildByName("CountingNumber")
          .getComponent(cc.Label).string = "3";
      })
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node
          .getChildByName("CountingNumber")
          .getComponent(cc.Label).string = "2";
      })
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node
          .getChildByName("CountingNumber")
          .getComponent(cc.Label).string = "1";
      })
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node
          .getChildByName("CountingNumber")
          .getComponent(cc.Label).string = "Start!!";
      })
      .to(1, { opacity: 105 }, { easing: "cubicInOut" })
      .call(() => {
        this.node.opacity = 0;
        this.node
          .getChildByName("CountingNumber")
          .getComponent(cc.Label).string = "";
      })
      .start();
  }

  // update (dt) {}
}
