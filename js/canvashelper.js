class CanvasHelper {
    constructor(ctx) {
        this.ctx = ctx;
        this.fillStyle = '';
        this.highlightStyle = '';
        this.shadowStyle = '';
        this.highlightSpeckStyle = '';
        this.highlightSize = 0;
        this.shadowSize = 0;
    }
    
    fillRect(x, y, w, h) {
        // Main body
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.fillRect(x, y, w, h);

        // Bottom and right shadows
        this.ctx.fillStyle = this.shadowStyle;
		this.ctx.fillRect(x, y + h - this.shadowSize, w, this.shadowSize);
        this.ctx.fillRect(x + w - this.shadowSize, y, this.shadowSize, h);
        
        // Highlight path
        const hs = this.highlightSize;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + h);
        this.ctx.lineTo(x + hs, y + h - hs);
        this.ctx.lineTo(x + hs, y + hs);
        this.ctx.lineTo(x + w - hs, y + hs);
        this.ctx.lineTo(x + w, y);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        
        let gradient = this.ctx.createLinearGradient(x, y, x + w, y);
        gradient.addColorStop(0, this.highlightStyle);
        gradient.addColorStop(0.3, this.highlightSpeckStyle);
        gradient.addColorStop(1, this.highlightStyle);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}