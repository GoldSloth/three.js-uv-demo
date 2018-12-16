var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
var texture = new THREE.TextureLoader().load('Test.png')
var g1 = new THREE.Geometry()

g1.vertices.push(
	new THREE.Vector3(-10,  -10, 0),
	new THREE.Vector3(-10, 10, 0),
	new THREE.Vector3(10, 10, 0)
)

g1.faces.push(new THREE.Face3(0, 1, 2))

g1.computeBoundingSphere()
g1.computeFaceNormals()

g1.faceVertexUvs[0][0] = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)]


console.log(g1)

var g2 = new THREE.Geometry()

g2.vertices.push(
	new THREE.Vector3(-10,  10, 10),
	new THREE.Vector3(-10, -10, 10),
	new THREE.Vector3(10, -10, 10)
)

g2.faces.push(new THREE.Face3(0, 1, 2))

g2.computeBoundingSphere()
g2.computeFaceNormals()

g2.faceVertexUvs[0][0] = [new THREE.Vector2(0, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)]

var G = new THREE.Geometry()

G.merge(g1)
G.merge(g2)

var dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
var ambLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambLight)

scene.add(dirLight)

var material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: texture})
console.log(G)
var mesh = new THREE.Mesh(G, material)
scene.add(mesh)

var time = 0
var origin = new THREE.Vector3(0, 0, 0)

var dHelper = new THREE.DirectionalLightHelper(dirLight)

scene.add(dHelper)

dirLight.position.set(0, 0, 20)
dirLight.target.position.set(0, 0, 0)

function nextFrame() {
    time += 0.01
	requestAnimationFrame(nextFrame)
    renderer.render(scene, camera)
    
    camera.position.z = 40 * Math.sin(time)
    camera.position.x = 40 * Math.cos(time)
    camera.lookAt(origin)

    dirLight.position.x = 40 * Math.sin(-time/2)
    dirLight.position.z = 40 * Math.cos(-time/2)
}
nextFrame()
