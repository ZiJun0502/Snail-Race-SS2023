// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Snail extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  private counter: number = 0;
  private phase: number = 0;
  private leftDown: boolean = false;
  private rightDown: boolean = false;
  private upDown: boolean = false;
  private downDown: boolean = false;
  private sqzDown: boolean = false;
  private targetRotation: number = 0;
  private rotationSpeed: number = 2;
  private moveDirection: number = 1;
  private rotateDirection: number = 0;
  private sqzLock: boolean = false;
  private moveRotateInertia: number = 1.4;
  private moving: boolean = false;
  private sqzSpeed: Array<number> = [100, 120, 140, 170];
  private curSpeed: number = 0;
  private moveLock: boolean = false;
  private stunDuration: number = 0.6;
  private anim: cc.Animation = null;

  @property(cc.ParticleSystem)
  hitWallParticle: cc.ParticleSystem = null;

  private friction = 130;
  @property(cc.SpriteFrame)
  idle: cc.SpriteFrame = null;
  @property([cc.SpriteFrame])
  sqz: cc.SpriteFrame[] = [];
  private sqzState: number = 0;
  private cycle: number = 0.15;

  onLoad() {
    // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    this.anim = this.getComponent(cc.Animation);
  }
  rotate() {
    const temp = this.targetRotation - 360;
    let clock, anti;
    if (this.targetRotation > this.node.angle) {
      clock = 360 - this.targetRotation + this.node.angle;
      anti = this.targetRotation - this.node.angle;
      if (clock > anti) {
        this.rotateDirection = 1;
      } else {
        this.rotateDirection = -1;
      }
    } else {
      clock = this.node.angle - this.targetRotation;
      anti = 360 - this.node.angle + this.targetRotation;
      if (clock > anti) {
        this.rotateDirection = 1;
      } else {
        this.rotateDirection = -1;
      }
    }
    // if(Math.min(clock, anti) > 90){
    //     this.rotationSpeed
    // }
    if (this.rotateDirection > 0) {
      if (this.moving)
        this.node.angle += this.rotationSpeed / this.moveRotateInertia;
      else this.node.angle += this.rotationSpeed;
      if (this.node.angle > 360) {
        this.node.angle -= 360;
      }
    } else {
      if (this.moving)
        this.node.angle -= this.rotationSpeed / this.moveRotateInertia;
      else this.node.angle -= this.rotationSpeed;
      if (this.node.angle < 0) {
        this.node.angle += 360;
      }
    }
    // Check if the image has reached the target angle
    // cc.log(this.node.angle);
    if (Math.abs(this.targetRotation - this.node.angle) < 3) {
      this.node.angle = this.targetRotation;
      cc.log("finish");
    }
  }
  release() {
    if (this.sqzState > 0) {
      this.curSpeed = this.sqzSpeed[this.sqzState - 1];
      // const speed = this.sqzSpeed[this.sqzState-1];
      this.anim.play("release");
      this.sqzState = 0;
      const radian = ((this.node.angle + 90) * Math.PI) / 180;
      this.node.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(
        this.curSpeed * Math.cos(radian),
        this.curSpeed * Math.sin(radian)
      );
      // cc.log(this.getComponent(cc.RigidBody).linearVelocity.x, this.getComponent(cc.RigidBody).linearVelocity.y);
    }
  }
  start() {}
  calTargetRotation() {
    let x = 0,
      y = 0;
    if (this.rightDown) x += 1;
    if (this.leftDown) x -= 1;
    if (this.upDown) y += 1;
    if (this.downDown) y -= 1;

    this.targetRotation = x * -90;
    if (y === 1) {
      this.targetRotation /= 2;
    } else if (y === -1) {
      if (x === 0) this.targetRotation = 180;
      else this.targetRotation *= 2;
    }
    if (this.targetRotation < 0) {
      this.targetRotation += 360;
    }
    if (x === 0 && y === 0) {
      this.targetRotation = this.node.angle;
    }
  }

  update(dt) {
    cc.log(this.moveLock);
    //friction and change direction during the release
    if (
      this.getComponent(cc.RigidBody).linearVelocity.x ||
      this.getComponent(cc.RigidBody).linearVelocity.y
    ) {
      const radian = ((this.node.angle + 90) * Math.PI) / 180;
      this.moving = true;
      let Vx = this.curSpeed * Math.cos(radian) * this.moveDirection,
        Vy = this.curSpeed * Math.sin(radian) * this.moveDirection;
      this.curSpeed -= this.friction * dt;
      if (this.curSpeed < 1) {
        this.curSpeed = 0;
      }
      // cc.log(Vx, Vy);
      this.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(Vx, Vy);
    } else {
      this.moving = false;
    }
    if (!this.moveLock) {
      //squeeze
      if (this.sqzDown && !this.isAnimationPlaying("release")) {
        this.counter += dt;
      }
      if (this.counter > this.cycle) {
        if (this.sqzState == 4) {
        } else {
          this.counter = 0;
          this.sqzState += 1;
          this.getComponent(cc.Sprite).spriteFrame = this.sqz[this.sqzState];
        }
      }
      //rotation
      this.calTargetRotation();
      // cc.log(this.targetRotation);
      if (this.targetRotation != this.node.angle) {
        this.rotate();
      }
    }
  }
  isAnimationPlaying(animationName: string): boolean {
    if (this.anim) {
      const animationState: cc.AnimationState | null =
        this.anim.getAnimationState(animationName);
      return animationState && animationState.isPlaying;
    }
    return false;
  }
  resetParticle() {
    this.hitWallParticle.resetSystem();
  }
  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.node.getComponent(cc.PhysicsCollider).tag === 1) {
      cc.log("hit!");
      this.moveLock = true;
      const radian = ((this.node.angle + 90) * Math.PI) / 180;
      this.curSpeed *= 0.7;
      let Vx = this.curSpeed * Math.cos(radian),
        Vy = this.curSpeed * Math.sin(radian);
      this.moveDirection = -1;
      this.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(-Vx, -Vy);
      this.scheduleOnce(function () {
        this.moveLock = false;
        this.moveDirection = 1;
      }, this.stunDuration);
      this.resetParticle();
      this.scheduleOnce(function () {
        this.hitWallParticle.stopSystem();
      }, 0.4);
    }
  }
}
