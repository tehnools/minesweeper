var Builder = {
    createSelector: createSelector,
    createButton: createButton,
    createLabel: createLabel,
    createRange: createRange,
    createSpan: createSpan,
    deleteChildNodes: deleteChildNodes
}

// ------- Builders
function createSelector(optionNames, selectorName, selectorType) {
    let selector = document.createElement('select');
    selector.name = selectorName;
    if (selectorType) selector.type = selectorType;

    for (let optionName of optionNames) {
        let option = document.createElement('option');

        option.value = optionName.toLowerCase();
        option.textContent = optionName;
        selector.appendChild(option);
    }
    return selector;
}

function createButton(classNames, text, handler) {
    let button = document.createElement('button');
    button.classList = classNames;
    button.textContent = text;
    button.addEventListener('click', handler);
    return button;
}


function createLabel(forName, text) {
    let label = document.createElement('label');
    label.for = forName;
    label.textContent = text;

    return label;
}

function createRange(name, min, max, value) {
    let inputRange = document.createElement('input');
    inputRange.type = 'range';
    inputRange.name = name;
    inputRange.min = min;
    inputRange.max = max;
    inputRange.className = "slider is-fullwidth is-small is-circle is-primary"

    // Check for Value
    if (value) {
        inputRange.value = value
    } else {
        inputRange.value = min
    }

    return inputRange;
}

function createSpan(className, text) {
    let span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    console.log(span)
    return span;
}

function deleteChildNodes(parentElement) {
    while (parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild)
    }
}
