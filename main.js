(()=>{

    const actions = {
        birdFlies() {
            document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
        }
    };

    const steps = document.querySelectorAll('.step');
    const graphicItems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicItems[0]; // 현재 활성화된 (visible) .graphic-item을 지정
    activate(currentItem.dataset.action);
    let ioIndex;

    const io = new IntersectionObserver((entries, observer)=> { // 루프 횟수를 줄일 수 있다
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex);
    });

    for (let i = 0; i < steps.length; i++) {
        io.observe(steps[i]);
        steps[i].setAttribute('data-index', i); 
        graphicItems[i].setAttribute('data-index', i);
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action]();
        }
    }

    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // for (let i = 0; i < steps.length; i++) { 
        for (let i = ioIndex -1 ; i < ioIndex + 2; i++) { // 루프 횟수를 줄일 수 있다
            step = steps[i];0
            if(!step) continue;

            boundingRect = step.getBoundingClientRect();
            

            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                // graphicItems[step.dataset.index].classList.add('visible');
                inactivate();

                currentItem = graphicItems[step.dataset.index];
                activate(currentItem.dataset.action);
            } 
        }
    });
})();