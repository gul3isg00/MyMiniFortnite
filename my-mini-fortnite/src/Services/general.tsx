function randomInRange(min:number, max:number){
    return Math.random() * (max-min) + min;
}

function circularIntersect(x1:number, y1:number, r1:number, x2:number,y2:number,r2:number){
    var collidesX = (x1) - (x2);
    var collidesY = (y1) - (y2);
    var collidesAxis = (collidesX * collidesX) + (collidesY * collidesY);
    var radii = r1 + r2;
    return radii * radii >= collidesAxis;
}

export {randomInRange, circularIntersect}