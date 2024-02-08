import "./style.css";

import { SceneManager } from "./Graphics/Implementations/Three/SceneManager";
import { AreaFactory } from "./Graphics/Implementations/Three/AreaFactory";
import { ModelFactory } from "./Graphics/Implementations/Three/ModelFactory";

import { InitialConfigResponse } from "./Graphics/Utils/JsonResponses";
import { ModelTypes } from "./Graphics/Utils/ModelTypes";

import { Area } from "./Graphics/Objects/Area";
import { SceneObject } from "./Graphics/Objects/SceneObject";

import { UDM } from "./Graphics/Objects/UDM"
import { Point3d } from "./Graphics/Utils/Point";

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


ModelFactory.makeObject(ModelTypes.COIL).then(model => {
  const bobina = new UDM(model, 1, new Point3d(-1,0,0), 0);
  sceneManager.addToScene(bobina);
});
