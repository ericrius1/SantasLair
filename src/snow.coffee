FW.Snow = class Snow
  rnd = FW.rnd
  constructor: ()->
    @snowGroup = new ShaderParticleGroup(
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png')
      maxAge: 270
    );
    @colorEnd = new THREE.Color()
    colorStart = new THREE.Color()
    colorStart.setRGB(0.4, 0, 0)
    @snowGroup.addEmitter @generateSnow(colorStart)
    colorStart.setRGB(0, 0, 1)
    @snowGroup.addEmitter @generateSnow(colorStart)
    FW.scene.add(@snowGroup.mesh)
    @snowGroup.mesh.renderDepth = -2

  generateSnow: (colorStart)->
    snowEmitterSettings = new ShaderParticleEmitter 
      size: 700
      sizeEnd: 200
      sizeSpread: 200
      position: new THREE.Vector3(0, FW.width * 0.7, 0)
      positionSpread: new THREE.Vector3(200, 100, 200)
      colorStart: colorStart
      colorEnd: @colorEnd
      velocity: new THREE.Vector3(0, -11, 0)
      velocitySpread: new THREE.Vector3(33, 0, 33)
      acceleration: new THREE.Vector3(0, -.07, 0)
      accelerationSpread: new THREE.Vector3(0.1, 0, 0.1 )
      particlesPerSecond: 15
      opacityEnd: 0.7

  
  tick: ->
    @snowGroup.tick(FW.globalTick)





