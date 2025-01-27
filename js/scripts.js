{
    const init = () => {
        const canvas = document.querySelector("canvas");
        const crc = canvas.getContext('2d');

        const canvasX = canvas.width = window.innerWidth;
        const canvasY = canvas.height = window.innerHeight;

        let collision = 0;
        
        const calculateColision = (object, otherObjects) => {
            
            const v1Initial = object.velocityX;
            const v2Initial = otherObjects.velocityX;

            // Obliczenie prędkości końcowych
            object.velocityX =
                ((object.mass - otherObjects.mass) * v1Initial + 2 * otherObjects.mass * v2Initial) /
                (object.mass + otherObjects.mass);
            otherObjects.velocityX =
                ((otherObjects.mass - object.mass) * v2Initial + 2 * object.mass * v1Initial) /
                (object.mass + otherObjects.mass);
        }

        class Object {
            constructor(x, mass, velocityX, color) {
                this.x = x;
                this.y = 100;
                this.mass = mass;
                this.velocityX = velocityX;
                this.color = color;
            }
            update() {
                if (this.x + 100 >= canvasX || this.x <= 0) {
                    this.velocityX = -this.velocityX;
                }

                for (let i = 0; i < objects.length; i++) {
                    if (this === objects[i]) continue;

                    if (this.x + 100 >= objects[i].x && this.x <= objects[i].x) {
                        // this.velocityX = -this.velocityX;
                        // objects[i].velocityX = -objects[i].velocityX;

                        //this.x -= this.velocityX / (Math.abs(objects[i].velocityX) + Math.abs(this.velocityX)) * (100 - distance);
                        //objects[i].x -= objects[i].velocityX / (Math.abs(objects[i].velocityX) + Math.abs(this.velocityX)) * (100 - distance);
                        //collision += 1;
                        calculateColision(this, objects[i]);
                    }
                }
                this.x += this.velocityX;
            }
            draw(crc) {
                crc.beginPath();
                crc.fillStyle = this.color;
                crc.fillRect(this.x, canvasY - this.y, 100, 100);
            }
        }

        let objects = [new Object(1, 1, 5, 'red'), new Object(canvasX - 100 - 1, 3, -7, 'blue')];

        let time = 0;
        let fps = 1000 / 1000;
        let count = 0;

        let animate = (timeStamp) => {
            let deltaTime = timeStamp - time;
            time = timeStamp;

            if (count >= fps) {
                crc.fillStyle = 'rgba(255, 255, 255, 1';
                crc.fillRect(0, 0, canvasX, canvasY);

                objects.forEach(object => {
                    object.update();
                    object.draw(crc);
                });
                count = 0;
            }
            count += deltaTime;
            requestAnimationFrame(animate);
        }

        animate(0);
    }
    init();
}