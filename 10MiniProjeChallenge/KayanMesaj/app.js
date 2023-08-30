const btnToast = document.getElementById("btnToast");
const divWrapper = document.getElementById("wrapper");

btnToast.addEventListener('click', () => {
    generateNotification();
});

function generateNotification() {
    const notification = document.createElement('div');
    notification.classList.add('toast');

    notification.innerText = "Merhaba, bu bir kayan mesaj =)";
    divWrapper.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}