class timer {
    constructor(gameStartTime, gameRuntime) {
        this.gameStartTime = gameStartTime;
        this.gameRuntime = 0;
        this.pauseTime = 0;
        this.continueTime = 0;
    }

    get getMin() {
        let playTime;
        if (this.pauseTime) {
            playTime = Date.now() - this.gameStartTime - (this.continueTime - this.pauseTime);
        } else {
            playTime = Date.now() - this.gameStartTime;
        }
        return Math.floor(playTime/60/1000%60).toString().padStart(2, "0");
    }
    get getSec() {
        let playTime;
        if (this.pauseTime) {
            playTime = Date.now() - this.gameStartTime - (this.continueTime - this.pauseTime);
        } else {
            playTime = Date.now() - this.gameStartTime;
        }
        return Math.floor(playTime/1000%60).toString().padStart(2, "0");
    }

    startTimer() {
        const playTime = Date.now() - this.gameStartTime;
        console.log("start", playTime);
    }
    pauseTimer() {
        this.pauseTime = Date.now();
        console.log("pause", this.pauseTime);
    }
    continueTimer() {
        this.continueTime = Date.now();
        console.log("con", this.continueTime);
    }
    restartTimer() {
        this.gameRuntime = 0;
        this.pauseTime = 0;
        this.continueTime = 0;
    }
}

