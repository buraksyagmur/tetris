class timer {
    constructor(gameStartTime, gameRuntime) {
        this.gameStartTime = gameStartTime;
        this.gameRuntime = 0;
        this.pauseTime = 0;
        this.continueTime = 0;
        this.prevPauseDur = 0;
        this.playTime = 0;
    }

    get getMin() {
        // console.log("gameStartTime", `${this.gameStartTime}`);
        // const playTime = this.checkPauseDur();
        return Math.floor((this.playTime/60/1000)%60).toString().padStart(2, "0");
    }
    get getSec() {
        const playTime = this.checkPauseDur();
        return Math.floor((this.playTime/1000)%60).toString().padStart(2, "0");
    }

    checkPauseDur() {
        // let playTime;
        if (this.pauseTime && this.continueTime) {
            const pauseDur = this.continueTime - this.pauseTime;
            // console.log("started for ", Date.now() - this.gameStartTime);
            console.log("prev pause duration", this.prevPauseDur);
            console.log("pause duration", pauseDur);
            this.playTime = Date.now() - this.gameStartTime - pauseDur;
            // if () {
            //     this.prevPauseDur = pauseDur;
            // }
        } else {
            this.playTime = Date.now() - this.gameStartTime;
        }
        
        // return playTime;
    }

    startTimer() {
        const playTime = Date.now() - this.gameStartTime;
        // const min = Math.floor(playTime/60/1000%60);
        // const sec = Math.floor(playTime/1000%60);
        const min = Math.floor((playTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((playTime/1000)%60).toString().padStart(2, "0");
        console.log("start", `${min}:${sec}` );
    }
    pauseTimer() {
        this.pauseTime = Date.now();
        const min = Math.floor((this.pauseTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this.pauseTime/1000)%60).toString().padStart(2, "0");
        console.log("pause", `${min}:${sec}` );
    }
    continueTimer() {
        this.continueTime = Date.now();
        const min = Math.floor((this.continueTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this.continueTime/1000)%60).toString().padStart(2, "0");
        console.log("con", `${min}:${sec}`);
    }
    // restartTimer() {
    //     this.gameStartTime = 0;
    //     this.gameRuntime = 0;
    //     this.pauseTime = 0;
    //     this.continueTime = 0;
    // }
}

