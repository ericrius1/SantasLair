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
    colorStart.setRGB(.45, .97, 1)
    colorEnd = new THREE.Color()
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 1000
      sizeEnd: 400
      position: new THREE.Vector3(0, FW.width * 0.7, 0)
      positionSpread: new THREE.Vector3(FW.width/8, 2000, FW.width/8)
      colorStart: colorStart
      colorEnd: colorEnd
      velocity: new THREE.Vector3(0, -100, 0)
      velocitySpread: new THREE.Vector3(100, 0, 100)
      acceleration: new THREE.Vector3(0, -0.00, 0)
      accelerationSpread: new THREE.Vector3(2, 0, 2)
      particlesPerSecond: 30
      opacityEnd: 0.6

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





