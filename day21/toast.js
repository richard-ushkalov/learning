const toast = document.querySelector('.toast');

let hideTimerId = null;

export const showToast = (text) => {
    clearTimeout(hideTimerId);

    toast.textContent = text;

    hideTimerId = setTimeout(() => {
        toast.textContent = '';
    }, 2000);
};