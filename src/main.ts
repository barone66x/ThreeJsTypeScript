import "./style.css";
import { SceneManager } from "../CommonClasses/SceneManager";
import { InitialConfigResponse } from "../CommonClasses/JsonResponses";

import { AreaFactory } from "../CommonClasses/AreaFactory";
import { ModelFactory } from "../CommonClasses/ModelFactory";
import { Area } from "../FinalSolution/Area";
import { SceneObject } from "../FinalSolution/SceneObject";
import { ModelTypes } from "../CommonClasses/ModelTypes";
import { Model } from "../FinalSolution/Model";
import { UDM } from "../FinalSolution/UDM";
import { Point3d } from "../CommonClasses/Point";

const sceneManager = new SceneManager(1.5);
document.body.appendChild(sceneManager.getHTMLCanvas());
sceneManager.startAnimating();

let initialJson = (await (await fetch("JsonExample/InitialConfigResponse.json")).json()) as InitialConfigResponse;


initialJson.modelsAndTextures.areaTextures.forEach((area) => {
  AreaFactory.addAreaModel(area.subLevel, area.path);
});

initialJson.modelsAndTextures.models.forEach((model) => {
  ModelFactory.addObject(ModelTypes[model.type.toUpperCase() as keyof typeof ModelTypes], model.path);
});

initialJson.floors.forEach((floor) => {
  AreaFactory.makeArea(0, floor.p1, floor.p2, floor.p3, floor.p4).then((newFloor) => {
    sceneManager.addToScene(new Area(newFloor));
  });
});

initialJson.areas.forEach((area) => {
  AreaFactory.makeArea(area.subLevel, area.p1, area.p2, area.p3, area.p4).then((newArea) => {
    sceneManager.addToScene(new Area(newArea));
  });
});

initialJson.sceneObjects.forEach((object) => {
  ModelFactory.makeObject(ModelTypes[object.type.toUpperCase() as keyof typeof ModelTypes]).then((model) => {
    sceneManager.addToScene(new SceneObject(model, object.position, object.rotation));
  });
});

const bobina = await ModelFactory.makeObject(ModelTypes.COIL);
const udm = new UDM(bobina, 100, new Point3d(2, 2, 0), 90);
sceneManager.addToScene(udm);
udm.setHightlightOn();
udm.setHightlightOff();

window.addEventListener("resize", () => sceneManager.onWindowResize());
