document.addEventListener("DOMContentLoaded", function(){
    for (const el of document.querySelectorAll(".accardion-item__header")) {
        let group = el.dataset.group;

        el.addEventListener("click", () => {
            let target = el.querySelector(`input[name="${group}"]`);
            let state = target.checked;
            let checks = document.querySelectorAll(`input[name="${group}"]`);
            for (let check of checks) {
                if (check != target) {
                    check.checked = false;
                    check.parentElement.classList.remove("active");
                }
            }
            target.checked = !state;
            if (target.checked) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }


    for (const el of document.querySelectorAll(".select")) {
        let container = el.querySelector(".select__container");

        container.addEventListener("click", () => {
            if (!container.classList.contains("done")) {
                _3Utils.timeClassToggle(container, 300, "done");
            }
        });

        for (const opt of el.querySelectorAll("input[type='radio']")) {
            opt.addEventListener("click", () => {
                el.setAttribute("value", opt.getAttribute("value"));
            });
        }
    }

    for (const el of document.querySelectorAll('.input.file-input')) {
        const fileNameSpan = document.querySelector('.file-name');
        const fileInput = document.querySelector('input');
        let file;

        fileInput.addEventListener('change', (event) => {
            let localFile = event.target.files[0];

            if (!localFile.type.includes('zip') && !localFile.type.includes('rar') && !localFile.name.endsWith('.7z')) {
                fileInput.value = file ? file : '';
                const notify = new DevNotify('bad', 'Файл не является архивом');
                notify.init();
                return;
            }
            fileNameSpan.textContent = localFile.name;
        });
    }
});