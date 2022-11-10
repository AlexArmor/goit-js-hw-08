import lsMethods from './storage.js'
import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const FEEDBACK_FORM_KEY = "feedback-form-state"
const userData = {};

(() => {
    const feedbackFormDataFromLS = lsMethods.load(FEEDBACK_FORM_KEY);
    for (const prop in feedbackFormDataFromLS) {
        if (feedbackFormDataFromLS.hasOwnProperty(prop)) {
            feedbackFormEl.elements[prop].value = feedbackFormDataFromLS[prop];
            userData[prop] = feedbackFormDataFromLS[prop];
        }
    }
})();

const onFormFieldChange = event => {
    const { target } = event;
    const fieldName = target.name;
    const fieldValue = target.value;

    userData[fieldName] = fieldValue;

    lsMethods.save(FEEDBACK_FORM_KEY, userData);
};

const onFeedbackFormSubmit = event => {
    event.preventDefault();
    console.log(lsMethods.load(FEEDBACK_FORM_KEY));
    lsMethods.remove(FEEDBACK_FORM_KEY)
    feedbackFormEl.reset();
    userData.name = "";
    userData.value = "";
};

feedbackFormEl.addEventListener('input', throttle(onFormFieldChange, 2000));
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);