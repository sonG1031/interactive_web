(() => {
    const actions = {
        birdFlies(key) {
            if (key) {
                document.querySelector(
                    '[data-index="2"] .bird'
                ).style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector(
                    '[data-index="2"] .bird'
                ).style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if (key) {
                document.querySelector(
                    '[data-index="5"] .bird'
                ).style.transform = `translate(${window.innerWidth}px, ${
                    -window.innerHeight * 0.7
                }px)`;
            } else {
                document.querySelector(
                    '[data-index="5"] .bird'
                ).style.transform = `translateX(-100%)`;
            }
        },
    };

    const steps = document.querySelectorAll(".step");
    const graphicItems = document.querySelectorAll(".graphic-item");
    let currentItem = graphicItems[0]; // 현재 활성화된 (visible) .graphic-item을 지정
    activate(currentItem.dataset.action);
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        // 루프 횟수를 줄일 수 있다
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex);
    });

    for (let i = 0; i < steps.length; i++) {
        io.observe(steps[i]);
        steps[i].setAttribute("data-index", i);
        graphicItems[i].setAttribute("data-index", i);
    }

    function activate(action) {
        currentItem.classList.add("visible");
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove("visible");
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener("scroll", () => {
        let step;
        let boundingRect;

        // for (let i = 0; i < steps.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            // 루프 횟수를 줄일 수 있다
            step = steps[i];
            0;
            if (!step) continue;

            boundingRect = step.getBoundingClientRect();

            if (
                boundingRect.top > window.innerHeight * 0.05 &&
                boundingRect.top < window.innerHeight * 0.8
            ) {
                // graphicItems[step.dataset.index].classList.add('visible');
                inactivate(currentItem.dataset.action);

                currentItem = graphicItems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener("load", () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });
})();
