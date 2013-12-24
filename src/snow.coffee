FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 80
    );

    @snowGroup.addEmitter @generateSnow()
    FW.scene.add(@snowGroup.mesh)
    @snowGroup.mesh.renderDepth = -2

  generateSnow: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB(1, .5, 1)
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 500
      sizeEnd: 500
      position: new THREE.Vector3(0, 10000, 0)
      positionSpread: new THREE.Vector3(FW.height, 0, FW.width)
      colorStart: colorStart
      velocity: new THREE.Vector3(0, -100, 0)
      acceleration: new THREE.Vector3(0, -1, 0)
      accelerationSpread: new THREE.Vector3(2, .1, 2)
      particlesPerSecond: 100
      opacityEnd: 1

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





