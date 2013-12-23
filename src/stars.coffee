FW.Stars = class Stars
  rnd = FW.rnd
  constructor: ()->

    @colorStart = new THREE.Color()
    @colorStart.setRGB(Math.random(),Math.random(),Math.random() )

    @starGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/star.png'),
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
      colorSpread: new THREE.Vector3(rnd(.1, .5), rnd(.1, .5), rnd(.1, .5))
    
    @starGroup.addEmitter @starEmitter
  

   
    
  tick: ->
    @starGroup.tick(0.16)
    


