var camera,
    scene,
    renderer;
var world,
    pig;
var hemiLight,
    dirLight,
    backLight,
    isUp,
    frrrr;

var container = {
    width: 0,
    height: 0
}
var mouse = {
    x: {
        current: 0,
        previous: 0,
        calc: 0
    },
    y: {
        current: 0,
        previous: 0,
        calc: 0
    }
}

function init() {

    container.width = window.innerWidth;
    container.height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, container.width / container.height, 1, 2000);
    camera.position.z = 2000;
    camera.position.y = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    world = document.getElementById('minecraft');
    world.appendChild(renderer.domElement);

    window.addEventListener('load', function() {
        document.addEventListener('mousemove', mousemove, false);
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mouseup', mouseup, false);
        document.addEventListener('mousedown', mousedown, false);
        document.addEventListener('touchend', touchend, false);
        document.addEventListener('touchmove', touchmove, false);
    });
}

function onWindowResize() {
    container.width = window.innerWidth;
    container.height = window.innerHeight;
    camera.aspect = container.width / container.height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function mousemove(e) {
    mouse.x.current = e.clientX;
    mouse.y.current = e.clientY;
    mouse.x.calc = mouse.x.current - (container.width / 2);
    mouse.y.calc = mouse.y.current - (container.height / 2);
}

function touchend(e) {
    if (isUp) {
        isUp = false;
    } else {
        mousedown(e);
    }
}

function touchmove(e) {
    if (e.touches.length === 1) {
        e.preventDefault();
        mouse.x.current = e.touches[0].pageX,
        mouse.y.current = e.touches[0].pageY;
        mouse.x.calc = mouse.x.current - (container.width / 2);
        mouse.y.calc = mouse.y.current - (container.height / 2);
    }
}

var ct = [];

function mouseup(e) {
    isUp = false;
    for (var i = 0; i < ct.length; i++) {
        clearTimeout(ct[i]);
    }
}

function mousedown(e) {
    var colors = ['#ab99af', '#827a7a', '#467d78', '#395073', '#212e77'];

    isUp = true;
    for (var i = 0; i < colors.length; i++) {
        (function(index) {
            ct[index] = setTimeout(function() {
                if (isUp) {
                    pig.head.material.color = new THREE.Color(colors[index]);
                }
            }, i * 1000);
        })(i);
    }
}

function addLights() {
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    dirLight = new THREE.DirectionalLight(0xffffff, .8);
    dirLight.position.set(200, 200, 200);
    dirLight.castShadow = true;
    dirLight.shadowDarkness = .1;

    backLight = new THREE.DirectionalLight(0xffffff, .4);
    backLight.position.set(-200, 200, 50);
    backLight.shadowDarkness = .1;
    backLight.castShadow = true;

    scene.add(backLight);
    scene.add(hemiLight);
    scene.add(dirLight);
}

function createPig() {
    pig = new Pig();
    scene.add(pig.threegroup);
}

Pig = function() {

    this.threegroup = new THREE.Group();

    this.pinkMat = new THREE.MeshLambertMaterial({
        color: "#F48FB1", shading: THREE.FlatShading,
        //  map: THREE.ImageUtils.loadTexture('http://sdg.repositoryhosting.com/git_public/sdg/sdg-blog.git/blob_plain/abced5687967687c3e429ddd18a38055d0439550:/Three-js-examples/images/crate.jpg')
    });

    this.holeMat = new THREE.MeshLambertMaterial({color: "#983154", shading: THREE.FlatShading});

    this.whiteMat = new THREE.MeshLambertMaterial({color: "white", shading: THREE.FlatShading});

    this.blackMat = new THREE.MeshLambertMaterial({color: "black", shading: THREE.FlatShading});

    this.nailMat = new THREE.MeshLambertMaterial({color: "#48261a", shading: THREE.FlatShading});

    //head
    var head = new THREE.BoxGeometry(280, 280, 280);
    this.head = new THREE.Mesh(head, this.pinkMat);
    this.head.position.x = 0;
    this.head.position.y = 80;
    this.head.position.z = 400;

    //eyes
    var eyes = new THREE.BoxGeometry(80, 50, 5);
    //eye left
    this.eyeLeft = new THREE.Mesh(eyes, this.whiteMat);
    this.eyeLeft.position.x = -100;
    this.eyeLeft.position.y = 5;
    this.eyeLeft.position.z = 155;
    //eye right
    this.eyeRight = new THREE.Mesh(eyes, this.whiteMat);
    this.eyeRight.position.x = 100;
    this.eyeRight.position.y = 5;
    this.eyeRight.position.z = 155;
    //Retinas
    var retina = new THREE.BoxGeometry(40, 50, 2);
    //Retinas Left
    this.retinaLeft = new THREE.Mesh(retina, this.blackMat);
    this.retinaLeft.position.x = -120;
    this.retinaLeft.position.y = 4;
    this.retinaLeft.position.z = 158;
    //Retinas Right
    this.retinaRight = new THREE.Mesh(retina, this.blackMat);
    this.retinaRight.position.x = 120;
    this.retinaRight.position.y = 5;
    this.retinaRight.position.z = 158;

    //snout
    var snout = new THREE.BoxGeometry(125, 70, 90);
    this.snout = new THREE.Mesh(snout, this.pinkMat);
    this.snout.position.x = 0;
    this.snout.position.y = -60;
    this.snout.position.z = 155;

    //holes
    var hole = new THREE.BoxGeometry(40, 40, 3);
    //hole Left
    this.holeLeft = new THREE.Mesh(hole, this.holeMat);
    this.holeLeft.position.x = -40;
    this.holeLeft.position.y = 0;
    this.holeLeft.position.z = 50;
    //hole Right
    this.holeRight = new THREE.Mesh(hole, this.holeMat);
    this.holeRight.position.x = 40;
    this.holeRight.position.y = 0;
    this.holeRight.position.z = 50;

    //legs
    var legs = new THREE.BoxGeometry(180, 250, 180);
    //leg Left front
    this.legLeftFront = new THREE.Mesh(legs, this.pinkMat);
    this.legLeftFront.position.x = -120;
    this.legLeftFront.position.y = -280;
    this.legLeftFront.position.z = 100;
    //leg right front
    this.legRightFront = new THREE.Mesh(legs, this.pinkMat);
    this.legRightFront.position.x = 120;
    this.legRightFront.position.y = -280;
    this.legRightFront.position.z = 100;

    //nail
    var nails = new THREE.BoxGeometry(50, 50, 2);
    //leg Left front
    this.nailLeft1 = new THREE.Mesh(nails, this.nailMat);
    this.nailLeft1.position.x = -160;
    this.nailLeft1.position.y = -380;
    this.nailLeft1.position.z = 190;
    this.nailLeft2 = new THREE.Mesh(nails, this.nailMat);
    this.nailLeft2.position.x = -80;
    this.nailLeft2.position.y = -380;
    this.nailLeft2.position.z = 190;
    this.nailRight1 = new THREE.Mesh(nails, this.nailMat);
    this.nailRight1.position.x = 160;
    this.nailRight1.position.y = -380;
    this.nailRight1.position.z = 190;
    this.nailRight2 = new THREE.Mesh(nails, this.nailMat);
    this.nailRight2.position.x = 80;
    this.nailRight2.position.y = -380;
    this.nailRight2.position.z = 190;

    //body
    var body = new THREE.BoxGeometry(400, 300, 600);
    this.body = new THREE.Mesh(body, this.pinkMat);
    this.body.position.x = 0;
    this.body.position.y = 0;
    this.body.position.z = 0;

    // Add Elements to head
    this.head.add(this.retinaLeft);
    this.head.add(this.retinaRight);
    this.head.add(this.eyeLeft);
    this.head.add(this.eyeRight);
    this.head.add(this.snout);
    this.snout.add(this.holeLeft);
    this.snout.add(this.holeRight);

    this.body.add(this.legLeftFront);
    this.body.add(this.nailLeft1);
    this.body.add(this.nailLeft2);
    this.body.add(this.legRightFront);
    this.body.add(this.nailRight1)
    this.body.add(this.nailRight2)

    this.threegroup.add(this.head);
    this.threegroup.add(this.body);

    this.threegroup.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    /*Methods*/
    this.update = function() {
        //move body
        this.bodyRY = calc(mouse.x.calc, -400, 400, -Math.PI / 20, Math.PI / 20);
        this.bodyRX = calc(mouse.y.calc, -400, 400, -Math.PI / 90, Math.PI / 90);
        //move head
        this.headRY = calc(mouse.x.calc, -200, 200, -Math.PI / 4, Math.PI / 4);
        this.headRX = calc(mouse.y.calc, -200, 200, -Math.PI / 4, Math.PI / 4);

        this.rotate(10);
    }

    this.rotate = function(speed) {

        if (isUp) {
            world.classList.add('noBreathe');

            var self = this;

            //this.body.rotateZ(0.05);
            //this.head.rotateZ(0.05);
            this.nailLeft1.rotateZ(0.20);
            this.nailLeft2.rotateZ(0.20);
            this.nailRight1.rotateZ(0.20);
            this.nailRight2.rotateZ(0.20);

            this.body.scale.x = this.body.scale.y = this.body.scale.z = 0.9;
            this.head.scale.x = this.head.scale.y = this.head.scale.z = 1.2;
            this.eyeLeft.scale.x = this.eyeRight.scale.x = 2;
            this.eyeLeft.scale.y = this.eyeRight.scale.y = 2;
            this.retinaLeft.scale.x = this.retinaLeft.scale.y = this.retinaRight.scale.x = this.retinaRight.scale.y = 0.3;
            this.holeRight.scale.y = this.holeRight.scale.x = this.holeLeft.scale.y = this.holeLeft.scale.x = 0.3;
        } else {
            //this.body.rotation.z =  this.head.rotation.z = 0;
            this.nailLeft1.rotation.z = this.nailLeft2.rotation.z = this.nailRight1.rotation.z = this.nailRight2.rotation.z = 0;
            world.classList.remove('noBreathe');
            this.head.scale.x = this.head.scale.y = this.head.scale.z = 1;
            this.head.material.color = new THREE.Color('#F48FB1');
            this.body.scale.x = this.body.scale.y = this.body.scale.z = 1;
            this.eyeLeft.scale.x = this.eyeRight.scale.x = 1;
            this.eyeLeft.scale.y = this.eyeRight.scale.y = 1;
            this.retinaLeft.scale.x = this.retinaLeft.scale.y = this.retinaRight.scale.x = this.retinaRight.scale.y = 1;
            this.breathe();

        }

        this.body.rotation.y += (this.bodyRY - this.body.rotation.y) / speed;
        this.body.rotation.x += (this.bodyRX - this.body.rotation.x) / speed;
        this.head.rotation.y += (this.headRY - this.head.rotation.y) / speed;
        this.head.rotation.x += (this.headRX - this.head.rotation.x) / speed;
    }

    this.breathe = function() {
        this.snout.rotation.x += 0.005;
        if (this.snout.rotation.x > 0.20) {
            this.snout.rotation.x -= 0.099;
            this.holeRight.scale.y = this.holeRight.scale.x = this.holeLeft.scale.y = this.holeLeft.scale.x = (this.holeRight.scale.x == 0.5)
                ? 1
                : 0.5;
        }

    }

};

function calc(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;
}

function loop() {
    renderer.render(scene, camera);
    pig.update();
    requestAnimationFrame(loop);
}

init();
addLights();
createPig();
loop();
