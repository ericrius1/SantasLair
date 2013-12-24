FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 70
    );
    @colorEnd = new THREE.Color()
    colorStart = new THREE.Color()
    colorStart.setRGB(1, 0, 0)
    @snowGroup.addEmitter @generateSnow(colorStart)
    colorStart.setRGB(0, 1, 0)
    @snowGroup.addEmitter @generateSnow(colorStart)
    FW.scene.add(@snowGroup.mesh)
    @snowGroup.mesh.renderDepth = -2

  generateSnow: (colorStart)->
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 800
      sizeEnd: 300
      position: new THREE.Vector3(0, FW.width * 0.7, 0)
      positionSpread: new THREE.Vector3(200, 2000, 200)
      colorStart: colorStart
      colorEnd: @colorEnd
      velocity: new THREE.Vector3(0, -100, 0)
      velocitySpread: new THREE.Vector3(100, 0, 100)
      acceleration: new THREE.Vector3(0, -0.00, 0)
      accelerationSpread: new THREE.Vector3(2, 0, 2)
      particlesPerSecond: 30
      opacityEnd: 0.6

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





