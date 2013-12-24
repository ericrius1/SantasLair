FW.Stars = class Stars
  rnd = FW.rnd
  constructor: ()->

 
    @starGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png'),
      blending: THREE.AdditiveBlending,
      maxAge: 100
    });

    @generateStars()
    FW.scene.add(@starGroup.mesh)

  generateStars: ->
    colorStart = new THREE.Color()
    colorStart.setRGB(.8, .1, .1)
    @starEmitter = new ShaderParticleEmitter
      type: 'sphere'
      radius: FW.width
      colorStart: colorStart
      colorEnd: colorStart
      speed: .1
      size: rnd(2000, 4000)
      sizeSpread: 400
      particlesPerSecond: 500
      opacityStart: 0
      opacityMiddle: 0.5
      opacityEnd: 0
    
    @starGroup.addEmitter @starEmitter
  

   
    
  tick: ->
    @starGroup.tick(0.16)
    


