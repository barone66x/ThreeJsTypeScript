import "./style.css";
import { SceneManager } from "../CommonClasses/SceneManager";
import { InitialConfigResponse } from "../CommonClasses/JsonResponses";

import { AreaFactory } from "../CommonClasses/AreaFactory";
import { ModelFactory } from "../CommonClasses/ModelFactory";
import { Area } from "../FinalSolution/Area";
import { SceneObject } from "../FinalSolution/SceneObject";
import { ModelTypes } from "../CommonClasses/ModelTypes";

const sceneManager = new SceneManager(1.5);
document.body.appendChild(sceneManager.getHTMLCanvas());
sceneManager.startAnimating();

let initialJson = (await (await fetch("JsonExample/InitialConfigResponse.json")).json()) as InitialConfigResponse;

const areaFactory = new AreaFactory();
const modelFactory = new ModelFactory();

initialJson.modelsAndTextures.areaTextures.forEach((area) => {
  areaFactory.addAreaModel(area.subLevel, area.path);
});

initialJson.modelsAndTextures.models.forEach((model) => {
  modelFactory.addObject(ModelTypes[model.type.toUpperCase() as keyof typeof ModelTypes], model.path);
});

initialJson.floors.forEach((floor) => {
  areaFactory.makeArea(0, floor.p1, floor.p2, floor.p3, floor.p4).then(newFloor => {
    sceneManager.addToScene(new Area(newFloor));
  });
});

initialJson.areas.forEach((area) => {
  areaFactory.makeArea(area.subLevel, area.p1, area.p2, area.p3, area.p4).then(newArea => {
    sceneManager.addToScene(new Area(newArea));
  });
});

initialJson.sceneObjects.forEach((object)=> {
  modelFactory.makeObject(ModelTypes[object.type.toUpperCase() as keyof typeof ModelTypes]).then(model => {
    sceneManager.addToScene(new SceneObject(model, object.position, object.rotation));
  })
})

window.addEventListener("resize", () => sceneManager.onWindowResize());
