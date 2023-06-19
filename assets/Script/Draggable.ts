// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Draggable extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private isDragging = false;
  private rotating = false;
  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseUp, this);
  }
  private prePos;

  private onMouseDown(event) {
    if (event.getButton() === cc.Event.EventMouse.BUTTON_RIGHT) {
      this.rotating = true;
      this.node.stopAllActions();
    } else if (event.getButton() === cc.Event.EventMouse.BUTTON_MIDDLE) {
      //this.node.destroy();

      cc.find("Canvas/MapEditor")
        .getComponent("ObjectPool")
        .recovery(this.node);
    } else {
      if (this.isDragging == true) return;
      this.isDragging = true;
      this.node.stopAllActions();
      // make the node large
      this.node.width *= 1.5;
      this.node.height *= 1.5;
      this.prePos = event.getLocation();
    }
  }

  private onMouseMove(event) {
    if (this.isDragging == false) return;
    this.node.stopAllActions();
    let cur = event.getLocation();

    let newPos = this.node.position.add(cur.sub(this.prePos));

    this.prePos = cur;
    this.node.setPosition(newPos);
  }

  private onMouseUp(event) {
    if (event.getButton() === cc.Event.EventMouse.BUTTON_RIGHT) {
      this.rotating = false;
      if(this.node.getComponent(this.node.name)){
        this.node.getComponent(this.node.name).ResumeAction();
      }
    }
    if (this.isDragging == false) return;
    this.isDragging = false;
    if(this.node.getComponent(this.node.name)){
      this.node.getComponent(this.node.name).ResumeAction();
    }
    // return to its original size
    this.node.width /= 1.5;
    this.node.height /= 1.5;
  }

  start() {}

  update(dt) {
    if (this.rotating == true) {
      this.node.rotation += 1;
    }
  }
}
