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
  @property(cc.Node)
  p1: cc.Node = null;
  @property(cc.Node)
  p2: cc.Node = null;

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
  private zooming = false;
  onLoad() {
    this.camera = this.node.getComponent(cc.Animation);
    this.animState = null;
    cc.find("Canvas").getComponent("GameManager").stopGame = true;
    setTimeout(() => {
      this.BeginAnim();
    }, 500);
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
    /* if (
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
    } */
    let p1BoundingBox = this.p1.getBoundingBoxToWorld();
    let p2BoundingBox = this.p2.getBoundingBoxToWorld();
    let totalBoundingBox = cc.rect();
    totalBoundingBox = p1BoundingBox.union(totalBoundingBox, p2BoundingBox);
    //console.log(totalBoundingBox);
    /* 
    let maxSideOfBox = Math.max(
      totalBoundingBox.width,
      totalBoundingBox.height
    );
    maxSideOfBox = clamp(maxSideOfBox, 200, 600);
    maxSideOfBox.toFixed();

    var curZoomRatio = -0.002 * maxSideOfBox + 2.3;
    this.node.getComponent(cc.Camera).zoomRatio = curZoomRatio; */

    let maxSideOfBox = Math.max(
      totalBoundingBox.width,
      totalBoundingBox.height
    );

    if (maxSideOfBox < 100) {
      this.zoomTo(1.8);
    } else if (maxSideOfBox >= 100 && maxSideOfBox < 150) {
      this.zoomTo(1.6);
    } else if (maxSideOfBox >= 150 && maxSideOfBox < 200) {
      this.zoomTo(1.4);
    } else if (maxSideOfBox >= 200 && maxSideOfBox < 250) {
      this.zoomTo(1.2);
    } else if (maxSideOfBox >= 250 && maxSideOfBox < 300) {
      this.zoomTo(1);
    } else if (maxSideOfBox >= 350 && maxSideOfBox < 400) {
      this.zoomTo(0.8);
    }
    this.node.position = targetPosition;
  }

  private zoomTo(z: number) {
    if (this.zooming == true) return;
    this.zooming = true;

    cc.tween(this.node.getComponent(cc.Camera))
      .to(1, { zoomRatio: z }, { easing: "quartInOut" })
      .call(() => {
        this.zooming = false;
      })
      .start();
  }
  /* private zoomOut() {
    if (this.animState !== null && this.animState.name == "zoomOut") return;
    this.animState = this.camera.play("zoomOut");

    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1;
      },
      this
    );
  } */
  private zoomOut() {
    cc.tween(this.node.getComponent(cc.Camera))
      .to(1, { zoomRatio: 1 }, { easing: "quartInOut" })
      .start();
  }
  /* private zoomIn() {
    if (this.animState !== null && this.animState.name == "zoomIn") return;
    this.animState = this.camera.play("zoomIn");
    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1.6;
      },
      this
    );
  } */
  private zoomIn() {
    cc.tween(this.node.getComponent(cc.Camera))
      .to(1, { zoomRatio: 1.6 }, { easing: "quartInOut" })
      .start();
  }
  Win() {
    this.camera.play("WinCamera");
    this.camera.on(
      "finished",
      () => {
        this.node.getComponent(cc.Camera).zoomRatio = 1;
        this.node.setPosition(cc.v2(1400, 500));
        cc.find("Canvas").getComponent("GameManager").Finish();
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

      cc.find("StartNode").getComponent("StartScene").StartScene();
    }, 15000);

    setTimeout(() => {
      cc.find("Canvas").getComponent("GameManager").stopGame = false;
    }, 21000);
  }
}

function clamp(x: number, a: number, b: number) {
  if (x < a) return a;
  if (x > b) return b;
  return x;
}
