class timer {
    constructor(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this._pauseTime = 0;
        this._continueTime = 0;
        this._prevPauseDurs = [];
        this._playTime = 0;
        this._pauseDur = 0;
    }

    getTime() {
        // console.log("pause duration be4", this.pauseDur);
        const totalPrevPauseDur = this._prevPauseDurs.reduce((prev, cur) => prev+cur, 0);
        // console.log("total pd", totalPrevPauseDur);
        if (this._pauseTime && this._continueTime) {
            this._pauseDur = this._continueTime - this._pauseTime;
            // console.log("pause duration after", this.pauseDur);
            this._playTime = Date.now() - this.gameStartTime - this._pauseDur - totalPrevPauseDur;
            this._prevPauseDurs.push(this._pauseDur); 
            this._pauseTime = 0;
            this._continueTime = 0;
        } else {
            this._playTime = Date.now() - this.gameStartTime - totalPrevPauseDur;
        }
        const min = Math.floor((this._playTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this._playTime/1000)%60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    startTimer() {
        const playTime = Date.now() - this.gameStartTime;
        // const min = Math.floor((playTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((playTime/1000)%60).toString().padStart(2, "0");
        // console.log("start", `${min}:${sec}` );
    }
    pauseTimer() {
        // the condition is to prevent recording new pauseTime when it's already paused
        if (!this._pauseTime) this._pauseTime = Date.now();
        // const min = Math.floor((this._pauseTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((this._pauseTime/1000)%60).toString().padStart(2, "0");
        // console.log("pause", `${min}:${sec}` );
    }
    continueTimer() {
        if (!this._continueTime) this._continueTime = Date.now();
        // const min = Math.floor((this._continueTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((this._continueTime/1000)%60).toString().padStart(2, "0");
        // console.log("con", `${min}:${sec}`);
    }
}

