{
    const init = () => {
        const canvas = document.querySelector("canvas");
        const crc = canvas.getContext('2d');

        const canvasX = canvas.width = window.innerWidth;
        const canvasY = canvas.height = window.innerHeight;

        const calculateColision = (object, otherObjects) => {

            const {mass: m1, velocityX: v1} = object;
            const {mass: m2, velocityX: v2} = otherObjects;

           object.velocityX = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
           otherObjects.velocityX = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        }

        class Object {
            constructor(x, mass, velocityX, color) {
                this.x = x;
                this.y = 100;
                this.mass = mass;
                this.velocityX = velocityX;
                this.color = color;
                this.direction = velocityX > 0 ? true : false;
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

        let objects = [new Object(1, 1, 3, 'red'), new Object(canvasX - 100 - 1, 5, -10, 'blue')];

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