class timer {
    constructor(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this._pauseTime = 0;
        this._continueTime = 0;
        this._prevPauseDurs = [];
        this._playTime = 0;
        this._pauseDur = 0;
        // this.first = true;
    }

    //getMin() {
    //     // console.log("gameStartTime", `${this.gameStartTime}`);
    //     // const playTime = this.checkPauseDur();
    //     this.checkPauseDur();
    //     return 
    // }
    // getSec() {
    //     this.checkPauseDur();
    //     return Math.floor((this.playTime/1000)%60).toString().padStart(2, "0");
    // }
    getTime() {
        // console.log("pause duration be4", this.pauseDur);
        // this.checkPauseDur();
        const totalPrevPauseDur = this._prevPauseDurs.reduce((prev, cur) => prev+cur, 0);
        // console.log("total pd", totalPrevPauseDur);
        if (this._pauseTime && this._continueTime) {
            this._pauseDur = this._continueTime - this._pauseTime;
            // console.log("pause duration after", this.pauseDur);
            // this.playTime = Date.now() - this.gameStartTime - this.pauseDur - this.prevPauseDur;
            this._playTime = Date.now() - this.gameStartTime - this._pauseDur - totalPrevPauseDur;
            // if (!this.first) {
                this._prevPauseDurs.push(this._pauseDur); 
            // }
            // this.first = false;
            this._pauseTime = 0;
            this._continueTime = 0;
        } else {
            this._playTime = Date.now() - this.gameStartTime - totalPrevPauseDur;
        }
        const min = Math.floor((this._playTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this._playTime/1000)%60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    // checkPauseDur() {
        // if (this.pauseTime && this.continueTime) {
            // this.pauseDur = this.continueTime - this.pauseTime;
            // console.log("started for ", Date.now() - this.gameStartTime);
            // console.log("prev pause duration", this.prevPauseDur);
            // console.log("pause duration", this.pauseDur);
            // this.playTime = Date.now() - this.gameStartTime - this.pauseDur;
            // this.pauseTime = 0;
            // this.continueTime = 0;
            // if () {
            //     this.prevPauseDur = pauseDur;
            // }
        // } 
        // else {
        //     this.playTime = Date.now() - this.gameStartTime - this.pauseDur;
        // }
        
    // }

    startTimer() {
        const playTime = Date.now() - this.gameStartTime;
        // const min = Math.floor(playTime/60/1000%60);
        // const sec = Math.floor(playTime/1000%60);
        const min = Math.floor((playTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((playTime/1000)%60).toString().padStart(2, "0");
        console.log("start", `${min}:${sec}` );
    }
    pauseTimer() {
        // the condition is to prevent recording new pauseTime when it's already paused
        if (!this._pauseTime) this._pauseTime = Date.now();
        const min = Math.floor((this._pauseTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this._pauseTime/1000)%60).toString().padStart(2, "0");
        console.log("pause", `${min}:${sec}` );
    }
    continueTimer() {
        if (!this._continueTime) this._continueTime = Date.now();
        const min = Math.floor((this._continueTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this._continueTime/1000)%60).toString().padStart(2, "0");
        console.log("con", `${min}:${sec}`);
    }
}

