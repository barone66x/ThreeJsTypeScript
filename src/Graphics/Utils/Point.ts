export class Point2d{
    public x : number;
    public y : number;

    public constructor (x : number, y : number){
        this.x = x;
        this.y = y;
    }

}

export class Point3d extends Point2d{
    public z : number;

    public constructor(x : number, y : number, z:number) {
        super(x,y);
        this.z = z;
    }
}