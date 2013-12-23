FW.Stars = class Stars
  rnd = FW.rnd
  constructor: ()->

    @colorStart = new THREE.Color()
    @colorStart.setRGB(1,1, 1)

    @starGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/white_star.png'),
      blending: THREE.AdditiveBlending,
      maxAge: 100
    });

    @colorEnd = new THREE.Color()
    @generateStars()
    FW.scene.add(@starGroup.mesh)

  generateStars: ->
    @starEmitter = new ShaderParticleEmitter
      type: 'sphere'
      radius: 5000
      speed: .1
      size: rnd(800, 1200)
      sizeSpread: 400
      particlesPerSecond: 500
      opacityStart: 0
      opacityMiddle: 1
      opacityEnd: 0
      colorStart: @colorStart
      colorEnd: @colorEnd
    
    @starGroup.addEmitter @starEmitter
  

   
    
  tick: ->
    @starGroup.tick(0.16)
    


