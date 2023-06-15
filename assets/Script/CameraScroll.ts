// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraScrool extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
  }

  start() {}
  private onMouseWheel(event) {
    const delta = event.getScrollY();

    const currentSize = this.node.getComponent(cc.Camera).zoomRatio;
    const newSize = currentSize + delta * 0.001;

    const clampedSize = clamp(newSize, 1, 10);

    this.node.getComponent(cc.Camera).zoomRatio = clampedSize;
  }
  // update (dt) {}
}
function clamp(x: number, a: number, b: number) {
  if (x < a) return a;
  if (x > b) return b;
  return x;
}
