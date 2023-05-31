// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapMgr extends cc.Component {
  @property(cc.TiledMap)
  tileMap: cc.TiledMap = null;
  // LIFE-CYCLE CALLBACKS:
  private objectlayer = null;
  private objects;
  onLoad() {
    this.objectlayer = this.tileMap.getObjectGroup("objects");
    this.objects = this.objectlayer._objects;
    console.log(this.objects);
    cc.director.getPhysicsManager().debugDrawFlags = 1;
  }

  start() {}

  // update (dt) {}
}
