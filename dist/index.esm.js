function initToShow(options) {
    let { el, url, color = 'red', size = 1 } = options;
    let { cvs, audioEl } = createEl(el);
    let isInit = false;
    let analyser;
    let dataArray;
    let ctx = cvs.getContext('2d');
    function initCvs() {
        cvs.width = window.innerWidth * devicePixelRatio;
        cvs.height = (window.innerHeight / 2) * devicePixelRatio;
    }
    initCvs();
    audioEl.onplay = function () {
        if (isInit) {
            return;
        }
        //音频上下文
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audioEl);
        //分析器
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024 / (2 * size);
        //创建8位数组接收数据
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        isInit = true;
    };
    function draw() {
        requestAnimationFrame(draw);
        //清空画布
        const { width, height } = cvs;
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, width, height);
        if (!isInit) {
            return;
        }
        //让分析器节点分析出数据到数组中
        analyser.getByteFrequencyData(dataArray);
        const len = dataArray.length;
        const barWidth = width / len;
        ctx.fillStyle = color;
        for (let i = 0; i < len; i++) {
            const data = dataArray[i]; //8位整数 小于256
            const barHeight = data / 255 * height;
            const x1 = i * barWidth + width / 2;
            const x2 = width / 2 - (i + 1) * barWidth;
            const y = height - barHeight;
            ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x1, y, barWidth - 2, barHeight);
            ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x2, y, barWidth - 2, barHeight);
        }
    }
    draw();
    function createEl(el) {
        el.innerHTML = `<canvas id="canvas"></canvas>
        <audio controls src=${url} id="audio" crossOrigin="anonymous"></audio>`;
        const cvs = document.getElementById("canvas");
        const audioEl = document.getElementById("audio");
        return { cvs, audioEl };
    }
}

export { initToShow as default };
