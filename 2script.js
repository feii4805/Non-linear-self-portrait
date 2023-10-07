document.addEventListener('DOMContentLoaded', () => {
    const displayTexts = ["2 west 13", "University Center", "Mannes School of Music", "Making Center", "6 east 16th", "Johnson Hall"];
    
    document.querySelectorAll('.heart').forEach((heart, index) => {
        heart.addEventListener('mouseover', () => {
            // Display specific text based on the heart being hovered over
            document.getElementById('displayText').innerText = displayTexts[index];
            document.getElementById('displayText').style.display = 'block';
        });
        heart.addEventListener('mouseout', () => {
            document.getElementById('displayText').style.display = 'none';
        });
    });
});
