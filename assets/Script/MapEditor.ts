// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapEditor extends cc.Component {
  @property(cc.Node)
  objectMgr: cc.Node = null;
  @property(cc.Node)
  cameraMgr: cc.Node = null;

  private keyState = {
    esc: false,
  };
  private editing = false;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // enable key down, up event
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    this.node.getChildByName("ObjectLibrary").active = false;
    this.node.getChildByName("Cross").active = false;
  }
  private onKeyDown(event) {
    if (event.keyCode === cc.macro.KEY.escape && this.keyState.esc == false) {
      if (this.editing == true) {
        this.editing = false;
        this.cameraMgr.getComponent("CameraMgr").zoomIn();
        this.node.getChildByName("ObjectLibrary").active = false;
        this.node.getChildByName("Cross").active = false;
      } else {
        this.editing = true;
        this.cameraMgr.getComponent("CameraMgr").zoomOut();
        this.node.getChildByName("ObjectLibrary").active = true;
        this.node.getChildByName("Cross").active = true;
      }
      this.keyState.esc = true;
    }
  }
  private onKeyUp(event) {
    if (event.keyCode === cc.macro.KEY.escape && this.keyState.esc == true) {
      this.keyState.esc = false;
    }
  }

  placeobject1() {
    this.node
      .getComponent("ObjectPool")
      .createObj1(this.node.position.add(cc.v3(490, 340, 0)));
  }
  placeobject2() {
    this.node
      .getComponent("ObjectPool")
      .createObj2(this.node.position.add(cc.v3(490, 340, 0)));
  }
  placeobject3() {
    this.node
      .getComponent("ObjectPool")
      .createObj3(this.node.position.add(cc.v3(490, 340, 0)));
  }
  placeobject4() {
    this.node
      .getComponent("ObjectPool")
      .createObj4(this.node.position.add(cc.v3(490, 340, 0)));
  }

  start() {}

  update(dt) {
    this.cameraMgr.getComponent("CameraMgr").follow = !this.editing;
    this.node.setPosition(this.cameraMgr.position);
  }
}
