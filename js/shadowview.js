class ShadowView {
	constructor($canvas, $pianoCanvas) {
		this.$canvas = $canvas;
		this.$pianoCanvas = $pianoCanvas;
	}
    
	draw() {
		if (!this.$canvas.getContext) {
			return;
		}
		
		var ctx = this.$canvas.getContext('2d');
		
		const width = window.innerWidth;
		const height = window.innerHeight;
		const centerX = width / 2;
		const centerY = height / 2;
		const keyboardWidth = this.$pianoCanvas.width - 1;
		const keyboardHeight = this.$pianoCanvas.height;
		const keyboardY = 20;
		const offset = Math.max(width, height);
		var x = centerX - (keyboardWidth / 2);
		var y = centerY + (keyboardHeight / 2) + keyboardY;
		var gradient0 = {x: 0, y: 0};
        var gradient1 = {x: 0, y: 0};
        var gradientFade = 0.5;
        
		this.$canvas.width = width;
		this.$canvas.height = height;
		
		ctx.beginPath();
		ctx.moveTo(x, y);
		x += offset;
		y += offset;
        gradient0.x = x * gradientFade;
        gradient0.y = y * gradientFade;
		ctx.lineTo(x, y);
		x += keyboardWidth;
		y -= keyboardHeight;
		ctx.lineTo(x, y);
		x = centerX + (keyboardWidth / 2);
		y = centerY - (keyboardHeight / 2) + keyboardY;
        gradient1.x = x * gradientFade;
        gradient1.y = y * gradientFade;
		ctx.lineTo(x, y);
		ctx.closePath();
        
        var gradient = ctx.createLinearGradient(gradient0.x, gradient0.y, gradient1.x, gradient1.y);
        gradient.addColorStop(0, Style.primaryShadowColor2);
        gradient.addColorStop(1, Style.primaryShadowColor1);
        ctx.fillStyle = gradient;
		ctx.fill();		
	} 
}