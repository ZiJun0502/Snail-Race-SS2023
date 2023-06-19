// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObjectPool extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Node)
  ObjectMgr = null;
  @property(cc.Prefab)
  ObjectPrefab1 = null;
  @property(cc.Prefab)
  ObjectPrefab2 = null;
  @property(cc.Prefab)
  ObjectPrefab3 = null;
  @property(cc.Prefab)
  ObjectPrefab4 = null;

  @property(cc.Prefab)
  ObjectPrefab5 = null;
  @property(cc.Prefab)
  ObjectPrefab6 = null;
  @property()
  initialNumber: number = 10;

  private objectpool1;
  private objectpool2;
  private objectpool3;
  private objectpool4;
  private objectpool5;
  private objectpool6;
  onLoad() {
    this.objectpool1 = new cc.NodePool();
    this.objectpool2 = new cc.NodePool();
    this.objectpool3 = new cc.NodePool();
    this.objectpool4 = new cc.NodePool();
    this.objectpool5 = new cc.NodePool();
    this.objectpool6 = new cc.NodePool();
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab1);
      this.objectpool1.put(obj);
    }
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab2);
      this.objectpool2.put(obj);
    }
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab3);
      this.objectpool3.put(obj);
    }
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab4);
      this.objectpool4.put(obj);
    }
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab5);
      this.objectpool5.put(obj);
    }
    for (let i = 0; i < this.initialNumber; i++) {
      let obj = cc.instantiate(this.ObjectPrefab6);
      this.objectpool6.put(obj);
    }
  }
  createObj1(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool1.size() > 0) {
      obj = this.objectpool1.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab1);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  createObj2(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool2.size() > 0) {
      obj = this.objectpool2.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab2);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  createObj3(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool3.size() > 0) {
      obj = this.objectpool3.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab3);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  createObj4(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool4.size() > 0) {
      obj = this.objectpool4.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab4);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  createObj5(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool5.size() > 0) {
      obj = this.objectpool5.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab5);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  createObj6(pos: cc.Vec3) {
    let obj = null;
    if (this.objectpool6.size() > 0) {
      obj = this.objectpool6.get();
    } else {
      obj = cc.instantiate(this.ObjectPrefab6);
    }
    this.ObjectMgr.addChild(obj);
    obj.setPosition(pos);
    obj.addComponent("Draggable");
    return obj;
  }
  recovery1(node: cc.Node) {
    if (!node) return;
    this.objectpool1.put(node);
  }
  recovery2(node: cc.Node) {
    if (!node) return;
    this.objectpool2.put(node);
  }
  recovery3(node: cc.Node) {
    if (!node) return;
    this.objectpool3.put(node);
  }
  recovery4(node: cc.Node) {
    if (!node) return;
    this.objectpool4.put(node);
  }
  recovery5(node: cc.Node) {
    if (!node) return;
    this.objectpool5.put(node);
  }
  recovery6(node: cc.Node) {
    if (!node) return;
    this.objectpool6.put(node);
  }
  recovery(node: cc.Node) {
    if (!node) return;
    if (node.name === this.ObjectPrefab1.name) {
      this.recovery1(node);
    } else if (node.name === this.ObjectPrefab2.name) {
      this.recovery2(node);
    } else if (node.name === this.ObjectPrefab3.name) {
      this.recovery3(node);
    } else if (node.name === this.ObjectPrefab4.name) {
      this.recovery4(node);
    } else if (node.name === this.ObjectPrefab5.name) {
      this.recovery5(node);
    } else if (node.name === this.ObjectPrefab6.name) {
      this.recovery6(node);
    }
  }
  start() {}

  // update (dt) {}
}
