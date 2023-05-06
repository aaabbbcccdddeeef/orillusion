import { GUIHelp } from '@orillusion/debug/GUIHelp';
import { Stats } from '@orillusion/stats'
import { Engine3D, Scene3D, AtmosphericComponent, CameraUtil, webGPUContext, HoverCameraController, Object3D, MeshRenderer, BoxGeometry, LitMaterial, DirectLight, KelvinUtil, View3D } from '@orillusion/core';

// simple base demo
class Sample_Transform {
    async run() {
        // init engine
        await Engine3D.init();
        // create new Scene
        let scene = new Scene3D();

        // add performance stats
        scene.addComponent(Stats);

        // add an Atmospheric sky enviroment
        let sky = scene.addComponent(AtmosphericComponent);
        sky.sunY = 0.6

        // init camera3D
        let mainCamera = CameraUtil.createCamera3D(null, scene);
        mainCamera.perspective(60, webGPUContext.aspect, 1, 2000.0);

        // add a basic camera controller
        let hoverCameraController = mainCamera.object3D.addComponent(HoverCameraController);
        hoverCameraController.setCamera(15, -15, 10);

        // create a basic cube
        let cubeObj = new Object3D();
        let mr = cubeObj.addComponent(MeshRenderer);
        mr.geometry = new BoxGeometry();
        let mat = new LitMaterial();
        mr.material = mat;
        scene.addChild(cubeObj);

        // add a basic direct light
        let lightObj = new Object3D();
        lightObj.rotationX = 45;
        lightObj.rotationY = 60;
        lightObj.rotationZ = 150;
        let dirLight = lightObj.addComponent(DirectLight);
        dirLight.lightColor = KelvinUtil.color_temperature_to_rgb(5355);
        dirLight.intensity = 10;
        scene.addChild(lightObj);

        // create a view with target scene and camera
        let view = new View3D();
        view.scene = scene;
        view.camera = mainCamera;

        // start render
        Engine3D.startRenderView(view);

        let transform = cubeObj.transform;
        // debug GUI
        GUIHelp.init();
        GUIHelp.addFolder('Transform');
        GUIHelp.add(transform, 'x', -10.0, 10.0, 0.01);
        GUIHelp.add(transform, 'y', -10.0, 10.0, 0.01);
        GUIHelp.add(transform, 'z', -10.0, 10.0, 0.01);
        GUIHelp.add(transform, 'rotationX', 0.0, 360.0, 0.01);
        GUIHelp.add(transform, 'rotationY', 0.0, 360.0, 0.01);
        GUIHelp.add(transform, 'rotationZ', 0.0, 360.0, 0.01);
        GUIHelp.add(transform, 'scaleX', 0.0, 2.0, 0.01);
        GUIHelp.add(transform, 'scaleY', 0.0, 2.0, 0.01);
        GUIHelp.add(transform, 'scaleZ', 0.0, 2.0, 0.01);
        GUIHelp.open();
        GUIHelp.endFolder();
    }
}

new Sample_Transform().run()