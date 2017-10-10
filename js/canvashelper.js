class CanvasHelper {
    constructor(ctx) {
        this.ctx = ctx;
        this.fillStyle = '';
        this.highlightStyle = '';
        this.shadowStyle = '';
        this.highlightSize = 0;
        this.shadowSize = 0;
    }
    
    fillRect(x, y, w, h) {
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.fillRect(x, y, w, h);        
		this.ctx.fillStyle = this.highlightStyle;
		this.ctx.fillRect(x, y, w, this.highlightSize);
        this.ctx.fillRect(x, y, this.highlightSize, h);
        this.ctx.fillStyle = this.shadowStyle;
		this.ctx.fillRect(x, y + h - this.shadowSize, w, this.shadowSize);
        this.ctx.fillRect(x + w - this.shadowSize, y, this.shadowSize, h);
    }
}