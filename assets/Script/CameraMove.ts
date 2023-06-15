// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraMove extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    this.keyState = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }
  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.i:
        this.keyState.up = true;
        break;
      case cc.macro.KEY.k:
        this.keyState.down = true;
        break;
      case cc.macro.KEY.j:
        this.keyState.left = true;
        break;
      case cc.macro.KEY.l:
        this.keyState.right = true;
        break;
    }
  }
  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.i:
        this.keyState.up = false;
        break;
      case cc.macro.KEY.k:
        this.keyState.down = false;
        break;
      case cc.macro.KEY.j:
        this.keyState.left = false;
        break;
      case cc.macro.KEY.l:
        this.keyState.right = false;
        break;
    }
  }
  start() {}

  update(dt) {
    if (
      this.keyState.up ||
      this.keyState.down ||
      this.keyState.left ||
      this.keyState.right
    )
      this.node.getComponent("CameraMgr").follow = false;
    else this.node.getComponent("CameraMgr").follow = true;
    if (this.keyState.up) {
      this.node.setPosition(
        this.node.position.x,
        this.node.position.y + 100 * dt,
        this.node.position.z
      );
      //this.node.position.y += 10 * dt;
    }
    if (this.keyState.down) {
      this.node.setPosition(
        this.node.position.x,
        this.node.position.y - 100 * dt,
        this.node.position.z
      );
      //this.node.position.y -= 10 * dt;
    }
    if (this.keyState.left) {
      this.node.setPosition(
        this.node.position.x - 100 * dt,
        this.node.position.y,
        this.node.position.z
      );
      //this.node.position.x -= 10 * dt;
    }
    if (this.keyState.right) {
      this.node.setPosition(
        this.node.position.x + 100 * dt,
        this.node.position.y,
        this.node.position.z
      );
      //this.node.position.x += 10 * dt;
    }
  }
}
