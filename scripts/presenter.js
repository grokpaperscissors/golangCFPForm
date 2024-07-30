document.getElementById('add-presenter').addEventListener('click', function() {
    addPresenter();
});


function addPresenter() {
    const currentContainers = document.querySelectorAll('.presenter-container').length;
    // add presenter limit
    if (currentContainers > 3) {
        console.error('Maximum number of presenters reached.');
        alert("Woah, there! We limit the number of presenters to 4 for purpose of logistics."); 
        return;
    }

    const container = document.querySelector('.presenter-container');
    if (!container) {
        console.error('No presenter container found.');
        return;
    }

    const newPresenter = container.cloneNode(true);
    if (!newPresenter) {
        console.error('Failed to clone presenter container.');
        return;
    }

    let num = document.querySelectorAll('.presenter-container').length + 1;

    const nameInput = newPresenter.querySelector('.name');
    const emailInput = newPresenter.querySelector('.email');
    const bioTextArea = newPresenter.querySelector('.speaker-bio');
    const socialsTextArea = newPresenter.querySelector('.speaker-socials');

    // Clear values and update IDs
    [nameInput, emailInput, bioTextArea, socialsTextArea].forEach(input => {
        if (input) {
            input.id += num;
            input.value = '';
        }
    });

    // Co-Presenter heading above the cloned presenter
    const coPresenterHeading = document.createElement('h2');
    coPresenterHeading.textContent = 'Co-Presenter Details';
    newPresenter.insertBefore(coPresenterHeading, newPresenter.firstChild);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-danger remove-presenter rmv-btn';
    removeBtn.onclick = function() {
        this.closest('.presenter-container').remove();
    };

    // Add more button
    const addMoreBtn = document.createElement('button');
    addMoreBtn.textContent = 'Add More';
    addMoreBtn.type = 'button';
    addMoreBtn.className = 'btn btn-info add-more-btn';
    addMoreBtn.onclick = addPresenter;

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(removeBtn);
    buttonContainer.appendChild(addMoreBtn);
    newPresenter.appendChild(buttonContainer);

    // Insert new presenter
    const presentationDetails = document.getElementById('presentation-details');
    if (presentationDetails) {
        presentationDetails.parentNode.insertBefore(newPresenter, presentationDetails);
    } else {
        console.error('Presentation details section not found.');
    }
}
