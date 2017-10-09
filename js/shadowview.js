class ShadowView {
	constructor($canvas) {
		this.$canvas = $canvas;
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
		const keyboardWidth = 299;
		const keyboardHeight = 80;
		const keyboardY = 20;
		const offset = Math.max(width, height);
		var x = centerX - (keyboardWidth / 2);
		var y = centerY + (keyboardHeight / 2) + keyboardY;
		
		this.$canvas.width = width;
		this.$canvas.height = height;
		
		ctx.beginPath();
		ctx.moveTo(x, y);
		x += offset;
		y += offset;
		ctx.lineTo(x, y);
		x += keyboardWidth;
		y -= keyboardHeight;
		ctx.lineTo(x, y);
		x = centerX + (keyboardWidth / 2);
		y = centerY - (keyboardHeight / 2) + keyboardY;
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.fillStyle = '#6EAAC2';		
		ctx.fill();		
	} 
}