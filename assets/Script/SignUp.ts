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
    cc.director.preloadScene("SignIn");
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
  SignUp() {
    if (
      this.P1Email.string != "" &&
      this.P1Password.string != "" &&
      this.P2Email.string != "" &&
      this.P2Password.string != ""
    ) {
      // P1 sign up
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.P1Email.string,
          this.P1Password.string
        )
        .then((user) => {
          cc.find("GameMgr").getComponent("GameMgr").P1Uid =
            firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .set({
              name: this.P1Name.string,
              bestTime: 999,
            });
        })
        .then(() => {
          cc.find("GameMgr").getComponent("GameMgr").P1Name =
            this.P1Name.string;
          firebase.auth().currentUser.updateProfile({
            displayName: this.P1Name.string,
          });
        })
        // P2 sign up
        .then(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.P2Email.string,
              this.P2Password.string
            )
            .then((user) => {
              cc.find("GameMgr").getComponent("GameMgr").P2Uid =
                firebase.auth().currentUser.uid;

              firebase
                .database()
                .ref("users/" + firebase.auth().currentUser.uid)
                .set({
                  name: this.P2Name.string,
                  bestTime: 999,
                });
            })
            .then(() => {
              cc.find("GameMgr").getComponent("GameMgr").P2Name =
                this.P2Name.string;
              firebase.auth().currentUser.updateProfile({
                displayName: this.P2Name.string,
              });
            })
            .then(() => {
              firebase.auth().signOut();

              cc.find("TransitionNode")
                .getComponent("SceneTransition")
                .Loading();
              setTimeout(() => {
                cc.director.loadScene("ModeSelect");
              }, 500);
            });
        });
    }
  }
  Back() {
    cc.find("TransitionNode").getComponent("SceneTransition").Loading();
    setTimeout(() => {
      cc.director.loadScene("SignIn");
    }, 500);
  }
  // update (dt) {}
}
