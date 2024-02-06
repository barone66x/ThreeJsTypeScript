import "./style.css";
import { SceneManager } from "../CommonClasses/SceneManager";
import { InitialConfigResponse } from "../CommonClasses/JsonResponses";

import { AreaFactory } from "../CommonClasses/AreaFactory";
import { ModelFactory } from "../CommonClasses/ModelFactory";
import { Area } from "../FinalSolution/Area";
import { ForkLift } from "../FinalSolution/ForkLift";
import { Fork } from "../FinalSolution/Fork";
import { Model } from "../FinalSolution/Model";

const sceneManager = new SceneManager();
document.body.appendChild(sceneManager.getHTMLCanvas());
sceneManager.startAnimating();

let initialJson = (await (await fetch("JsonExample/InitialConfigResponse.json")).json()) as InitialConfigResponse;

const areaFactory = new AreaFactory();
initialJson.modelsAndTextures.areaTextures.forEach((area) => {
  areaFactory.addAreaModel(area.subLevel, area.path);
});

initialJson.floors.forEach((floor) => {
  const newArea = new Area(areaFactory.makeArea(0, floor.p1, floor.p2, floor.p3, floor.p4));
  sceneManager.addToScene(newArea);
});

initialJson.areas.forEach((area) => {
  const newArea = new Area(areaFactory.makeArea(area.subLevel, area.p1, area.p2, area.p3, area.p4));
  sceneManager.addToScene(newArea);
});


console.log(sceneManager);

window.addEventListener("resize", () => (sceneManager.onWindowResize()));
