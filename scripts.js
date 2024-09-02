let viewedCount = 0;
let correctCount = 0;

// Handle adding new categories
document.getElementById('addCategoryBtn').addEventListener('click', function () {
    const newCategoryInput = document.getElementById('newCategory');
    const newCategory = newCategoryInput.value.trim();
    
    if (newCategory) {
        const categorySelect = document.getElementById('category');

        // Check if the category already exists
        const categoryExists = Array.from(categorySelect.options).some(option => option.value === newCategory);

        if (!categoryExists) {
            const newOption = document.createElement('option');
            newOption.value = newCategory;
            newOption.textContent = newCategory;
            categorySelect.appendChild(newOption);

            alert(`Category "${newCategory}" added!`);
        } else {
            alert(`Category "${newCategory}" already exists!`);
        }

        // Clear the input field
        newCategoryInput.value = '';
    } else {
        alert('Please enter a category name.');
    }
});

// Handle flashcard form submission
document.getElementById('flashcardForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    const category = document.getElementById('category').value;

    if (question && answer && category) {
        const flashcardContainer = document.getElementById('flashcard-container');

        // Create a section for the category if it doesn't exist
        let categorySection = document.querySelector(`#category-${category}`);
        if (!categorySection) {
            categorySection = document.createElement('div');
            categorySection.id = `category-${category}`;
            categorySection.innerHTML = `<h3>${category}</h3>`;
            flashcardContainer.appendChild(categorySection);
        }

        // Create the flashcard
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');

        const flashcardInner = document.createElement('div');
        flashcardInner.classList.add('flashcard-inner');

        const flashcardFront = document.createElement('div');
        flashcardFront.classList.add('flashcard-front');
        flashcardFront.textContent = question;

        const flashcardBack = document.createElement('div');
        flashcardBack.classList.add('flashcard-back');
        flashcardBack.innerHTML = `<p>${answer}</p>`;

        // Create the check and X buttons
        const checkMark = document.createElement('span');
        checkMark.classList.add('check-mark');
        checkMark.innerHTML = '&#10004;';  // HTML entity for check mark

        const xMark = document.createElement('span');
        xMark.classList.add('x-mark');
        xMark.innerHTML = '&#10008;';  // HTML entity for X mark

        flashcardBack.appendChild(checkMark);
        flashcardBack.appendChild(xMark);

        flashcardInner.appendChild(flashcardFront);
        flashcardInner.appendChild(flashcardBack);
        flashcard.appendChild(flashcardInner);
        categorySection.appendChild(flashcard);

        // Add flipping functionality
        flashcard.addEventListener('click', function () {
            flashcard.classList.toggle('is-flipped');
            if (!flashcard.dataset.viewed) {
                viewedCount++;
                document.getElementById('viewedCount').textContent = viewedCount;
                flashcard.dataset.viewed = true;
            }
        });

        // Add correct/incorrect functionality
        checkMark.addEventListener('click', function (e) {
            e.stopPropagation();
            correctCount++;
            document.getElementById('correctCount').textContent = correctCount;
            flashcard.classList.add('answered-correctly');
        });

        xMark.addEventListener('click', function (e) {
            e.stopPropagation();
            flashcard.classList.add('answered-incorrectly');
        });

        // Reset form
        document.getElementById('flashcardForm').reset();
    }
});
