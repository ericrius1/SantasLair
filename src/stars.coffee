FW.Stars = class Stars
  rnd = FW.rnd
  constructor: ()->

 
    @starGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/whitestar.png'),
      blending: THREE.AdditiveBlending,
      maxAge: 20
    });

    @generateStars(new THREE.Color(0xff4d4d))
    @generateStars(new THREE.Color(0x3224e7))
    FW.scene.add(@starGroup.mesh)

  generateStars: (color) ->
    starEmitter = new ShaderParticleEmitter
      type: 'sphere'
      position: new THREE.Vector3(0, 3000, 0)
      radius: FW.width * 0.65
      colorStart: THREE.Color()
      colorEnd: new THREE.Color(0xff00ff)
      size: 3000
      particlesPerSecond: 500
      opacityStart: 0
      opacityMiddle: 0.3
      opacityEnd: 0
    
    @starGroup.addEmitter starEmitter
  

   
    
  tick: ->
    @starGroup.tick(0.16)
    


