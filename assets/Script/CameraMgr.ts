// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraTransposer extends cc.Component {
  @property(cc.Node)
  followTarget: cc.Node = null;
  @property(cc.Boolean)
  followX: boolean = true;
  @property(cc.Boolean)
  followY: boolean = true;
  @property(cc.Float)
  minX: number = 0;
  @property(cc.Float)
  minY: number = -120;
  @property(cc.Float)
  maxX: number = 400;
  @property(cc.Float)
  maxY: number = 120;
  // @property(cc.Float)
  offsetX: number = 0;
  // @property(cc.Float)
  offsetY: number = 0;

  // LIFE-CYCLE CALLBACKS:

  private camera;
  private animState;
  // check whether to follow the target node
  private follow = true;
  onLoad() {
    this.camera = this.node.getComponent(cc.Animation);
    this.animState = null;
    //this.BeginAnim();
  }

  start() {}

  update(dt) {
    if (this.follow == false) return;
    // Not using convertToWorldSpaceAR + convertToNodeSpaceAR because
    // they are inaccurate and causes camera jitter. :(
    let cameraLocalTransform = cc.mat4();
    this.node.getLocalMatrix(cameraLocalTransform);
    let targetWorldTransform = cc.mat4();
    this.followTarget.getWorldMatrix(targetWorldTransform);
    let targetWorldTranslation = cc.v3(0, 0, 0);
    targetWorldTransform.getTranslation(targetWorldTranslation);
    let transformed = cc
      .v4(
        targetWorldTranslation.x,
        targetWorldTranslation.y,
        targetWorldTranslation.z
      )
      .transformMat4(cameraLocalTransform);
    let targetPosition = cc
      .v2(transformed.x, transformed.y)
      .add(
        cc.v2(
          -cc.view.getDesignResolutionSize().width / 2,
          -cc.view.getDesignResolutionSize().height / 2
        )
      );
    targetPosition = cc.v2(
      clamp(
        this.followX ? targetPosition.x : this.node.position.x,
        this.minX,
        this.maxX
      ),
      clamp(
        this.followY ? targetPosition.y : this.node.position.y,
        this.minY,
        this.maxY
      )
    );
    // console.log(targetPosition.x, targetPosition.y);
    if (
      targetPosition.x <= this.maxX / 2 &&
      targetPosition.y >= this.maxY / 2
    ) {
      this.zoomOut();
    }
    if (
      targetPosition.x >= this.maxX / 2 &&
      targetPosition.y <= this.maxY / 2
    ) {
      this.zoomIn();
    }

    this.node.position = targetPosition;
  }
  private zoomOut() {
    if (this.animState !== null && this.animState.name == "zoomOut") return;
    this.animState = this.camera.play("zoomOut");

    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1;
      },
      this
    );
  }
  private zoomIn() {
    if (this.animState !== null && this.animState.name == "zoomIn") return;
    this.animState = this.camera.play("zoomIn");
    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1.6;
      },
      this
    );
  }
  Win() {
    this.camera.play("WinCamera");
    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1;
        this.node.setPosition(cc.v2(1400, 500));
        cc.find("Canvas/GameMgr").getComponent("GameMgr").WinScene();
      },
      this
    );
  }
  // tour the scene
  BeginAnim() {
    //this.camera.play("BeginCamera");
    var animation = cc.sequence(
      cc.moveBy(5, 0, 800),
      cc.moveBy(2, 250, 0),
      cc.moveBy(5, 0, -800),
      cc.moveBy(2, -250, 0)
    );
    this.follow = false;
    this.node.runAction(animation);
    setTimeout(() => {
      this.node.stopAction(animation);
      this.follow = true;
    }, 15000);
  }
}

function clamp(x: number, a: number, b: number) {
  if (x < a) return a;
  if (x > b) return b;
  return x;
}
