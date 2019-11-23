let audio = new Audio();
  audio.src = 'EtudeNo1.mp3';
  audio.loop = true;
  audio.autoplay = true;

  let canvas, ctx, source, context, analyser, fbc_array;
  window.addEventListener('load', initMp3Player, false);

  let colors = ['#05668D', '#028090', '#00A896', '#0A7DA5', '#0A4B5F', '#021E8C', '#1330A3', '#304BBA', '#4964D1', 'transparent', '#00799B', '#DDFFF7', '#93E1D8']

  function initMp3Player() {
    document.getElementById('Audio').appendChild(audio);
    context = new AudioContext();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    canvas = document.getElementById('AudioVisual');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    frameLooper();
  }

  function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  const fillColorI = Math.floor(Math.random() * colors.length);
  const strokeColorI = Math.floor(Math.random() * colors.length);

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = colors[fillColorI];
    ctx.strokeStyle = colors[strokeColorI];
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

  let allCircles = [];
  for (let i = 0; i < 50; i++) {
    let radius = 20;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5 * 3;
    let dy = Math.random() - 0.5 * 3;
    allCircles.push(new Circle(x, y, dx, dy, radius));
  }

  

  function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    // array of sound frequency data representation
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < allCircles.length; i++) {
      allCircles[i].radius = (fbc_array[i] / 2)
      allCircles[i].update();
    }    
  }