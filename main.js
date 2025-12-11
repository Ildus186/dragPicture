const div = document.createElement('div')
document.body.append(div)
const button1 = document.createElement('button')
button1.textContent = "Уменшить"
button1.classList = 'button1'
const button2 = document.createElement('button')
button2.textContent = "Увеличить"
button2.classList = 'button2'
const image = document.createElement('img')
image.src = 'https://img.freepik.com/free-photo/cute-kitten-playing-fluffy-fur-staring-outdoors-comfortable-resting-generated-by-artificial-intelligence_188544-130664.jpg?semt=ais_hybrid'
div.append(button1, button2, image)
button1.addEventListener('click', () => {
    const currentWidth = image.clientWidth;
    const newWidth = currentWidth / 1.1; 
    const currentHeight = image.clientHeight;
    const newHeight = currentHeight / 1.1;       
    image.style.width = newWidth + 'px';
    image.style.height = newHeight + 'px';

}
)

button2.addEventListener('click', () => {
    const currentWidth = image.clientWidth;
    const newWidth = currentWidth * 1.1; 
    const currentHeight = image.clientHeight;
    const newHeight = currentHeight * 1.1;        
    image.style.width = newWidth + 'px';
    image.style.height = newHeight + 'px';
}
)

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        
        image.addEventListener('mousedown', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            

            startX = e.clientX;
            startY = e.clientY;
            
            const style = window.getComputedStyle(image);
            initialLeft = parseInt(style.left) || 0;
            initialTop = parseInt(style.top) || 0;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            e.preventDefault();
            
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            

            const newLeft = initialLeft + dx;
            const newTop = initialTop + dy;
            

            const maxX = div.clientWidth - image.clientWidth;
            const maxY = div.clientHeight - image.clientHeight;
            

            image.style.left = Math.max(0, Math.min(newLeft, maxX)) + 'px';
            image.style.top = Math.max(0, Math.min(newTop, maxY)) + 'px';

        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }