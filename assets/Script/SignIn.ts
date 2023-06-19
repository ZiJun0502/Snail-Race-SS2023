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
  private P1Email;
  private P2Email;
  private P1Password;
  private P2Password;
  private P1Name;
  private P2Name;
  onLoad() {
    cc.director.preloadScene("ModeSelect");
    cc.director.preloadScene("SignUp");
  }

  start() {
    this.P1Email = cc
      .find("Canvas/background/P1Email")
      .getComponent(cc.EditBox);
    this.P2Email = cc
      .find("Canvas/background/P2Email")
      .getComponent(cc.EditBox);
    this.P1Password = cc
      .find("Canvas/background/P1Password")
      .getComponent(cc.EditBox);
    this.P2Password = cc
      .find("Canvas/background/P2Password")
      .getComponent(cc.EditBox);
    this.P1Name = cc.find("Canvas/background/P1Name").getComponent(cc.EditBox);
    this.P2Name = cc.find("Canvas/background/P2Name").getComponent(cc.EditBox);
  }
  SignIn() {
    if (this.P1Email.string === this.P2Email.string) {
      alert("Can not sign in with the same accounts !!!");
      return;
    }
    if (
      this.P1Email.string != "" &&
      this.P1Password.string != "" &&
      this.P2Email.string != "" &&
      this.P2Password.string != "" &&
      this.P1Email.string != this.P2Email.string
    ) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.P1Email.string, this.P1Password.string)
        .then(() => {
          cc.find("GameMgr").getComponent("GameMgr").P1Uid =
            firebase.auth().currentUser.uid;
          cc.find("GameMgr").getComponent("GameMgr").P1Name =
            firebase.auth().currentUser.displayName;
        })
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              this.P2Email.string,
              this.P2Password.string
            )
            .then(() => {
              cc.find("GameMgr").getComponent("GameMgr").P2Uid =
                firebase.auth().currentUser.uid;
              cc.find("GameMgr").getComponent("GameMgr").P2Name =
                firebase.auth().currentUser.displayName;
            })
            .then(() => {
              firebase.auth().signOut();
              cc.find("TransitionNode")
                .getComponent("SceneTransition")
                .Loading();
              setTimeout(() => {
                cc.director.loadScene("ModeSelect");
              }, 500);
            })
            .catch((err) => {
              alert("Player 2" + err.message);
            });
        })
        .catch((err) => {
          alert("Player 1" + err.message);
        });
    }
  }

  SignUp() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("SignUp");
    }, 500);
  }
  // update (dt) {}
}
