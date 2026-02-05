console.log('Portfolio successfully loaded.');

const darkModeToggle = document.getElementById('darkmode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});

document.body.addEventListener('click', () => {
    console.log('Clicaste na página!');
});