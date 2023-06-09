// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  SignIn() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("SignIn");
    }, 500);
  }

  // update (dt) {}
}
