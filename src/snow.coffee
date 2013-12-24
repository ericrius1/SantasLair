FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 60
    );

    @snowGroup.addEmitter @generateSnow()
    FW.scene.add(@snowGroup.mesh)
    @snowGroup.mesh.renderDepth = -2

  generateSnow: ()->
    colorStart = new THREE.Color()
    colorStart.setRGB(1, 1, 1)
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 500
      sizeEnd: 250
      position: new THREE.Vector3(0, FW.width * 0.8, 0)
      positionSpread: new THREE.Vector3(FW.width * 0.9, 3000, FW.width * 0.9)
      colorStart: colorStart
      colorEnd: colorStart
      velocity: new THREE.Vector3(0, -100, 0)
      acceleration: new THREE.Vector3(0, -0.5, 0)
      accelerationSpread: new THREE.Vector3(1, .1, 1)
      particlesPerSecond: 50
      opacityEnd: 1

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





