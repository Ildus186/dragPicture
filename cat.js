const section = document.createElement('section')
const sliderBox = document.createElement('article')
sliderBox.classList.add('sliderBox')
const slider = document.createElement('input');
slider.type = 'range';                    
slider.min = '75';                
slider.max = '400';               
slider.value = '200';             
slider.step = '1';                
slider.classList.add('size-slider');
const sliderValue = document.createElement('span');
sliderValue.classList.add('slider-value');
sliderValue.textContent = `Размер: ${slider.value}px`;
sliderBox.append(slider, sliderValue)
const sizeInfo = document.createElement('div')
sizeInfo.classList.add('sizeInfo')
document.body.append(section, sliderBox, sizeInfo)
const button1 = document.createElement('button')
button1.textContent = "Уменшить"
button1.classList.add('button1')
const button2 = document.createElement('button')
button2.textContent = "Увеличить"
button2.classList.add('button2')
const div = document.createElement('div')
const image = document.createElement('img')
image.src = 'https://img.freepik.com/free-photo/cute-kitten-playing-fluffy-fur-staring-outdoors-comfortable-resting-generated-by-artificial-intelligence_188544-130664.jpg?semt=ais_hybrid'
const sizeBtn = document.createElement('button')
sizeBtn.classList = 'sizeBtn'
div.append(image, sizeBtn)
section.append(button1, button2, div)

    const aspectRatio = 1.5;

 function preventZoomOnMobile(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}   

button1.addEventListener('click', () => {
    preventZoomOnMobile(e);
    const currentWidth = div.clientWidth;
    const newWidth = Math.max(currentWidth / 1.1, 75);
    slider.value = newWidth; 
    updateSizeFromSlider(); 
});

button2.addEventListener('click', () => {
    preventZoomOnMobile(e);
    const currentWidth = div.clientWidth;
    const newWidth = Math.min(currentWidth * 1.1, 400);
    slider.value = newWidth; 
    updateSizeFromSlider(); 
});


function updateSizeFromSlider() {
    const newWidth = parseInt(slider.value);
    const newHeight = newWidth / aspectRatio; 
    
    div.style.width = newWidth + 'px';
    div.style.height = Math.round(newHeight) + 'px';
    
    sliderValue.textContent = `${newWidth}`;
    
    resizeObserver.unobserve(div);
    resizeObserver.observe(div);
}

slider.addEventListener('input', updateSizeFromSlider);

slider.value = div.clientWidth;
sliderValue.textContent = `${slider.value}`;


        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        
        div.addEventListener('mousedown', startDrag);
        div.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            
            const clientX = e.clientX ?? e.touches[0].clientX;
            const clientY = e.clientY ?? e.touches[0].clientY;

            startX = clientX 
            startY = clientY
            
            const style = window.getComputedStyle(div);
            initialLeft = parseInt(style.left) || 0;
            initialTop = parseInt(style.top) || 0;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);

            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
            
            e.preventDefault();
            
        }
        
        function drag(e) {
            if (!isDragging) return
             e.preventDefault()
            
            const clientX = e.clientX ?? e.touches[0].clientX;
            const clientY = e.clientY ?? e.touches[0].clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;
            

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
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', stopDrag);
        }


          let isResizing = false;
          let startResizeX, startResizeY, startWidth, startHeight;



sizeBtn.addEventListener('mousedown', startResizeHandler);
sizeBtn.addEventListener('touchstart', startResizeHandler);

function startResizeHandler(event) {
    event.stopPropagation();
    event.preventDefault(); 
    isResizing = true;

    const clientX = event.clientX ?? event.touches[0].clientX;
    const clientY = event.clientY ?? event.touches[0].clientY;

    startWidth = div.clientWidth;
    startHeight = div.clientHeight;
    startResizeX = clientX; // 
    startResizeY = clientY;

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);

    document.addEventListener('touchmove', handleResize, { passive: false }); 
    document.addEventListener('touchend', stopResize);
}
    
function handleResize(event) {
    if (!isResizing) return;
    
    const clientX = event.clientX ?? event.touches[0].clientX;
    const dx = clientX - startResizeX;

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
    document.removeEventListener('touchmove', handleResize); 
    document.removeEventListener('touchend', stopResize);
}



const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        sizeInfo.textContent = `Ширина картинки: ${width}px Высота картинки: ${height}px`

        const roundedWidth = Math.round(width);
        slider.value = roundedWidth; 
        sliderValue.textContent = `${roundedWidth}`;

            if(width <= 75){
                sizeInfo.style.boxShadow = '0 5px 10px rgba(243, 9, 9, 0.2)'
                button1.disabled = true
                button2.disabled = false
            } else if (width >= 400) {
                sizeInfo.style.boxShadow = '0 5px 10px rgba(243, 9, 9, 0.2)'
                button2.disabled = true 
                button1.disabled = false 
            } else {
                sizeInfo.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'
                button1.disabled = false
                button2.disabled = false
            }
    });
});


resizeObserver.observe(div);
