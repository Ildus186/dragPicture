const section = document.createElement('section')
document.body.append(section)
const button1 = document.createElement('button')
button1.textContent = "Уменшить"
button1.classList = 'button1'
const button2 = document.createElement('button')
button2.textContent = "Увеличить"
button2.classList = 'button2'
const div = document.createElement('div')
const image = document.createElement('img')
image.src = 'https://img.freepik.com/free-photo/cute-kitten-playing-fluffy-fur-staring-outdoors-comfortable-resting-generated-by-artificial-intelligence_188544-130664.jpg?semt=ais_hybrid'
const sizeBtn = document.createElement('button')
sizeBtn.classList = 'sizeBtn'
div.append(image, sizeBtn)
section.append(button1, button2, div)

button1.addEventListener('click', () => {
    const currentWidth = div.clientWidth;
    const newWidth = currentWidth / 1.1; 
    const currentHeight = div.clientHeight;
    const newHeight = currentHeight / 1.1;       
    div.style.width = newWidth + 'px';
    div.style.height = newHeight + 'px';

}
)

button2.addEventListener('click', () => {
    const currentWidth = div.clientWidth;
    const newWidth = currentWidth * 1.1; 
    const currentHeight = div.clientHeight;
    const newHeight = currentHeight * 1.1;        
    div.style.width = newWidth + 'px';
    div.style.height = newHeight + 'px';
}
)

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        
        div.addEventListener('mousedown', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            

            startX = e.clientX;
            startY = e.clientY;
            
            const style = window.getComputedStyle(div);
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
            

            const maxX = section.clientWidth - div.clientWidth;
            const maxY = section.clientHeight - div.clientHeight;
            

            div.style.left = Math.max(0, Math.min(newLeft, maxX)) + 'px';
            div.style.top = Math.max(0, Math.min(newTop, maxY)) + 'px';

        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }


          let isResizing = false;
          let startResizeX, startResizeY, startWidth, startHeight;



    sizeBtn.addEventListener('mousedown', (event) => {
    event.stopPropagation()
    isResizing = true;
    
    startResizeX = event.clientX;
    startResizeY = event.clientY;
    startWidth = div.clientWidth;
    startHeight = div.clientHeight;
    
    const aspectRatio = startWidth / startHeight;
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    
    event.preventDefault();
    
function handleResize(e) {
    if (!isResizing) return;
    
    const dx = e.clientX - startResizeX;

    const currentLeft = parseInt(div.style.left) || 0;
    const currentTop = parseInt(div.style.top) || 0;
    
    let newWidth = startWidth + dx;
    let newHeight = newWidth / aspectRatio;
    
    const maxWidth = section.clientWidth - currentLeft;
    if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
    }
    
    const maxHeight = section.clientHeight - currentTop;
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }
    
    newWidth = Math.max(75, newWidth);
    newHeight = Math.max(50, newHeight);
    
    div.style.width = Math.round(newWidth) + 'px';
    div.style.height = Math.round(newHeight) + 'px';
}

    function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
}
});

 