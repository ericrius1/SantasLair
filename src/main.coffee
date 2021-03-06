
window.map = (value, min1, max1, min2, max2) ->
  min2 + (max2 - min2) * ((value - min1) / (max1 - min1))

window.uniforms1 = {
  time: {
    type: "f",
    value: 1.0
  },
  resolution: {
    type: "v2",
    value: new THREE.Vector2()
  }
};
window.FW = {}
SC?.initialize({
    client_id: "7da24ca214bf72b66ed2494117d05480",
});

#JSON.parse(decodeURI((location.search).substring(1, location.search.length - 1)))
FW.sfxVolume = 0.2
FW.globalTick = 0.16
FW.development = true
window.soundOn = !FW.development

#make user let go when they want to explode firework
#flocking birds
#sunrise sunset
window.onload = ->
  FW.myWorld = new FW.World()
  FW.myWorld.animate()
  FW.main = new FW.Main()
  infoEl = document.getElementsByClassName('infoWrapper')[0]
  infoShowing = false
  document.onclick = (event)-> 
    el = event.target;
    if (el.className is "icon") 
      infoEl.style.display = if infoShowing then 'none' else 'block'
      infoShowing = !infoShowing;

  dougShit = document.createElement 'canvas' 
  document.body.appendChild dougShit
  #create the object3d for this element
    
        
      


FW.Main = class Main
  constructor: ->
    if soundOn
      SC.stream "/tracks/rameses-b-inspire", (sound)->
        if soundOn
          sound.play()



