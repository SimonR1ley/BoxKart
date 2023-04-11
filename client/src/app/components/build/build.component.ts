import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { Items } from 'src/app/models/Items';
import { ItemdbService } from 'src/app/services/itemdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
  providers: [ItemdbService],
})
export class BuildComponent implements OnInit, AfterViewInit {
  boxBuild: string = '../../../assets/models/BoxKart.gltf';

  buildUrl: String = '';

  public build = [
    {
      body: '',
      wheels: '',
      arial: '',
    },
  ];

  constructor(private itemService: ItemdbService, private router: Router) {}

  filter: String = 'Body';

  edit: String = 'Show';

  filterAll: String = 'Body';

  allItems: Items[] = [];

  noItems = [];

  ngOnInit() {
    this.itemService.getAllItems().subscribe((data) => {
      console.log(data);

      this.allItems = data;
    });
    //  this.allItems = this.itemService.getAllItems()
  }

  get Items() {
    // if (this.filter === 'All') {
    //   return this.allItems;
    // }
    if (this.filter === 'Body') {
      return this.allItems.filter((item) =>
        this.filter === 'Body' ? item.type === 'Body' : !item.type
      );
    }

    if (this.filter === 'Wheel') {
      return this.allItems.filter((item) =>
        this.filter === 'Wheel' ? item.type === 'Wheel' : !item.type
      );
    }

    if (this.filter === 'Arial') {
      return this.allItems.filter((item) =>
        this.filter === 'Arial' ? item.type === 'Arial' : !item.type
      );
    } else {
      return null;
    }
  }

  craftKart() {}

  @ViewChild('canvas') private canvasRef: ElementRef;

  @ViewChild('model-controls') private controlsRef: ElementRef;

  // model-controls

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;

  // @Input() public modelUrl: string = this.boxBuild

  //? Scene properties
  private camera: THREE.PerspectiveCamera;

  private controls: OrbitControls;

  private ambientLight: THREE.AmbientLight;

  private light1: THREE.PointLight;

  private light2: THREE.PointLight;

  private light3: THREE.PointLight;

  private light4: THREE.PointLight;

  private model: any;

  private directionalLight: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;

  private animateModel() {
    if (this.model) {
      // this.model.rotation.y += 0.005;
    }
  }

  private createControls = () => {
    let _width = 300;
    let _height = 300;

    const renderer = new CSS2DRenderer();
    renderer.setSize(_width, _height);

    // renderer.domElement.style.position = 'absolute';
    // renderer.domElement.style.zIndex = '1';
    // renderer.domElement.style.top = '0%';
    // renderer.domElement.style.backgroundColor = 'green';
    renderer.domElement.style.borderRadius = '20px';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    document
      .getElementById('model-con')
      ?.appendChild(renderer.domElement)
      .setAttribute('id', 'controls');
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.update();
  };

  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0xff0000 )
    // this.reloadScene()
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = 800;
    this.camera.position.y = 10;
    this.camera.position.z = 350;
    this.ambientLight = new THREE.AmbientLight(0x00000, 20);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0xffffff, 1.5);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0xffffff, 1.5);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0xffffff, 1.5);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0xffffff, 1.5);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    // this.renderer.setClearColor( 0x000000, 0.3);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: BuildComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

  public buildKart(item: any, index: any) {
    if (item.type === 'Body') {
      this.build[0] = { ...this.build[0], body: item.name };
    }

    if (item.type === 'Wheel') {
      this.build[0] = { ...this.build[0], wheels: item.name };
    }

    if (item.type === 'Arial') {
      this.build[0] = { ...this.build[0], arial: item.name };
    }

    console.log(this.build);

    // -----------Conditions----------

    this.scene.remove(this.model);

    // ---------Bodies---------

    // Box

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === '' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/Box.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === '' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/Fridge.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === '' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/Coffin.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === '' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/Bathtub.gltf';
      this.reloadScene(this.boxBuild);
    }

    // ---------Bodies & Wheels---------

    // Body + Doughnut

    // Box + Doughnut

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Doughnut' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxDoughnutWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Doughnut

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Doughnut' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinDoughnutWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Doughnut

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Doughnut' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeDoughnutWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Doughnut

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Doughnut' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubDoughnutWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Body + Saw

    // Box + Saw

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Saw' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxSawWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Saw

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Saw' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinSawWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Saw

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Saw' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeSawWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Saw

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Saw' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubSawWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Body + Wagon

    // Box + Wagon

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Wagon' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxWagonWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Wagon

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Wagon' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinWagonWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Wagon

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Wagon' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeWagonWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Wagon

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Wagon' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubWagonWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Body + Cheese

    // Box + Cheese

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Cheese' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxCheeseWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Cheese

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Cheese' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinCheeseWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Cheese

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Cheese' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeCheeseWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Cheese

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Cheese' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubCheeseWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Body + Record

    // Box + Record

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Record' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxRecordWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Record

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Record' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinRecordWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Record

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Record' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeRecordWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Record

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Record' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubRecordWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Body + Stone

    // Box + Stone

    if (
      this.build[0].body === 'Box' &&
      this.build[0].wheels === 'Stone' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BoxStoneWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Coffin + Stone

    if (
      this.build[0].body === 'Coffin' &&
      this.build[0].wheels === 'Stone' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/CoffinStoneWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Fridge + Stone

    if (
      this.build[0].body === 'Fridge' &&
      this.build[0].wheels === 'Stone' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/FridgeStoneWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // Bathtub + Stone

    if (
      this.build[0].body === 'Bathtub' &&
      this.build[0].wheels === 'Stone' &&
      this.build[0].arial === ''
    ) {
      this.boxBuild = '../../../assets/models/BathtubStoneWheels.gltf';
      this.reloadScene(this.boxBuild);
    }

    // ---------Bodies & Wheels & Arials---------
  }

  reloadScene(boxBuild: string) {
    this.loaderGLTF.load(boxBuild, (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
  }
}
