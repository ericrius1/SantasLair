FW.Stars = class Stars
  rnd = FW.rnd
  constructor: ()->

 
    @starGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
      blending: THREE.AdditiveBlending,
      maxAge: 40
    });

    @generateStars(new THREE.Color(0xff4d4d))
    @generateStars(new THREE.Color(0x3224e7))
    FW.scene.add(@starGroup.mesh)

  generateStars: (color) ->
    starEmitter = new ShaderParticleEmitter
      type: 'sphere'
      position: new THREE.Vector3(0, 3000, 0)
      radius: FW.width * 0.8
      colorStart: color
      colorEnd: color
      size: 1000
      sizeSpread: 1000
      particlesPerSecond: 500
      opacityStart: 0
      opacityMiddle: 1
      opacityEnd: 0
    
    @starGroup.addEmitter starEmitter
  

   
    
  tick: ->
    @starGroup.tick(0.16)
    


