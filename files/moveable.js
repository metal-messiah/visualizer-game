class Moveable extends EventTarget{
	constructor(x, y, externals) {
        super()
		this.pos = createVector(x, y);
		this.vel = createVector();
		this.acc = createVector();

		this.maxSpeed = 3;
		this.maxForce = 0.1;

		this.id = random();

		this.externals = externals
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	rotation() {
		return this.vel.heading() + radians(90);
	}

	seek(target) {
		let speed = this.maxSpeed;
		let desired = p5.Vector.sub(target, this.pos);
		desired.setMag(speed);

		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}

	arrive(target) {
		let speed = this.maxSpeed;
		let desired = p5.Vector.sub(target, this.pos);
		let d = desired.mag();
		if (d < 100) {
			speed = map(d, 0, 100, 0, this.maxSpeed);
		}
		desired.setMag(speed);

		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}

	intersectsMouse() {
		let xMin, xMax, yMin, yMax;
		xMin = this.pos.x - this.radius;
		xMax = this.pos.x + this.radius;
		yMin = this.pos.y - this.radius;
		yMax = this.pos.y + this.radius;

		return mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax;
	}
}