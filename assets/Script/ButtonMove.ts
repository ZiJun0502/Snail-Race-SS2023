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

  @property()
  dx: number = -500;

  onLoad() {
    setTimeout(() => {
      //var animation = cc.moveBy(1, this.dx, 0);
      cc.tween(this.node)
        .to(
          0.3,
          {
            position: cc.v3(
              this.node.position.x + this.dx,
              this.node.position.y,
              0
            ),
            opacity: 255,
          },
          { easing: "easeOutQuart" }
        )
        .start();

      //this.node.runAction(animation);
    }, 1000);
  }

  start() {}

  // update (dt) {}
}
